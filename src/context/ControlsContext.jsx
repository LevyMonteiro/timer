import { createContext } from 'react';
import { useState } from 'react';

export const ControlsContext = createContext();

export default function ControlsProvider({ children }) {
  const [breakLength, setBreakLength] = useState(5);
  const [sessionLength, setSessionLength] = useState(25);
  const [theme, setTheme] = useState(
    localStorage.getItem('theme') ? localStorage.getItem('theme') : 'dark',
  );

  document.querySelector(':root').setAttribute('theme', theme);

  return (
    <ControlsContext.Provider
      value={{
        breakLength,
        setBreakLength,
        sessionLength,
        setSessionLength,
        theme,
        setTheme,
      }}
    >
      {children}
    </ControlsContext.Provider>
  );
}
