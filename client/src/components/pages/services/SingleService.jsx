import { Link } from "react-router-dom";
// bring in some icons
import { RiDeleteBin6Line } from "react-icons/ri";
import { FaRegEdit } from "react-icons/fa";
// bring in IconContext
import { IconContext } from "react-icons/lib";
import { useServicesDelete } from "../../../context/GarageContext";
// Import the useServiceDelete hook from context

export default function SingleService({ service }) {
  // use the useServiceDelete hook
  const deleteService = useServicesDelete();

  // create onDelete function
  const onDelete = (id, e) => {
    // Test that the function is called
    console.log("OnDelete function has been invoked -> SingleService.jsx");
    // validate id was passed thorugh
    console.log(`ID clicked -> ${id}`);
    console.log(e.type);
    // calling deleteService function
    deleteService(id);
  };

  // Destructure Service
  const { serviceId, name, type, description, image, fee } = service;
  return (
    <>
      <div className="card card-lift bg-base-100 shadow-md ">
        <img src={image} alt={name} className="h-48 w-full object-cover" />
        <div className="p-4">
          <h5 className="text-lg font-semibold">{name}</h5>
          <p className="text-sm text-gray-700">{type}</p>
          <p className="text-blue-600">{description}</p>
          <p className="my-2 text-end font-bold">${fee}</p>
          <div className="flex gap-4">
            <a href="#" className=" btn btn-secondary">
              More Details
            </a>
            <a href="#" className=" btn btn-secondary ">
              Save to Favourites
            </a>
          </div>
        </div>
        {/* // Card footer */}
        <div className="flex justify-center gap-12 bg-blue-400 p-4">
          {/* Every icon same sizing */}
          <IconContext.Provider value={{ size: "2em" }}>
            <Link to={`/edit/${serviceId}`} className="grid">
              <button type="button" className="btn btn-outline btn-secondary ">
                <FaRegEdit /> Edit
              </button>
            </Link>

            <button
              type="button"
              className="btn btn-primary p-3 text-shadow-pink-950"
              onClick={(e) => onDelete(serviceId, e)}
            >
              <RiDeleteBin6Line /> Delete
            </button>
          </IconContext.Provider>
        </div>
      </div>
    </>
  );
}
