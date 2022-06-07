import {
  getNowPlayingMovies,
  getPopularMovies,
  getTopRatedMovies,
  IGetMoviesResult,
} from "../../api";
import { useQuery } from "react-query";
import { Loader, Sliders, Wrapper } from "./Home.styled";
import Slider from "../../Components/Slider/Slider";
import { AnimatePresence } from "framer-motion";
import { useMatch } from "react-router-dom";
import ClickedMovie from "../../Components/ClickedMovie/ClickedMovie";
import { Helmet } from "react-helmet-async";
import Banner from "../../Components/Banner/Banner";

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
            <Banner bannerMovie={nowPlayingData?.results[0]!} />
            <Sliders>
              <Slider data={nowPlayingData!} sliderName={layout.nowPlaying} />
              <Slider data={popularData!} sliderName={layout.popular} />
              <Slider data={topRatedData!} sliderName={layout.topRated} />
            </Sliders>
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
