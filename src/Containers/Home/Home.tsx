import Layout from "../../Components/Layout/Layout";
import HeroSection from "../HeroSection/HeroSection";
import WagerList from "../WagerList/WagerList";

const Home = () => {
  return (
    <Layout>
      <HeroSection />
      <WagerList />
    </Layout>
  );
};

export default Home;
