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
      // <section className={classes.container}>
      //   <div className={classes.searchSection}>
      //     <Input
      //       placeholder="Search wagers"
      //       onFocus={() => {
      //         listItemRefs.current?.scrollIntoView({
      //           behavior: "smooth",
      //           block: "start",
      //           inline: "center",
      //         });
      //       }}
      //     />
      //   </div>
      //   {/* <ConnectWallet></ConnectWallet> */}
      
      //   <Button>
      //     Connect Wallet
      //    </Button>
      // </section>
    );
  return (
      <div className="flex select-none flex-wrap items-stretch justify-center gap-4">
          {/* Disconnect Button */}
          <Button onClick={() => disconnect?.()}>
                  Disconnect  
          </Button>
     
      
      </div>
  )
};

export default Header;
