import { useContext } from "react";
import Button from "../../Components/Button/Button";
import Input from "../../Components/Input/Input";
import { AppContext } from "../../Context/AppContext";
import classes from "./Header.module.css";

const Header = () => {
  // Context
  const { listItemRefs } = useContext(AppContext);

  return (
    <section className={classes.container}>
      <div className={classes.searchSection}>
        <Input
          placeholder="Search wagers"
          onFocus={() => {
            listItemRefs.current?.scrollIntoView({
              behavior: "smooth",
              block: "start",
              inline: "center",
            });
          }}
        />
      </div>
      <Button>Select Wallet</Button>
    </section>
  );
};

export default Header;
