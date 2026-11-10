// File -> client/src/components/pages/admin/SystemOverview.jsx
// Author -> Talhah Sanim
// Application Version -> 1.0

// Admin Overview  which counts users,admin and services
import { useUsers } from "../../../context/UsersContext";
import { useServices } from "../../../context/GarageContext";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import CountUp from "../../ui/CountUp";
import axios from "axios";

const enquiriesURL = "http://localhost:3000/api/enquiries";
export default function SystemOverview() {
  const { userList = [] } = useUsers();
  const serviceList = useServices();
  //  Every customer's enquiries (ADMIN ROUTE) , loaded at once when page opens
  const [enquiryList, setEnquiryList] = useState([]);

  useEffect(() => {
    const loadEnquiries = async () => {
      try {
        const res = await axios.get(enquiriesURL);
        setEnquiryList(res.data);
      } catch (err) {
        console.log(err.message);
      }
    };
    loadEnquiries();
  }, []);

  const metrics = [
    ["Users", userList.length],
    ["Admins", userList.filter((user) => user.isAdmin).length],
    ["Services", serviceList.length],
    ["Enquiries", enquiryList.length],
    [
      "Pending Enquiries",
      enquiryList.filter((enquiry) => enquiry.status === "pending").length,
    ],
  ];
  return (
    <>
      <title>System Overview - Bob's Garage</title>

      <h1 className="mb-6 text-3xl">Admin Dashboard</h1>
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
        {metrics.map((metric) => (
          <Link
            key={metric.label}
            to={metric.to}
            className="card card-lift p-5 text-ink no-underline"
          >
            <p className="text-sm font-normal text-muted">{metric.label}</p>
            <CountUp
              to={metric.value}
              duration={1.2}
              className="mt-1 block text-4xl font-semibold"
            />
          </Link>
        ))}
      </div>
    </>
  );
}
