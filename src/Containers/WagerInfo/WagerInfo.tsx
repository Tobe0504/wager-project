import { useContext, useState, useEffect } from "react";
import {
  // contractTx,
  useInkathon,
  useRegisteredContract,
} from '@scio-labs/use-inkathon';
import classes from "./WagerInfo.module.css";
import { AppContext } from "../../Context/AppContext";

const WagerInfo = () => {
  // Router
  const { api, activeAccount } = useInkathon()
  const { contract } = useRegisteredContract("wagerr")
  const id = new URLSearchParams(window.location.search).get(
    "wager"
  ) || "";
  const { getWager } = useContext(AppContext)
  const [ wager, setWager] = useState({});

  useEffect(() => {
      if (!contract || !api) return
      if (!activeAccount) { return }
      const fetchWager = async (id: string) => {
          try {
              const wager: any = await getWager(id);
              setWager(wager);
              
          } catch (error) {
              console.error(error);
          }
      };

      fetchWager(id);

  }, [activeAccount, api, contract, id, getWager]);


  return (
    <section className={classes.container}>
      <div className={classes.imageSection}>
        {/* <img src={wager?.image} alt={wager?.title} /> */}
      </div>
      <div className={classes.textSection}>
        <div>
          <span>Title:</span>
          <span>{wager?.name}</span>
        </div>

        <div>
          <span>Description:</span>
          <span>{wager?.terms}</span>
        </div>

        <div>
          <span>User:</span>
          <span>{wager?.creator}</span>
        </div>

        <div>
          <span>Current bid:</span>
          <span>{wager?.amount} ETH</span>
        </div>


      </div>
    </section>
  );
};

export default WagerInfo;
