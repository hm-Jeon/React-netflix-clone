import { Variants } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { IMovie } from "../../api";
import { makeImagePath } from "../../utils";
import { Info, Poster, Wrapper } from "./Box.styled";

const boxVariants: Variants = {
  normal: {
    scale: 1,
  },
  hover: {
    scale: 1.3,
    y: -50,
    zIndex: 2,
    boxShadow: "2px 2px 2px rgba(0, 0, 0, 0.2)",
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
    boxShadow: "2px 2px 2px rgba(0, 0, 0, 0.2)",
    transition: {
      delay: 0.5,
      duration: 0.2,
    },
  },
};

interface IBoxProps {
  movie: IMovie;
  index: number;
  sliderName: string;
}

function Box({ movie, index, sliderName }: IBoxProps) {
  const navigate = useNavigate();

  const onBoxClicked = (sliderName: string, movieId: number) => {
    navigate(`/movies/${sliderName}/${movieId}`);
  };

  return (
    <Wrapper
      key={sliderName + movie.id}
      variants={boxVariants}
      initial="normal"
      whileHover="hover"
      transition={{ type: "tween" }}
      onClick={() => {
        onBoxClicked(sliderName, movie.id);
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
