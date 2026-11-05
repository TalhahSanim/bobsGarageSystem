// File -> client/src/components/pages/services/ServiceDetails.jsx
// One services details page with an i'm interested favourite button

import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import axios from "axios";
import { FaHeart, FaRegHeart, FaArrowLeft } from "react-icons/fa";
import { useAuth } from "../../../context/AuthContext";
import { useFavourites } from "../../../context/FavouritesContext";

// Service Details Component which reads the id from the URL and loads that service

export default function ServiceDetails() {
  // URL params are sttrings but serviceId is a number
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
          `http://localhost:3000/api/services/edit/${serviceId}`,
        );
        // findByPk sends back nothhing if the id doesnt exist
        if (res.data) {
          setService(res.data);
          setStatus("succeeded");
        } else {
          setStatus("notfound");
        }
      } catch (err) {
        console.log("loadService failed", err.message);
        setStatus("failed");
      }
    };
    loadService();
  }, [serviceId]);

  const favourite = isFavourite(serviceId);

  //   Runs when i'm interested is clicked
  const handleInterested = async () => {
    try {
      const msg = await addFavourite(serviceId);
      setMessage(msg);
    } catch (err) {
      console.log("addFavourite failed", err.message);
      setMessage("Apologies, something went wrong. Please try again.");
    }
  };

  //   RUns when remove from favourites is clicked
  const handleRemove = async () => {
    await removeFavourite(serviceId);
    setMessage("");
  };

  if (status === "loading") {
    return (
      <p className="flex-items-center gap-3-text-muted">
        <span className="spinner" aria-hidden="true"></span> Loading....
      </p>
    );
  }
  if (status === "notfound" || status === "failed") {
    return (
      <section className="alert-danger mt-6">
        <h2 className="text-xl font-semibold">
          {status === "notfound"
            ? "No service found!"
            : "Could'nt laod this service"}
        </h2>
        <Link to="services" className="mt-2 inline-block underline">
          Back to all services
        </Link>
      </section>
    );
  }
  return (
    <main className="my-6">
      <title>{service.name} - Bob's Garage</title>
      <Link
        to="/services"
        className="mb-4 inline-flex items-center gap-2 hover:underline"
      >
        <FaArrowLeft /> All Services
      </Link>

      {/* Two columns on wider screens image and details */}
      <div className="grid gap-8 md:grid-cols-2">
        <img
          src={service.image}
          alt={service.name}
          className="aspect-square w-full object-cover shadow-md"
        />
        <div>
          <h1 className="mb-2 text-4xl font-bold">{service.name}</h1>
          <p className="mb-4 text-2xl font-semibold text-link">{service.fee}</p>
          <p className="mb-6 leading-relaxed">{service.type}</p>
          <p className="mb-6 leading-relaxed">{service.description}</p>

          {/* For guest ask them to login and user is interested  or remove */}
          {!isAuth ? (
            <p>
              <Link to="/login" className="link-pill">
                Log in
              </Link>
              to let us know you're interested in this service
            </p>
          ) : favourite ? (
            <div className="grid gap-3">
              <p className="alert-success flex items-center gap-2">
                <FaHeart /> This service is in your favourites. We'll be in
                touch soon
              </p>
              <button
                type="button"
                className="btn-warning"
                onClick={handleRemove}
              >
                <FaRegHeart /> Remove from favourites
              </button>
            </div>
          ) : (
            <button
              type="button"
              className="btn-inf w-full py-3 text-lg "
              onClick={handleInterested}
            >
              <FaHeart /> I'm interested
            </button>
          )}

          {/* Thank You message from the server */}
          {message && (
            <p className="alert-success mt-4" role="status">
              {message}
            </p>
          )}
        </div>
      </div>
    </main>
  );
}
