import { useContext, useState } from "react";
import {
  contractQuery,
  decodeOutput,
  useInkathon,
  useRegisteredContract,
} from '@scio-labs/use-inkathon'
import SectionHeader from "../../Components/SectionHeader/SectionHeader";
import classes from "./WagerList.module.css";
import SectionsNav from "../../Components/SectionsNav/SectionsNav";
import ListItems from "../ListItems/ListItems";
import { useSearchParams } from "react-router-dom";
import AcceptedModal from "../../Components/Modal/Modal";
import WagerInfo from "../WagerInfo/WagerInfo";
import { AppContext } from "../../Context/AppContext";
import { myWagerList, wagerList } from "../../Utilities/wagerList";




const WagerList = () => {
  // Context
  const { listItemRefs } = useContext(AppContext);
  
  const { api, activeAccount } = useInkathon()
  const { contract } = useRegisteredContract("wagerr")

  // Get Wagers
  const getActiveWagers = async () => {
    if (!contract || !api) return
    if (!activeAccount) { return }
    // setFetchIsLoading(true)
    try {
     
      const result = await contractQuery(api, activeAccount.address, contract, 'getActiveWagers')
      const { output, isError, decodedOutput } = decodeOutput(result, contract, 'getActiveWagers')
      if (isError) throw new Error(decodedOutput)

      console.log("active wagers", output)
      
    } catch (e) {
      console.error(e)
      // toast.error('Error while fetching greeting. Try again…')
  
    } finally {
      // setFetchIsLoading(false)
    }
  }
  const getPendingWagers = async () => {
    if (!contract || !api) return
    if (!activeAccount) { return }
    // setFetchIsLoading(true)

    try {
      
      const result = await contractQuery(api, activeAccount.address, contract, 'getPendingWagers')
      const { output, isError, decodedOutput } = decodeOutput(result, contract, 'getPendingWagers')
      if (isError) throw new Error(decodedOutput)

      console.log("pending wagers", output)
      
    } catch (e) {
      console.error(e)
      // toast.error('Error while fetching greeting. Try again…')
  
    } finally {
      // setFetchIsLoading(false)
    }
  }


  // States
  const [navItems, setNavItems] = useState([
    {
      title: "Active Wagers",
      isActive: true,
    },

    {
      title: "Pending Wagers",
      isActive: true,
    },
  ]);

  // Router
  const [, setSearchParams] = useSearchParams();
  const currentSearchParams = new URLSearchParams(window.location.search);
  const showWagerModal = currentSearchParams.get("wager");
  const section = currentSearchParams.get("section");

  const activeWagers = getActiveWagers();
  const pendingWagers = getPendingWagers();

  if (!contract || !api) return
  if (!activeAccount) { return }

 
  // const pendingWagers = useCall(wagerContract, 'getPendingWagers');
  
  return (
    <section className={classes.container}>
      {showWagerModal && (
        <AcceptedModal
          onClick={() => {
            currentSearchParams.delete("wager");
            setSearchParams(currentSearchParams.toString());
          }}
          body={<WagerInfo />}
        />
      )}
      <SectionHeader title="Wagers" paragraph="Dive into the Thrill" />
      <div className={classes.list} ref={listItemRefs}>
        <SectionsNav navItems={navItems} setNavItems={setNavItems} isRouting />
        {section === "active-wagers" ? (
          <ListItems list={wagerList} />
        ) : (
          <ListItems list={myWagerList} />
        )}
      </div>
    </section>
  );
};

export default WagerList;
