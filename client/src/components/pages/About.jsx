// About -> which describes information about team, business and any other key business facts
import bobPhoto from "../../assets/staff/bob.jpg";
import alicePhoto from "../../assets/staff/alice.jpg";
import jamesPhoto from "../../assets/staff/james.jpg";
import timPhoto from "../../assets/staff/tim.jpg";

import garageVideo from "../../assets/video-bob-about.mp4";
export default function About() {
  return (
    <>
      <section className="full-screen relative -mt-10 mb-12 overflow-hidden">
        {/* Page Header */}

        {/* Muted to let it autoplay and loop along with controls to pause it */}
        <video
          src={garageVideo}
          className="absolute inset-0 h-full w-full object-cover"
          autoPlay
          muted
          loop
          playsInline
          aria-label="A ligght blue spors car drifting in a race strack next to dark sports car"
        />
        {/* Video tint to make white text readble */}
        <div className="absolute inset-0  bg-page/35" />
        {/* Text on top -> relative makes it above absolute video and the tinting */}
        <div className="relative mx-auto flex min-h-120 max-w-6xl flex-col items-start gap-4 px-4 py-20  ">
          {" "}
          <h1 className="text-6xl drop-shadow-6xl">About Bob's Garage</h1>
          <p className="mt-2 font-semibold text-2xl drop-shadow-2xl">
            Bob's Garage is quality workshop with fixed fees, top quality
            mechanics and No Gothas: Meet the team taking care of your vehicle
            needs.
          </p>
        </div>
      </section>
      <section>
        {/* Our team -> Photo next to quote on desktop and on top on mobiles */}
        <h2 className="mb-4 text-3xl">Our Team</h2>
        <ul className="mb-12 flex flex-col gap-4">
          <li className="card flex flex-col md:flex-row">
            <img
              src={bobPhoto}
              alt="Bob Horizon , owner of this garage workshop  and the head mechanic"
              className="h-48 w-full object-cover md:h-auto md:w-72 md:shrink-0"
            />
            <div className="flex flex-1 flex-col justify-between gap-4 p-6 md:p-8">
              <blockquote className="text-lg italic">
                I have opened this facility to hand to a public a garage worthy
                of offering the day person quality vehicle service boosting our
                local community growth
              </blockquote>
              <p className="text-right">
                <span className="block font-semibold">Bob Horizons</span>
                <span className="text-sm text-link">
                  Founder of{" "}
                  <strong className="font-extrabold">Bob's Garage</strong> &amp;
                  Head Mechnaic
                </span>
              </p>
            </div>
          </li>

          {/* md:flex-row reveser puts alice on the right */}
          <li className="card flex flex-col md:flex-row-reverse">
            <img
              src={alicePhoto}
              alt="Alice Green, at the front desk"
              className="h-48 w-full object-cover md:h-auto md:w-72 md:shrink-0"
            />
            <div className="flex flex-1 flex-col justify-between gap-4 p-6 md:p-8">
              <blockquote className="text-lg italic">
                "I book you service, answer enquries and ensure you're heard"
              </blockquote>
              <p>
                <span className="block font-semibold">Alice Green</span>
                <span className="text-sm text-link">
                  Receptionist &amp; Office
                </span>
              </p>
            </div>
          </li>
        </ul>

        {/* Our mechanics -> One colum on mobile & 2 from md */}
        <h2 className="mb-4 text-3xl">Our Mechanics</h2>
        <ul className="mb-12 grid gap-6 md:grid-cols-2">
          <li className="card">
            <img
              src={jamesPhoto}
              alt="James Sprint, a mechanic during quality vehicle repair"
              className="h-48 w-full object-cover object-top"
            />
            <div className="p-6">
              <h3 className="text-lg font-semibold">James Sprint</h3>
              <p className="text-sm text-link">Mechanic</p>
              <p className="mt-2">
                Expertise on tyres, brakes, and wheel customiusation and
                alignment with 8 years on job experience
              </p>
            </div>
          </li>

          <li className="card">
            <img
              src={timPhoto}
              alt="Tim Blu , mechanic fixing engine"
              className="h-48 w-full object-cover"
            />
            <div className="p-6">
              <h3 className="text-lg font-semibold">Tim Blu</h3>
              <p className="text-sm text-link">Mechanic</p>
              <p className="mt-2">
                Expert on diagnostics, servicing and air conditioner maintenence
                and enjoy troubleshooting complex vehicle issues
              </p>
            </div>
          </li>
        </ul>

        {/* Bobs Vision */}
        <div className="bg-linear-to-r from-footer to-footer-end px-6 py-10 text-center text-on-footer md:px-20">
          <h2 className="text-3xl">Bob's Vision</h2>
          <blockquote className="mx-auto mt-3 max-w-3xl text-xl font-medium italic">
            "Ensure each vehicle is on road with saftey approved and descrribe
            repairs in simple terms and principle never charge work you did not
            require"
          </blockquote>
        </div>
      </section>
    </>
  );
}
