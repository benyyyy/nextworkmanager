import { NextResponse } from "next/server";


export function middleware(request) {
  console.log("middleware executed");

  const authToken = request.cookies.get("authToken")?.value;
  //If authToken exists, the user is considered logged in. otherwise the user is treated as not logged in.
  
  
  //API routes like /api/login and /api/user are allowed without any authentication checks.
//The middleware does nothing (return) for these routes, allowing them to execute normally.
  if (
    request.nextUrl.pathname === "/api/login" ||
    request.nextUrl.pathname === "/api/user"
  ) {
    return;
  }



  //Routes like /login and /signup should not be accessible to users who are already logged in.
//If a logged-in user (with authToken) tries to access /login or /signup, they are redirected to /profile/user.
  const loggedInUserNotAccessPaths =
    request.nextUrl.pathname === "/login" ||
    request.nextUrl.pathname == "/signup";

  if (loggedInUserNotAccessPaths) {
    // access not secured route
    if (authToken) {
      return NextResponse.redirect(new URL("/profile/user", request.url));
    }
  } else {
    // accessing secured route




    //For routes other than /login and /signup, the middleware considers them as secured routes.
//If a non-logged-in user tries to access a secured route:
//If the route is an API route (starts with /api), it responds with a 401 status and a JSON error message.
//Otherwise, it redirects the user to the /login page.
    if (!authToken) {
      if (request.nextUrl.pathname.startsWith("/api")) {
        return NextResponse.json(
          {
            message: "Access Denied !!",
            success: false,
          },
          {
            status: 401,
          }
        );
      }

      return NextResponse.redirect(new URL("/login", request.url));
    } else {
      // varify...
    }
  }

  console.log(authToken);

  //   return NextResponse.redirect(new URL("/home", request.url));
}

// See "Matching Paths" below to learn more
export const config = {
  matcher: [
    "/",
    "/login",
    "/signup",
    "/add-task",
    "/show-tasks",
    "/profile/:path*",
    "/api/:path*",
  ],
};


//The middleware is applied only to specific routes listed in the matcher array:
//Public routes: /, /login, /signup
//Secured routes: /add-task, /show-tasks, /profile/:path*, /api/:path*