import React from 'react';
import styled from 'styled-components';

// Config
import { IThemeProvider } from 'constants/styles';

export const Logo = () => {
  return (
    <StyledLogoContainer>
      <h1>NUANCE ROMANCER</h1>
    </StyledLogoContainer>
  );
}

const StyledLogoContainer = styled.div`
  background: ${(props: IThemeProvider ) => props.theme.primaryColor};
  width: ${(props: IThemeProvider) => props.theme.logoWidth}px;

  h1 {
    bottom: 220px;
    font-size: 60px;
    left: -261px;
    position: fixed;
    transform: rotate(-90deg);
  }
`;
