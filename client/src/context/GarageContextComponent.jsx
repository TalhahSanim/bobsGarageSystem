// Bring in the useState hook from react
import { useState } from "react";

// import the context defined in GarageContext.jsx
import {
  GarageContext,
  GarageContextUpdate,
  GarageContextDelete,
  GarageContextAdd,
  GarageContextGetById,
  GarageGetAllContext,
} from "./GarageContext";

import axios from "axios";

// Create the provider to pass the state and event function down to components
// that require them. This is done by wraping them in the component tree
// in the provider and passing the state and functions as values to provider
export const GarageContextProvider = ({ children }) => {
  // create state variable to hold the serviceList and a function to update it
  const [serviceList, setServiceList] = useState([]);
  // get service by its id
  const getServiceById = async (id) => {
    console.log("getServiceById -> GarageContext.jsx", id);
    const res = await axios.get(
      `http://localhost:3000/api/services/edit/${id}`,
    );
    console.log("Get Service By ID:", res.data);
    return res.data;
  };

  // Update an existing service from the list
  const updateService = async (updatedService) => {
    console.log("updateService -> GarageContextComponent.jsx", updatedService);
    const id = Number(updateService.serviceId);

    const result = await axios.put(
      `http://localhost:3000/api/services/edit/${id}`,
      updateService,
    );
    if (result) {
      // use map to swap in updated service
      const newList = serviceList.map((service) =>
        service.serviceId === id
          ? {
              serviceId: id,
              name: updatedService.name,
              type: updatedService.type,
              description: updatedService.description,
              image: updatedService.image,
              fee: updatedService.fee,
            }
          : service,
      );
      // save changes to the state
      setServiceList(newList);
    }
  };

  // Delete Service from service list
  const deleteService = async (id) => {
    console.log("deleteService -> GarageContextComponent.jsx", id);
    // send the request to the api
    await axios.delete(`http://localhost:3000/api/services/edit/${id}`);

    // use filter to create new array without the service that has the matching id
    const newList = serviceList.filter((service) => service.serviceId !== id);
    // set the new state
    setServiceList(newList);
  };

  // get all services from the API
  const getAllServices = async () => {
    console.log("getAllServices -> GarageContextComponent.jsx");
    const res = await axios.get("http://localhost:3000/api/services");
    // log our data
    console.log(res.data);
    setServiceList(res.data);
  };

  // Add a new service into the service list
  const addService = async (newService) => {
    console.log("addService -> GarageContextComponent.jsx", newService);
    // send the service to the api
    const res = await axios.post(
      "http://localhost:3000/api/services/add",
      newService,
    );
    // add the saved service with its new serviceId to the service list
    const newList = [...serviceList, res.data];
    // set the new state
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
              <GarageGetAllContext.Provider value={getAllServices}>
                {children}
              </GarageGetAllContext.Provider>
            </GarageContextGetById.Provider>
          </GarageContextAdd.Provider>
        </GarageContextDelete.Provider>
      </GarageContextUpdate.Provider>
    </GarageContext.Provider>
  );
};
