//  Import createContext and useContext Hooks from react
import { createContext, useContext } from "react";

// create new contexts using createContext
// These contexts will hold data annd our functions
export const GarageContext = createContext();
export const GarageContextUpdate = createContext();
export const GarageContextDelete = createContext();
export const GarageContextAdd = createContext();
export const GarageContextGetById = createContext();

// create custom hooks to use the context in our components
// this will enable us to access the context values without an import
// useContext and the context itself in every component
export const useServices = () => useContext(GarageContext);
export const useServicesUpdate = () => useContext(GarageContextUpdate);
export const useServicesDelete = () => useContext(GarageContextDelete);
export const useServicesAdd = () => useContext(GarageContextAdd);
export const useGetServiceById = () => useContext(GarageContextGetById);
