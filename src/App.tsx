import React from 'react';
import styled, { ThemeProvider } from 'styled-components';

// Components
import { Logo } from 'logo';
import { Videos } from 'videos';
import { Toggle } from 'toggle';
import { Controls } from 'controls';

// Constants
import { videoConfig, IVideoConfig } from 'constants/config';
import { THEME, IThemeProvider } from 'constants/styles';

function App() {
  const index = videoConfig.find((config: IVideoConfig) => config.slug === window.location.hash.replace('#', ''))?.id || 0;

  return (
    <ThemeProvider
      theme={THEME}
    >
      <StyledLayout>
        <Logo />
        <StyledMain>
          <StyledHeader>
            <Toggle
              activeIndex={index}
            />
            <Controls
              activeIndex={index}
            />
          </StyledHeader>
          <Videos
            activeIndex={index}
          />
        </StyledMain>
      </StyledLayout>
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