import React, { useState } from 'react';

// Components
import { Videos } from './videos';
import { Toggle } from './toggle';

function App() {
  const [activeIndex, setActiveIndex] = useState(0);

  return (
    <>
      <Toggle
        activeIndex={activeIndex}
        setActiveIndex={setActiveIndex}
      />
      <Videos
        activeIndex={activeIndex}
      />
    </>
  );
}

export default App;
