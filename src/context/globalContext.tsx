import React from 'react';

interface IGlobalContext {
  toggleNav: boolean;  
}

interface IGlobalDispatch {
  type: string;
}

const GlobalStateContext = React.createContext<IGlobalContext | undefined>(undefined);
const GlobalDispatchContext = React.createContext<any | undefined>(undefined);

function globalReducer(state: IGlobalContext, action: IGlobalDispatch) {
  switch (action.type) {
    case 'TOGGLE_NAV': {
      return {
        ...state,
        toggleNav: !state.toggleNav,
      };
    }
    default: {
      throw new Error(`Unhandled action type: ${action.type}`)
    }
  }
}

function GlobalProvider({ children }: { children: any }) {
  const [state, dispatch] = React.useReducer(globalReducer, {
    toggleNav: false,
  });

  return (
    <GlobalStateContext.Provider value={state}>
      <GlobalDispatchContext.Provider value={dispatch}>
        {children}
      </GlobalDispatchContext.Provider>
    </GlobalStateContext.Provider>
  )
}

function useGlobalState() {
  const context = React.useContext(GlobalStateContext);
  if (context === undefined) {
    throw new Error('useGlobalState must be used within a GlobalProvider');
  }
  return context;
}

function useGlobalDispatch() {
  const context = React.useContext(GlobalDispatchContext);
  if (context === undefined) {
    throw new Error('useGlobalDispatch must be used within a GlobalProvider');
  }
  return context;
}

export { GlobalProvider, useGlobalState, useGlobalDispatch }
