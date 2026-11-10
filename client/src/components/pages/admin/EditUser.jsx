// File -> client/src/components/pages/admin/EditUser.jsx
// Author -> Talhah Sanim
// Application Version -> 1.0

// Admin form for editing users details except user password
import { useState, useEffect, Fragment } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useUsers } from "../../../context/UsersContext";

// EditUser Component -> form fot admin to edit user
export default function EditUser() {
  //  get the id number and typecast to number
  let { id } = useParams();
  id = Number(id);

  const { getUserById, updateUser } = useUsers();
  const navigate = useNavigate();

  // find user in list the dashboard loaded
  const user = getUserById(id);

  // create stat to hold user dta starting from the user in the list
  const [formData, setFormData] = useState({
    userId: user?.userId,
    firstName: user?.firstName,
    lastName: user?.lastName,
    email: user?.email,
    image: user?.image ?? "",
    isAdmin: user?.isAdmin ?? false,
    errors: {},
  });

  // set state to hold status of update
  const [requestStatus, setRequestStatus] = useState("idle");

  // Refill the form once users have loaded such as refresh of a page
  useEffect(() => {
    if (user) {
      setFormData({ ...user, image: user.image ?? "", errors: {} });
    }
  }, [user]);

  // Check for user
  if (!user) {
    return (
      <section className="alert-danger">
        <h2 className="text-xl font-semibold">User notfound!!!</h2>
      </section>
    );
  }

  // destructure the state
  const { userId, firstName, lastName, email, image, isAdmin, errors } =
    formData;

  // Update the field whose name matches the input changed
  const onChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  // check if we can save the data or not
  const canSave = firstName !== undefined && requestStatus === "idle";

  // runs when form submits -> save the changes and then go back to list
  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("handleSubmit -> EditUser.jsx");
    if (!canSave) return;

    setRequestStatus("pending");
    const result = await updateUser({
      userId,
      firstName,
      lastName,
      email,
      image,
      isAdmin,
    });
    setRequestStatus("idle");
    if (result.ok) {
      navigate("/admin/users");
    } else {
      setFormData({ ...formData, errors: { email: result.msg } });
    }
  };
  // helper-> Returns the label, input and error message for one form field
  const field = (name, label, type = "text") => (
    <div className="mb-4">
      <label className="form-label" htmlFor={name}>
        {label}
      </label>
      <input
        type={type}
        className={`form-input ${errors[name] ? "is-invalid" : "is-valid"}`}
        id={name}
        placeholder={label}
        name={name}
        value={formData[name] ?? ""}
        onChange={(e) => onChange(e)}
      />
      {errors[name] && <div className="invalid-feedback">{errors[name]}</div>}
    </div>
  );

  return (
    <Fragment>
      <title>Edit User - Bob's Garage</title>

      <div className="panel">
        <h1 className="panel-header">Edit User</h1>
        <div className="panel-body">
          <form onSubmit={(e) => handleSubmit(e)}>
            <div className="grid gap-x-6 md:grid-cols-2">
              {field("firstName", "First Name")}
              {field("lastName", "Last Name")}
            </div>
            {field("email", "Email", "email")}
            {field("image", "Image")}
            {/* Admin Checkbox */}
            <label className="mb-4 flex items-center gap-2">
              <input
                type="checkbox"
                className="size-4 accent-garage"
                checked={isAdmin}
                onChange={(e) =>
                  setFormData({ ...formData, isAdmin: e.target.checked })
                }
              />
              Admin
            </label>
            <div className="mb-4 grid">
              <input
                type="submit"
                value="Edit User"
                className="btn btn-info "
              />
            </div>
          </form>
        </div>
      </div>
    </Fragment>
  );
}
