import { createContext, useContext } from "react";

export const productContext = createContext({});
export const useProduct = ()=>useContext(productContext);