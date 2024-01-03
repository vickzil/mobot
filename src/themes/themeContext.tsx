import { ThemeType } from "@/types/themeTypes";
import React, { createContext } from "react";

const ThemeContext = createContext<ThemeType | undefined>(undefined);

export default ThemeContext;
