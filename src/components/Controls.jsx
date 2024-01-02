import '../styles/styles.css';
import { useContext, useState } from 'react';
import {
  Sun,
  Moon,
  RotateCcw,
  Play,
  ArrowUp,
  ArrowDown,
  Pause,
} from 'lucide-react';
import { ControlsContext } from '../context/ControlsContext';
import { AppContext } from '../context/AppContext';
import { notifier } from '../js/notifier';

export default function Controls() {
  const {
    breakLength,
    setBreakLength,
    sessionLength,
    setSessionLength,
    theme,
    setTheme,
  } = useContext(ControlsContext);

  const { setTimeLeft, timingType, setTimingType, timeout, play, setPlay } =
    useContext(AppContext);

  const handleBreakDecrease = () => {
    if (breakLength > 1) {
      if (timingType === 'Break') {
        setTimeLeft((breakLength - 1) * 60);
      }
      setBreakLength(breakLength - 1);
    }
  };

  const handleBreakIncrease = () => {
    if (breakLength < 60) {
      if (timingType === 'Break') {
        setTimeLeft((breakLength + 1) * 60);
      }
      setBreakLength(breakLength + 1);
    }
  };

  const handleSessionDecrease = () => {
    if (sessionLength > 1) {
      if (timingType === 'Session') {
        setTimeLeft((sessionLength - 1) * 60);
      }
      setSessionLength(sessionLength - 1);
    }
  };

  const handleSessionIncrease = () => {
    if (sessionLength < 60) {
      if (timingType === 'Session') {
        setTimeLeft((sessionLength + 1) * 60);
      }
      setSessionLength(sessionLength + 1);
    }
  };

  const handlePlay = async () => {
    clearTimeout(timeout);
    setPlay(!play);

    try {
      await notifier.getPermission();
    } catch (err) {
      console.log(err);
    }
  };

  const handleReset = () => {
    const audio = document.querySelector('#beep');
    audio.pause();
    audio.currentTime = 0;

    clearTimeout(timeout);
    setPlay(false);
    setTimingType('Session');
    setTimeLeft(1500);
    setBreakLength(5);
    setSessionLength(25);
  };

  const handleThemeChange = () => {
    if (theme === 'dark') {
      setTheme('light');
      localStorage.setItem('theme', 'light');
    } else {
      setTheme('dark');
      localStorage.setItem('theme', 'dark');
    }
  };

  return (
    <div className='controls'>
      <div className='firstRow'>
        <div className='break-label'>
          <p>Break Length</p>
          <div className='btnRow'>
            <button
              className={play ? 'btn btnDisabled' : 'btn'}
              onClick={handleBreakDecrease}
              disabled={play}
            >
              <ArrowDown />
            </button>
            <p>{breakLength}</p>
            <button
              className={play ? 'btn btnDisabled' : 'btn'}
              onClick={handleBreakIncrease}
              disabled={play}
            >
              <ArrowUp />
            </button>
          </div>
        </div>

        <div className='session-label'>
          <p>Session Length</p>
          <div className='btnRow'>
            <button
              className={play ? 'btn btnDisabled' : 'btn'}
              onClick={handleSessionDecrease}
              disabled={play}
            >
              <ArrowDown />
            </button>
            <p>{sessionLength}</p>
            <button
              className={play ? 'btn btnDisabled' : 'btn'}
              onClick={handleSessionIncrease}
              disabled={play}
            >
              <ArrowUp />
            </button>
          </div>
        </div>
      </div>

      <div className='btnRow'>
        <button className='btn' onClick={handlePlay}>
          {play ? <Pause /> : <Play />}
        </button>
        <button className='btn' onClick={handleReset}>
          <RotateCcw />
        </button>
        <button className='btn' onClick={handleThemeChange}>
          {theme === 'dark' ? <Sun /> : <Moon />}
        </button>
      </div>
    </div>
  );
}
