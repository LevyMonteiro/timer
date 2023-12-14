import { ControlsContext } from '../context/ControlsContext';
import { AppContext } from '../context/AppContext';
import { useContext } from 'react';
import { notifier } from './App';

export default function Controls() {
  const { breakLength, setBreakLength, sessionLength, setSessionLength } =
    useContext(ControlsContext);

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

  return (
    <>
      <div className='firstRow'>
        <div id='break-label'>
          <p>Break Length</p>
          <div className='btnRow'>
            <button
              // if (play) add transform blur
              className='btn'
              id='break-decrement'
              onClick={handleBreakDecrease}
              disabled={play}
            >
              <i className='fa-solid fa-arrow-down' />
            </button>
            <p id='break-length'>{breakLength}</p>
            <button
              // if (play) add transform blur
              className='btn'
              id='break-increment'
              onClick={handleBreakIncrease}
              disabled={play}
            >
              <i className='fa-solid fa-arrow-up' />
            </button>
          </div>
        </div>

        <div id='session-label'>
          <p>Session Length</p>
          <div className='btnRow'>
            <button
              // if (play) add transform blur
              className='btn'
              id='session-decrement'
              onClick={handleSessionDecrease}
              disabled={play}
            >
              <i className='fa-solid fa-arrow-down' />
            </button>
            <p id='session-length'>{sessionLength}</p>
            <button
              // if (play) add transform blur
              className='btn'
              id='session-increment'
              onClick={handleSessionIncrease}
              disabled={play}
            >
              <i className='fa-solid fa-arrow-up' />
            </button>
          </div>
        </div>
      </div>

      <div className='secondRow'>
        <div className='btnRow'>
          <button className='btn' id='start_stop' onClick={handlePlay}>
            <i className={!play ? 'fa-solid fa-play' : 'fa-solid fa-pause'} />
          </button>
          <button className='btn' id='reset' onClick={handleReset}>
            <i className='fa-solid fa-rotate' />
          </button>
        </div>
      </div>
    </>
  );
}
