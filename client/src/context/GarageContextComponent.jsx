// Bring in the useState hook from react
import { useState, useEffect } from "react";

import axios from "axios";
// import the context defined in GarageContext.jsx
import {
  GarageContext,
  GarageContextUpdate,
  GarageContextDelete,
  GarageContextAdd,
  GarageContextGetById,
  GarageGetAllContext,
  GarageStatusContext,
} from "./GarageContext";

// the base Url for service request as onplace equates to less typos
const serviceURL = "http://localhost:3000/api/services";

// Create the provider to pass the state and event function down to components
// that require them. This is done by wraping them in the component tree
// in the provider and passing the state and functions as values to provider
export const GarageContextProvider = ({ children }) => {
  // create state variable to hold the serviceList and a function to update it
  const [serviceList, setServiceList] = useState([]);
  // status: loading, sucess or failed then start loading
  const [status, setStatus] = useState("loading");
  const [error, setError] = useState(null);
  // get all services from the API
  const getAllServices = async () => {
    console.log("getAllServices -> GarageContextComponent.jsx");
    try {
      const res = await axios.get(serviceURL);
      setServiceList(res.data);
      setStatus("sucess");
      setError(null);
    } catch (err) {
      console.log(err.message);
      setStatus("Failed");
      setError(err.message);
    }
  };

  // Load the services once when application begins
  useEffect(() => {
    getAllServices();
  }, []);
  // get service by its id
  const getServiceById = async (id) => {
    console.log("getServiceById -> GarageContext.jsx", id);
    const found = serviceList.find((service) => service.serviceId === id);
    if (found) return found;
    try {
      const res = await axios.get(`${serviceURL}/edit/${id}`);
      //! findByPk sends back norhing id the id doesnt even exist

      return res.data || null;
    } catch (err) {
      console.log(err.message);
      return null;
    }
  };
  // Add a new service which takes in new service
  // returns true if it saved and false if it did not to let the form know to leave page or not
  const addService = async (newService) => {
    console.log("addService -> GarageContextComponent.jsx", newService);
    try {
      // send the service to the api
      const res = await axios.post(`${serviceURL}/add`, newService);
      // add the saved service with serviceId to end of list
      setServiceList((prev) => [...prev, res.data]);
      return true;
    } catch (err) {
      console.log(err.message);
      setError(err.message);
      return false;
    }
  };

  // Update an existing service takes in updated service with serviceId
  // returns true if it is saved and false if not

  const updateService = async (updateService) => {
    console.log("updateService -> GarageContextComponent.jsx", updateService);
    const id = Number(updateService.serviceId);
    try {
      const res = await axios.put(
        `${serviceURL}/edit/${id}`,
        updateService,
        // sever sendback service saved
        setServiceList((prev) =>
          prev.map((service) =>
            service.serviceId === id ? res.data : service,
          ),
        ),
      );
      return true;
    } catch (err) {
      console.log(err.message);
      setError(err.message);
      return false;
    }
  };

  // Delete Service which takes in its serviceId and returns true when deleted
  const deleteService = async (id) => {
    console.log("deleteService -> GarageContextComponent.jsx", id);
    try {
      // send the request to the api
      await axios.delete(`${serviceURL}/edit/${id}`);
      setServiceList((prev) =>
        prev.filter((service) => service.serviceId !== id),
      );
      return true;
    } catch (err) {
      console.log(err.message);
      setError(err.message);
      return false;
    }
  };

  // Returm the providers with the state and functions as values.
  // The children prop is used to render the components wrapped in the providers.
  return (
    <GarageContext.Provider value={serviceList}>
      <GarageStatusContext.Provider value={{ status, error }}>
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
      </GarageStatusContext.Provider>
    </GarageContext.Provider>
  );
};
