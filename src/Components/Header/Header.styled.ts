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
  cursor: pointer;
`;

export const Item = styled.li`
  position: relative;
  display: flex;
  justify-content: center;
  margin-right: 20px;
  color: ${props => props.theme.white.darker};
  transition: color 0.3s ease-in-out;

  &:hover {
    color: ${props => props.theme.white.lighter};
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
`;

export const Input = styled(motion.input)`
  position: absolute;
  right: 0;
  width: 180px;
  padding: 10px 10px 10px 30px;
  color: inherit;
  background-color: transparent;
  border: none;
  outline: none;
  font-family: inherit;
  font-size: 1em;
  // transform-origin: transform이 시작되는 위치를 지정 right로 지정하면 오른쪽으로부터 transform이 시작된다.
  transform-origin: right center;
  box-sizing: content-box;
`;
