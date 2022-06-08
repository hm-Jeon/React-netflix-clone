import { IMovie, ITv } from "../../api";
import { makeImagePath } from "../../utils";
import { BannerBox, Overview, Title } from "./Banner.styled";

interface IBannerProps {
  bannerMovie?: IMovie;
  bannerTv?: ITv;
}

function Banner({ bannerMovie, bannerTv }: IBannerProps) {
  return (
    <BannerBox
      bgImg={makeImagePath(
        bannerMovie?.backdrop_path || bannerTv!.backdrop_path
      )}
    >
      <Title>{bannerMovie?.title || bannerTv!.name}</Title>
      <Overview>{bannerMovie?.overview || bannerTv!.overview}</Overview>
    </BannerBox>
  );
}

export default Banner;
