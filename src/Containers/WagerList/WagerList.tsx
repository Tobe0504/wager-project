import { useContext, useState, useEffect } from "react";
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



const WagerList = () => {
  // Context
  const { listItemRefs } = useContext(AppContext);
  
  const { api, activeAccount } = useInkathon()
  const { contract } = useRegisteredContract("wagerr")



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

  const [activeWagers, setActiveWagers] = useState([]);
  const [pendingWagers, setPendingWagers] = useState([]);
  

  useEffect(() => {
     // Get Wagers
    const getActiveWagers = async () => {
      if (!contract || !api) return
      if (!activeAccount) { return }
      // setFetchIsLoading(true)
      try {
      
        const result = await contractQuery(api, activeAccount.address, contract, 'getActiveWagers')
        const { output, isError, decodedOutput } = decodeOutput(result, contract, 'getActiveWagers')
        if (isError) throw new Error(decodedOutput)
        console.log('decoded', decodedOutput)
        return output
        
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

        console.log('decoded', decodedOutput)
        return output
        
      } catch (e) {
        console.error(e)
        // toast.error('Error while fetching greeting. Try again…')
    
      } finally {
        // setFetchIsLoading(false)
      }
    }
    const fetchWagers = async () => {
      try {
        const activeWagersResult = await getActiveWagers();
        setActiveWagers(activeWagersResult);
        
        const pendingWagersResult = await getPendingWagers();
        setPendingWagers(pendingWagersResult);
      } catch (error) {
        console.error(error);
      }
    };

    fetchWagers();
  }, [activeAccount, api, contract]);

  // Router
  const [, setSearchParams] = useSearchParams();
  const currentSearchParams = new URLSearchParams(window.location.search);
  const showWagerModal = currentSearchParams.get("wager");
  const section = currentSearchParams.get("section");

  // const activeWagers = getActiveWagers();
  // const pendingWagers = getPendingWagers();

  if (!contract || !api) return
  if (!activeAccount) { return }


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
          <ListItems list={activeWagers} />
        ) : (
          <ListItems list={pendingWagers} />
        )}
      </div>
    </section>
  );
};

export default WagerList;
