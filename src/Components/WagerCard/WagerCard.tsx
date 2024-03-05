import classes from "./WagerCard.module.css";
import wager1 from "../../Assets/Images/wager1.jpg";
import Button from "../Button/Button";


type WagerCardProps = {
  user: string;
  title: string;
  bid: string;
  image?: string;
  onClick?: () => void;
};

const WagerCard = ({ user, title, bid, image, onClick }: WagerCardProps) => {
  

  return (
    <div className={classes.container}>
      <img src={image || wager1} alt="Wager 1" />
      <div className={classes.textSection}>
        <div>
          <span>{user}</span>
          <span>{title}</span>
        </div>

        <div>
          <span>Current Bid</span>
          <span>{bid} ETH</span>
        </div>
      </div>

      <Button onClick={onClick}> View details</Button>
    </div>
  );
};

export default WagerCard;
