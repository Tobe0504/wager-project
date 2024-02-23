import classes from "./HeroSection.module.css";
import heroImage from "../../Assets/Images/heroimage.svg";
import Button from "../../Components/Button/Button";
import { useContext } from "react";
import { AppContext } from "../../Context/AppContext";
import { useSearchParams } from "react-router-dom";
import Modal from "../../Components/Modal/Modal";
import CreateWagerForm from "../CreateWagerForm/CreateWagerForm";

const HeroSection = () => {
  // Context
  const { listItemRefs } = useContext(AppContext);

  // Router
  const [, setSearchParams] = useSearchParams();
  const currentSearchParams = new URLSearchParams(window.location.search);
  const showWagerModal = currentSearchParams.get("create-wager");

  return (
    <section className={classes.container}>
      {showWagerModal && (
        <Modal
          onClick={() => {
            currentSearchParams.delete("create-wager");
            setSearchParams(currentSearchParams.toString());
          }}
          body={<CreateWagerForm />}
        />
      )}

      <div className={classes.textSection}>
        <h4>Create, Sell & Collect Your Own Creative NFT</h4>
        <p>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc
          vulputate libero et velit.
        </p>
        <div className={classes.buttonSection}>
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
        </div>
      </div>
      <div className={classes.imageSection}>
        <img src={heroImage} alt="Hero " />
      </div>
    </section>
  );
};

export default HeroSection;
