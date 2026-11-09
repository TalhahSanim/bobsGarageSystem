//  Import createContext and useContext Hooks from react
import { createContext, useContext } from "react";

// create new contexts using createContext
// These contexts will hold data annd our functions
export const GarageContext = createContext();
export const GarageContextUpdate = createContext();
export const GarageContextDelete = createContext();
export const GarageContextAdd = createContext();
export const GarageContextGetById = createContext();
export const GarageGetAllContext = createContext();
// holds {status, error} for services list
export const GarageStatusContext = createContext();
// Holds {sort, setSort}-> how the service list ordered
export const GarageSortContext = createContext();
// Holds {search. setSearch} -> the typed text in services search box
export const GarageSearchContext = createContext();

// create custom hooks to use the context in our components
// this will enable us to access the context values without an import
// useContext and the context itself in every component
export const useServices = () => useContext(GarageContext);
export const useServicesUpdate = () => useContext(GarageContextUpdate);
export const useServicesDelete = () => useContext(GarageContextDelete);
export const useServicesAdd = () => useContext(GarageContextAdd);
export const useGetServiceById = () => useContext(GarageContextGetById);
// custom hook: gives a component the getAllServices function
export const useGetAll = () => useContext(GarageGetAllContext);
// custom hook is the list loading , loaded or failed or any other error message
export const useServiceStatus = () => useContext(GarageStatusContext);

// Custom hook -> the current sort (default, fee-ASC) and functions to change it
export const useServicesSort = () => useContext(GarageSortContext);
// Custom hook -> current search text and function to change it
export const useServicesSearch = () => useContext(GarageSearchContext);
