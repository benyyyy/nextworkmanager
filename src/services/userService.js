import { httpAxios } from "@/helper/httpHelper";
 export async function  addUser(user){
    const result= await httpAxios.post("/api/user",user).
    then((res)=>res.data);
return result;
}