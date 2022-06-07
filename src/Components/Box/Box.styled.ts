import { motion } from "framer-motion";
import styled from "styled-components";

export const Wrapper = styled(motion.div)`
  height: 150px;
  /* height: 100%; */
  background-color: transparent;
  border-radius: 5px;
  cursor: pointer;

  &:hover {
    overflow: visible;
    img {
      border-radius: 5px 5px 0 0;
    }
  }
`;

export const Poster = styled(motion.img)`
  width: 100%;
  height: 100%;
  border-radius: 5px;
  /* img나 video의 size 설정할 수 있음 (background-size와 유사) */
  object-fit: cover;
  object-position: center center;
  transition: border-radius 1s ease-in-out;
`;

export const Info = styled(motion.div)`
  position: relative;
  top: -4px;
  width: 100%;
  padding: 10px;
  background-color: ${props => props.theme.black.lighter};
  border-radius: 0 0 5px 5px;
  opacity: 0;
  user-select: none;

  h4 {
    font-size: 14px;
    text-align: center;
  }
`;
