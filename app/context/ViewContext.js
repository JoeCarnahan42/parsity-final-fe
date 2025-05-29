"use client";
import React, { createContext, useContext, useState } from "react";

const ToggleViewContext = createContext();

export const ToggleViewProvider = ({ children }) => {
  const [activeView, setActiveView] = useState("Builds");

  return (
    <ToggleViewContext.Provider value={{ activeView, setActiveView }}>
      {children}
    </ToggleViewContext.Provider>
  );
};

export const useToggleView = () => useContext(ToggleViewContext);
