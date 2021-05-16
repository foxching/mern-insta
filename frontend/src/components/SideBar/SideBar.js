import React from "react";
import Sticky from "react-sticky-el";
import Profile from "../Profile/Profile";
import Suggestions from "../Suggestions/Suggestions";
import Footer from "../Footer/Footer";
import image from "../../images/profile.jpg";
import "../../styles/sidebar.scss";

const SideBar = () => {
  return (
    <Sticky topOffset={-80}>
      <div className="sidebar">
        <Profile
          username="rechieboy"
          caption="Rechie Lagria"
          urlText="Switch"
          iconSize="big"
          image={image}
        />
        <Suggestions />
        <Footer />
      </div>
    </Sticky>
  );
};

export default SideBar;
