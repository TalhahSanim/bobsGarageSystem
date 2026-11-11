// File -> client/src/components/pages/Home.jsx
// Author -> Talhah Sanim
// Application Version -> 1.0

// Landing Page -> full screen hero then four key services
import { Link } from "react-router-dom";
import { useServices } from "../../context/GarageContext";
import SingleService from "./services/SingleService";
import heroImage from "../../assets/hero-image.webp";
export default function Home() {
  // Admin Selected image or own car image
  const serviceList = useServices();
  const trend = serviceList.slice(0, 4);
  return (
    <>
      {/* mt removes main's top padding so it enables picture to touch header */}
      <section
        className="full-screen -mt-10 bg-cover bg-center"
        style={{ backgroundImage: `url(${heroImage})` }}
      >
        <title>Home - Bob's Garage</title>

        {/* create the tint -> dark on left and red on right to enable white text to be readable */}
        <div className="bg-linear-135 from-hero-red/35 via-hero/85 to-primary/30">
          <div className="mx-auto flex min-h-140 max-w-3xl flex-col items-center justify-center gap-5 px-4 py-20 text-center text-white">
            <h1 className="text-5xl md:text-6xl">
              Speedy Service, Top Notch Quality
            </h1>
            <p className="text-lg text-white/90 md:text-xl">
              Enquire Now & Get Quality Service Today!!
            </p>
            <Link to="/services" className="btn btn-primary btn-lg mt-2">
              Explore Services
            </Link>
          </div>
        </div>
      </section>
      {/* Latest Trends on Service use */}
      <section className="pt-14">
        <div className="mb-6 flex items-end justify-between gap-4">
          <h2 className="text-3xl">Trendy Services</h2>
          <Link
            to="/services"
            className="text-link btn btn-info hover:underline"
          >
            View Our Services →
          </Link>
        </div>
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {trend.map((service) => (
            <SingleService key={service.serviceId} service={service} />
          ))}
        </div>
      </section>
    </>
  );
}
