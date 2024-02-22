import Layout from "../../Components/Layout/Layout";
import HeroSection from "../HeroSection/HeroSection";
import WagerList from "../WagerList/WagerList";
import classes from "./Home.module.css";

const Home = () => {
  return (
    <Layout>
      <div className={classes.container}>
        <HeroSection />
        <WagerList />
      </div>
    </Layout>
  );
};

export default Home;
