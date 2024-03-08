import { useContext, useState, useEffect } from "react";
import {
  contractQuery,
  decodeOutput,
  useInkathon,
  useRegisteredContract,
} from '@scio-labs/use-inkathon';
import classes from "./WagerInfo.module.css";
import { AppContext } from "../../Context/AppContext";
import wager1 from "../../Assets/Images/wager1.jpg"
import Loader from "../../Components/Loader/Loader";
import Button from "../../Components/Button/Button";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCopy } from '@fortawesome/free-solid-svg-icons'
import Error from "../../Components/Error/Error";



const WagerInfo = () => {
  // Router
  const { api, activeAccount } = useInkathon()
  const { contract } = useRegisteredContract("wagerr")
  const id = new URLSearchParams(window.location.search).get(
    "wager"
  ) || "";
  const { getWager } = useContext(AppContext)
  const [ wager, setWager] = useState({});
  const [loading, setLoading] = useState(false)
  const [wagerLink, setWagerLink] = useState('')
  const [error, setError] = useState<{
    type: "success" | "error", error: null | string
  }>({
    type: "success", error: null
  })


  useEffect(() => {
    
      if (!contract || !api) return
      if (!activeAccount) { return }
      const fetchWager = async (id: string) => {
        setLoading(true)
          try {
              const wager: any = await getWager(id);
              setWager(wager);
setWagerLink(`${window.location}?wager=${wager?.id}`)

        setLoading(false)

              
          } catch (error) {
              console.error(error);
        setLoading(false)

          }

      };

      fetchWager(id);

  }, [activeAccount, id, contract]);

  console.log(id, activeAccount, contract)

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

  console.log(wager, "Wager", window.location)

  const copyWagerLink = async() => {
setError({type: "success", error: null})

    try {
      await navigator.clipboard.writeText(wagerLink);
      setError({type: "success", error: 'Wager link copied to clipboard'})
    } catch (err) {
      setError({type: "error", error:'Failed to copy wager link'});
    }
  }






if(loading){
  return  <div className={classes.container}><Loader /></div>
}

  return (
    <section className={classes.container}>

    
    
      <div className={classes.textSection}>

      {error?.error && <Error type="success">{error?.error}</Error>}

      <div className={classes.imageSection}>
          <img src={wager1} alt="Wager 1" />
       {wager?.bettor ? <img src={wager3} alt="Wager 1" />: 
          <div className={classes.noBettor}>?</div>} 
      </div>


      <div>
          <span>User 1 vs ?</span>
          <span>{wager?.name}</span>
        </div>


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


        <div>

          <Button type="secondary" onClick={copyWagerLink}>
            <span>Share wager link</span>
            <FontAwesomeIcon icon={faCopy}/>
          </Button>
        </div>

      </div>

    </section>
  );
};

export default WagerInfo;
