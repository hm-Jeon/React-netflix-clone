import styled from "styled-components";
import { motion } from "framer-motion";

export const Wrapper = styled.div`
  position: relative;
  height: 200px;
  margin: 0 50px 100px;

  &:hover {
    button {
      opacity: 1;
    }
  }
`;

export const SliderTitle = styled.h1`
  padding: 10px 0;
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
`;

const Button = styled(motion.button)`
  position: absolute;
  height: 100%;
  border: none;
  padding: 0 10px;
  color: white;
  background-color: rgba(0, 0, 0, 0);
  font-size: 20px;
  z-index: 1;
  cursor: pointer;
  opacity: 0;
  transition: background-color 0.3s ease-in-out, opacity 0.3s ease-in-out;

  &:hover {
    background-color: rgba(0, 0, 0, 0.3);
  }
`;

export const BackButton = styled(Button)`
  border-radius: 5px 0 0 5px;
`;

export const NextButton = styled(Button)`
  right: 0;
  border-radius: 0 5px 5px 0;
`;
