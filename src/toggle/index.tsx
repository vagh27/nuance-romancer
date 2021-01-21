import React from 'react';
import styled from 'styled-components';

// Config
import { IThemeProvider } from 'constants/styles';
import { videoConfig, IVideoConfig } from 'constants/config';

export const Toggle = ({ activeIndex }: { activeIndex: number }) => (
  <StyledSelect
    onChange={(e) => {
      window.location.hash = `#${e.target.value}`;
      window.location.reload();
    }}
  >
    {videoConfig.map((videoConfig: IVideoConfig, index: number) => (
      <option
        key={index}
        value={videoConfig.slug}
        selected={activeIndex === index}
      >
        {videoConfig.name}
      </option>
    ))}
  </StyledSelect>
);

const StyledSelect = styled.select`
  background: #efefef;
  font-size: 18px;
  font-weight: bold;
  height: ${(props: IThemeProvider) => props.theme.headerHeight}px;
  padding: 0 20px;
  text-transform: uppercase;
  width: 100%;
`;

