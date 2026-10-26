import SingleService from "./SingleService";
// Services show card for every service

// import useServices hook from context
import { useServices } from "../../../context/GarageContext";
export default function Services() {
  // using the useService hook to get the serviceList from context
  const serviceList = useServices();

  return (
    <main>
      <h2 className="mb-4 text-4xl font-semibold text-pink-500">
        Our Services
      </h2>
      <div className=" grid grid-cols-1 justify-items-center gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {/* Utilise serviceList.map to pass through each service in serviceList */}

        {serviceList.map((service) => (
          <SingleService key={service.id} service={service} />
        ))}
      </div>
    </main>
  );
}
