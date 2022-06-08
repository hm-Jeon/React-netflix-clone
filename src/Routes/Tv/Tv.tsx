import { useQuery } from "react-query";
import { getOnAirTvProgram, IGetTvResult } from "../../api";
import Banner from "../../Components/Banner/Banner";
import { Wrapper } from "./Tv.styled";

function Tv() {
  const { data, isLoading } = useQuery<IGetTvResult>(
    ["tv", "onAir"],
    getOnAirTvProgram
  );
  console.log(data);

  return isLoading ? (
    <h1>Loading...</h1>
  ) : (
    <Wrapper>
      <Banner bannerTv={data!.results[0]} />
    </Wrapper>
  );
}

export default Tv;
