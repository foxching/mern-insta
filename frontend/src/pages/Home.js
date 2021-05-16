import React from "react";
import Navigation from "../components/Navigation/Navigation";
import Cards from "../components/Cards/Cards";
import SideBar from "../components/SideBar/SideBar";

const Home = () => {
  return (
    <div>
      <Navigation />
      <main>
        <div className="container">
          <Cards />
          <SideBar />
        </div>
      </main>
    </div>
  );
};

export default Home;
