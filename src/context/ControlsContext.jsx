import { createContext } from 'react';
import { useState } from 'react';

export const ControlsContext = createContext();

export default function ControlsProvider({ children }) {
  const [breakLength, setBreakLength] = useState(5);
  const [sessionLength, setSessionLength] = useState(25);

  return (
    <ControlsContext.Provider
      value={{ breakLength, setBreakLength, sessionLength, setSessionLength }}
    >
      {children}
    </ControlsContext.Provider>
  );
}
