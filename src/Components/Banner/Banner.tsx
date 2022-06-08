import { IMovie, ITv } from "../../api";
import { makeImagePath } from "../../utils";
import { BannerBox, Overview, Title } from "./Banner.styled";

interface IBannerProps {
  bannerMovie?: IMovie;
  bannerTv?: ITv;
}

function Banner({ bannerMovie, bannerTv }: IBannerProps) {
  return bannerMovie ? (
    <BannerBox bgImg={makeImagePath(bannerMovie.backdrop_path || "")}>
      <Title>{bannerMovie.title}</Title>
      <Overview>{bannerMovie.overview}</Overview>
    </BannerBox>
  ) : (
    <BannerBox bgImg={makeImagePath(bannerTv?.backdrop_path || "")}>
      <Title>{bannerTv?.name}</Title>
      <Overview>{bannerTv?.overview}</Overview>
    </BannerBox>
  );
}

export default Banner;
