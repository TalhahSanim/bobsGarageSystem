// File -> client/src/components/pages/services/SingleService.jsx
// Author -> Talhah Sanim
// Application Version -> 1.0
//  one service per card
import { useState } from "react";
import ConfirmDelete from "../../layout/ConfirmDelete";
import { Link } from "react-router-dom";
import { RiDeleteBin6Line } from "react-icons/ri";
import { FaRegEdit, FaHeart, FaRegHeart } from "react-icons/fa";
import { useServicesDelete } from "../../../context/GarageContext";
import { useAuth } from "../../../context/AuthContext";
import { useFavourites } from "../../../context/FavouritesContext";
// Backup photo for services with no image
import fallbackImage from "../../../assets/hero-image.jpg";

import { imgSrc } from "../../../utils/imgSrc";

export default function SingleService({ service, onToast }) {
  const serviceDelete = useServicesDelete();
  // ONLY Admin enabled to delete and edit
  const { isAuth, isAdmin } = useAuth();
  const { isFavourite, addFavourite, removeFavourite } = useFavourites();
  // Short message after adding a favourite such as we'll contact you shortly
  const [note, setNote] = useState("");

  // DeStructure
  const { serviceId, name, type, description, image, fee } = service;

  // Is the are you sure box open and is the delete on its way?
  const [askDelete, setAskDelete] = useState(false);
  const [deleting, setDeleting] = useState(false);

  // Runs on yes Delete -> ADMIN ONLY and delete for real and tell the page and user
  const onConfirmDelete = async () => {
    setDeleting(true);
    //deleteService returns true if it worked
    const deleted = await serviceDelete(serviceId);
    setDeleting(false);
    setAskDelete(false);
    // Tell the service page on what happened and only when toast gets passed in
    onToast?.(
      deleted ? `${name} Was Deleted` : `Sorry, ${name} Could Not Be Deleted`,
    );
  };
  const favourite = isFavourite(serviceId);

  // Runs when the hear is clicked -> Add or Remove this service from my favourites
  const favouriteToggle = async () => {
    try {
      if (favourite) {
        await removeFavourite(serviceId);
        setNote("");
      } else {
        const msg = await addFavourite(serviceId);
        setNote(msg);
        // Hide the message after 4 seconds
        setTimeout(() => setNote(""), 4000);
      }
    } catch (err) {
      console.log("favouriteToggle failed", err.message);
      setNote("Something Went Wrong. Please Try Again");
    }
  };
  return (
    <article className="card card-lift flex h-full flex-col">
      {/* Service photo or the backup one when no photo included in service during add or edit */}
      <div className="relative">
        <img
          src={imgSrc(image) || fallbackImage}
          alt={name}
          className="h-44 w-full object-cover"
        />
        {isAuth && (
          <button
            type="button"
            onClick={favouriteToggle}
            className="absolute top-3 right-3 bg-surface/90 p-2 text-accent shadow hover:scale-110 transition-transform"
            aria-label={
              favourite
                ? `Remove ${name} from favourites`
                : `Add ${name} to favourites`
            }
          >
            {favourite ? (
              <FaHeart size={"1.5em"} />
            ) : (
              <FaRegHeart size="1.5em" />
            )}
          </button>
        )}
      </div>

      <div className="flex flex-1 flex-col gap-1 p-4">
        <p className="text-xs font-normal tracking-wide text-muted uppercase">
          {type}
        </p>
        <h3 className="line-clamp-1 text-lg font-semibold" title={name}>
          {name}
        </h3>
        <p className="line-clamp-2 min-h-10 text-sm font-normal text-muted">
          {description}
        </p>
        <p className="mt-1 font-semibold text-link">${fee}</p>

        {/* mt auto makes buttons to bottom so card aligns nicely */}
        <div className="mt-auto flex gap-2 pt-3">
          <Link
            to={`/services/${serviceId}`}
            className="btn btn-primary flex-1"
          >
            View Service
          </Link>
          {/* The thank you message after adding a favourite */}
          {note && (
            <p
              className="mt-3 text-sm font-bold text-success-text"
              role="status"
            >
              {note}
            </p>
          )}
        </div>
        {/* ADMIN ONLY -> EDIT & DELETE */}
        {isAdmin && (
          <div className="flex justify-center gap-2 pt-2">
            <Link
              to={`/edit/${serviceId}`}
              className="btn btn-outline btn-sm py-2.5 px-4.5"
            >
              <FaRegEdit aria-hidden="true" /> Edit
            </Link>
            <button
              type="button"
              className="btn btn-danger btn-sm py-2.5 px-4.5"
              onClick={() => setAskDelete(true)}
            >
              <RiDeleteBin6Line aria-hidden="true" /> Delete
            </button>
          </div>
        )}
      </div>
      {/* Are you sure box -> only open while askDelete is true */}
      <ConfirmDelete
        show={askDelete}
        name={name}
        busy={deleting}
        onConfirm={onConfirmDelete}
        onClose={() => setAskDelete(false)}
      />
    </article>
  );
}
