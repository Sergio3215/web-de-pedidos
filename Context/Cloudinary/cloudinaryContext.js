import { createContext, useContext } from "react";

export const cloudinaryContext = createContext({});
export const useCloudinary = ()=>useContext(cloudinaryContext);