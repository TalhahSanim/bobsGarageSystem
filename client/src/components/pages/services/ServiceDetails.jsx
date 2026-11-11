// File -> client/src/components/pages/services/ServiceDetails.jsx
// Author -> Talhah Sanim
// Application Version -> 1.0
// One services details page with an i'm interested and favourite button

import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import axios from "axios";
import { FaHeart, FaRegHeart } from "react-icons/fa";
import { useAuth } from "../../../context/AuthContext";
import { useFavourites } from "../../../context/FavouritesContext";

import EnquiryForm from "./EnquiryForm";

import fallbackImage from "../../../assets/hero-image.webp";

import { imgSrc } from "../../../utils/imgSrc";
import { API_URL } from "../../../utils/api";

// Service Details Component which reads the id from the URL and loads that service

export default function ServiceDetails() {
  // URL params are strings but serviceId is a number
  const { id } = useParams();
  const serviceId = Number(id);

  const { isAuth } = useAuth();
  const { isFavourite, addFavourite, removeFavourite } = useFavourites();

  const [service, setService] = useState(null);
  const [status, setStatus] = useState("loading"); // loading, successful,notfound,failed
  const [message, setMessage] = useState("");

  //   Load this service from the API whenever the id in the URL Changes
  useEffect(() => {
    // Get one service
    const loadService = async () => {
      try {
        const res = await axios.get(
          `${API_URL}/services/edit/${serviceId}`,
        );
        // findByPk sends back nothing if the id doesn't exist
        if (res.data) {
          setService(res.data);
          setStatus("succeeded");
        } else {
          setStatus("notfound");
        }
      } catch (err) {
        console.log("loadService failed", err.message);
        setStatus(err.response?.status === 404 ? "notfound" : "failed");
      }
    };
    loadService();
  }, [serviceId]);

  const favourite = isFavourite(serviceId);

  //   Runs when i'm interested is clicked
  const handleFavourite = async () => {
    try {
      const msg = await addFavourite(serviceId);
      setMessage(msg);
    } catch (err) {
      console.log("addFavourite failed", err.message);
      setMessage("Something Went Wrong, Please Try Again");
    }
  };

  //   RUns when remove from favourites is clicked
  const handleRemove = async () => {
    await removeFavourite(serviceId);
    setMessage("");
  };

  if (status === "loading") {
    return (
      <p className="flex items-center gap-3 text-muted">
        <span className="spinner" aria-hidden="true"></span> Loading....
      </p>
    );
  }
  if (status === "notfound" || status === "failed") {
    return (
      <section className="alert-danger mt-6">
        <h2 className="text-xl font-semibold">
          {status === "notfound"
            ? "No Service found!"
            : "Could Not Load This Service"}
        </h2>
        <Link to="/services" className="mt-2 inline-block underline">
          Back to all services
        </Link>
      </section>
    );
  }
  return (
    <section className="my-6">
      <title>{`${service.name} - Bob's Garage`}</title>

      {/* BreadCrumb */}
      <nav aria-label="Breadcrumb" className="mb-6 text-sm text-muted">
        <Link to="/services" className="hover:underline">
          Services
        </Link>{" "}
        / <span aria-current="page">{service.name}</span>
      </nav>

      {/* Photo on left and details to the right */}
      <div className="grid gap-14  md:grid-cols-2 ">
        <img
          src={imgSrc(service.image) || fallbackImage}
          alt={service.name}
          className="aspect-31/25 w-full object-cover shadow-md border-8 border-footer "
        />
        <div>
          <h1 className="mb-3 text-4xl">{service.name}</h1>
          <p className="mb-4 text-2xl font-semibold text-link">
            ${Number(service.fee).toFixed(2)}
          </p>
          <p className="mb-6 leading-relaxed font-semibold text-muted">
            {service.type}
          </p>
          <p className="mb-6 leading-relaxed text-muted">
            {service.description}
          </p>

          {/* Guests are asked to login and logged in users can favourite or unfavourite */}
          {!isAuth ? (
            <p>
              <Link to="/login" className="link-pill">
                Login
              </Link>
              to favourite this service.
            </p>
          ) : (
            <div className="flex flex-wrap items-center gap-3">
              <button
                type="button"
                className="btn btn-ghost text-link"
                aria-pressed={favourite}
                onClick={favourite ? handleRemove : handleFavourite}
              >
                {favourite ? <FaHeart /> : <FaRegHeart />}
                {favourite ? "Favourited" : "I'm Interested"}
              </button>
            </div>
          )}

          {/* Thank You message from the server */}
          {message && (
            <p className="mt-3 text-sm text-success-text" role="status">
              {message}
            </p>
          )}
          {/* Logged  users can enquire about the server */}
          {isAuth && <EnquiryForm service={service} />}
        </div>
      </div>
    </section>
  );
}
