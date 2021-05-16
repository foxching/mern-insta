import React from "react";
import Profile from "../Profile/Profile";
import "../../styles/suggestions.scss";

const Suggestions = () => {
  return (
    <div className="suggestions">
      <div className="titleContainer">
        <div className="title">Suggestions for you</div>
        <a href="/">See All</a>
      </div>

      <Profile
        caption="Followed by mapvault + 3 more"
        urlText="Follow"
        iconSize="medium"
        captionSize="small"
        storyBorder={true}
      />
      <Profile
        caption="Followed by dadatlacak + 1 more"
        urlText="Follow"
        iconSize="medium"
        captionSize="small"
      />
      <Profile
        caption="Follows you"
        urlText="Follow"
        iconSize="medium"
        captionSize="small"
      />
      <Profile
        caption="Followed by dadatlacak + 7 more"
        urlText="Follow"
        iconSize="medium"
        captionSize="small"
        storyBorder={true}
      />
      <Profile
        caption="Followed by mapvault + 4 more"
        urlText="Follow"
        iconSize="medium"
        captionSize="small"
      />
    </div>
  );
};

export default Suggestions;
