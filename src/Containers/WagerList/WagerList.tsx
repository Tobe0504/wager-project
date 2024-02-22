import SectionHeader from "../../Components/SectionHeader/SectionHeader";
import classes from "./WagerList.module.css";

const WagerList = () => {
  return (
    <section className={classes.container}>
      <SectionHeader
        title="Wagers"
        paragraph="Lorem ipsum dolor sit amet, consectetur adipiscing elit."
      />
    </section>
  );
};

export default WagerList;
