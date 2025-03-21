
import { httpAxios } from "@/helper/httpHelper";
 export async function  addUser(user){
    const result= await httpAxios.post("/api/user",user).
    then((res)=>res.data);
return result;
}

export async function login(loginData) {
  const result = await httpAxios.post("/api/login", loginData)
  .then((response) => response.data);
  return result;
}