import { useContext, useState, useEffect } from "react";
import { BN } from '@polkadot/util'
import {
    contractTx,
    useInkathon,
    useRegisteredContract,
  } from '@scio-labs/use-inkathon'
import { AppContext } from "../../Context/AppContext";


// "build": "SET NODE_OPTIONS=--openssl-legacy-provider && react-scripts build",



  
const JoinWager = () => {
    // Context
    // const { listItemRefs } = useContext(AppContext);
    
    const { api, activeAccount, activeSigner } = useInkathon()
    const { getWager } = useContext(AppContext)
    const { contract } = useRegisteredContract("wagerr")
    const [ wager, setWager] = useState({});
    const currentSearchParams = new URLSearchParams(window.location.search)
    const id = currentSearchParams.get("wager") || ""

  
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

    // Join Wager
    const joinWager = async (wager: any) => {
      if (!activeAccount || !contract || !activeSigner || !api) {
        // toast.error('Wallet not connected. Try again…')
        return;
      }
        
        try {
            const formattedAmount =  new BN(wager.amount.replace(/,/g, ''))
            const result = await contractTx(api, activeAccount.address, contract, 'joinWager', {value: formattedAmount}, [
              wager.id
            ])
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
            // toast.error('Error while fetching greeting. Try again…')
        
        } finally {
        
        }
    }
  
    const handleSubmit = async (event: any) => {
      event.preventDefault();

      const result = await joinWager(wager)
      console.log(result)
      event.target.reset();
    }
  
    return (
        <div></div>
    )
  }

export default JoinWager;