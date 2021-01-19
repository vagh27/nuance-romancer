import React, { useState } from 'react';
import styled from 'styled-components';

// Components
import { Logo } from './logo';
import { Videos } from './videos';
import { Toggle } from './toggle';

import { videoConfig, IVideoConfig } from './constants/config';

function App() {
  const index = videoConfig.find((config: IVideoConfig) => config.slug === window.location.hash.replace('#', ''))?.id || 0;
  const [activeIndex, setActiveIndex] = useState(index);

  return (
    <StyledLayout>
      <Logo />
      <StyledMain>
        <Toggle
          activeIndex={activeIndex}
          setActiveIndex={setActiveIndex}
        />
        <Videos
          activeIndex={activeIndex}
        />
      </StyledMain>
    </StyledLayout>
  );
}

export default App;

const StyledLayout = styled.div`
  background: yellow;
  display: flex;
`;


const StyledMain = styled.div`
  flex: 1;
`;