import { useContext, useState } from "react";
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

  // States
  const [navItems, setNavItems] = useState([
    {
      title: "Wagers by you",
      isActive: true,
    },

    {
      title: "Wagers for you",
      isActive: true,
    },
  ]);

  // Router
  const [, setSearchParams] = useSearchParams();
  const currentSearchParams = new URLSearchParams(window.location.search);
  const showWagerModal = currentSearchParams.get("wager");

  return (
    <section className={classes.container} ref={listItemRefs}>
      {showWagerModal && (
        <AcceptedModal
          onClick={() => {
            currentSearchParams.delete("wager");
            setSearchParams(currentSearchParams.toString());
          }}
          body={<WagerInfo />}
        />
      )}
      <SectionHeader
        title="Wagers"
        paragraph="Lorem ipsum dolor sit amet, consectetur adipiscing elit."
      />
      <div className={classes.list}>
        <SectionsNav navItems={navItems} setNavItems={setNavItems} isRouting />
        <ListItems />
      </div>
    </section>
  );
};

export default WagerList;
