import { AnimatePresence } from "framer-motion";
import { useQuery } from "react-query";
import { useMatch } from "react-router-dom";
import {
  getOnAirTvProgram,
  getPopularTvProgram,
  getTopRatedTvProgram,
  IGetTvResult,
} from "../../api";
import Banner from "../../Components/Banner/Banner";
import Clicked from "../../Components/Clicked/Clicked";
import Slider from "../../Components/Slider/Slider";
import { Loader, Sliders, Wrapper } from "./Tv.styled";

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

  const clickedTvMatch = useMatch("/tv/:sliderName/:tvId");

  const findTv = (data: IGetTvResult) => {
    return data?.results.find(
      tv => String(tv.id) === clickedTvMatch?.params.tvId
    );
  };

  const clickedTv =
    clickedTvMatch?.params.sliderName === slider.onAir
      ? findTv(onAirData!)
      : clickedTvMatch?.params.sliderName === slider.popular
      ? findTv(popularData!)
      : findTv(topRatedData!);

  console.log(clickedTv);

  return isLoading ? (
    <Loader>Loading...</Loader>
  ) : (
    <Wrapper>
      <Banner bannerTv={onAirData!.results[0]} />
      <Sliders>
        <Slider tvData={onAirData!} sliderName={slider.onAir} />
        <Slider tvData={popularData!} sliderName={slider.popular} />
        <Slider tvData={topRatedData!} sliderName={slider.topRated} />
      </Sliders>
      <AnimatePresence>
        {clickedTvMatch ? (
          <Clicked clickedTvMatch={clickedTvMatch} clickedTv={clickedTv!} />
        ) : null}
      </AnimatePresence>
    </Wrapper>
  );
}

export default Tv;
