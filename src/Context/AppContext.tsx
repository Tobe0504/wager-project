import React, { createContext, MutableRefObject, useRef } from "react";

type AppContextValues = {
  listItemRefs: MutableRefObject<HTMLDivElement | null>;
};
type AppContextProviderProps = { children: React.ReactNode };

export const AppContext = createContext({} as AppContextValues);

const AppContextProvider = ({ children }: AppContextProviderProps) => {
  // Refs
  const listItemRefs = useRef<HTMLDivElement | null>(null);

  return (
    <AppContext.Provider value={{ listItemRefs }}>
      {children}
    </AppContext.Provider>
  );
};

export default AppContextProvider;
