import { Variants } from "framer-motion";
import { useLocation, useMatch, useNavigate } from "react-router-dom";
import { IMovie, ITv } from "../../api";
import { makeImagePath, QUERY_ID, QUERY_SLIDERNAME } from "../../utils";
import {
  Cover,
  Info,
  ClickedMovieBox,
  Overview,
  Title,
  Overlay,
  BackBtn,
} from "./Clicked.styled";

const overlayVariants: Variants = {
  initial: {
    opacity: 0,
  },
  animate: {
    opacity: 1,
    transition: {
      duration: 0.5,
    },
  },
  exit: {
    opacity: 0,
    transition: {
      duration: 0.5,
    },
  },
};

const clickedVariants: Variants = {
  visible: {
    boxShadow: "2px 2px 2px rgba(0, 0, 0, 0.2)",
    transition: {
      duration: 0.5,
    },
  },
  exit: {
    transition: {
      duration: 0.5,
    },
  },
};

interface IClickedProps {
  clickedMatch: URLSearchParams;
  data: IMovie & ITv;
}

function Clicked({ clickedMatch, data }: IClickedProps) {
  const homeMatch = useMatch("/");
  const tvMatch = useMatch("/tv");
  const searchMatch = new URLSearchParams(useLocation().search);
  const navigate = useNavigate();

  const onBackBtnClick = () => {
    if (homeMatch) navigate("/");
    else if (tvMatch) navigate("/tv");
    else if (searchMatch.has("query"))
      navigate(`/search?query=${searchMatch.get("query")}`);
  };

  return (
    <>
      <Overlay {...overlayVariants} />
      <ClickedMovieBox
        variants={clickedVariants}
        animate="visible"
        exit="exit"
        layoutId={
          clickedMatch!.get(QUERY_SLIDERNAME)! + clickedMatch!.get(QUERY_ID)!
        }
      >
        <>
          <Cover
            bgImg={
              data!.backdrop_path || data!.poster_path
                ? makeImagePath(
                    data!.backdrop_path!
                      ? data!.backdrop_path!
                      : data!.poster_path!,
                    "original"
                  )
                : "http://www.mth.co.kr/wp-content/uploads/2014/12/default-placeholder.png"
            }
          >
            <BackBtn onClick={onBackBtnClick}>
              <i className="fa-solid fa-arrow-left"></i>
            </BackBtn>
            <Title>{data!.title || data!.name}</Title>
          </Cover>
          <Info>
            <Overview>{data?.overview || ""}</Overview>
          </Info>
        </>
      </ClickedMovieBox>
    </>
  );
}

export default Clicked;
