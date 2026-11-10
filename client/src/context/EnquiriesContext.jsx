// File -> client/src/context/EnquiriesContext.jsx
// Author -> Talhah Sanim
// Application Version -> 1.0
// Creates the enquiries context and a custom hook to use it

import { createContext, useContext } from "react";

export const EnquiriesContext = createContext();

// Custom hook -> my enquiries, the unread count and send /tick-read functions
export const useEnquiries = () => useContext(EnquiriesContext);
