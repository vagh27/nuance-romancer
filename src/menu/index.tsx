import React, { useEffect, useState } from 'react';
import styled from 'styled-components';

// Config
import { IThemeProvider } from 'constants/styles';

// Context
import { useGlobalDispatch } from 'context/globalContext';

interface IFormValues {
  [key: string]: string;
}
export const Menu = () => {
  const [formValues, setFormValues] = useState<IFormValues>({
    v1: '',
    s1: '',
    v2: '',
    s2: '',
    v3: '',
    s3: '',
    v4: '',
    s4: '',
  });
  const dispatch = useGlobalDispatch();
  const code = ['v', 'i', 'o', 'l', 'i', 'n'];

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

  const submitForm = (e: React.SyntheticEvent) => {
    e.preventDefault();
    let url = `${window.location.origin}?`;

    Object.keys(formValues).forEach((key: string, index: number) => {
      if (formValues[key]) {
        if (index > 0) {
          url = `${url}&`;
        }

        url = `${url}${key}=${formValues[key]}`;
      }
    });

    window.location.href = `${url}#custom`;
  };

  return (
    <StyledMenuContainer>
      <StyledMenuForm onSubmit={submitForm}>
        {[1,2,3,4].map((num: number) => {
          const video: string = `v${num}`;
          const start: string = `s${num}`;

          return (
            <StyledVideoRow>
              <input
                style={{ borderRight: '2px solid white', flex: 2 }}
                type="text"
                placeholder={`Video ${num} ID`}
                value={formValues[video]}
                onChange={e => {
                  setFormValues(Object.assign({}, formValues, {
                    [video]: e.target.value,
                  }))
                }}
              />
              <input
                style={{ flex: 1 }}
                type="number"
                placeholder="Start"
                value={formValues[start]}
                onChange={e => {
                  setFormValues(Object.assign({}, formValues, {
                    [start]: e.target.value,
                  }))
                }}
              />
            </StyledVideoRow>
          );
        })}
        <button
          onClick={submitForm}
        >
          LET'S GO
        </button>
      </StyledMenuForm>
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

const StyledMenuForm = styled.form`
  padding: 5px;

  input {
    background: ${(props: IThemeProvider) => props.theme.primaryColor};
    border: none;
    margin-bottom: 5px;
    padding: 5px;
    width: calc(100% - 12px);
  }

  button {
    background: none;
    border: 2px solid ${(props: IThemeProvider) => props.theme.primaryColor};
    cursor: pointer;
    font-weight: bold;
    padding: 5px;
    transition: all .1s linear;
    width: 100%;

    &:hover {
      background: ${(props: IThemeProvider) => props.theme.primaryColor};
    }
  }
`;

const StyledVideoRow = styled.div`
  display: flex;
`;