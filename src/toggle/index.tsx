import React from 'react';
import styled from 'styled-components';

// Config
import { HEADER_HEIGHT } from '../constants/styles';
import { videoConfig, IVideoConfig } from '../constants/config';

export const Toggle = ({ activeIndex, setActiveIndex }: { activeIndex: number, setActiveIndex: (index: number) => void }) => {
  return (
    <StyledToggle>
      {videoConfig.map((videoConfig: IVideoConfig, index: number) => (
        <StyledToggleItem key={index}>
          <StyledToggleButton
            onClick={() => setActiveIndex(index)}
            isActive={activeIndex === index}
          >
            {videoConfig.name}
          </StyledToggleButton>
        </StyledToggleItem>
      ))}
    </StyledToggle>
  );
}

const StyledToggle = styled.ul`
  background: #efefef;
  display: flex;
  height: ${HEADER_HEIGHT}px;
  margin: 0;
  padding: 0;
  width: 100%;
`;

const StyledToggleItem = styled.li`
  flex: 1;
  list-style-type: none;
`;

const StyledToggleButton = styled.button`
  background: none;
  border: none;
  border-bottom: 1px solid red;
  border-left: 1px solid red;
  cursor: pointer;
  display: block;
  height: 100%;
  outline: none;
  padding: 0 20px;
  text-align: left;
  width: 100%;

  ${(props: { isActive: boolean }) => props.isActive && `
    text-decoration: underline;
  `}
`;
