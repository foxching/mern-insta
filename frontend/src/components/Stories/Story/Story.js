import React from "react";
import ProfileIcon from "../../../components/ProfileIcon/ProfileIcon";
import users from "../../../data/users";
import "../../../styles/story.scss";

const Story = () => {
  let accountName = users[Math.floor(Math.random() * users.length)].username;

  if (accountName.length > 10) {
    accountName = accountName.substring(0, 10) + "...";
  }

  return (
    <div className="story">
      <ProfileIcon iconSize="big" storyBorder={true} />
      <span className="accountName">{accountName}</span>
    </div>
  );
};

export default Story;
