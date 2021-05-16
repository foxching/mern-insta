import React from "react";
import { ReactComponent as Inbox } from "../../images/MessengerIcon.svg";
import { ReactComponent as Notifications } from "../../images/activityIcon.svg";
import { ReactComponent as Comments } from "../../images/comment.svg";
import { ReactComponent as Bookmark } from "../../images/bookmark.svg";
import "../../styles/cardMenu.scss";

const CardMenu = () => {
  return (
    <div className="cardMenu">
      <div className="interactions">
        <Notifications className="icon" />
        <Comments className="icon" />
        <Inbox className="icon" />
      </div>
      <Bookmark className="icon" />
    </div>
  );
};

export default CardMenu;
