import Navbar from "../../Components/Navbar";
import "./home.scss";

import { useSelector } from "react-redux";

const Home = () => {
  const { user } = useSelector((state) => state.user);

  return (
    <div id="homeMain">
      <Navbar />
      <h1>{user?.firstName} </h1>
    </div>
  );
};
export default Home;
