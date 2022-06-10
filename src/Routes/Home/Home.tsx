import {
  getNowPlayingMovies,
  getPopularMovies,
  getTopRatedMovies,
  IGetMoviesResult,
  IMovie,
  ITv,
} from "../../api";
import { useQuery } from "react-query";
import { Loader, Wrapper } from "./Home.styled";
import Slider from "../../Components/Slider/Slider";
import { AnimatePresence } from "framer-motion";
import { useLocation } from "react-router-dom";
import Clicked from "../../Components/Clicked/Clicked";
import { Helmet } from "react-helmet-async";
import Banner from "../../Components/Banner/Banner";
import { Sliders } from "../../Components/Slider/Slider.styled";
import { useEffect } from "react";
import { QUERY_ID, QUERY_SLIDERNAME } from "../../utils";

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

  const clickedMovieMatch = new URLSearchParams(useLocation().search);

  const findMovie = (data: IGetMoviesResult) => {
    return data?.results.find(
      movie => String(movie.id) === clickedMovieMatch.get(QUERY_ID)
    );
  };

  // Array.find() 함수를 이용해서 배열 중 맞는 조건의 요소를 찾을 수 있다.
  const clickedMovie =
    clickedMovieMatch.get(QUERY_SLIDERNAME) === slider.nowPlaying
      ? findMovie(nowPlayingData!)
      : clickedMovieMatch.get(QUERY_SLIDERNAME) === slider.popular
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
                data={nowPlayingData!.results! as (IMovie & ITv)[]}
                sliderName={slider.nowPlaying}
              />
              <Slider
                data={popularData!.results! as (IMovie & ITv)[]}
                sliderName={slider.popular}
              />
              <Slider
                data={topRatedData!.results! as (IMovie & ITv)[]}
                sliderName={slider.topRated}
              />
            </Sliders>
            <AnimatePresence>
              {clickedMovieMatch.has(QUERY_SLIDERNAME) ? (
                <Clicked
                  clickedMatch={clickedMovieMatch}
                  data={clickedMovie as IMovie & ITv}
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
