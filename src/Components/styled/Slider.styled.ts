import styled from "styled-components";
import { motion } from "framer-motion";

export const Wrapper = styled.div`
  position: relative;
  height: 200px;
  margin-bottom: 100px;
  /* top: -200px; */
  /* opacity: 0; */
  &:hover {
    button {
      opacity: 1;
    }
  }
`;

export const Row = styled(motion.div)`
  position: absolute;
  width: 100%;
  display: grid;
  grid-template-columns: repeat(6, 1fr);
  gap: 5px;
  padding: 0 5px;
`;

export const Button = styled(motion.button)`
  position: absolute;
  height: 100%;
  border: none;
  padding: 0 10px;
  color: white;
  background-color: rgba(0, 0, 0, 0.5);
  font-size: 20px;
  z-index: 1;
  cursor: pointer;
  opacity: 0;
  transition: background-color 0.3s ease-in-out, opacity 0.3s ease-in-out;

  &:hover {
    background-color: rgba(0, 0, 0, 0.8);
  }
`;
