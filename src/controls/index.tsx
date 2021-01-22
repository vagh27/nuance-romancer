import styled from 'styled-components';
import { BuildFilled, CaretRightFilled, ForwardOutlined, PauseOutlined } from '@ant-design/icons';

// Config
import { useVideoDispatch, useVideoState } from 'context/videoContext';
import { IThemeProvider } from 'constants/styles';

export const Controls = () => {
  const { playing } = useVideoState();
  const dispatch = useVideoDispatch();

  return (
    <StyledControlsContainer>
      {!playing && (
        <>
          <StyledControl
            onClick={() => dispatch({ type: 'play' })}
          >
            PLAY ALL <CaretRightFilled />
          </StyledControl>
          <StyledControl
            onClick={() => {
              const duration = prompt('Please enter an interval duration in seconds!');
              dispatch({ type: 'stagger', duration: Number(duration) * 1000 });
            }}
          >
            STAGGER <BuildFilled />
          </StyledControl>
          <StyledControl
            onClick={() => {
              const duration = prompt('Please enter an interval duration in seconds!');
              dispatch({ type: 'progress', duration: Number(duration) * 1000 });
            }}
          >
            PROGRESS <ForwardOutlined />
          </StyledControl>
        </>
      )}
      
      {playing && (
        <>
          <StyledControl
            onClick={() => dispatch({ type: 'pause' })}
          >
            Pause <PauseOutlined />
          </StyledControl>
          <StyledControl
            onClick={() => dispatch({ type: 'reset' })}
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
  border: 1px solid white;
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
`;
