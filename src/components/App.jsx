import { useEffect } from 'react';
import '../styles/App.css';
import Display from './Display';
import Controls from './Controls';
import { Footer } from './footer';
const play = ''; //temporary to stop throw error and render
const timeLeft = ''; //temporary to stop throw error and render
const timeout = ''; //temporary to stop throw error and render

export default function App() {
  const notifier = {
    getPermission: async () => {
      const permission = await Notification.requestPermission();

      if (permission !== 'granted') {
        throw new Error('Notifications permition denied!');
      }
    },
    notify: async (title, body) => {
      new Notification(title, { body, icon: '../relogio.png' });
    },
  };

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
      <div className='wrapper'>
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
