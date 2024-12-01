import { Outlet } from "react-router-dom";
import CompaniesList from "../../components/companiesList/CompaniesList";
import Flex from "../../components/shared/styledFlex";

import "./style.scss";

const Home = () => {
  return (
    <>
      <Flex className="home-wrapper">
        <CompaniesList />
      </Flex>

      <Outlet />
    </>
  );
};

export default Home;
