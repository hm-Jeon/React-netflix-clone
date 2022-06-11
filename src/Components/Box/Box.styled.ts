import { motion } from "framer-motion";
import styled from "styled-components";

export const Wrapper = styled(motion.div)`
  display: flex;
  flex-direction: column;
  height: fit-content;
  background-color: transparent;
  border-radius: 3px;
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
  flex-direction: column;
  opacity: 0;
  width: 100%;
  padding: 15px;
  background-color: ${props => props.theme.black.darker};
  border-radius: 0 0 5px 5px;
  user-select: none;
`;

export const Buttons = styled.div`
  display: flex;
  justify-content: space-between;
  /* align-items: center; */
  padding-bottom: 10px;
`;

export const ButtonGroup = styled.div`
  display: flex;
  gap: 8px;
`;

export const Button = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 30px;
  width: 30px;
  background-color: ${props => props.theme.black.darker};
  border: 1px solid ${props => props.theme.white.darker};
  border-radius: 50%;
  cursor: pointer;

  &:hover {
    background-color: ${props => props.theme.black.lighter};
    border: 1px solid ${props => props.theme.white.lighter};
  }

  i {
    color: ${props => props.theme.white.lighter};
    font-size: 14px;
  }
`;

export const PlayButton = styled(Button)`
  background-color: ${props => props.theme.white.lighter};
  border: 1px solid ${props => props.theme.white.lighter};

  &:hover {
    background-color: ${props => props.theme.white.darker};
    border: 1px solid ${props => props.theme.white.darker};
  }

  i {
    color: ${props => props.theme.black.veryDark};
  }
`;

export const Title = styled.h1`
  font-size: 14px;
  font-weight: 600;
  text-align: center;
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 3;
  overflow: hidden;
`;
