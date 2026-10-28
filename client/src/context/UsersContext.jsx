// Create the users context for admin dashboard with a hook to use it

import { createContext, useContext } from "react";

// Holds {userList,status,error,loadUsers,getUserById,addUser,updateUser,deleteUser}
export const UsersContext = createContext();

// Custom hook -> everything admin pages need for user management
export const useUsers = () => useContext(UsersContext);
