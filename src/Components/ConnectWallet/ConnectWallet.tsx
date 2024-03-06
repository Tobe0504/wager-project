import {
    SubstrateWalletPlatform,
    allSubstrateWallets,
    isWalletInstalled,
    useInkathon,
  } from '@scio-labs/use-inkathon'

import { useState } from 'react'
import classes from "./ConnectWallet.module.css";
// import Button from "../Button/Button";



const ConnectWallet = () => {
    const {
        connect,
        activeAccount,
    } = useInkathon()
    
    // const [option, setOption] = useState("");
    // Sort installed wallets first
    const [browserWallets] = useState([
    ...allSubstrateWallets.filter(
        (w) => w.platforms.includes(SubstrateWalletPlatform.Browser) && isWalletInstalled(w),
    ),
    ...allSubstrateWallets.filter(
        (w) => w.platforms.includes(SubstrateWalletPlatform.Browser) && !isWalletInstalled(w),
    ),
    ])
    
    if (!activeAccount)
        return (
        <div className={classes.walletList}>
            {
                browserWallets.map((w) =>
                isWalletInstalled(w) ? (
                    <div className={classes.walletItem}>
                        <button  onClick={() => { connect?.(undefined, w);}} >
                            <img src={w.logoUrls[0]} alt='logo'></img>
                            <div className={classes.option_info}>{w.name}</div>
                        </button>
                    </div>
                    
                ) : (
                    <div className={classes.walletItem}>
                        <button disabled>
                            <img src={w.logoUrls[0]} alt='logo'></img>
                            <div className={classes.option_info}>{w.name}</div>
                        </button>
                    </div>
                ),
                )
            }

           
            
        </div>
        )
    
    
   
};


  
  

export default ConnectWallet;