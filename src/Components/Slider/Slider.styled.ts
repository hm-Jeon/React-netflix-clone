import styled from "styled-components";
import { motion } from "framer-motion";

export const Wrapper = styled.div`
  position: relative;
  height: 200px;
  margin: 0 0 50px;

  &:hover {
    button {
      opacity: 1;
    }
  }
`;

export const SliderTitle = styled.h1`
  padding: 10px 50px;
  font-size: 30px;
  font-weight: 600;
  text-transform: uppercase;
`;

export const Row = styled(motion.div)`
  position: absolute;
  width: 100%;
  display: grid;
  grid-template-columns: repeat(6, 1fr);
  gap: 5px;
  padding: 0 50px;
`;

const Button = styled(motion.button)`
  position: absolute;
  height: 100%;
  border: none;
  padding: 0 20px;
  color: white;
  background-color: transparent;
  font-size: 20px;
  z-index: 1;
  cursor: pointer;
  opacity: 0;
  backdrop-filter: blur(0.5px);
  transition: font-size 0.3s ease-in-out, opacity 0.3s ease-in-out,
    background-image 0.3s ease-in-out;

  &:hover {
    font-size: 30px;
  }
`;

export const BackButton = styled(Button)`
  background-image: linear-gradient(
    to left,
    rgba(0, 0, 0, 0),
    rgba(0, 0, 0, 1)
  );
`;

export const NextButton = styled(Button)`
  right: 0;
  background-image: linear-gradient(
    to right,
    rgba(0, 0, 0, 0),
    rgba(0, 0, 0, 1)
  );
`;
