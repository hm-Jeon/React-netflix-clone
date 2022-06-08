import { AnimatePresence, Variants } from "framer-motion";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { IMovie, ITv } from "../../api";
import { makeImagePath } from "../../utils";
import { Info, Poster, Wrapper } from "./Box.styled";

const boxVariants: Variants = {
  initial: {
    scale: 1,
  },
  hover: {
    scale: 1.3,
    y: -50,
    zIndex: 2,
    boxShadow: "2px 2px 2px rgba(0, 0, 0, 0.2)",
    transition: {
      type: "tween",
      delay: 0.3,
      duration: 0.3,
    },
  },
};

const infoVariants: Variants = {
  initial: {
    display: "none",
    opacity: 0,
  },
  hover: {
    display: "block",
    opacity: 1,
    transition: {
      delay: 0.3,
      duration: 0.3,
    },
  },
  hoverEnd: {
    opacity: 0,
    transition: {
      duration: 0.3,
    },
    transitionEnd: {
      display: "none",
    },
  },
};

interface IBoxProps {
  movie?: IMovie;
  tv?: ITv;
  index: number;
  sliderName: string;
}

function Box({ movie, tv, index, sliderName }: IBoxProps) {
  const navigate = useNavigate();

  const onBoxClicked = (sliderName: string, movieId: number) => {
    navigate(`/${movie ? "movie" : "tv"}/${sliderName}/${movieId}`);
  };

  const [isHover, setIsHover] = useState(false);

  return (
    <AnimatePresence initial={true}>
      <Wrapper
        key={sliderName + movie?.id || tv!.id}
        variants={boxVariants}
        initial="initial"
        whileHover="hover"
        transition={{ type: "tween" }}
        onClick={() => {
          onBoxClicked(sliderName, movie?.id || tv!.id);
        }}
        onHoverStart={() => {
          setIsHover(true);
        }}
        onHoverEnd={() => {
          setIsHover(false);
        }}
        layoutId={sliderName + String(movie?.id || tv!.id)}
        style={{ originX: index === 0 ? 0 : index === 5 ? 1 : 0.5 }}
      >
        {/* 부모 컴포넌트의 variants는 자식 컴포넌트에 자동으로 상속된다. */}

        <Poster
          key={sliderName + "poster"}
          src={makeImagePath(
            movie?.backdrop_path
              ? movie?.backdrop_path
              : movie?.poster_path || tv!.backdrop_path
              ? tv!.backdrop_path
              : tv!.poster_path,
            "w500"
          )}
          alt="No Image"
        ></Poster>
        <Info
          key={sliderName + "info"}
          variants={infoVariants}
          animate={isHover ? "hover" : "hoverEnd"}
        >
          <h4>{movie?.title || tv!.name}</h4>
        </Info>
      </Wrapper>
    </AnimatePresence>
  );
}

export default Box;
