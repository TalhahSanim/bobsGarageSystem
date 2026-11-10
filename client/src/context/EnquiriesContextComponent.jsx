// File -> client/src/context/EnquiriesContextComponent.jsx
// Author -> Talhah Sanim
// Application Version -> 1.0

// The enquiries provide -> loads the logged in user's enquiries
// sends new ones and ticks replies

import { useState, useEffect } from "react";
import axios from "axios";
import { EnquiriesContext } from "./EnquiriesContext";
import { useAuth } from "./AuthContext";

const enquiriesURL = "http://localhost:3000/api/enquiries";

// EnquiriesContextProvider component -> must be INSIDE AuthContextProvider as it use useAuth()
export default function EnquiriesContextComponent({ children }) {
  const { isAuth } = useAuth();
  const [enquiries, setEnquiries] = useState([]);
  // Retrieve enquiries from the api
  const loadEnquiries = async () => {
    try {
      const res = await axios.get(`${enquiriesURL}/my-enquiries`);
      setEnquiries(res.data);
    } catch (err) {
      console.log("loadEnquiries failed", err.message);
    }
  };

  //   Load them when the user logs in and empty the list when their logged out
  useEffect(() => {
    if (isAuth) {
      loadEnquiries();
    } else {
      setEnquiries([]);
    }
  }, [isAuth]);

  //   number of replies that haven't been read -> badge
  const unreadCount = enquiries.filter(
    (enquiry) => enquiry.status === "responded" && !enquiry.readByUser,
  ).length;

  //   newest enquiry about one service or undefined and takes in serviceId
  // the list is newest first so find() gives the latest
  const latestOne = (serviceId) =>
    enquiries.find((enquiry) => enquiry.serviceId === serviceId);

  //   Send Enquiry -> takes in a serviceId and the message
  // Returns {ok:true,msg} or {ok:false,msg} for from to display
  const sendEnquiry = async (serviceId, message) => {
    try {
      const res = await axios.post(`${enquiriesURL}/${serviceId}`, { message });
      // Newest first which puts it on the top
      setEnquiries((prev) => [res.data.enquiry, ...prev]);
      return { ok: true, msg: res.data.msg };
    } catch (err) {
      return {
        ok: false,
        msg: err.response?.data?.msg || "Could Not Send Your Enquiry",
      };
    }
  };

  // Tick one reply as read and takes in an enquiryId
  const tickRead = async (enquiryId) => {
    try {
      await axios.put(`${enquiriesURL}/${enquiryId}/read`);
      setEnquiries((prev) =>
        prev.map((enquiry) =>
          enquiry.enquiryId === enquiryId
            ? { ...enquiry, readByUser: true }
            : enquiry,
        ),
      );
    } catch (err) {
      console.log("tickRead failed", err.message);
    }
  };
  return (
    <EnquiriesContext.Provider
      value={{
        enquiries,
        unreadCount,
        latestOne,
        sendEnquiry,
        tickRead,
        loadEnquiries,
      }}
    >
      {children}
    </EnquiriesContext.Provider>
  );
}
