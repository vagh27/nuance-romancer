import React from 'react';
import styled, { ThemeProvider } from 'styled-components';

// Components
import { Controls } from 'controls';
import { Layout } from 'layout';
import { Logo } from 'logo';
import { Menu } from 'menu';
import { Toggle } from 'toggle';
import { Videos } from 'videos';

// Context
import { GlobalProvider } from 'context/globalContext';
import { VideoProvider } from 'context/videoContext';

// Constants
import { THEME } from 'constants/styles';

function App() {
  return (
    <ThemeProvider theme={THEME}>
      <GlobalProvider>
        <VideoProvider>
          <Menu />
          <Layout>
            <Logo />
            <StyledMain>
              <StyledHeader>
                <Toggle />
                <Controls />
              </StyledHeader>
              <Videos />
            </StyledMain>
          </Layout>
        </VideoProvider>
      </GlobalProvider>
    </ThemeProvider>
  );
}

export default App;

const StyledMain = styled.div`
  flex: 1;
`;

const StyledHeader = styled.div`
  display: flex;

  > div {
    width: 50%;
  }
`;