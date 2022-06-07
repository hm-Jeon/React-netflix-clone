import styled from "styled-components";
import { motion } from "framer-motion";

export const Wrapper = styled.div`
  /* position: relative; */
  min-height: 100vh;
  background-color: ${props => props.theme.black.veryDark};
  /* overflow-x: hidden; */
  /* overflow-y: visible; */
  /* overflow-x: hidden; */
`;

export const Loader = styled.div`
  height: 20vh;
  display: flex;
  justify-content: center;
  align-items: center;
`;

interface IBannerProps {
  bgImg: string;
}

export const Banner = styled.div<IBannerProps>`
  display: flex;
  flex-direction: column;
  justify-content: center;
  height: 80vh;
  padding: 0 60px;
  /* background-image 속성값으로 여러 요소를 지정할 수 있다. 가장 처음 지정한 요소가 가장 위에 배치된다. */
  background-image: linear-gradient(
      ${props => props.theme.black.veryDark}00,
      ${props => props.theme.black.veryDark}ff
    ),
    url(${props => props.bgImg});
  background-size: cover;
  /* background-size: cover로 지정했을 때 background-image의 어느 부분을 기준으로 cover할지 지정함 */
  background-position: center top;
`;

export const Title = styled.h2`
  position: relative;
  top: 80px;
  width: 70%;
  min-width: 400px;
  max-width: 1000px;
  margin-bottom: 10px;
  font-size: 50px;
  font-weight: 600;
  line-height: 1.2em;
`;

export const Overview = styled.p`
  position: relative;
  top: 80px;
  width: 50%;
  min-width: 400px;
  max-width: 800px;
  font-size: 16px;
  line-height: 1.4;
`;

export const Overlay = styled(motion.div)`
  position: fixed;
  top: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  z-index: 100;
`;

export const BigMovie = styled(motion.div)`
  position: fixed;
  width: 60vw;
  max-width: 800px;
  height: 90vh;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  display: flex;
  flex-direction: column;
  margin: auto auto;
  color: ${props => props.theme.white.lighter};
  background-color: ${props => props.theme.black.darker};
  border-radius: 10px;
  overflow: hidden;
  z-index: 1000;
`;

interface BigCoverProps {
  bgImg: string;
}

export const BigCover = styled.div<BigCoverProps>`
  flex-shrink: 0;
  position: relative;
  width: 100%;
  height: 60%;
  background-image: linear-gradient(rgba(0, 0, 0, 0), rgba(0, 0, 0, 0.9)),
    url(${props => props.bgImg});
  background-position: center center;
  background-size: cover;
`;

export const BigTitle = styled.h2`
  position: absolute;
  bottom: 10px;
  right: 0;
  left: 0;
  text-align: center;
  font-size: 36px;
  font-weight: 600;
`;

export const BigInfo = styled.div`
  position: relative;
  height: 100%;
  overflow-y: scroll;
  &::-webkit-scrollbar {
    display: none;
  }
`;

export const BigOverview = styled.p`
  padding: 20px;
`;
