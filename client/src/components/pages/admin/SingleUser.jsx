// one tbale row dor user with edit and delete
import { FaTimes, FaPencilAlt } from "react-icons/fa";
import { Link } from "react-router-dom";
import { useUsers } from "../../../context/UsersContext";
import { FaPencil } from "react-icons/fa6";

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

  const initials = `${user.firstName?.[0] ?? ""}${user.lastName?.[0] ?? ""}`;
  return (
    <li className="card flex items-center gap-4 p-4">
      {/* IMage or initials on icon box */}
      {user.image ? (
        <img
          src={user.image}
          alt=""
          className="size-12 shrink-0 border-2 border-line object-cover"
        />
      ) : (
        <div
          className="icon-tile size-12 shrink-0 font-heading text-lg font-semibold"
          aria-hidden="true"
        >
          {initials}
        </div>
      )}

      {/* name, id and email */}
      <div className="min-w-0 flex-1">
        <p className="font-semibold">
          {user.firstName}
          {user.lastName}
        </p>
        <p className="truncate text-sm text-muted"> {user.email}</p>
        <p className="text-xs text-muted">ID:{user.userId}</p>
      </div>

      {/* Admin badge and edit and delete */}
      <div className="flex shrink-0 flex-col items-end gap-2">
        {user.isAdmin && <span className="badge badge-responded">Admin</span>}
        <div className="flex gap-3">
          <Link
            to={`/admin/users/edit/${user.userId} `}
            className="inline-flex text-black px-2 py-2 bg-primary hover:text-primary-hover"
            aria-label={`Edit ${user.firstName}`}
          >
            <FaPencil aria-hidden="true" /> Edit
          </Link>
          <button
            type="button"
            onClick={() => onDelete(user.userId)}
            className="inline-flex cursor-pointer px-2 py-2 bg-danger text-black hover:brightness-90"
          >
            <FaTimes aria-hidden="true" /> Delete
          </button>
        </div>
      </div>
    </li>
  );
}
