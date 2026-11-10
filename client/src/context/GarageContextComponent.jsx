// File -> client/src/context/GarageContextComponent.jsx
// Author -> Talhah Sanim
// Application Version -> 1.0

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
  GarageSortContext,
  GarageSearchContext,
} from "./GarageContext";

import { useTheme } from "./ThemeContext";

// the base Url for service request in one place means less typos
const serviceURL = "http://localhost:3000/api/services";

// Create the provider to pass the state and event function down to components
// that require them. This is done by wrapping them in the component tree
// in the provider and passing the state and functions as values to provider
export const GarageContextProvider = ({ children }) => {
  // create state variable to hold the serviceList and a function to update it
  const [serviceList, setServiceList] = useState([]);
  // status: loading, succeeded or failed then start loading
  const [status, setStatus] = useState("loading");
  const [error, setError] = useState(null);

  // Text in the search box. "" means no search -> display every service
  const [search, setSearch] = useState("");
  // get all services from the API  -> The search matches, or every service in order the user selected
  const getAllServices = async () => {
    console.log("getAllServices -> GarageContextComponent.jsx", sort);
    // fee-ASC -> field "fee" and direction "ASC"
    const [field, direction] = sort.split("-");

    // Remove spaces at the start and so " " counts as no search
    const text = search.trim();
    // Search text used in search route and then default route or ordered one
    let url = serviceURL;
    if (text) url = `${serviceURL}/s/${encodeURIComponent(text)}`;
    else if (sort !== "default") url = `${serviceURL}/o/${field}/${direction}`;
    try {
      const res = await axios.get(url);
      setServiceList(res.data);
      setStatus("succeeded");
      setError(null);
    } catch (err) {
      console.log(err.message);
      setStatus("failed");
      setError(err.message);
    }
  };

  // sort order comes from the preferences provider
  // Renamed to sort /setSort so file is same
  const { sortOrder: sort, changeSort: setSort } = useTheme();

  // Load the services at start-up and whenever the sort or search changes
  // Wait 300ms after the last key press such as typing oil just sends 1 request
  useEffect(() => {
    const timer = setTimeout(getAllServices, 300);
    return () => clearTimeout(timer);
  }, [sort, search]);
  // get service by its id
  const getServiceById = async (id) => {
    console.log("getServiceById -> GarageContext.jsx", id);
    const found = serviceList.find((service) => service.serviceId === id);
    if (found) return found;
    try {
      const res = await axios.get(`${serviceURL}/edit/${id}`);
      // findByPk sends back nothing if the id doesn't  exist

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
      const res = await axios.put(`${serviceURL}/edit/${id}`, updateService);
      // seRver sendback service saved
      setServiceList((prev) =>
        prev.map((service) => (service.serviceId === id ? res.data : service)),
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

  // Return the providers with the state and functions as values.
  // The children prop is used to render the components wrapped in the providers.
  return (
    <GarageSearchContext.Provider value={{ search, setSearch }}>
      <GarageSortContext.Provider value={{ sort, setSort }}>
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
      </GarageSortContext.Provider>
    </GarageSearchContext.Provider>
  );
};
