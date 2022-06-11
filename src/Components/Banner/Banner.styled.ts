import styled from "styled-components";

interface IBannerProps {
  bgImg: string;
}

export const BannerBox = styled.div<IBannerProps>`
  position: relative;
  height: 40vw;
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

export const BannerInfo = styled.div`
  position: absolute;
  bottom: 50px;
  display: flex;
  flex-direction: column;
  max-width: 1000px;
  width: 60%;
`;

export const Title = styled.h2`
  position: relative;
  margin-bottom: 10px;
  font-size: 4vw;
  font-weight: 600;
  line-height: 1.2em;
  text-shadow: 1px 1px 5px rgba(0, 0, 0, 0.3);

  @media screen and (max-width: 800px) {
    display: none;
  }
`;

export const Overview = styled.p`
  position: relative;
  font-size: 1.1vw;
  line-height: 1.5;
  text-shadow: 1px 1px 5px rgba(0, 0, 0, 0.3);
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 5;
  overflow: hidden;

  @media screen and (max-width: 1200px) {
    display: none;
  }
`;
