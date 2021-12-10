import styled from 'styled-components';

interface IWrapperProps {
  height: string;
  minHeight: string;
  width: string;
}

export const Wrapper = styled.div<IWrapperProps>`
  height: ${props => props.height};
  min-height: ${props => props.minHeight};
  width: ${props => props.width};
  position: relative;

  user-select: none;

  & > div:nth-child(1) {
    height: ${props => props.height};
    min-height: ${props => props.minHeight};
    width: ${props => props.width};
    position: absolute;
    top: 0;
    left: 0;
  }
`;

const WidgetWrapperBase = styled.div`
  display: flex;
  flex-direction: row;

  & > div {
    margin-right: 8px;
  }

  & > div:last-child {
    margin-right: 0px;
  }
`;

export const TopLeftWidgetsWrapper = styled(WidgetWrapperBase)`
  position: absolute;
  top: 20px;
  left: 20px;
`;

export const TopCenterWidgetsWrapper = styled(WidgetWrapperBase)`
  position: absolute;
  top: 20px;
  left: 50%;
  transform: translateX(-50%);
`;

export const TopRightWidgetsWrapper = styled(WidgetWrapperBase)`
  position: absolute;
  top: 20px;
  right: 20px;
`;

export const MiddleLeftWidgetsWrapper = styled(WidgetWrapperBase)`
  position: absolute;
  top: 50%;
  left: 20px;
  transform: translateY(-50%);
`;

export const MiddleRightWidgetsWrapper = styled(WidgetWrapperBase)`
  position: absolute;
  top: 50%;
  right: 20px;
  transform: translateY(-50%);
`;

export const BottomLeftWidgetsWrapper = styled(WidgetWrapperBase)`
  position: absolute;
  bottom: 20px;
  left: 20px;
`;

export const BottomCenterWidgetsWrapper = styled(WidgetWrapperBase)`
  position: absolute;
  bottom: 20px;
  left: 50%;
  transform: translateX(-50%);
`;

export const BottomRightWidgetsWrapper = styled(WidgetWrapperBase)`
  position: absolute;
  bottom: 20px;
  right: 20px;
`;
