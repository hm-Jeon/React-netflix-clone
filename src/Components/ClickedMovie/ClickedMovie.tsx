import { Variants } from "framer-motion";
import { PathMatch, useNavigate } from "react-router-dom";
import { IMovie } from "../../api";
import { makeImagePath } from "../../utils";
import {
  Cover,
  Info,
  ClickedMovieBox,
  Overview,
  Title,
  Overlay,
} from "./ClickedMovie.styled";

const overlayVariants: Variants = {
  initial: {
    opacity: 0,
  },
  animate: {
    opacity: 1,
    transition: {
      duration: 0.5,
    },
  },
  exit: {
    opacity: 0,
    transition: {
      duration: 0.5,
    },
  },
};

const bigMovieVariants: Variants = {
  hidden: {
    opacity: 0,
  },
  visible: {
    opacity: 1,
    transition: {
      duration: 0.5,
    },
  },
  exit: {
    opacity: 0,
    transition: {
      duration: 0.5,
    },
  },
};

interface IClickedMovieProps {
  bigMovieMatch: PathMatch<"sliderName" | "movieId">;
  clickedMovie: IMovie;
}

function ClickedMovie({ bigMovieMatch, clickedMovie }: IClickedMovieProps) {
  const navigate = useNavigate();

  const onOverlayClick = () => {
    navigate("/");
  };

  return (
    <>
      <Overlay onClick={onOverlayClick} {...overlayVariants} />
      <ClickedMovieBox
        variants={bigMovieVariants}
        initial="hidden"
        animate="visible"
        exit="exit"
        layoutId={
          bigMovieMatch.params.sliderName! + bigMovieMatch.params.movieId!
        }
      >
        {clickedMovie && (
          <>
            <Cover
              bgImg={makeImagePath(clickedMovie.backdrop_path, "original")}
            >
              <Title>{clickedMovie.title}</Title>
            </Cover>
            <Info>
              <Overview>{clickedMovie.overview}</Overview>
            </Info>
          </>
        )}
      </ClickedMovieBox>
    </>
  );
}

export default ClickedMovie;
