import React, { useState, useMemo, useContext } from 'react';

function createStore() {
  const context = React.createContext();

  // eslint-disable-next-line
  const Provider = ({ children }) => {
    const [state, setState] = useState('green');
    const contextValue = useMemo(() => [state, setState], [state, setState]);
    return <context.Provider value={contextValue}>{children}</context.Provider>;
  };

  const useThemeContext = () => useContext(context);

  return [Provider, useThemeContext];
}

export const [ThemeProvider, useThemeContext] = createStore();
