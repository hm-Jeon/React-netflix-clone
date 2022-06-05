import {
  getNowPlayingMovies,
  getPopularMovies,
  getTopRatedMovies,
  IGetMoviesResult,
} from "../api";
import { useQuery } from "react-query";
import { makeImagePath } from "../utils";
import {
  Banner,
  BigCover,
  BigMovie,
  BigOverview,
  BigTitle,
  Loader,
  Overlay,
  Overview,
  Title,
  Wrapper,
} from "./Home.styled";
import Slider from "../Components/Slider";
import { AnimatePresence, Variants } from "framer-motion";
import { useMatch, useNavigate } from "react-router-dom";
import { useRecoilValue } from "recoil";
import { layoutState } from "../atom";

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

enum layout {
  nowPlaying = "now Playing",
  popular = "popular",
  topRated = "top Rated",
}

function Home() {
  const { isLoading: nowPlayingLoading, data: nowPlayingData } =
    useQuery<IGetMoviesResult>(
      ["movies", layout.nowPlaying],
      getNowPlayingMovies
    );

  const { isLoading: popularLoading, data: popularData } =
    useQuery<IGetMoviesResult>(["movies", layout.popular], getPopularMovies);

  const { isLoading: upTopRatedLoading, data: topRatedData } =
    useQuery<IGetMoviesResult>(["movies", layout.topRated], getTopRatedMovies);

  const isLoading = nowPlayingLoading || popularLoading || upTopRatedLoading;

  const layoutIdPrefix = useRecoilValue(layoutState);
  const navigate = useNavigate();
  const bigMovieMatch = useMatch("/movies/:movieId");

  // Array.find() 함수를 이용해서 배열 중 맞는 조건의 요소를 찾을 수 있다.
  const clickedMovie =
    bigMovieMatch?.params.movieId && layoutIdPrefix === layout.nowPlaying
      ? nowPlayingData?.results.find(
          movie => String(movie.id) === bigMovieMatch.params.movieId
        )
      : layoutIdPrefix === layout.popular
      ? popularData?.results.find(
          movie => String(movie.id) === bigMovieMatch?.params.movieId
        )
      : topRatedData?.results.find(
          movie => String(movie.id) === bigMovieMatch?.params.movieId
        );

  const onOverlayClick = () => {
    navigate("/");
  };

  return (
    <Wrapper>
      {isLoading ? (
        <Loader>Loading</Loader>
      ) : (
        <>
          <Banner
            bgImg={makeImagePath(
              nowPlayingData?.results[0].backdrop_path || ""
            )}
          >
            <Title>{nowPlayingData?.results[0].title}</Title>
            <Overview>{nowPlayingData?.results[0].overview}</Overview>
          </Banner>
          <Slider data={nowPlayingData!} sliderName={layout.nowPlaying} />
          <Slider data={popularData!} sliderName={layout.popular} />
          <Slider data={topRatedData!} sliderName={layout.topRated} />
          <AnimatePresence>
            {bigMovieMatch ? (
              <>
                <Overlay onClick={onOverlayClick} {...overlayVariants} />
                <BigMovie
                  variants={bigMovieVariants}
                  initial="hidden"
                  animate="visible"
                  exit="exit"
                  layoutId={layoutIdPrefix + bigMovieMatch.params.movieId}
                >
                  {clickedMovie && (
                    <>
                      <BigCover
                        bgImg={makeImagePath(
                          clickedMovie.backdrop_path,
                          "original"
                        )}
                      >
                        <BigTitle>{clickedMovie.title}</BigTitle>
                      </BigCover>
                      <BigOverview>{clickedMovie.overview}</BigOverview>
                    </>
                  )}
                </BigMovie>
              </>
            ) : null}
          </AnimatePresence>
        </>
      )}
    </Wrapper>
  );
}

export default Home;
