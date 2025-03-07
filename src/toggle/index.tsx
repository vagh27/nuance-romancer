import React from 'react';
import styled from 'styled-components';

// Config
import { IThemeProvider } from 'constants/styles';
import { useVideoState } from 'context/videoContext';
import { IVideoConfig } from 'constants/config';

export const Toggle = () => {
  const { activeConfig, videoConfig } = useVideoState();

  return (
    <StyledSelect
      defaultValue={activeConfig.slug}
      onChange={(e) => {
        window.history.pushState('', '', `${window.location.origin}#${e.target.value}`);
        window.location.reload();
      }}
    >
      {videoConfig.map((videoConfig: IVideoConfig, index: number) => (
        <option
          key={index}
          value={videoConfig.slug}
        >
          {videoConfig.name}
        </option>
      ))}
    </StyledSelect>
  );
}

const StyledSelect = styled.select`
  background: #efefef;
  font-size: 18px;
  font-weight: bold;
  height: ${(props: IThemeProvider) => props.theme.headerHeight}px;
  padding: 0 20px;
  text-transform: uppercase;
  width: 100%;
`;

