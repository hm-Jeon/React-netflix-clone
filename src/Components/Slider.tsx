import { AnimatePresence, Variants } from "framer-motion";
import { useState } from "react";
import { IGetMoviesResult } from "../api";
import Box from "./Box";
import {
  BackButton,
  NextButton,
  Row,
  SliderTitle,
  Wrapper,
} from "./styled/Slider.styled";

interface ISliderProps {
  data: IGetMoviesResult;
  sliderName: string;
}

const rowVariants: Variants = {
  hidden: (isBack: boolean) => ({
    // x: isBack ? "calc(-100% + -10px)" : "calc(100% + 10px)",
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
    // x: isBack ? "calc(100% + 10px)" : "calc(-100% + -10px)",
    x: isBack ? window.innerWidth : -window.innerWidth,
    opacity: 0,
    transition: {
      type: "tween",
      duration: 0.5,
    },
  }),
};

function Slider({ data, sliderName }: ISliderProps) {
  const [index, setIndex] = useState(0);
  const [isBack, setIsBack] = useState(false);
  const [isLeaving, setIsLeaving] = useState(false);
  const offset = 6;
  const totalMovies = data!.results.length - 1;
  const maxIndex = Math.floor(totalMovies / offset - 1);

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
      setIndex(current => current - 1);
    }
  };

  const toggleIsLeaving = () => {
    setIsLeaving(false);
  };

  return (
    <Wrapper key={sliderName}>
      <SliderTitle>{sliderName}</SliderTitle>
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
          <NextButton
            key={sliderName + "next"}
            style={{ right: "0px" }}
            onClick={increaseIndex}
          >
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
        >
          {/* 
                  Banner에 사용한 data.results[0]은 제거 (slice(1)) 
                  offset을 활용하여 paging 처리 (offset * index부터 offset * index + offset까지) 
                */}
          {data?.results
            .slice(1)
            .slice(offset * index, offset * index + offset)
            .map((movie, i) => (
              <Box
                key={sliderName + movie.id}
                movie={movie}
                index={i}
                sliderName={sliderName}
              />
            ))}
        </Row>
      </AnimatePresence>
    </Wrapper>
  );
}

export default Slider;
