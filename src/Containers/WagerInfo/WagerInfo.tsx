import classes from "./WagerInfo.module.css";
import { wagerList } from "../../Utilities/wagerList";
import Button from "../../Components/Button/Button";

const WagerInfo = () => {
  // Router
  const currentWagerId = new URLSearchParams(window.location.search).get(
    "wager"
  );

  const section = new URLSearchParams(window.location.search).get("section");

  // Utils
  const activeWager = wagerList.find(
    (data) => String(data.id) === currentWagerId
  );
  return (
    <section className={classes.container}>
      <div className={classes.imageSection}>
        <img src={activeWager?.image} alt={activeWager?.title} />
      </div>
      <div className={classes.textSection}>
        <div>
          <span>Title:</span>
          <span>{activeWager?.title}</span>
        </div>

        <div>
          <span>Description:</span>
          <span>{activeWager?.description}</span>
        </div>

        <div>
          <span>User:</span>
          <span>{activeWager?.user}</span>
        </div>

        <div>
          <span>Current bid:</span>
          <span>{activeWager?.currenyBid} ETH</span>
        </div>

        <div className={classes.buttonSection}>
          {section === "wagers-by-you" ? (
            <>
              <Button type="secondary">Take down bid</Button>
              <Button>View bidders</Button>
            </>
          ) : (
            <>
              <Button>Bid for</Button>
              <Button type="secondary">Bid against</Button>{" "}
            </>
          )}
        </div>
      </div>
    </section>
  );
};

export default WagerInfo;