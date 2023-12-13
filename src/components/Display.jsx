import { useEffect, useState } from 'react';
import '../styles/timer.css';

function Display() {
  const [timeLeft, setTimeLeft] = useState(1500);
  const play = '';
  const [timingType, setTimingType] = useState('Session');
  const [timeout, seTTimeout] = useState();

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

  function timeFormatter() {
    const minutes = Math.floor(timeLeft / 60);
    const seconds = timeLeft - minutes * 60;
    const formattedMinutes = minutes < 10 ? `0${minutes}` : minutes;
    const formattedSeconds = seconds < 10 ? `0${seconds}` : seconds;

    return `${formattedMinutes}:${formattedSeconds}`;
  }

  return (
    <>
      <div id='timer-label'>
        <div className={timeLeft <= 30 ? 'red countdown' : 'countdown'}>
          <h3>{timingType}</h3>
          <div id='time-left'>{timeFormatter()}</div>
        </div>
      </div>

      <audio
        id='beep'
        preload='auto'
        src='https://raw.githubusercontent.com/freeCodeCamp/cdn/master/build/testable-projects-fcc/audio/BeepSound.wav'
      />
    </>
  );
}

export default Display;
