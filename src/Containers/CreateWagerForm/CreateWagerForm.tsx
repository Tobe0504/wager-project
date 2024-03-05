import classes from "./CreateWagerForm.module.css";
import { BN } from '@polkadot/util'
import {
  contractTx,
  useInkathon,
  useRegisteredContract,
} from '@scio-labs/use-inkathon'
import Button from "../../Components/Button/Button";
import Input from "../../Components/Input/Input";

const CreateWagerForm = () => {
  // Context
  // const { listItemRefs } = useContext(AppContext);
  
  const { api, activeAccount, activeSigner } = useInkathon()
  const { contract } = useRegisteredContract("wagerr")

  // Create Wager
  const createWager = async (name: string, terms: string, amount: string) => {
    if (!activeAccount || !contract || !activeSigner || !api) {
      // toast.error('Wallet not connected. Try again…')
      return;
    }
   
    try {
      const decimals = api.registry.chainDecimals?.[0] || 12
      // const prefix = api.registry.chainSS58 || 42
      const formattedAmount =  new BN(amount).mul(new BN(10).pow(new BN(decimals)))
      const result = await contractTx(api, activeAccount.address, contract, 'createWager', {value: formattedAmount}, [
        name, terms
      ])
      return result;
  
    } catch (e) {
    
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
      // toast.error('Error while fetching greeting. Try again…')
  
    } finally {
  
    }
  }

  const handleSubmit = async (event) => {
    // const result = createWager()
    event.preventDefault();

    const name = event.target.name.value;
    const terms = event.target.terms.value;
    const amount = event.target.amount.value;
   
    const result = await createWager(name, terms, amount)
    console.log(result)
    event.target.reset();
  }

  return (
    <div className={classes.container}>
      <div className={classes.imageSection}>
        <img src="" alt="Create Wager" />
      </div>
      <form onSubmit={handleSubmit}>
        <div>
          <h4>Create Wager</h4>
          <p>Let's bet about something they don't see coming</p>
        </div>
        <div>
          <span>Name:</span>
          <span>
            <Input label="name" placeholder="Arsenal to win next game." />
          </span>
        </div>

        <div>
          <span>Terms:</span>
          <span>
            <Input label="terms" placeholder="Arsenal FC to win their next EPL game." />
          </span>
        </div>

        <div>
          <span>Wager bid:</span>
          <span>
            <Input label="amount" placeholder="2"/>
          </span>
        </div>

        <div className={classes.buttonSection}>
          <Button>Create wager</Button>
        </div>
      </form>
    </div>
  );
};

export default CreateWagerForm;
