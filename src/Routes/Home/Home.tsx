import {
  getNowPlayingMovies,
  getPopularMovies,
  getTopRatedMovies,
  IGetMoviesResult,
} from "../../api";
import { useQuery } from "react-query";
import { Loader, Wrapper } from "./Home.styled";
import Slider from "../../Components/Slider/Slider";
import { AnimatePresence } from "framer-motion";
import { useMatch } from "react-router-dom";
import Clicked from "../../Components/Clicked/Clicked";
import { Helmet } from "react-helmet-async";
import Banner from "../../Components/Banner/Banner";
import { Sliders } from "../../Components/Slider/Slider.styled";
import { useEffect } from "react";

const MOVIES_KEY = "movies";

enum slider {
  nowPlaying = "now Playing",
  popular = "popular",
  topRated = "top Rated",
}

function Home() {
  const { isLoading: nowPlayingLoading, data: nowPlayingData } =
    useQuery<IGetMoviesResult>(
      [MOVIES_KEY, slider.nowPlaying],
      getNowPlayingMovies
    );

  const { isLoading: popularLoading, data: popularData } =
    useQuery<IGetMoviesResult>([MOVIES_KEY, slider.popular], getPopularMovies);

  const { isLoading: upTopRatedLoading, data: topRatedData } =
    useQuery<IGetMoviesResult>(
      [MOVIES_KEY, slider.topRated],
      getTopRatedMovies
    );

  const isLoading = nowPlayingLoading || popularLoading || upTopRatedLoading;

  const clickedMovieMatch = useMatch("/movie/:sliderName/:movieId");

  const findMovie = (data: IGetMoviesResult) => {
    return data?.results.find(
      movie => String(movie.id) === clickedMovieMatch?.params.movieId
    );
  };

  // Array.find() 함수를 이용해서 배열 중 맞는 조건의 요소를 찾을 수 있다.
  const clickedMovie =
    clickedMovieMatch?.params.sliderName === slider.nowPlaying
      ? findMovie(nowPlayingData!)
      : clickedMovieMatch?.params.sliderName === slider.popular
      ? findMovie(popularData!)
      : findMovie(topRatedData!);

  // 페이지 이동시 Top으로 scroll 이동
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

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
              <Slider
                movieData={nowPlayingData!}
                sliderName={slider.nowPlaying}
              />
              <Slider movieData={popularData!} sliderName={slider.popular} />
              <Slider movieData={topRatedData!} sliderName={slider.topRated} />
            </Sliders>
            <AnimatePresence>
              {clickedMovieMatch ? (
                <Clicked
                  clickedMovieMatch={clickedMovieMatch}
                  clickedMovie={clickedMovie}
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
