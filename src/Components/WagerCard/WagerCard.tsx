import classes from "./WagerCard.module.css";
import wager1 from "../../Assets/Images/wager1.jpg";
import wager3 from "../../Assets/Images/wager3.jpg";
import Button from "../Button/Button";


type WagerCardProps = {
  creator: string;
  bettor: string;
  name: string;
  image?: string;
  amount: string;
  onClick?: () => void;
};

const WagerCard = ({ creator, bettor, name, amount, onClick }: WagerCardProps) => {
  

  return (
    <div className={classes.container}>
      <h2>{name}</h2>
      <div>
          <span>{amount}</span>
        </div>
      <div className={classes.userSection}>
        <div className={classes.user}>
          <img src={wager1} alt="Wager 1" />
          <span>{creator}</span>
        </div>
        <span> VS </span>
        <div className={classes.user}>
          <img src={wager3} alt="Wager 1" />
          <span>{bettor || "?"}</span>
        </div>

        
      </div>

      <Button onClick={onClick}> View details</Button>
    </div>
  );
};

export default WagerCard;
