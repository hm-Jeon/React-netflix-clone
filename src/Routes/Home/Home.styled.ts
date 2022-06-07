import styled from "styled-components";

export const Wrapper = styled.div`
  /* position: relative; */
  min-height: 100vh;
  background-color: ${props => props.theme.black.veryDark};
  /* overflow-x: hidden; */
  /* overflow-y: visible; */
  /* overflow-x: hidden; */
`;

export const Loader = styled.div`
  height: 20vh;
  display: flex;
  justify-content: center;
  align-items: center;
`;

interface IBannerProps {
  bgImg: string;
}

export const Banner = styled.div<IBannerProps>`
  display: flex;
  flex-direction: column;
  justify-content: center;
  height: 80vh;
  padding: 0 60px;
  /* background-image 속성값으로 여러 요소를 지정할 수 있다. 가장 처음 지정한 요소가 가장 위에 배치된다. */
  background-image: linear-gradient(
      ${props => props.theme.black.veryDark}00,
      ${props => props.theme.black.veryDark}ff
    ),
    url(${props => props.bgImg});
  background-size: cover;
  /* background-size: cover로 지정했을 때 background-image의 어느 부분을 기준으로 cover할지 지정함 */
  background-position: center top;
`;

export const Title = styled.h2`
  position: relative;
  top: 80px;
  width: 70%;
  min-width: 400px;
  max-width: 1000px;
  margin-bottom: 10px;
  font-size: 50px;
  font-weight: 600;
  line-height: 1.2em;
`;

export const Overview = styled.p`
  position: relative;
  top: 80px;
  width: 50%;
  min-width: 400px;
  max-width: 800px;
  font-size: 16px;
  line-height: 1.4;
`;
