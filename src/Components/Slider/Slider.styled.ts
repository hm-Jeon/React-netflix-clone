import styled from "styled-components";
import { motion } from "framer-motion";

export const Sliders = styled.div`
  position: relative;
  padding-bottom: 60px;
  z-index: 1;

  &::-webkit-scrollbar {
    display: none;
  }
`;

export const SliderBars = styled.div`
  display: none;
  gap: 2px;
  position: absolute;
  top: -20px;
  right: 60px;
`;

interface ISliderBarProps {
  active: boolean;
}

export const SliderBar = styled.div<ISliderBarProps>`
  height: 2px;
  width: 15px;
  background-color: ${props =>
    props.active ? props.theme.white.darker : props.theme.black.lighter};
`;

export const Wrapper = styled.div`
  position: relative;
  height: 150px;
  margin-bottom: 50px;

  &:hover {
    button {
      opacity: 1;
    }

    & > ${SliderBars} {
      display: flex;
    }
  }
`;

export const SliderTitle = styled.h1`
  padding: 10px 50px;
  font-size: 30px;
  font-weight: 600;
  text-transform: uppercase;
`;

interface IRowProps {
  slider_col: number;
}

export const Row = styled(motion.div)<IRowProps>`
  position: absolute;
  height: 100%;
  width: 100%;
  display: grid;
  grid-template-columns: repeat(${props => props.slider_col}, 1fr);
  gap: 5px;
  padding: 0 50px;
`;

const Button = styled(motion.button)`
  position: absolute;
  height: 100%;
  width: 50px;
  border: none;
  color: white;
  background-color: transparent;
  font-size: 20px;
  z-index: 1;
  cursor: pointer;
  opacity: 0;
  backdrop-filter: blur(0.5px);
  transition: font-size 0.1s linear, opacity 0.3s ease-in-out;

  &:hover {
    font-size: 30px;
  }
`;

export const BackButton = styled(Button)`
  background-image: linear-gradient(
    to left,
    ${props => props.theme.black.veryDark}00,
    ${props => props.theme.black.veryDark}ff
  );
`;

export const NextButton = styled(Button)`
  right: 0;
  background-image: linear-gradient(
    to right,
    ${props => props.theme.black.veryDark}00,
    ${props => props.theme.black.veryDark}ff
  );
`;
