import { useState } from "react";
import SectionHeader from "../../Components/SectionHeader/SectionHeader";
import classes from "./WagerList.module.css";
import SectionsNav from "../../Components/SectionsNav/SectionsNav";
import ListItems from "../ListItems/ListItems";

const WagerList = () => {
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

  return (
    <section className={classes.container}>
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
