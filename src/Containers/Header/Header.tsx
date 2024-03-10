// import { useContext } from "react";
import { useSearchParams } from "react-router-dom";
import { motion } from "framer-motion";
import Button from "../../Components/Button/Button";
import Modal from "../../Components/Modal/Modal";
import ConnectWallet from "../../Components/ConnectWallet/ConnectWallet";
// import Input from "../../Components/Input/Input";
// import { AppContext } from "../../Context/AppContext";
import classes from "./Header.module.css";
import {
  useInkathon,
} from '@scio-labs/use-inkathon'

const Header = () => {
  // Context
  // const { listItemRefs } = useContext(AppContext);

  const {
    disconnect,
    activeAccount,
  } = useInkathon()
  // Router
  const [, setSearchParams] = useSearchParams();
  const currentSearchParams = new URLSearchParams(window.location.search);
  const showWalletConnectModal = currentSearchParams.get("connect-wallet");

  
  if (!activeAccount)
    return (
      <motion.section
        className={classes.container}
        initial="hidden"
        animate="visible"
      >
        {showWalletConnectModal && (
          <Modal
            onClick={() => {
              currentSearchParams.delete("connect-wallet");
              setSearchParams(currentSearchParams.toString());
            }}
            body={<ConnectWallet />}
          style={{width: "40vw", overflowY: "auto", height: "80vh"}}

          />
        )}
        <div>
          <Button onClick={() => {
              currentSearchParams.set("connect-wallet", "true");
              setSearchParams(currentSearchParams.toString());
            }}>
              Connect Wallet
          </Button> 
        </div>
       
      </motion.section>
 
    );
  return (
      <div className={classes.container}>
          <div>
          <Button onClick={() => disconnect?.()}>
                  Disconnect  
          </Button>
          </div>
      
      </div>
  )
};

export default Header;
