// One card has a user with edit and delete
// SingleUser -> one card for each user and takes user as a prop
import { FaEdit } from "react-icons/fa";
import { MdDeleteForever } from "react-icons/md";

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

  const initials = `${user.firstName?.[0] ?? ""}${user.lastName?.[0] ?? ""}`;
  return (
    <li className="card p-4">
      <div className="flex items-center gap-4">
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
          <p className="truncate font-semibold">
            {user.firstName} {user.lastName}
          </p>{" "}
          <p className="text-xs text-muted">ID:{user.userId}</p>
          <p className="truncate text-sm text-muted"> {user.email}</p>
          {/* Admin badge */}
          {user.isAdmin && <span className="badge badge-responded">Admin</span>}
        </div>
      </div>
      {/*   Bottom-> actions on own line to prevent covering text */}

      <div className="mt-3 flex justify-end gap-2">
        <Link
          to={`/admin/users/edit/${user.userId}`}
          className="btn btn-outline btn-sm"
        >
          <FaEdit aria-hidden="true" />
          Edit
        </Link>
        <button
          type="button"
          onClick={() => onDelete(user.userId)}
          className="btn btn-danger btn-sm"
        >
          <MdDeleteForever aria-hidden="true" /> Delete
        </button>
      </div>
    </li>
  );
}
