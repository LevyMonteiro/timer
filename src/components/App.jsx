import '../styles/styles.css';
import { useEffect, useContext } from 'react';
import Display from './Display';
import Controls from './Controls';
import Footer from './Footer';
import { AppContext } from '../context/AppContext';
import { ControlsContext } from '../context/ControlsContext';
import { notifier } from '../js/notifier';

export default function App() {
  const {
    timeLeft,
    setTimeLeft,
    timingType,
    setTimingType,
    timeout,
    seTTimeout,
    play,
  } = useContext(AppContext);

  const { breakLength, sessionLength } = useContext(ControlsContext);

  const resetTimer = () => {
    const audio = document.getElementById('beep');

    if (timeLeft === 0) {
      setTimeout(() => {
        if (timingType === 'Session') {
          setTimeLeft(breakLength * 60);
          setTimingType('Break');
          notifier.notify(
            'Session over',
            'Time for a break, catch some air and stretch your body!',
          );
          audio.play();
        } else if (timingType === 'Break') {
          setTimeLeft(sessionLength * 60);
          setTimingType('Session');
          notifier.notify(
            'Break over',
            "Let's refocus and eliminate distractions!",
          );
          audio.play();
        }
      }, 0);
    }
  };

  const clock = () => {
    if (play) {
      if (timeLeft > 0) {
        seTTimeout(
          setTimeout(
            () => setTimeLeft((prevTimeLeft) => prevTimeLeft - 1),
            1000,
          ),
        );
      }
      resetTimer();
    } else {
      clearTimeout(timeout);
    }
  };

  useEffect(() => {
    clock();
  }, [play, timeLeft]);
  return (
    <>
      <div className='container'>
        <Display />
        <Controls />
        <Footer />
      </div>

      <audio
        id='beep'
        preload='auto'
        src='https://raw.githubusercontent.com/freeCodeCamp/cdn/master/build/testable-projects-fcc/audio/BeepSound.wav'
      />
    </>
  );
}
