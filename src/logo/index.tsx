import React from 'react';
import styled from 'styled-components';

// Config
import { IThemeProvider } from 'constants/styles';

// Context
import { useGlobalDispatch } from 'context/globalContext';

export const Logo = () => {
  const dispatch = useGlobalDispatch();
  
  return (
    <StyledLogoContainer>
      <h1 onClick={() => dispatch({ type: 'TOGGLE_NAV'})}>
        <span>NUANCE</span> ROMANCER
      </h1>
    </StyledLogoContainer>
  );
}

const StyledLogoContainer = styled.div`
  border-left: 12px solid white;
  width: ${(props: IThemeProvider) => props.theme.logoWidth - 12}px;

  button {
    background: none;
    border: none;
  }

  h1 {
    bottom: 205px;
    cursor: pointer;
    font-size: 60px;
    font-weight: 100;
    left: -255px;
    position: fixed;
    transform: rotate(-90deg);

    span {
      font-weight: 900;
    }
  }
`;
