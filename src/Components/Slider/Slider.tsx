import { AnimatePresence, Variants } from "framer-motion";
import { useState } from "react";
import { IMovie, ITv } from "../../api";
import Box from "../Box/Box";
import {
  BackButton,
  NextButton,
  Row,
  SliderBar,
  SliderBars,
  SliderTitle,
  Wrapper,
} from "./Slider.styled";

interface ISliderProps {
  data?: (IMovie & ITv)[];
  sliderName: string;
  cutOutRemainder?: boolean;
  slider_col?: number;
  slice_first?: boolean;
}

const rowVariants: Variants = {
  hidden: (isBack: boolean) => ({
    x: isBack ? -window.innerWidth : window.innerWidth,
    opacity: 0,
  }),
  visible: {
    x: 0,
    opacity: 1,
    transition: {
      type: "tween",
      duration: 0.5,
    },
  },
  exit: (isBack: boolean) => ({
    x: isBack ? window.innerWidth : -window.innerWidth,
    opacity: 0,
    transition: {
      type: "tween",
      duration: 0.5,
    },
  }),
};

function Slider({
  data,
  sliderName,
  slider_col = 6,
  cutOutRemainder = true,
  slice_first = true,
}: ISliderProps) {
  const [index, setIndex] = useState(0);
  const [isBack, setIsBack] = useState(false);
  const [isLeaving, setIsLeaving] = useState(false);
  const offset = slider_col;
  const total = data!.length! - 1;
  const maxIndex = Math.floor(total / offset) - (cutOutRemainder ? 1 : 0);

  const increaseIndex = () => {
    if (isLeaving) return;

    if (index !== maxIndex) {
      setIsLeaving(true);
      setIsBack(false);
      setIndex(current => (current === maxIndex ? current : current + 1));
    }
  };

  const decreaseIndex = () => {
    if (isLeaving) return;

    if (index !== 0) {
      setIsLeaving(true);
      setIsBack(true);
      setIndex(current => (current === 0 ? current : current - 1));
    }
  };

  const toggleIsLeaving = () => {
    setIsLeaving(false);
  };

  return (
    <>
      <SliderTitle>{sliderName}</SliderTitle>
      <Wrapper key={sliderName}>
        <SliderBars>
          {[...Array(maxIndex + 1)].map((v, i) => {
            return (
              <SliderBar key={sliderName + i} active={index === i}></SliderBar>
            );
          })}
        </SliderBars>
        <AnimatePresence
          custom={isBack}
          initial={false}
          onExitComplete={toggleIsLeaving}
        >
          {index !== 0 && (
            <BackButton key={sliderName + "back"} onClick={decreaseIndex}>
              <i className="fa-solid fa-angle-left"></i>
            </BackButton>
          )}
          {index !== maxIndex && (
            <NextButton key={sliderName + "next"} onClick={increaseIndex}>
              <i className="fa-solid fa-angle-right"></i>
            </NextButton>
          )}
          <Row
            key={sliderName + index}
            variants={rowVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            custom={isBack}
            slider_col={offset}
          >
            {/* 
                  Banner에 사용한 data.results[0]은 제거 (slice(1)) 
                  offset을 활용하여 paging 처리 (offset * index부터 offset * index + offset까지) 
                */}
            {data &&
              data
                .slice(slice_first ? 1 : 0)
                .slice(offset * index, offset * index + offset)
                .map((movie, i) => (
                  <Box
                    key={sliderName + movie.id}
                    data={movie as IMovie & ITv}
                    sliderName={sliderName}
                    index={i}
                    slider_col={slider_col}
                  />
                ))}
          </Row>
        </AnimatePresence>
      </Wrapper>
    </>
  );
}

export default Slider;
