import { createContext, useContext } from "react";

export const rolContext = createContext({});
export const useRol = ()=>useContext(rolContext);