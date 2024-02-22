import Button from "../../Components/Button/Button";
import Input from "../../Components/Input/Input";
import classes from "./Header.module.css";

const Header = () => {
  return (
    <section className={classes.container}>
      <div className={classes.searchSection}>
        <Input placeholder="Search wagers" />
      </div>
      <Button>Select Wallet</Button>
    </section>
  );
};

export default Header;
