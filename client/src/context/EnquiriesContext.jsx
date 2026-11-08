// File -> client/src/context/EnquiriesContext.jsx
// Creats the enquiries context and a custom hook to use it

import { createContext, useContext } from "react";

export const EnquiriesContext = createContext();

// Custom hook -> my enquiries, the unread count and send /tick-read dunctions
export const useEnquiries = () => useContext(EnquiriesContext);
