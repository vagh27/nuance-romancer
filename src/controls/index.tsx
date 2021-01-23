import styled from 'styled-components';
import { BuildFilled, CaretRightFilled, ForwardOutlined, PauseOutlined } from '@ant-design/icons';

// Config
import { useVideoDispatch, useVideoState, VideoStatus } from 'context/videoContext';
import { IThemeProvider } from 'constants/styles';

export const Controls = () => {
  const { status } = useVideoState();
  const dispatch = useVideoDispatch();
  const playing = status === VideoStatus.PLAY || status === VideoStatus.STAGGER || status === VideoStatus.PROGRESS;

  return (
    <StyledControlsContainer>
      {!playing && (
        <>
          <StyledControl
            onClick={() => dispatch({ type: 'SET_STATUS', status: VideoStatus.PLAY })}
          >
            PLAY ALL <CaretRightFilled />
          </StyledControl>
          <StyledControl
            onClick={() => {
              const duration = prompt('Please enter an interval duration in seconds!');
              dispatch({ type: 'SET_STATUS', status: VideoStatus.STAGGER, duration: Number(duration) * 1000 });
            }}
          >
            STAGGER <BuildFilled />
          </StyledControl>
          <StyledControl
            onClick={() => {
              const duration = prompt('Please enter an interval duration in seconds!');
              dispatch({ type: 'SET_STATUS', status: VideoStatus.PROGRESS, duration: Number(duration) * 1000 });
            }}
          >
            PROGRESS <ForwardOutlined />
          </StyledControl>
        </>
      )}
      
      {playing && (
        <>
          <StyledControl
            onClick={() => dispatch({ type: 'SET_STATUS', status: VideoStatus.PAUSE })}
          >
            Pause <PauseOutlined />
          </StyledControl>
          <StyledControl
            onClick={() => dispatch({ type: 'SET_STATUS', status: VideoStatus.READY })}
          >
            Reset
          </StyledControl>
        </>
      )}
    </StyledControlsContainer>
  );
}

const StyledControlsContainer = styled.div`
  display: flex;
`;

const StyledControl = styled.button`
  border: none;
  border-right: 2px solid white;
  background: black;
  color: white;
  cursor: pointer;
  font-size: 20px;
  font-weight: bold;
  flex: 1;
  transition: all .1s linear;

  &:hover {
    background: ${(props: IThemeProvider ) => props.theme.primaryColor};
    color: black;
  }

  &:last-child {
    border-right: none;
  }
`;
