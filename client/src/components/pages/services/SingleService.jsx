//  one service per card
import { Link } from "react-router-dom";
import { RiDeleteBin6Line } from "react-icons/ri";
import { FaRegEdit } from "react-icons/fa";
import { useServicesDelete } from "../../../context/GarageContext";
import { useAuth } from "../../../context/AuthContext";
// Backup photo for services with no image
import fallbackImage from "../../../assets/hero-image.jpg";

export default function SingleService({ service }) {
  const serviceDelete = useServicesDelete();
  // ONLY Admin enabled to delete and edit
  const { isAdmin } = useAuth();

  // DeStructure
  const { serviceId, name, type, description, image, fee } = service;

  const onDelete = (id) => {
    console.log(`Delete clicked for id ${id} -> SingleService.jsx`);
    serviceDelete(id);
  };
  return (
    <article className="card card-lift flex flex-col">
      {/* Service phot or the backup one when no photo include in service during add or edit */}
      <img
        src={image || fallbackImage}
        alt={name}
        className="h-44 w-full object-cover"
      />

      <div className="flex flex-1 flex-col gap-1 p-4">
        <p className="text-xs font-normal tracking-wide text-muted uppercase">
          {type}
        </p>
        <h3 className="text-lg font-semibold">{name}</h3>
        <p className="line-clamp-2 text-sm font-normal text-muted">
          {description}
        </p>
        <p className="mt-1 font-semibold text-link">${fee}</p>

        {/* mt auto makes buttons to buttom so card aligns nicely */}
        <div className="mt-auto flex gap-2 pt-3">
          <Link
            to={`/services/${serviceId}`}
            className="btn btn-primary flex-1"
          >
            View Service
          </Link>
        </div>

        {/* ADMIN ONLY -> EDIT & DELETE */}
        {isAdmin && (
          <div className="flex gap-2 pt-2">
            <Link to={`/edit/${serviceId}`} className="btn btn-outline btn-sm">
              <FaRegEdit /> Edit
            </Link>
            <button
              type="button"
              className="btn btn-danger btn-sm"
              onClick={() => onDelete(serviceDelete)}
            >
              <RiDeleteBin6Line /> Delete
            </button>
          </div>
        )}
      </div>
    </article>
  );
}
