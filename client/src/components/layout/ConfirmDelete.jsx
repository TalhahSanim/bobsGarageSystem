// File -> client/src/components/layout/ConfirmDelete.jsx
// Author -> Talhah Sanim
// Application Version -> 1.0

// ConfirmDelete -> Are you sure box before deleting anything -> Flowbites Modal
import { Modal, ModalBody, ModalHeader } from "flowbite-react";
import { RiDeleteBin6Line } from "react-icons/ri";

// Props -> show it is open or not, name is whats being deleted and busy is deleting now
// onConfirm -> rims pm ues delete and onClose runs on Cancel,Esc, X or tinted background

export default function ConfirmDelete({
  show,
  name,
  busy = false,
  onConfirm,
  onClose,
}) {
  return (
    <Modal show={show} size="md" popup onClose={onClose}>
      <ModalBody>
        <div className="text-center">
          <RiDeleteBin6Line
            className="mx-auto mb-4 size-10 text-danger"
            aria-hidden="true"
          />
          <h3 className="mb-2 text-lg font-semibold text-ink">
            Delete {name}?
          </h3>
          <p className="mb-6 text-muted">This Cannot Be Undone</p>
          <div className="flex justify-center gap-3">
            {/* My Styled Buttons */}
            <button
              type="button"
              className="btn btn-danger"
              onClick={onConfirm}
              disabled={busy}
            >
              {busy ? "Deleting..." : "Yes, Delete"}
            </button>
            <button type="button" className="btn btn-outline" onClick={onClose}>
              Cancel
            </button>
          </div>
        </div>
      </ModalBody>
    </Modal>
  );
}
