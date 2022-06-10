import { AnimatePresence } from "framer-motion";
import { useEffect } from "react";
import { Helmet } from "react-helmet-async";
import { useQuery } from "react-query";
import { useLocation } from "react-router-dom";
import {
  getOnAirTvProgram,
  getPopularTvProgram,
  getTopRatedTvProgram,
  IGetTvResult,
  IMovie,
  ITv,
} from "../../api";
import Banner from "../../Components/Banner/Banner";
import Clicked from "../../Components/Clicked/Clicked";
import Slider from "../../Components/Slider/Slider";
import { Sliders } from "../../Components/Slider/Slider.styled";
import { QUERY_ID, QUERY_SLIDERNAME } from "../../utils";
import { Loader, Wrapper } from "./Tv.styled";

const TV_KEY = "tv";

enum slider {
  onAir = "on Air",
  popular = "popular",
  topRated = "top Rated",
}

function Tv() {
  const { data: onAirData, isLoading: onAirLoading } = useQuery<IGetTvResult>(
    [TV_KEY, slider.onAir],
    getOnAirTvProgram
  );

  const { data: popularData, isLoading: popularLoading } =
    useQuery<IGetTvResult>([TV_KEY, slider.popular], getPopularTvProgram);

  const { data: topRatedData, isLoading: topRatedLoading } =
    useQuery<IGetTvResult>([TV_KEY, slider.topRated], getTopRatedTvProgram);

  const isLoading = onAirLoading || popularLoading || topRatedLoading;

  const clickedTvMatch = new URLSearchParams(useLocation().search);

  const findTv = (data: IGetTvResult) => {
    return data?.results.find(
      tv => String(tv.id) === clickedTvMatch.get(QUERY_ID)
    );
  };

  const clickedTv =
    clickedTvMatch.get(QUERY_SLIDERNAME) === slider.onAir
      ? findTv(onAirData!)
      : clickedTvMatch.get(QUERY_SLIDERNAME) === slider.popular
      ? findTv(popularData!)
      : findTv(topRatedData!);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <>
      <Helmet>
        {clickedTv ? (
          <title>{clickedTv.name} - 넷플릭스</title>
        ) : (
          <title>TV - 넷플릭스</title>
        )}
      </Helmet>
      <Wrapper>
        {isLoading ? (
          <Loader>Loading...</Loader>
        ) : (
          <>
            <Banner bannerTv={onAirData!.results[0]} />
            <Sliders>
              <Slider
                data={onAirData!.results! as (IMovie & ITv)[]}
                sliderName={slider.onAir}
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
              {clickedTvMatch.has(QUERY_SLIDERNAME) ? (
                <Clicked
                  clickedMatch={clickedTvMatch}
                  data={clickedTv as IMovie & ITv}
                />
              ) : null}
            </AnimatePresence>
          </>
        )}
      </Wrapper>
    </>
  );
}

export default Tv;
