import React, { createContext, useState } from "react";
export const UserContext = createContext();

const UserProvider = ({ children }) => {
  const [user, setUser] = useState({});
  const [openDrawer, setOpenDrawer] = useState(false);
  return (
    <UserContext.Provider value={{ user, setUser, openDrawer, setOpenDrawer }}>
      {children}
    </UserContext.Provider>
  );
};

export default UserProvider;
