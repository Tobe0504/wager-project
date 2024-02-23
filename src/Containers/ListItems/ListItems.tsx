import React from "react";
import { useSearchParams } from "react-router-dom";
import WagerCard from "../../Components/WagerCard/WagerCard";
import { wagerList } from "../../Utilities/wagerList";
import classes from "./ListItems.module.css";

const ListItems = () => {
  const [, setSearchParams] = useSearchParams();
  const currentSearchParams = new URLSearchParams(window.location.search);
  return (
    <div className={classes.container}>
      {wagerList?.map((data, i) => {
        return (
          <WagerCard
            user={data.user}
            bid={data.currenyBid}
            title={data.title}
            key={i}
            image={data.image}
            onClick={() => {
              currentSearchParams.set("wager", String(data.id));
              setSearchParams(currentSearchParams.toString());
            }}
          />
        );
      })}
    </div>
  );
};

export default ListItems;
