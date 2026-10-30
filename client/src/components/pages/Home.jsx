// Landing Page such as hero key point as pop servcie from db and cta
import { Link } from "react-router-dom";
import { FaTools, FaShieldAlt, FaClock, FaDollarSign } from "react-icons/fa";
import heroImage from "../../assets/herocar.jpg";
//  the service list from. garage context
import { useServices } from "../../context/GarageContext";

export default function Home() {
  return (
    <div className="space-y-20  ">
      {/* Hero with a phot with dark overlay and white text to make text readble */}
      <section
        className="hero relative left-1/2 w-screen -translate-x-1/2 -my-6 min-h-screen overflow-hidden bg-cover bg-center
 "
        style={{ backgroundImage: `url(${heroImage})` }}
      >
        <div className="hero-overlay bg-neutral/70"></div>
        <div className="hero-content py-16 text-center text-neutral-content">
          <div className="max-w-2xl">
            <h1 className="mb-4 font-heading text-4xl font-bold tracking-wide uppercase md:text-6xl">
              Speedy Service Always
            </h1>
            <p className="mb-8 text-lg md:text-xl">
              Servicing and repairs and custom jobs mechanics who treat car with
              top care
            </p>
            <div className="flex flex-wrap justify-center gap-3">
              <Link
                to="/services"
                className="btn btn-outline btn-lg border-neutral-content text-neutral-content"
              >
                Our Services
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
