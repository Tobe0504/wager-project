import classes from "./CreateWagerForm.module.css";
import createWager from "../../Assets/Images/createWager.jpg";
import Button from "../../Components/Button/Button";
import Input from "../../Components/Input/Input";

const CreateWagerForm = () => {
  return (
    <div className={classes.container}>
      <div className={classes.imageSection}>
        <img src={createWager} alt="Create Wager" />
      </div>
      <div className={classes.textSection}>
        <div>
          <h4>Create Wager</h4>
          <p>Lets bet about something they don't see coming</p>
        </div>
        <div>
          <span>Title:</span>
          <span>
            <Input placeholder="I love wagers" />
          </span>
        </div>

        <div>
          <span>Description:</span>
          <span>
            <Input placeholder="I am betting wagers are the best" />
          </span>
        </div>

        <div>
          <span>Wager bid:</span>
          <span>
            <Input />
          </span>
        </div>

        <div className={classes.buttonSection}>
          <Button>Create wager</Button>
        </div>
      </div>
    </div>
  );
};

export default CreateWagerForm;
