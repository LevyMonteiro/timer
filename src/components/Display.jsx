import '../styles/styles.css';
import { AppContext } from '../context/AppContext';
import { useContext } from 'react';

export default function Display() {
  const { timeLeft, timingType } = useContext(AppContext);

  function timeFormatter() {
    const minutes = Math.floor(timeLeft / 60);
    const seconds = timeLeft - minutes * 60;
    const formattedMinutes = minutes < 10 ? `0${minutes}` : minutes;
    const formattedSeconds = seconds < 10 ? `0${seconds}` : seconds;

    return `${formattedMinutes}:${formattedSeconds}`;
  }
  return (
    <div className={timeLeft <= 30 ? 'red display' : 'display'}>
      <h3>{timingType}</h3>
      <div className='time-left'>{timeFormatter()}</div>
    </div>
  );
}
