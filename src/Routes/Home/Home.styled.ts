import styled from "styled-components";

export const Wrapper = styled.div`
  /* position: relative; */
  min-height: 100vh;
  background-color: ${props => props.theme.black.veryDark};
`;

export const Loader = styled.div`
  height: 20vh;
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const Sliders = styled.div`
  overflow: hidden;
  padding: 50px 0;
`;
