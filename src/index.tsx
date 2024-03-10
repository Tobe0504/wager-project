import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { BrowserRouter as Router } from "react-router-dom";
import AppContextProvider from "./Context/AppContext";
import { alephzeroTestnet, SubstrateDeployment } from '@scio-labs/use-inkathon'
import { UseInkathonProvider } from '@scio-labs/use-inkathon'
import metadata from "./Metadata/wagerr.json"



const getDeployments = async (): Promise<SubstrateDeployment[]> => {
  return [
    {
      contractId: 'wagerr',
      networkId: alephzeroTestnet.network,
      abi: metadata,
      address: '5DhzLoGLK2vD1S73gB4J5hmhRyucy7GYb4VnnFSfJCZ6YcJ7',
    },
  ]
}


const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);

root.render(
  <Router>
    <React.StrictMode>
    <UseInkathonProvider 
      appName="Wagerr Dapp"
      connectOnInit={true}
      defaultChain={alephzeroTestnet}
      deployments={getDeployments()}>
      <AppContextProvider>
        <App />
      </AppContextProvider>
    </UseInkathonProvider>
    </React.StrictMode>
  </Router>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
