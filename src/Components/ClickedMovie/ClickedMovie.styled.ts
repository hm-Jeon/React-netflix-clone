import styled from "styled-components";
import { motion } from "framer-motion";

export const Overlay = styled(motion.div)`
  position: fixed;
  top: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  z-index: 100;
`;

export const ClickedMovieBox = styled(motion.div)`
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

export const Cover = styled.div<BigCoverProps>`
  flex-shrink: 0;
  position: relative;
  width: 100%;
  height: 60%;
  background-image: linear-gradient(rgba(0, 0, 0, 0), rgba(0, 0, 0, 0.9)),
    url(${props => props.bgImg});
  background-position: center center;
  background-size: cover;
`;

export const Title = styled.h2`
  position: absolute;
  bottom: 10px;
  right: 0;
  left: 0;
  text-align: center;
  font-size: 36px;
  font-weight: 600;
`;

export const Info = styled.div`
  position: relative;
  height: 100%;
  overflow-y: scroll;
  &::-webkit-scrollbar {
    display: none;
  }
`;

export const Overview = styled.p`
  padding: 20px;
`;
