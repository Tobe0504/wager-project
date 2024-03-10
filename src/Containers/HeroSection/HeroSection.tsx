import classes from "./HeroSection.module.css";
import heroImage from "../../Assets/Images/heroimage.svg";
import Button from "../../Components/Button/Button";
import { useContext } from "react";
import { AppContext } from "../../Context/AppContext";
import { useSearchParams } from "react-router-dom";
import Modal from "../../Components/Modal/Modal";
import CreateWagerForm from "../CreateWagerForm/CreateWagerForm";
import { motion } from "framer-motion";
import { useInkathon } from "@scio-labs/use-inkathon";

const containerVaraiants = {
  hidden: {
    opacity: 0,
  },
  visible: {
    opacity: 1,
    transition: {
      duration: 3,
      type: "spring",
    },
  },
};

const imageContainerVariants = {
  hidden: {
    opacity: 0,
    x: 0,
  },
  visible: {
    opacity: 1,
    y: 20,
    transition: {
      delay: 2,
      type: "spring",
    },
  },
};

const HeroSection = () => {
  // Context
  const { listItemRefs } = useContext(AppContext);
  const {
    activeAccount,
  } = useInkathon()

  // Router
  const [, setSearchParams] = useSearchParams();
  const currentSearchParams = new URLSearchParams(window.location.search);
  const showWagerModal = currentSearchParams.get("create-wager");

  return (
    <motion.section
      className={classes.container}
      initial="hidden"
      animate="visible"
    >
      {showWagerModal && (
        <Modal
          onClick={() => {
            currentSearchParams.delete("create-wager");
            setSearchParams(currentSearchParams.toString());
          }}
          body={<CreateWagerForm />}
          style={{width: "40vw", minHeight: "90vh"}}
        />
      )}

      <motion.div className={classes.textSection} variants={containerVaraiants}>
        <h4>Peer-to-Peer Social Betting on Polkadot</h4>
        <p>Wager against friends or anyone, on anything, on the blockchain.</p>
        <div className={classes.buttonSection}>
          {!activeAccount ?   <Button
            onClick={() => {
              currentSearchParams.set("connect-wallet", "true");
              setSearchParams(currentSearchParams.toString());
            }}
          >
            Connect wallet
          </Button> :
          <>
          <Button
            onClick={() => {
              currentSearchParams.set("create-wager", "true");
              setSearchParams(currentSearchParams.toString());
            }}
          >
            Create wager
          </Button>
          <Button
            type="secondary"
            onClick={() => {
              listItemRefs.current?.scrollIntoView({
                behavior: "smooth",
                block: "start",
                inline: "center",
              });
            }}
          >
            View live wagers
          </Button>
          </> 
          }
       
        </div>
      </motion.div>
      <motion.div
        className={classes.imageSection}
        variants={imageContainerVariants}
      >
        <img src={heroImage} alt="Hero " />
      </motion.div>
    </motion.section>
  );
};

export default HeroSection;
