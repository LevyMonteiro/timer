import { useState } from 'react'

const Timer = () => {
  const [breakLength, setBreakLength] = useState(5)
  const [sessionLength, setSessionLength] = useState(25)
  const [timeLeft, setTimeLeft] = useState(1500)

  function handleBreakDecrease() {
    if (breakLength > 1) {
      setBreakLength(breakLength - 1)
    }
  }

  function handleBreakIncrease() {
    if (breakLength < 60) {
      setBreakLength(breakLength + 1)
    }
  }
  
  function handleSessionDecrease() {
    if (sessionLength > 1) {
      setSessionLength(sessionLength - 1)
      setTimeLeft(timeLeft - 60)
    }
  }

  function handleSessionIncrease() {
    if (sessionLength < 60) {
      setSessionLength(sessionLength + 1)
      setTimeLeft(timeLeft + 60)
    }
  }

  function timeFormatter() {
    const minutes = Math.floor(timeLeft / 60)
    const seconds = timeLeft - minutes * 60
    const formattedMinutes = minutes < 10 ? '0' + minutes : minutes
    const formattedSeconds = seconds < 10 ? '0' + seconds : seconds

    return `${formattedMinutes}:${formattedSeconds}`
  }

  return (
    <>
      <label id='break-label'>
        <p>Break Length</p>
        <button id='break-decrement' onClick={handleBreakDecrease}><i className="fa-solid fa-arrow-down"></i></button>
        <p id="break-length">{ breakLength }</p>
        <button id='break-increment' onClick={handleBreakIncrease}><i className="fa-solid fa-arrow-up"></i></button>
      </label>

      <label id='session-label'>
        <p>Session Length</p>
        <button id='session-decrement' onClick={handleSessionDecrease}><i className="fa-solid fa-arrow-down"></i></button>
        <p id="session-length">{ sessionLength }</p>
        <button id='session-increment' onClick={handleSessionIncrease}><i className="fa-solid fa-arrow-up"></i></button>
      </label>

      <label id="timer-label">
        <h2>Session</h2>
        <div id="time-left">{ timeFormatter() }</div>
        <button id="start_stop"><i className="fa-solid fa-play"></i></button>
        <button id="reset"><i className="fa-solid fa-rotate"></i></button>
      </label>
    </>
  ) 
}

export { Timer }