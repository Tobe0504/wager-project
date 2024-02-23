import React from "react";
import { useSearchParams } from "react-router-dom";
import WagerCard from "../../Components/WagerCard/WagerCard";
import { motion } from "framer-motion";
import classes from "./ListItems.module.css";

const containerVariants = {
  hidden: {
    opacity: 0,
  },
  visible: {
    opacity: 1,
    transition: { duration: 0.5, delayChildren: 0.3, staggerChildren: 0.2 },
  },
};

const workVariants = {
  hidden: { y: 20, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
  },
};

type ListItemsProps = {
  list: any[];
};

const ListItems = ({ list }: ListItemsProps) => {
  const [, setSearchParams] = useSearchParams();
  const currentSearchParams = new URLSearchParams(window.location.search);
  return (
    <motion.div
      className={classes.container}
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      {list?.map((data, i) => {
        return (
          <motion.div variants={workVariants} key={i}>
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
          </motion.div>
        );
      })}
    </motion.div>
  );
};

export default ListItems;
