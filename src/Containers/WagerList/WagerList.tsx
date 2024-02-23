import { useContext, useState } from "react";
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

  // States
  const [navItems, setNavItems] = useState([
    {
      title: "Wagers for you",
      isActive: true,
    },

    {
      title: "Wagers by you",
      isActive: true,
    },
  ]);

  // Router
  const [, setSearchParams] = useSearchParams();
  const currentSearchParams = new URLSearchParams(window.location.search);
  const showWagerModal = currentSearchParams.get("wager");
  const section = currentSearchParams.get("section");

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
        {section === "wagers-for-you" ? (
          <ListItems list={wagerList} />
        ) : (
          <ListItems list={myWagerList} />
        )}
      </div>
    </section>
  );
};

export default WagerList;
