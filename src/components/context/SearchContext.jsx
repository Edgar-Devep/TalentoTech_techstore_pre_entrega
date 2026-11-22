import { createContext, useState } from "react";

export const SearchContext = createContext();

export const SearchProvider = ({ children }) => {
  const [busqueda, setBusqueda] = useState("");

  return (
    <SearchContext.Provider value={{busqueda, setBusqueda}}>
      {children}
    </SearchContext.Provider>
  )
};

export default SearchProvider;