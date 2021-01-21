import React from 'react';
import styled, { ThemeProvider } from 'styled-components';

// Components
import { Logo } from 'logo';
import { Videos } from 'videos';
import { Toggle } from 'toggle';
import { Controls } from 'controls';

// Constants
import { VideoProvider } from 'context/videoContext';
import { THEME, IThemeProvider } from 'constants/styles';

function App() {
  return (
    <ThemeProvider theme={THEME}>
      <VideoProvider>
        <StyledLayout>
          <Logo />
          <StyledMain>
            <StyledHeader>
              <Toggle />
              <Controls />
            </StyledHeader>
            <Videos />
          </StyledMain>
        </StyledLayout>
      </VideoProvider>
    </ThemeProvider>
  );
}

export default App;

const StyledLayout = styled.div`
  background: ${(props: IThemeProvider ) => props.theme.primaryColor};
  display: flex;
`;

const StyledMain = styled.div`
  flex: 1;
`;

const StyledHeader = styled.div`
  display: flex;

  > div {
    width: 50%;
  }
`;