import { useSearchParams } from "react-router-dom";
import WagerCard from "../../Components/WagerCard/WagerCard";
import { BN } from '@polkadot/util'
import {
  useInkathon,
} from '@scio-labs/use-inkathon'
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
  const { api } = useInkathon()

  return (
    <motion.div
      className={classes.container}
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      {list?.map((data, i) => {
        const decimals = api?.registry.chainDecimals?.[0] || 12
  
        const bnAmount =  new BN(data.amount.replace(/,/g, '')).div(new BN(10**decimals))
        const tokenSymbol = api?.registry?.chainTokens?.[0] || 'Unit'
        const formattedAmount = `${bnAmount} ${tokenSymbol}`

        return (
         
          <motion.div variants={workVariants} key={i}>
            <WagerCard
              creator={data.creator}
              bettor={data.bettor}
              amount={formattedAmount}
              name={data.name}
              key={data.id}
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
