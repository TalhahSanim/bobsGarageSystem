// File -> client/src/components/pages/admin/SystemOverview.jsx
// Author -> Talhah Sanim
// Application Version -> 1.0

// Admin Overview  which counts users,admin and services
import { useUsers } from "../../../context/UsersContext";
import { useServices } from "../../../context/GarageContext";
import { useEnquiries } from "../../../context/EnquiriesContext";

export default function SystemOverview() {
  const { userList = [] } = useUsers();
  const serviceList = useServices();
  const EnquiryList = useEnquiries();

  const metrics = [
    ["Users", userList.length],
    ["Admins", userList.filter((user) => user.isAdmin).length],
    ["Services", serviceList.length],
    ["Enquiries", EnquiryList.length],
  ];
  return (
    <>
      <h1 className="mb-6 text-3xl">Admin Dashboard</h1>
      <div className="grid gap-4 sm:grid-cols-3">
        {metrics.map(([label, value]) => (
          <div key={label} className="card p-5">
            <p className="text-sm font-normal text-muted">{label}</p>
            <p className="mt-1 text-4xl font-semibold">{value}</p>
          </div>
        ))}
      </div>
    </>
  );
}
