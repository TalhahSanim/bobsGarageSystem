// Admin Overview  which conunts users,admin and services
import { useUsers } from "../../../context/UsersContext";
import { useServices } from "../../../context/GarageContext";

export default function SystemOverview() {
  const { userList = [] } = useUsers();
  const serviceList = useServices();

  const metrics = [
    ["Users", userList.length],
    ["Admins", userList.filter((user) => user.isAdmin).length],
    ["Services", serviceList.length],
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
