import { AnimatePresence } from "framer-motion";
import { Helmet } from "react-helmet-async";
import { useQuery } from "react-query";
import { useLocation } from "react-router-dom";
import {
  IGetMoviesResult,
  IGetTvResult,
  IMovie,
  ITv,
  searchMovie,
  searchTv,
} from "../../api";
import Clicked from "../../Components/Clicked/Clicked";
import Slider from "../../Components/Slider/Slider";
import { Sliders } from "../../Components/Slider/Slider.styled";
import { QUERY_ID, QUERY_SLIDERNAME } from "../../utils";
import { Loader } from "../Home/Home.styled";
import { Wrapper } from "./Search.styled";

function Search() {
  // URLSearchParams: URL string에서 parameter값을 parsing해준다. get() 함수를 이용한다.
  const query = new URLSearchParams(useLocation().search).get("query");

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

  const clickedSearchedItemMatch = new URLSearchParams(useLocation().search);

  const findSearchedItem = (data: IGetMoviesResult & IGetTvResult) => {
    return data?.results.find(
      item => String(item.id) === clickedSearchedItemMatch.get(QUERY_ID)
    );
  };

  const clickedSearchedItem =
    clickedSearchedItemMatch.get(QUERY_SLIDERNAME) === "movie"
      ? findSearchedItem(searchMovieData as IGetMoviesResult & IGetTvResult)
      : clickedSearchedItemMatch.get(QUERY_SLIDERNAME) === "tv" &&
        findSearchedItem(searchTvData as IGetMoviesResult & IGetTvResult);

  return (
    <>
      <Helmet>
        <title>검색 - 넷플릭스</title>
      </Helmet>
      <Wrapper>
        {isLoading ? (
          <Loader>Loading</Loader>
        ) : (
          <>
            <Sliders>
              {searchMovieData!.results.length > 0 && (
                <Slider
                  sliderName="movie"
                  data={searchMovieData!.results! as (IMovie & ITv)[]}
                  cutOutRemainder={false}
                  slice_first={false}
                />
              )}
              {searchTvData!.results.length > 0 && (
                <Slider
                  sliderName="tv"
                  data={searchTvData!.results! as (IMovie & ITv)[]}
                  cutOutRemainder={false}
                  slice_first={false}
                />
              )}
            </Sliders>
            <AnimatePresence>
              {clickedSearchedItemMatch.has(QUERY_SLIDERNAME) ? (
                <Clicked
                  clickedMatch={clickedSearchedItemMatch}
                  data={clickedSearchedItem as IMovie & ITv}
                />
              ) : null}
            </AnimatePresence>
          </>
        )}
      </Wrapper>
    </>
  );
}

export default Search;
