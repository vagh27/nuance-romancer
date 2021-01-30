import React, { useEffect } from 'react';
import styled from 'styled-components';

// Config
import { IThemeProvider } from 'constants/styles';

// Context
import { useGlobalDispatch } from 'context/globalContext';

const code = ['v', 'i', 'o', 'l', 'i', 'n'];
export const Menu = () => {
  const dispatch = useGlobalDispatch();

  useEffect(() => {
    let codePositon = 0;
  
    document.addEventListener('keydown', (e: KeyboardEvent) => {
      // compare the key with the required key
      if (e.key === code[codePositon]) {
        // move to the next key in the konami code sequence
        codePositon++;
  
        // if the last key is reached, activate modal
        if (codePositon === code.length) {
          dispatch({ type: 'TOGGLE_NAV'});
          codePositon = 0;
        }
      } else {
        codePositon = 0;
      }
    });
  });

  return (
    <StyledMenuContainer>
      MENU
    </StyledMenuContainer>
  );
}

const StyledMenuContainer = styled.div`
  position: fixed;
  z-index: 999;
  height: 100vh;
  width: ${(props: IThemeProvider) => props.theme.menuWidth}px;
  z-index: 1;
`;
