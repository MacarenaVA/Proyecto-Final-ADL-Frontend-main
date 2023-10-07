import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "./AuthProvider";

export const UserClassesContext = React.createContext();

const UserClassesProvider = ({ children }) => {
  const { token } = useContext(AuthContext);
  const [userClasses, setUserClasses] = useState([]);

  const getClasses = async () => {
    try {
      const res = await fetch(import.meta.env.VITE_URL + "classes/users", {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      const data = await res.json();
      setUserClasses(data.result);
    } catch (error) {
      console.log(error);
    }
  };



  return (
    <UserClassesContext.Provider value={{ userClasses, getClasses }}>
      {children}
    </UserClassesContext.Provider>
  );

}

export default UserClassesProvider