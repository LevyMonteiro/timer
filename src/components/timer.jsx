import { useState } from 'react'

const Timer = () => {
  const [timeLeft, setTimeLeft] = useState(1500)

  function timeFormatter() {
    const minutes = Math.floor(timeLeft / 60)
    const seconds = timeLeft - minutes * 60
    const formattedMinutes = minutes < 10 ? '0' + minutes : minutes
    const formattedSeconds = seconds < 10 ? '0' + seconds : seconds

    return `${formattedMinutes}:${formattedSeconds}`
  }

  return (
    <>
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