import { useContext, useState, useEffect } from "react";
import {
  contractQuery,
  decodeOutput,
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

  enum ClaimAction {
    Accept,
    Reject,
  }

  // claim the win
  const claimWin = async (wager: any) => {
    if (!contract || !api) return
    if (!activeAccount) { return }
    // setFetchIsLoading(true)
    try {
    
        const result = await contractQuery(api, activeAccount.address, contract, 'claimWin', {}, [wager.id])
        const { output, isError, decodedOutput } = decodeOutput(result, contract, 'claimWin')
        if (isError) throw new Error(decodedOutput)
        return output
        
    } catch (e) {
        return e
    } finally {
        // setFetchIsLoading(false)
    }
  }

  // accept or reject claim to the wager
  const acceptRejectClaim = async (wager: any, action: ClaimAction) => {
    if (!contract || !api) return
    if (!activeAccount) { return }
    // setFetchIsLoading(true)
    try {
    
        const result = await contractQuery(api, activeAccount.address, contract, 'acceptRejectClaim', {}, [wager.id, action])
        const { output, isError, decodedOutput } = decodeOutput(result, contract, 'acceptRejectClaim')
        if (isError) throw new Error(decodedOutput)
        return output
        
    } catch (e) {
        return e
    } finally {
        // setFetchIsLoading(false)
    }
  }

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
