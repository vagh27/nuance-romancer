import React from 'react';
import styled from 'styled-components';

// Config
import { IThemeProvider } from 'constants/styles';

export const Logo = () => {
  return (
    <StyledLogoContainer>
      <h1><span>NUANCE</span> ROMANCER</h1>
    </StyledLogoContainer>
  );
}

const StyledLogoContainer = styled.div`
  background: ${(props: IThemeProvider ) => props.theme.primaryColor};
  width: ${(props: IThemeProvider) => props.theme.logoWidth}px;

  h1 {
    bottom: 205px;
    font-size: 60px;
    font-weight: 100;
    left: -246px;
    position: fixed;
    transform: rotate(-90deg);

    span {
      font-weight: 900;
    }
  }
`;
