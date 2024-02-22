import classes from "./HeroSection.module.css";
import heroImage from "../../Assets/Images/heroimage.svg";
import Button from "../../Components/Button/Button";

const HeroSection = () => {
  return (
    <section className={classes.container}>
      <div className={classes.textSection}>
        <h4>Create, Sell & Collect Your Own Creative NFT</h4>
        <p>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc
          vulputate libero et velit.
        </p>
        <div className={classes.buttonSection}>
          <Button>Create wager</Button>
          <Button type="secondary">View live wagers</Button>
        </div>
      </div>
      <div className={classes.imageSection}>
        <img src={heroImage} alt="Hero " />
      </div>
    </section>
  );
};

export default HeroSection;