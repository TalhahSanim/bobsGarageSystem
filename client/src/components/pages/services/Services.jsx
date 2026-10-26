// import useEffect
import SingleService from "./SingleService";
// Services show card for every service

// import useServices hook from context
import { useServices, useServiceStatus } from "../../../context/GarageContext";
export default function Services() {
  // using the useService hook to get the serviceList from context
  const serviceList = useServices();
  const { status, error } = useServiceStatus();

  // variable to hold markup for the component
  let content;
  if (status === "loading") {
    //when still loading load a spinner
    content = (
      <p className="flex items-center gap-3 text-gray-600">
        <span className="spinner" aria-hidden="true"></span> Loading ...
      </p>
    );
  } else if (status === "failed") {
    // something gone amiss display error
    content = (
      <div className="alert-danger">
        <p>Sorry we could not load service at this time</p>
        <p>{error}</p>
      </div>
    );
  } else if (serviceList.length === 0) {
    // Loaded but no services at the moment
    content = (
      <p className="rounded-none border border-dashed border-gray-300 p-8 text-center text-gray-500">
        No Services Yet. Add one with{" "}
        <span className="font-semibold">Add Service</span>
      </p>
    );
  } else {
    // Loaded one card per service
    content = (
      <div className="grid grid-cols-1 justify-items-center gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {serviceList.map((service) => (
          <SingleService key={service.serviceId} service={service} />
        ))}
      </div>
    );
  }

  return (
    <main>
      <h2 className="mb-4 text-4xl font-semibold text-pink-500">
        Bob's Garage
      </h2>
      {/* Show  spinner,an error, an empty message or cards*/}
      {content}
    </main>
  );
}
