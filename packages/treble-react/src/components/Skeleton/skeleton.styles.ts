import styled, { keyframes } from 'styled-components';

interface ShimmerProps {
  shimmer?: boolean;
}

const shimmer = keyframes`
    0% {
      background-position: -468px 0;
    }
    
    100% {
      background-position: 468px 0; 
    }
`;

export const ShimmerDiv = styled.div<ShimmerProps>`
  background: #d9d9d9;
  background-image: linear-gradient(
    to right,
    #d9d9d9 0%,
    #c9c9c9 20%,
    #d9d9d9 40%,
    #d9d9d9 100%
  );
  background-repeat: no-repeat;
  background-size: 800px 140px;

  animation-duration: 1.4s;
  animation-fill-mode: forwards;
  animation-iteration-count: infinite;
  animation-name: ${shimmer};
  animation-timing-function: linear;
`;

export const SkeletonWrapper = styled.div<ShimmerProps>`
  margin: 32px 0 32px 0;

  ${ShimmerDiv} {
    ${props => (props.shimmer ? '' : `background: #d9d9d9;`)}
  }
`;

export const FormHeaderWrapper = styled.div<ShimmerProps>`
  & > div:nth-child(1) {
    height: 32px;
    width: 400px;
    border-radius: 2px;
    margin-bottom: 10px;
    ${props => (props.shimmer ? '' : `background: #d9d9d9;`)}
  }

  & > div:nth-child(2) {
    height: 20px;
    width: 250px;
    border-radius: 2px;
    ${props => (props.shimmer ? '' : `background: #d9d9d9;`)}
  }
`;

export const FormDescriptionWrapper = styled(ShimmerDiv)`
  width: 100%;
  max-width: 440px;
  height: 62px;
  border-radius: 2px;
  margin: 32px 0;

  background-size: 800px 62px;
  ${props => (props.shimmer ? '' : `background: #d9d9d9;`)}
`;

export const TitleWrapper = styled(ShimmerDiv)`
  border-radius: 2px;
  margin-bottom: 8px;
  height: 32px;
  width: 200px;
  ${props => (props.shimmer ? '' : `background: #d9d9d9;`)}
`;

export const DescriptionWrapper = styled(ShimmerDiv)`
  border-radius: 2px;
  margin-bottom: 8px;
  height: 20px;
  width: 250px;
  ${props => (props.shimmer ? '' : `background: #d9d9d9;`)}
`;

export const RowWrapper = styled.div`
  display: flex;
  flex-direction: row;

  & > div {
    margin-right: 12px;
  }

  & > div:last-child {
    margin-right: 0;
  }
`;

export const SwatchItem = styled(ShimmerDiv)`
  height: 40px;
  width: 40px;
  border-radius: 50%;
`;

export const StripsItem = styled.div`
  height: max-content;
  width: 440px;
  border-radius: 2px;
  background: #d9d9d94d;
  padding: 8px;
  margin-bottom: 10px;

  display: grid;
  grid-template-columns: max-content auto max-content;
  grid-gap: 12px;

  & > div:nth-child(1) {
    height: 48px;
    width: 48px;
    border-radius: 2px;
  }

  & > div:nth-child(2) {
    & > div:nth-child(1) {
      height: 20px;
      width: 220px;
      margin-bottom: 6px;
      border-radius: 2px;
    }

    & > div:nth-child(2) {
      height: 20px;
      width: 170px;
      border-radius: 2px;
    }
  }

  & > div:nth-child(3) {
    height: 100%;
    display: flex;
    justify-content: space-around;
    flex-direction: column;

    & > div {
      height: 20px;
      width: 61px;
      border-radius: 2px;
    }
  }
`;

export const CardItem = styled.div`
  height: max-content;
  width: max-content;
  border-radius: 2px;
  background: #d9d9d94d;
  padding: 22px 12px;

  & > div:nth-child(1) {
    height: 110px;
    width: 110px;
    margin-bottom: 6px;
  }

  & > div:nth-child(2) {
    height: 20px;
    width: 110px;
    margin-bottom: 6px;
    border-radius: 2px;
  }

  & > div:nth-child(3) {
    height: 20px;
    width: 72px;
    border-radius: 2px;
  }
`;
