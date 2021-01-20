import React from 'react';
import styled from 'styled-components';

// Config
import { HEADER_HEIGHT } from '../constants/styles';
import { videoConfig, IVideoConfig } from '../constants/config';

export const Toggle = ({ activeIndex, setActiveIndex }: { activeIndex: number, setActiveIndex: (index: number) => void }) => {
  

  return (
    <StyledSelect
      onChange={(e) => {
        window.location.hash = `#${e.target.value}`;
        window.location.reload();
      }}
    >
      {videoConfig.map((videoConfig: IVideoConfig, index: number) => (
        <StyledSelectOption
          key={index}
          value={videoConfig.slug}
          selected={activeIndex === index}
        >
          {videoConfig.name}
        </StyledSelectOption>
      ))}
    </StyledSelect>
  );
}

const StyledSelect = styled.select`
  background: #efefef;
  font-size: 16px;
  font-weight: bold;
  height: ${HEADER_HEIGHT}px;
  padding: 0 20px;
  text-transform: uppercase;
  width: 100%;
`;

const StyledSelectOption = styled.option`

`;
