import React from 'react';
import styled from 'styled-components';

// Config

export const Logo = () => {
  return (
    <StyledLogoContainer>
      <h1>NUANCE ROMANCER</h1>
    </StyledLogoContainer>
  );
}

const StyledLogoContainer = styled.div`
  background: #dabcbc;
  width: 60px;

  h1 {
    bottom: 220px;
    font-size: 60px;
    left: -261px;
    position: fixed;
    transform: rotate(-90deg);
  }
`;
