import { Variants } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { useSetRecoilState } from "recoil";
import { IMovie } from "../api";
import { layoutState } from "../atom";
import { makeImagePath } from "../utils";
import { Info, Poster, Wrapper } from "./styled/Box.styled";

const boxVariants: Variants = {
  normal: {
    scale: 1,
  },
  hover: {
    scale: 1.3,
    y: -60,
    zIndex: 2,
    transition: {
      type: "tween",
      delay: 0.5,
      duration: 0.2,
    },
  },
};

const infoVariants: Variants = {
  hover: {
    opacity: 1,
    transition: {
      delay: 0.5,
      duration: 0.2,
    },
  },
};

function Box({
  movie,
  index,
  sliderName,
}: {
  movie: IMovie;
  index: number;
  sliderName: string;
}) {
  const navigate = useNavigate();

  const onBoxClicked = (movieId: number) => {
    navigate(`/movies/${movieId}`);
  };

  const setLayoutPrefix = useSetRecoilState(layoutState);

  return (
    <Wrapper
      key={sliderName + movie.id}
      variants={boxVariants}
      initial="normal"
      whileHover="hover"
      transition={{ type: "tween" }}
      onClick={() => {
        onBoxClicked(movie.id);
        setLayoutPrefix(sliderName);
      }}
      layoutId={sliderName + String(movie.id)}
      style={{ originX: index === 0 ? 0 : index === 5 ? 1 : 0.5 }}
    >
      {/* 부모 컴포넌트의 variants는 자식 컴포넌트에 자동으로 상속된다. */}
      <Poster
        key={sliderName + "poster"}
        src={makeImagePath(movie.backdrop_path, "w500")}
      ></Poster>
      <Info key={sliderName + "info"} variants={infoVariants}>
        <h4>{movie.title}</h4>
      </Info>
    </Wrapper>
  );
}

export default Box;
