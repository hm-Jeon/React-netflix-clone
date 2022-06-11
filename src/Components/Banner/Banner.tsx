import { IMovie, ITv } from "../../api";
import { makeImagePath } from "../../utils";
import { BannerBox, BannerInfo, Overview, Title } from "./Banner.styled";

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
      <BannerInfo>
        <Title>{bannerMovie?.title || bannerTv!.name}</Title>
        <Overview>{bannerMovie?.overview || bannerTv!.overview}</Overview>
      </BannerInfo>
    </BannerBox>
  );
}

export default Banner;
