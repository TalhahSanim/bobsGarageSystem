// File -> client/src/components/pages/services/FavouritedServices.jsx
// Author -> Talhah Sanim
//Application  Version -> 1.0

// Customer favourited services

import { Link } from "react-router-dom";
import { FaRegHeart } from "react-icons/fa";
import { useFavourites } from "../../../context/FavouritesContext";
import { useEnquiries } from "../../../context/EnquiriesContext";

import fallbackImage from "../../../assets/hero-image.jpg";

import { imgSrc } from "../../../utils/imgSrc";

export default function FavouritedServices() {
  const { favourites, removeFavourite } = useFavourites();
  const { latestOne } = useEnquiries();
  return (
    <main className="my-10">
      <title>Saved Services - Bob's Garage</title>
      <h1 className="text-4xl">Saved Services</h1>
      <p className="mt-2 mb-6 text-muted">
        Services You Favourited and the Status Of Any Enquiries You Have Sent
      </p>

      {/* Nothing saved yet */}
      {favourites.length === 0 ? (
        <section className="card p-8 text-center">
          <FaRegHeart
            className="mx-auto mb-3 text-3xl text-muted"
            aria-hidden="true"
          />
          <p className="mb-4 text-muted">
            You Have Not Saved Any Services So Far
          </p>
          <Link to="/services" className="btn btn-primary">
            Browse Services
          </Link>
        </section>
      ) : (
        // One panel and on row for each service
        <ul className="card divide-y divide-line">
          {favourites.map((favourite) => (
            <li
              key={favourite.favouriteId}
              className="flex items-center gap-5  px-5 py-4"
            >
              <img
                src={imgSrc(favourite.Service?.image) || fallbackImage}
                alt=""
                className="size-20 shrink-0 object-cover"
              />
              <div className="min-w-0 flex-1">
                <Link
                  to={`/services/${favourite.serviceId}`}
                  className="font-semibold text-ink hover:underline"
                >
                  {favourite.Service?.name}
                </Link>
                <p className="text-sm font-semibold text-link">
                  ${Number(favourite.Service?.fee).toFixed(2)}
                </p>
              </div>
              {/* Status badge and view reply lives here and enquiry button goes here */}
              {() => {
                const enquiry = latestOne(favourite.serviceId);
                if (!enquiry) {
                  return (
                    <Link
                      to={`/services/${favourite.serviceId}`}
                      className="badge border border-line text-link hover:bg-page"
                    >
                      Have an Enquiry?
                    </Link>
                  );
                }
                return enquiry.status === "responded" ? (
                  <Link
                    to="/inbox"
                    className="badge badge-responded hover:brightness-95"
                  >
                    Responded: See Inbox
                  </Link>
                ) : (
                  <span className="badge badge-pending">Pending</span>
                );
              }}

              <button
                type="button"
                className="btn btn-sm btn-ghost text-muted"
                onClick={() => removeFavourite(favourite.serviceId)}
                aria-label={`Remove ${favourite.Service?.name} from saved`}
              >
                Remove
              </button>
            </li>
          ))}
        </ul>
      )}
    </main>
  );
}
