import React from "react";
import { Slide } from "react-slideshow-image";

const proprietes = {
    duration: 5000,
    transitionDuration: 500,
    infinite: true,
    indicators: true,
    arrows: true
}

const Slides = () => {
  return (
    <div className="Slides">
      <Slide {...proprietes}>
        <div className="each">
          <img src="/1.png"></img>
        </div>
        <div className="each">
          <img src="/2.png"></img>
        </div>
      </Slide>
    </div>
  );
};
export default Slides;
