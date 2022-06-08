import { motion } from "framer-motion";
import styled from "styled-components";

export const Wrapper = styled(motion.div)`
  display: flex;
  flex-direction: column;
  height: fit-content;
  background-color: transparent;
  border-radius: 5px;
  cursor: pointer;
  overflow: hidden;
`;

export const Poster = styled(motion.img)`
  width: 100%;
  height: 150px;
  /* img나 video의 size 설정할 수 있음 (background-size와 유사) */
  object-fit: cover;
  object-position: center center;
`;

export const Info = styled(motion.div)`
  display: none;
  opacity: 0;
  width: 100%;
  padding: 10px;
  background-color: ${props => props.theme.black.darker};
  border-radius: 0 0 5px 5px;
  user-select: none;

  h4 {
    font-size: 14px;
    text-align: center;
    display: -webkit-box;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 3;
    overflow: hidden;
  }
`;
