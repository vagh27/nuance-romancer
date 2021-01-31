import React, { useEffect, useState } from 'react';
import styled from 'styled-components';

// Config
import { IThemeProvider } from 'constants/styles';

// Context
import { useGlobalDispatch } from 'context/globalContext';



interface IFormValues {
  v1: string;
  s1: string;
  v2: string;
  s2: string;
}
export const Menu = () => {
  const [formValues, setFormValues] = useState<IFormValues>({
    v1: '',
    s1: '',
    v2: '',
    s2: '',
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
    window.location.href = `${window.location.origin}?v1=${formValues.v1}&s1=${formValues.s1}&v2=${formValues.v2}&s2=${formValues.s2}#custom`;
  };

  return (
    <StyledMenuContainer>
      <StyledMenuForm onSubmit={submitForm}>
        <input
          type="text"
          placeholder="YouTube ID"
          value={formValues.v1}
          onChange={e => {
            setFormValues(Object.assign({}, formValues, {
              v1: e.target.value,
            }))
          }}
        />
        <input
          type="number"
          placeholder="Start Time (seconds)"
          value={formValues.s1}
          onChange={e => {
            setFormValues(Object.assign({}, formValues, {
              s1: e.target.value,
            }))
          }}
        />
        <input
          type="text"
          placeholder="YouTube ID"
          value={formValues.v2}
          onChange={e => {
            setFormValues(Object.assign({}, formValues, {
              v2: e.target.value,
            }))
          }}
        />
        <input
          type="number"
          placeholder="Start Time (seconds)"
          value={formValues.s2}
          onChange={e => {
            setFormValues(Object.assign({}, formValues, {
              s2: e.target.value,
            }))
          }}
        />
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