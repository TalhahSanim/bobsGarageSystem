// one tbale row dor user with edit and delete
import { FaTimes, FaPencilAlt } from "react-icons/fa";
import { Link } from "react-router-dom";
import { useUsers } from "../../../context/UsersContext";

// Single user component one table row and takes in user as prop
export default function SingleUser({ user }) {
  const { deleteUser } = useUsers();

  // Runs when delete clicked and takes in the id of th euser to delete
  const onDelete = async (id) => {
    // delete confirmation -> deleting user cannot be undone
    if (!window.confirm(`Delete ${user.firstName} ${user.lastName}`)) return;
    const result = await deleteUser(id);
    if (!result.ok) {
      alert(result.msg);
    }
  };
  return (
    <div className="odd:bg-white event:bg-gray-50 hover:bg-yellow-50">
      <div className="p-2">{user.userId}</div>
      <div className="p-2">{user.firstName}</div>
      <div className="p-2">{user.lastName}</div>
      <div className="p-2">{user.email}</div>
      <div className="p-2">{user.isAdmin ? "Yes" : "No"}</div>
      <div className="max-w-40 truncate p-2">{user.image}</div>
      <div className="p-2">
        {/* Link for editing this user */}
        <Link
          to={`/admin/users/edit/${user.userId}`}
          className="inline-flex text-blue-600 hover:text-blue-800"
          aria-label={`Edit ${user.firstName}`}
        >
          <FaPencilAlt />
        </Link>
      </div>
      <td className="p-2">
        {/* Button for delete */}
        <button
          type="button"
          onClick={() => onDelete(user.userId)}
          className="inline-flex cursor-pointer text-red-600 hover:text-red-800"
          aria-label={`Delete ${user.firstName}`}
        >
          <FaTimes />
        </button>
      </td>
    </div>
  );
}
