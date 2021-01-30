import React from 'react';
import styled from 'styled-components';

// Context
import { useGlobalState } from 'context/globalContext';

// Constants
import { IThemeProvider } from 'constants/styles';

export const Layout = ({ children }: { children: any }) => {
  const { toggleNav } = useGlobalState();

  return (
    <StyledLayout toggleNav={toggleNav}>
      {children}
    </StyledLayout>
  );
}

interface IStyledLayout extends IThemeProvider {
  toggleNav: boolean; 
}
const StyledLayout = styled.div<IStyledLayout>`
  background: ${props => props.theme.primaryColor};
  display: flex;
  height: 100vh;
  left: ${props => props.toggleNav ? props.theme.menuWidth : 0}px;
  position: fixed;
  top: 0;
  transition: all .2s linear;
  width: 100%;
  z-index: 2;

  &:before {
    background: black;
    content: '';
    height: 100%;
    opacity: 0;
    position: absolute;
    transition: all .2s linear;
    width: 100%;
    z-index: 1;

    ${props => props.toggleNav && `
      opacity: 0.75;
      z-index: 2;
    `}
  }
`;
