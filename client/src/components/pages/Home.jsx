// Landing Page such as hero key point as pop servcie from db and cta
import { Link } from "react-router-dom";
// banner image URL from admin context
import { useAdmin } from "../../context/AdminContext";
import { FaTools, FaShieldAlt, FaClock, FaDollarSign } from "react-icons/fa";
import heroImage from "../../assets/herocar.jpg";
//  the service list from. garage context
import { useServices } from "../../context/GarageContext";

export default function Home() {
  const { homepageImage: backImage } = useAdmin();
  return (
    // Hero -: banner the background image comes from the admin context

    <div className="space-y-20  ">
      {/* Hero with a photo with dark overlay and white text to make text readble */}
      <section
        className="hero relative left-1/2 w-screen -translate-x-1/2 -my-6 min-h-screen overflow-hidden bg-cover bg-center
 "
        style={{ backgroundImage: `url(${heroImage})` }}
      >
        <div className="hero-overlay bg-neutral/70"></div>
        <div className="hero-content py-16 text-center text-neutral-content">
          <div className="max-w-2xl">
            <header
              className="relative mb-8 flex h-[50vh] items-center justify-center overflow-hidden rounded-lg bg-garage bg-cover bg-center bg-no-repeat"
              style={
                backImage ? { backgroundImage: `url(${backImage})` } : undefined
              }
            >
              {/* dark overlay so white text can be read  on any photo*/}
              <div className="absolute inset-0 bg-black/40"></div>
              <div className="relative px-4 text-center text-white">
                <h1 className="mb-4 text-4xl font-bold drop-shadow-lg md:text-5xl">
                  Bob's Garage
                </h1>
                <p className="mx-auto mb-6 max-w-2xl drop-shadow">
                  Speed Service always with quality care in Mind
                </p>
                <Link to="/services" className="btn-info">
                  Our Services
                </Link>
              </div>
            </header>
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
