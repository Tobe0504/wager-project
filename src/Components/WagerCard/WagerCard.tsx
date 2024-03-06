import classes from "./WagerCard.module.css";
import wager1 from "../../Assets/Images/wager1.jpg";
import wager3 from "../../Assets/Images/wager3.jpg";


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

      <div className={classes.imageSection}>
      <img src={wager1} alt="Wager 1" />
      {bettor ? <img src={wager3} alt="Wager 1" />: 
      <div className={classes.noBettor}>?</div>}

      </div>
      <h2 className={classes.nameSection}>{name}</h2>
      <div className={classes.amount}>
          <span> {amount}</span>
        </div>
      <div className={classes.userSection}>
        <div className={classes.user}>
        </div>
    

        
      </div>

      {/* <Button onClick={onClick}> View details</Button> */}
    </div>
  );
};

export default WagerCard;
