// tbale for every user -> ADMIN ONLY
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
      <div className="panel-body overflow-x-auto">
        <h2 className="mb-4 text-xl font-semibold text-blue-600">Users</h2>
        <table className="w-full text-left text-sm">
          {/* Table headings */}
          <thead className="border-b-2 border-gray-300">
            <th scope="col" className="p-2">
              ID
            </th>
            <th scope="col" className="p-2">
              First Name
            </th>
            <th scope="col" className="p-2">
              Last Name
            </th>
            <th scope="col" className="p-2">
              Email
            </th>
            <th scope="col" className="p-2">
              Admin
            </th>
            <th scope="col" className="p-2">
              Image
            </th>
            <th scope="col" className="p-2">
              Edit
            </th>
            <th scope="col" className="p-2">
              Delete
            </th>
          </thead>
          {/* one row each user */}
          <tbody className="divide-y divide-gray-200">
            {userList.map((user) => (
              <SingleUser key={user.userId} user={user}></SingleUser>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
