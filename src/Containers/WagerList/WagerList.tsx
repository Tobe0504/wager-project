import { useContext, useState, useEffect } from "react";
import {
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
  const { listItemRefs, pendingWagers, activeWagers, fetchWagers} = useContext(AppContext);
  
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

  

  useEffect(() => {
     // Get Wager
    fetchWagers();

  
  }, [activeAccount, contract]);

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
          style={{ overflowY: "auto", minHeight: "80vh"}}
          
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
