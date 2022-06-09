import styled from "styled-components";

interface IBannerProps {
  bgImg: string;
}

export const BannerBox = styled.div<IBannerProps>`
  display: flex;
  flex-direction: column;
  justify-content: center;
  height: 80vh;
  padding: 0 50px;
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
  /* top: 100px; */
  width: 70%;
  max-width: 1000px;
  margin-bottom: 10px;
  font-size: 80px;
  font-weight: 600;
  line-height: 1.2em;
  text-shadow: 1px 1px 5px rgba(0, 0, 0, 0.3);
`;

export const Overview = styled.p`
  position: relative;
  /* top: 100px; */
  width: 50%;
  min-width: 400px;
  max-width: 800px;
  font-size: 18px;
  line-height: 1.5;
  text-shadow: 1px 1px 5px rgba(0, 0, 0, 0.3);
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 5;
  overflow: hidden;
`;
