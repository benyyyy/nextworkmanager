"use client";
import React, { useEffect, useState } from "react";
import UserContext from "./userContext";
// import { toast } from "react-toastify";

import { currentUser } from "@/services/userService";

const UserProvider = ({ children }) => {
  const [user, setUser] = useState(undefined);


  async function load() {
    try {
      const tempUser = await currentUser();
      console.log(tempUser);
      setUser({ ...tempUser });
    } catch (error) {
      console.log(error);
      // toast.error("error in loading current  user");
      setUser(undefined);
    }
  }
  useEffect(() => {
  
    load();
  }, []);

  return (
    <UserContext.Provider value={{ user, setUser }}>
      {children}
    </UserContext.Provider>
  );
};

export default UserProvider;
