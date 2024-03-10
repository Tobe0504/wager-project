import React, { createContext, MutableRefObject, useRef, useState } from "react";
import {
  contractQuery,
  decodeOutput,
  useInkathon,
  useRegisteredContract,
} from '@scio-labs/use-inkathon'

type AppContextValues = {
  listItemRefs: MutableRefObject<HTMLDivElement | null>;
  getWager: (id: string) => void; 
  getActiveWagers: () => void; 
  getPendingWagers:  () => void; 
  pendingWagers: any[]; 
  activeWagers: any[]; 
  fetchWagers: () => void; 
};
type AppContextProviderProps = { children: React.ReactNode };

export const AppContext = createContext({} as AppContextValues);

const AppContextProvider = ({ children }: AppContextProviderProps) => {
  // Refs
  const listItemRefs = useRef<HTMLDivElement | null>(null);

  // 
  const { api, activeAccount } = useInkathon()
  const { contract } = useRegisteredContract("wagerr")

  // States
  const [pendingWagers, setPendingWagers] = useState([]);
  const [activeWagers, setActiveWagers] = useState([]);


  // Functions
  const getWager = async (id: string) => {
    if (!contract || !api) return
    if (!activeAccount) { return }
    // setFetchIsLoading(true)
    try {
    
        const result = await contractQuery(api, activeAccount.address, contract, 'getWager', {}, [id])
        const { output, isError, decodedOutput } = decodeOutput(result, contract, 'getWager')
        if (isError) throw new Error(decodedOutput)
        return output
        
    } catch (e) {
        return e
    } finally {
        // setFetchIsLoading(false)
    }
}


const getActiveWagers = async () => {
  if (!contract || !api) return
  if (!activeAccount) { return }
  // setFetchIsLoading(true)
  try {
  
    const result = await contractQuery(api, activeAccount.address, contract, 'getActiveWagers')
    const { output, isError, decodedOutput } = decodeOutput(result, contract, 'getActiveWagers')
    if (isError) throw new Error(decodedOutput)
    console.log('decoded', decodedOutput)
    return output
    
  } catch (e) {
    console.error(e)
    // toast.error('Error while fetching greeting. Try again…')
  } finally {
    // setFetchIsLoading(false)
  }
}

const getPendingWagers = async () => {
  if (!contract || !api) return
  if (!activeAccount) { return }
  // setFetchIsLoading(true)

  try {
    
    const result = await contractQuery(api, activeAccount.address, contract, 'getPendingWagers')
    const { output, isError, decodedOutput } = decodeOutput(result, contract, 'getPendingWagers')
    if (isError) throw new Error(decodedOutput)

    console.log('decoded', decodedOutput)
    return output
    
  } catch (e) {
    console.error(e)
    // toast.error('Error while fetching greeting. Try again…')

  } finally {
    // setFetchIsLoading(false)
  }
}

const fetchWagers = async () => {
  try {
    const activeWagersResult = await getActiveWagers();
    setActiveWagers(activeWagersResult);
    
    const pendingWagersResult = await getPendingWagers();
    setPendingWagers(pendingWagersResult);
  } catch (error) {
    console.error(error);
  }
};


  return (
    <AppContext.Provider value={{ listItemRefs, getWager, getActiveWagers, getPendingWagers , pendingWagers, activeWagers, fetchWagers}}>
      {children}
    </AppContext.Provider>
  );
};

export default AppContextProvider;
