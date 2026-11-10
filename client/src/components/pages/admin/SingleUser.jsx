// File -> client/src/components/pages/admin/SingleUser.jsx
// Author -> Talhah Sanim
// Application Version -> 1.0
// One card has a user with edit and delete
// SingleUser -> one card for each user and takes user as a prop
import { FaEdit } from "react-icons/fa";
import { MdDeleteForever } from "react-icons/md";
import { useState } from "react";

import ConfirmDelete from "../../layout/ConfirmDelete";

import { Link } from "react-router-dom";
import { useUsers } from "../../../context/UsersContext";
import { imgSrc } from "../../../utils/imgSrc";

// Single user component one table row and takes in user as prop
export default function SingleUser({ user }) {
  const { deleteUser } = useUsers();

  // Is the are you sure box open and is the delete on the way and any error
  const [askDelete, setAskDelete] = useState(false);
  const [deleting, setDeleting] = useState(false);
  const [error, setError] = useState("");

  // Runs on yes,delete -> delete  real and show why it failed on the card
  const onConfirmDelete = async () => {
    setDeleting(true);
    // deleteUser returns {ok,msg}

    const result = await deleteUser(user.userId);
    setDeleting(false);
    setAskDelete(false);
    if (!result.ok) setError(result.msg);
  };

  const initials = `${user.firstName?.[0] ?? ""}${user.lastName?.[0] ?? ""}`;
  return (
    <li className="card p-4">
      <div className="flex items-center gap-4">
        {/* IMage or initials on icon box */}
        {user.image ? (
          <img
            src={imgSrc(user.image)}
            alt=""
            className="size-20 shrink-0 border-2 border-line object-cover"
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
          onClick={() => setAskDelete(true)}
          className="btn btn-danger btn-sm"
        >
          <MdDeleteForever aria-hidden="true" /> Delete
        </button>
      </div>
      {/* Failed delete -> show why on card instead of alert */}
      {error && <p className="alert-danger mt-3 text-sm">{error}</p>}

      <ConfirmDelete
        show={askDelete}
        name={`${user.firstName} ${user.lastName}`}
        busy={deleting}
        onConfirm={onConfirmDelete}
        onClose={() => setAskDelete(false)}
      />
    </li>
  );
}
