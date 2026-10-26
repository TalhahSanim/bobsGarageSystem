// import useEffect
import { useEffect } from "react";
import SingleService from "./SingleService";
// Services show card for every service

// import useServices hook from context
import { useServices, useGetAll } from "../../../context/GarageContext";
export default function Services() {
  // using the useService hook to get the serviceList from context
  const serviceList = useServices();
  // using the useGetAll ()
  const getAll = useGetAll();
  console.log(serviceList);

  // useEffect to get th services from the server
  useEffect(() => {
    getAll();
  }, []);

  return (
    <main>
      <h2 className="mb-4 text-4xl font-semibold text-pink-500">
        Our Services
      </h2>
      {/* Show message if no services or show the grid */}
      {serviceList.length === 0 ? (
        <p className="rounded-lg border border-dashed border-gray-300 p-8 text-center text-gray-500">
          No Services yet. Add one with{" "}
          <span className="font-semibold">Add Service</span>
        </p>
      ) : (
        <div className=" grid grid-cols-1 justify-items-center gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {/* Utilise serviceList.map to pass through each service in serviceList */}

          {serviceList.map((service) => (
            <SingleService key={service.serviceId} service={service} />
          ))}
        </div>
      )}
    </main>
  );
}
