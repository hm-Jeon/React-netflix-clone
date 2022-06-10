import { AnimatePresence, Variants } from "framer-motion";
import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { IMovie, ITv } from "../../api";
import { makeImagePath } from "../../utils";
import {
  Button,
  ButtonGroup,
  Buttons,
  Info,
  PlayButton,
  Poster,
  Title,
  Wrapper,
} from "./Box.styled";

const boxVariants: Variants = {
  initial: {
    scale: 1,
  },
  hover: {
    scale: 1.5,
    y: -45,
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
    display: "flex",
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
  data: IMovie & ITv;
  index: number;
  sliderName: string;
  slider_col: number;
}

function Box({ data, index, sliderName, slider_col }: IBoxProps) {
  const navigate = useNavigate();
  const searchMatch = new URLSearchParams(useLocation().search);

  const onBoxClicked = (sliderName: string, id: number) => {
    searchMatch.has("query")
      ? navigate(
          `?query=${searchMatch.get("query")}&sliderName=${sliderName}&id=${id}`
        )
      : navigate(`?sliderName=${sliderName}&id=${id}`);
  };

  const [isHover, setIsHover] = useState(false);

  return (
    <AnimatePresence initial={true}>
      <Wrapper
        key={sliderName + data!.id}
        variants={boxVariants}
        initial="initial"
        whileHover="hover"
        transition={{ type: "tween" }}
        onHoverStart={() => {
          setIsHover(true);
        }}
        onHoverEnd={() => {
          setIsHover(false);
        }}
        layoutId={sliderName + String(data!.id)}
        style={{
          originX: index === 0 ? 0 : index === slider_col - 1 ? 1 : 0.5,
        }}
      >
        <Poster
          key={sliderName + "poster"}
          src={makeImagePath(
            data!.backdrop_path! ? data!.backdrop_path! : data!.poster_path!,
            "w500"
          )}
          alt="No Image"
        ></Poster>
        <Info
          key={sliderName + "info"}
          variants={infoVariants}
          animate={isHover ? "hover" : "hoverEnd"}
        >
          <Buttons>
            <ButtonGroup>
              <PlayButton>
                <i className="fa-solid fa-play"></i>
              </PlayButton>
              <Button>
                <i className="fa-solid fa-plus"></i>
              </Button>
              <Button>
                <i className="fa-regular fa-thumbs-up"></i>
              </Button>
            </ButtonGroup>
            <Button
              onClick={() => {
                onBoxClicked(sliderName, data!.id);
              }}
            >
              <i className="fa-solid fa-chevron-down"></i>
            </Button>
          </Buttons>
          <Title>{data!.title || data!.name}</Title>
        </Info>
      </Wrapper>
    </AnimatePresence>
  );
}

export default Box;
