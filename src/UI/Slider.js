import React, { useState } from "react";
import "./Slider.css";
import BtnSlider from "./BtnSlider";

import { v4 as uuidv4 } from "uuid";

const dataSlider = [
  {
    id: uuidv4(),
    title: "Lorem ipsum",
    subTitle: "Lorem",
  },
  {
    id: uuidv4(),
    title: "Lorem ipsum",
    subTitle: "Lorem",
  },
  {
    id: uuidv4(),
    title: "Lorem ipsum",
    subTitle: "Lorem",
  },
];

export default function Slider({ image1, image2, image3 }) {
  const [slideIndex, setSlideIndex] = useState(1);

  const nextSlide = () => {
    if (slideIndex !== 3) {
      setSlideIndex(slideIndex + 1);
    } else if (slideIndex === 3) {
      setSlideIndex(1);
    }
  };

  const prevSlide = () => {
    if (slideIndex !== 1) {
      setSlideIndex(slideIndex - 1);
    } else if (slideIndex === 1) {
      setSlideIndex(dataSlider.length);
    }
  };

  const moveDot = (index) => {
    setSlideIndex(index);
  };

  return (
    <div className="container-slider">
      {dataSlider.map((obj, index) => {
        return (
          <div
            key={index}
            className={slideIndex === index + 1 ? "slide active-anim" : "slide"}
          >
            {index === 0 && <img src={image1} />}
            {index === 1 && <img src={image2} />}
            {index === 2 && <img src={image3} />}
          </div>
        );
      })}
      <BtnSlider moveSlide={nextSlide} direction={"next"} />
      <BtnSlider moveSlide={prevSlide} direction={"prev"} />

      <div className="container-dots">
        {Array.from({ length: 3 }).map((item, index) => (
          <div
            key={index}
            onClick={() => moveDot(index + 1)}
            className={slideIndex === index + 1 ? "dot active" : "dot"}
          ></div>
        ))}
      </div>
    </div>
  );
}
