import { Variants } from "framer-motion";
import { PathMatch, useNavigate } from "react-router-dom";
import { IMovie, ITv } from "../../api";
import { makeImagePath } from "../../utils";
import {
  Cover,
  Info,
  ClickedMovieBox,
  Overview,
  Title,
  Overlay,
  BackBtn,
} from "./Clicked.styled";

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

const clickedVariants: Variants = {
  hidden: {
    // opacity: 0,
  },
  visible: {
    // opacity: 1,
    boxShadow: "2px 2px 2px rgba(0, 0, 0, 0.2)",
    transition: {
      duration: 0.5,
    },
  },
  exit: {
    // opacity: 0,
    transition: {
      duration: 0.5,
    },
  },
};

interface IClickedProps {
  clickedMovieMatch?: PathMatch<"sliderName" | "movieId">;
  clickedTvMatch?: PathMatch<"sliderName" | "tvId">;
  clickedMovie?: IMovie;
  clickedTv?: ITv;
}

function Clicked({
  clickedMovieMatch,
  clickedMovie,
  clickedTvMatch,
  clickedTv,
}: IClickedProps) {
  const navigate = useNavigate();

  const onBackBtnClick = () => {
    clickedMovieMatch ? navigate("/") : navigate("/tv");
  };

  return (
    <>
      <Overlay {...overlayVariants} />
      <ClickedMovieBox
        variants={clickedVariants}
        initial="hidden"
        animate="visible"
        exit="exit"
        layoutId={
          clickedMovieMatch?.params.sliderName! +
            clickedMovieMatch?.params.movieId! ||
          clickedTvMatch!.params.sliderName! + clickedTvMatch!.params.tvId!
        }
      >
        <>
          <Cover
            bgImg={makeImagePath(
              clickedMovie?.backdrop_path
                ? clickedMovie?.backdrop_path
                : clickedMovie?.poster_path || clickedTv!.backdrop_path
                ? clickedTv!.backdrop_path
                : clickedTv!.poster_path,
              "original"
            )}
          >
            <BackBtn onClick={onBackBtnClick}>
              <i className="fa-solid fa-arrow-left"></i>
            </BackBtn>
            <Title>{clickedMovie?.title || clickedTv!.name}</Title>
          </Cover>
          <Info>
            <Overview>{clickedMovie?.overview || clickedTv!.overview}</Overview>
          </Info>
        </>
      </ClickedMovieBox>
    </>
  );
}

export default Clicked;
