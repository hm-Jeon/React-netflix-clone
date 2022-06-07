import { IMovie } from "../../api";
import { makeImagePath } from "../../utils";
import { BannerBox, Overview, Title } from "./Banner.styled";

interface IBannerProps {
  bannerMovie: IMovie;
}

function Banner({ bannerMovie }: IBannerProps) {
  return (
    <BannerBox bgImg={makeImagePath(bannerMovie.backdrop_path || "")}>
      <Title>{bannerMovie.title}</Title>
      <Overview>{bannerMovie.overview}</Overview>
    </BannerBox>
  );
}

export default Banner;
