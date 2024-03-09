import classes from "./CreateWagerForm.module.css";
import { BN } from '@polkadot/util'
import {
  contractTx,
  useInkathon,
  useRegisteredContract,
} from '@scio-labs/use-inkathon'
import Button from "../../Components/Button/Button";
import Input from "../../Components/Input/Input";
import createWagerImage from "../../Assets/Images/createWager.jpg"
import { useContext, useState } from "react";
import ErrorNotification from "../../Components/Error/Error";
import { AppContext } from "../../Context/AppContext";

const CreateWagerForm = () => {
  // Context
  const { fetchWagers } = useContext(AppContext);
  
  const { api, activeAccount, activeSigner } = useInkathon()
  const { contract } = useRegisteredContract("wagerr")

  // State
  const [loading, setLoading] = useState(false)
  const [message, setMessage] = useState<{
    type: "success" | "error";
    message: null | string;
  }>({type: "success", message: null})


  // Create Wager
  const createWager = async (name: string, terms: string, amount: string) => {
    setLoading(false)
    setMessage({type: "success", message: null})

    if (!activeAccount || !contract || !activeSigner || !api) {
      // toast.error('Wallet not connected. Try again…')
      setMessage({type: "success", message: null})
      return;

    }

    setLoading(true)
   
    try {
      const decimals = api.registry.chainDecimals?.[0] || 12
      const formattedAmount =  new BN(amount).mul(new BN(10).pow(new BN(decimals)))
      const result = await contractTx(api, activeAccount.address, contract, 'createWager', {value: formattedAmount}, [
        name, terms
      ])
      setLoading(false)
      setMessage({type: "success", message: "Wager created!"})
      fetchWagers()
      return result;
      
  
    } catch (e: any) {
    
      let message: string
      switch (e.errorMessage) {
        case 'UserCancelled':
          message = 'Transaction cancelled'
          break
        case 'TokenBelowMinimum':
          message = 'Insufficient balance to pay for fees'
          break
        case 'ExtrinsicFailed':
          message = 'Transaction failed'
          break
        case 'Error':
          console.log(e)
          message = 'Transaction failed'
          break
        default:
          message = e ? `Transaction failed (${e})` : 'Transaction failed'
      }
      console.log(message)
      setMessage({type: "error", message})

    setLoading(false)

  
    } finally {
  
    }
  }


  const handleSubmit = async (event: any) => {
    // const result = createWager()

    event.preventDefault();
  

    const name = event.target.Name.value;
    const terms = event.target.Terms.value;
    const amount = event.target.Amount.value;
    const result = await createWager(name, terms, amount)
    console.log(result)
    event.target.reset();
  }

  return (
    <div className={classes.container}>
      <div className={classes.imageSection}>
        <img src={createWagerImage} alt="Create Wager" />
      </div>
      <form onSubmit={handleSubmit} className={classes.textSection}>

        <div>
          <h4>Create Wager</h4>
          <p>Let's bet about something they don't see coming</p>
        </div>

      {message?.message &&  <ErrorNotification type={message?.type as "success" | "error"}>{message?.message}</ErrorNotification>}

        <div>
          <span>
            <Input label="Name" placeholder="Arsenal to win next game." />
          </span>
        </div>

        <div>
          <span>
            <Input label="Terms" placeholder="Arsenal FC to win their next EPL game." />
          </span>
        </div>

        <div>
          <span>
            <Input label="Amount" placeholder="2"/>
          </span>
        </div>

        <div className={classes.buttonSection}>
          <Button loading={loading}>Create wager</Button>
        </div>
      </form>
    </div>
  );
};

export default CreateWagerForm;
