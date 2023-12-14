import { createContext, useState } from 'react';

export const AppContext = createContext();

export default function AppProvider({ children }) {
  const [timeLeft, setTimeLeft] = useState(1500);
  const [timingType, setTimingType] = useState('Session');
  const [timeout, seTTimeout] = useState();
  const [play, setPlay] = useState(false);

  const contextValues = {
    timeLeft,
    setTimeLeft,
    timingType,
    setTimingType,
    timeout,
    seTTimeout,
    play,
    setPlay,
  };

  return (
    <AppContext.Provider value={{ contextValues }}>
      {children}
    </AppContext.Provider>
  );
}
