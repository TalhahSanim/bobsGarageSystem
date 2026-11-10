// File -> client/src/components/pages/admin/Users.jsx
// Author -> Talhah Sanim
// Application Version -> 1.0

// Cards for every user -> ADMIN ONLY
import { useUsers } from "../../../context/UsersContext";
import SingleUser from "./SingleUser";

// users component which shows spinner an error or the table
export default function Users() {
  const { userList, status, error } = useUsers();

  if (status === "loading") {
    return (
      <p className="flex items-center gap-3 text-gray-600">
        <span className="spinner" aria-hidden="true"></span> Loading users....
      </p>
    );
  }
  if (status === "failed") {
    return <p className="alert-danger">Could not load the users: {error}</p>;
  }
  return (
    <div className="panel">
      <title>Users - Bob's Garage</title>

      <div className="panel-body overflow-x-auto">
        <h2 className="mb-4 text-xl font-semibold text-link">Users</h2>
        {/* 1 column on phones and 2 from md and 3 from large screens */}
        <ul className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
          {userList.map((user) => (
            <SingleUser key={user.userId} user={user} />
          ))}
        </ul>
      </div>
    </div>
  );
}
