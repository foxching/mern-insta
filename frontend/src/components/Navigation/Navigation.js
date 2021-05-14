import React from "react";
import logo from "../../images/logo.png";
import searchIcon from "../../images/searchIcon.png";
import "../../styles/navigation.scss";
import Menu from "../Menu/Menu";

const Navigation = () => {
  return (
    <div className="navigation">
      <div className="container">
        <img src={logo} alt="logo" className="logo" />
        <div className="search">
          <img src={searchIcon} alt="" className="searchIcon" />
          <span className="searchText">Search</span>
        </div>
        <Menu />
      </div>
    </div>
  );
};

export default Navigation;
