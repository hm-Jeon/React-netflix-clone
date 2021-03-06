import { motion } from "framer-motion";
import styled from "styled-components";

export const Nav = styled(motion.nav)`
  position: fixed;
  top: 0;
  right: 0;
  left: 0;
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 14px;
  padding: 20px 40px;
  color: white;
  z-index: 10;
`;

export const Col = styled.div`
  display: flex;
  align-items: center;
`;

export const Logo = styled(motion.svg)`
  height: 25px;
  width: 95px;
  margin-right: 50px;
  fill: ${props => props.theme.red};
  cursor: pointer;

  path {
    /* stroke-width: 6px; */
    stroke: white;
  }
`;

export const Path = styled(motion.path)``;

export const Items = styled.ul`
  display: flex;
  align-items: center;
  gap: 10px;
`;

interface IItemProps {
  active: boolean;
}

export const Item = styled.li<IItemProps>`
  position: relative;
  display: flex;
  justify-content: center;

  a {
    color: ${props =>
      props.active ? props.theme.white.lighter : props.theme.white.darker};
    font-size: 16px;
    font-weight: ${props => (props.active ? "600" : "200")};
    cursor: ${props => (props.active ? "default" : "pointer")};
    transition: opacity 0.3s ease-in-out;

    &:hover {
      opacity: ${props => !props.active && 0.7};
    }
  }
`;

export const Circle = styled(motion.span)`
  position: absolute;
  bottom: -8px;
  height: 5px;
  width: 5px;
  background-color: ${props => props.theme.red};
  border-radius: 50%;
`;

export const Search = styled.form`
  position: relative;
  display: flex;
  align-items: center;
  color: ${props => props.theme.white.lighter};
`;

export const Svg = styled(motion.svg)`
  height: 20px;
  cursor: pointer;
  z-index: 1;
  transition: opacity 0.3s ease-in-out;

  &:hover {
    opacity: 0.5;
  }
`;

export const Input = styled(motion.input)`
  position: absolute;
  right: 0;
  width: 180px;
  padding: 10px 10px 10px 40px;
  color: inherit;
  background-color: transparent;
  border: none;
  outline: none;
  font-family: inherit;
  font-size: 18px;
  // transform-origin: transform??? ???????????? ????????? ?????? right??? ???????????? ????????????????????? transform??? ????????????.
  transform-origin: right center;
  box-sizing: content-box;
`;
