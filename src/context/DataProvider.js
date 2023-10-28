import React, { useState, createContext } from "react";

export const DataContext = createContext();

export const DataContextProvider = (props) => {
  const [val, setVal] = useState("");

  return (
    <DataContext.Provider
      value={{
        val: val,
        setVal: setVal
      }}
    >
      {props.children}
    </DataContext.Provider>
  );
};
