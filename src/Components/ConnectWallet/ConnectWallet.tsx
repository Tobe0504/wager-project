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
        <div className={classes.connectList}>
            {
                browserWallets.map((w) =>
                isWalletInstalled(w) ? (
                    <div className={classes.connect_option}  onClick={() => {
                        connect?.(undefined, w);
                    }} >
                        <div className={classes.option_info}>{w.name}</div>
                    </div>
                ) : (
                    <div className={classes.connect_option}>
                    <a href={w.urls.website}>
                        <div className="align-center flex justify-start gap-2">
                        <p>{w.name}</p>
                        </div>
                        <p>Not installed</p>
                    </a>
                    </div>
                ),
                )
            }

           
            
        </div>
        )
    
    
   
};


  
  

export default ConnectWallet;