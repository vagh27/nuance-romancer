import React, { useState } from 'react';
import styled from 'styled-components';

// Components
import { Logo } from './logo';
import { Videos } from './videos';
import { Toggle } from './toggle';

function App() {
  const [activeIndex, setActiveIndex] = useState(0);

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