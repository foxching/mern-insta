import React from "react";
import HorizontalScroll from "react-scroll-horizontal";
import Story from "./Story/Story";
import "../../styles/stories.scss";

const Stories = () => {
  return (
    <div className="stories">
      <HorizontalScroll className="scroll" reverseScroll={true}>
        <Story />
        <Story />
        <Story />
        <Story />
        <Story />
        <Story />
        <Story />
        <Story />
        <Story />
        <Story />
        <Story />
      </HorizontalScroll>
    </div>
  );
};

export default Stories;
