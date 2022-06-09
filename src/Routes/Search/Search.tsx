import { useQuery } from "react-query";
import { useLocation } from "react-router-dom";
import {
  IGetMoviesResult,
  IGetTvResult,
  searchMovie,
  searchTv,
} from "../../api";
import Slider from "../../Components/Slider/Slider";
import { Sliders } from "../../Components/Slider/Slider.styled";
import { Loader } from "../Home/Home.styled";
import { Wrapper } from "./Search.styled";

function Search() {
  // URLSearchParams: URL string에서 parameter값을 parsing해준다. get() 함수를 이용한다.
  const query = new URLSearchParams(useLocation().search).get("keyword");

  const { isLoading: searchMovieLoading, data: searchMovieData } =
    useQuery<IGetMoviesResult>(["search", "movie", query], () =>
      searchMovie(query!)
    );

  const { isLoading: searchTvLoading, data: searchTvData } =
    useQuery<IGetTvResult>(["search", "tv", query], () => searchTv(query!));

  console.log(searchMovieData, searchTvData);

  if (searchMovieData)
    searchMovieData.results = searchMovieData?.results.filter(
      movie => movie.backdrop_path !== null
    );

  if (searchTvData)
    searchTvData.results = searchTvData?.results.filter(
      tv => tv.backdrop_path !== null
    );

  const isLoading = searchMovieLoading || searchTvLoading;

  return (
    <Wrapper>
      {isLoading ? (
        <Loader>Loading</Loader>
      ) : (
        <>
          <Sliders>
            <Slider
              sliderName="movie"
              movieData={searchMovieData!}
              cutOutRemainder={false}
              slider_col={6}
              slice_first={false}
            />
            {searchTvData!.results.length > 0 && (
              <Slider
                sliderName="tv"
                tvData={searchTvData!}
                cutOutRemainder={false}
                slider_col={6}
                slice_first={false}
              />
            )}
          </Sliders>
        </>
      )}
    </Wrapper>
  );
}

export default Search;
