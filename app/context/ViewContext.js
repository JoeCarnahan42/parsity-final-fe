"use client";
import React, { createContext, useContext, useState } from "react";

const ToggleViewContext = createContext();

export const ToggleViewProvider = ({ children }) => {
  const [activeView, setActiveView] = useState("Jobs");

  const toggleView = (view) => {
    setActiveView(view);
  };

  return (
    <ToggleViewContext.Provider value={{ activeView, toggleView }}>
      {children}
    </ToggleViewContext.Provider>
  );
};

export const useToggleView = () => useContext(ToggleViewContext);
