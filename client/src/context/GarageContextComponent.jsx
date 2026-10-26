// Bring in the useState hook from react
import { useState } from "react";

// import the context defined in GarageContext.jsx
import {
  GarageContext,
  GarageContextUpdate,
  GarageContextDelete,
  GarageContextAdd,
  GarageContextGetById,
} from "./GarageContext";

//import data from data file
import { data } from "../data/data.js";

// Creat the provider to pass the state and event function down to components
// that require them. This is done by wraping them in the component tree
// in the provider and passing the state and functions as values to provider
export const GarageContextProvider = ({ children }) => {
  // create state variable to hold the serviceList and a function to update it
  // Our Intial State
  const [serviceList, setServiceList] = useState(data);

  // get service by its id
  const getServiceById = (id) => {
    console.log("getServiceById -> GarageContext.jsx", id);
    return serviceList.find((service) => service.id === id);
  };

  //  Add a Service into Service list
  const addService = (newService) => {
    console.log("addService -> GarageContextComponent.jsx ", newService);
    setServiceList([...serviceList, newService]);
  };

  // Update an existing service from the list
  const updateService = (updatedService) => {
    console.log("updateService -> GarageContextComponent.jsx", updatedService);
    // utilize map function to create a new array with updated service
    const newList = serviceList.map((service) =>
      service.id === updatedService.id ? updatedService : service,
    );
    setServiceList(newList);
  };

  // Delete Service from service list
  const deleteService = (id) => {
    console.log("deleteService -> GarageContextComponent.jsx", id);
    // use filter to create new array without the service that has the matching id
    const newList = serviceList.filter((service) => service.id !== id);
    setServiceList(newList);
  };

  // Returm the providers with the state and functions as values.
  // The children prop is used to render the components wrapped in the providers.
  return (
    <GarageContext.Provider value={serviceList}>
      <GarageContextUpdate.Provider value={updateService}>
        <GarageContextDelete.Provider value={deleteService}>
          <GarageContextAdd.Provider value={addService}>
            <GarageContextGetById.Provider value={getServiceById}>
              {children}
            </GarageContextGetById.Provider>
          </GarageContextAdd.Provider>
        </GarageContextDelete.Provider>
      </GarageContextUpdate.Provider>
    </GarageContext.Provider>
  );
};
