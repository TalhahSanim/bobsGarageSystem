// Landing Page such as hero key point as pop servcie from db and cta
import { Link } from "react-router-dom";
// banner image URL from admin context
import { useAdmin } from "../../context/AdminContext";
import heroImage from "../../assets/herocar.jpg";

export default function Home() {
  const { homepageImage: backImage } = useAdmin();
  return (
    <div className="space-y-20">
      <section
        className="hero relative left-1/2 -my-6 min-h-screen w-screen -translate-x-1/2 overflow-x-hidden bg-cover bg-center"
        style={{ backgroundImage: `url(${heroImage})` }}
      >
        <div className="hero-overlay bg-neutral/70"></div>
        <div className="hero-content py-16 text-center text-neutral-content">
          <div className="max-w-2xl">
            <h1 className="mb-4 text-4xl font-bold drop-shadow lg md:text-5xl">
              Bob's Garage
            </h1>
            <p className="mb-6 drop-shadow">
              Speedy Service with top notch quality care
            </p>
            <Link to="/services" className="btn btn-primary btn-lg">
              Our Services
            </Link>
          </div>
        </div>
      </section>
      {/* Hero with a photo with dark overlay and white text to make text readble */}
      <section className="relative overflow-x-hidden rounded-box shadow-md">
        <img
          src={backImage}
          alt=""
          className="h-64 w-full object-cover md:h-80"
        />
        {/* dark gradient enable text to be readble  */}
        <div className="absolute inset-0 bg-linear-to-r from-neutral/80 to-transparent"></div>
        <div className="absolute inset-0 flex flex-col justify-center gap-3 p-8 text-neutral-content"></div>
        <div className="hero-overlay bg-neutral/70"></div>
        <div className="hero-content py-16 text-center text-neutral-content">
          <div className="max-w-2xl">
            <h1 className="mb-4 text-4xl font-bold drop-shadow-lg md:text-5xl">
              Bob's Garage
            </h1>
            <p className="mx-auto mb-6 max-w-2xl drop-shadow">
              Speed Service always with quality care in Mind
            </p>
            <Link to="/services" className="btn btn-primary btn-lg">
              Our Services
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
