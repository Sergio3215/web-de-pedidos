import { createContext, useContext } from "react";

export const settingContext = createContext({});
export const useSettings = ()=>useContext(settingContext);