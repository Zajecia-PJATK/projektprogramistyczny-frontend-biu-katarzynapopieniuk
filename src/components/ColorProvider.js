import React, {createContext, useContext, useState} from "react";
import colorData from "../config/productColors.json";

const ColorContext = createContext();

export const useProductColors = () => useContext(ColorContext);

export default function ColorProvider ({ children }) {
    const [colors, setColors] = useState(colorData);
    return (
        <ColorContext.Provider value={{ colors, setColors }}>
            {children}
        </ColorContext.Provider>
    );
};