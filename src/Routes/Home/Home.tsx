import {
  getNowPlayingMovies,
  getPopularMovies,
  getTopRatedMovies,
  IGetMoviesResult,
} from "../../api";
import { useQuery } from "react-query";
import { makeImagePath } from "../../utils";
import { Banner, Loader, Overview, Title, Wrapper } from "./Home.styled";
import Slider from "../../Components/Slider/Slider";
import { AnimatePresence } from "framer-motion";
import { useMatch } from "react-router-dom";
import ClickedMovie from "../../Components/ClickedMovie/ClickedMovie";
import { Helmet } from "react-helmet-async";

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

  const bigMovieMatch = useMatch("/movie/:sliderName/:movieId");

  // Array.find() 함수를 이용해서 배열 중 맞는 조건의 요소를 찾을 수 있다.
  const clickedMovie =
    bigMovieMatch?.params.movieId &&
    bigMovieMatch.params.sliderName === layout.nowPlaying
      ? nowPlayingData?.results.find(
          movie => String(movie.id) === bigMovieMatch.params.movieId
        )
      : bigMovieMatch?.params.sliderName === layout.popular
      ? popularData?.results.find(
          movie => String(movie.id) === bigMovieMatch?.params.movieId
        )
      : topRatedData?.results.find(
          movie => String(movie.id) === bigMovieMatch?.params.movieId
        );

  return (
    <>
      <Helmet>
        {clickedMovie ? (
          <title>{clickedMovie?.title} - 넷플릭스</title>
        ) : (
          <title>홈 - 넷플릭스</title>
        )}
      </Helmet>
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
                <ClickedMovie
                  bigMovieMatch={bigMovieMatch}
                  clickedMovie={clickedMovie!}
                />
              ) : null}
            </AnimatePresence>
          </>
        )}
      </Wrapper>
    </>
  );
}

export default Home;
