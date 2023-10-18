import { useEffect, useState } from 'react'

const Timer = () => {
  const [breakLength, setBreakLength] = useState(5)
  const [sessionLength, setSessionLength] = useState(25)
  const [timeLeft, setTimeLeft] = useState(1500)
  const [play, setPlay] = useState(false)
  const [timingType, setTimingType] = useState('Session')
  const [timeout, seTTimeout] = useState()

  // const timeout = setTimeout(() => {
  //   if(play && timeLeft) {
  //     setTimeLeft(prevTimeLeft => prevTimeLeft - 1)
  //   }
  // }, 1000)

  const handleBreakDecrease = () => {
    if (breakLength > 1) {
      if(timingType === 'Break') {
        setTimeLeft((breakLength - 1) * 60)
      }
      setBreakLength(breakLength - 1)
    }
  }

  const handleBreakIncrease = () => {
    if (breakLength < 60) {
      if(timingType === 'Break') {
        setTimeLeft((breakLength + 1) * 60)
      }
      setBreakLength(breakLength + 1)
    }
  }
  
  const handleSessionDecrease = () => {
    if (sessionLength > 1) {
      if(timingType === 'Session') {
        setTimeLeft((sessionLength - 1) * 60)
      }
      setSessionLength(sessionLength - 1)
    }
  }

  const handleSessionIncrease = () => {
    if (sessionLength < 60) {
      if(timingType === 'Session') {
        setTimeLeft((sessionLength + 1) * 60)
      }
      setSessionLength(sessionLength + 1)
    }
  }

  const handlePlay = () => {
    clearTimeout(timeout)
    setPlay(!play)
  }

  const handleReset = () => {
    const audio = document.querySelector('#beep')
    audio.pause()
    audio.currentTime = 0
    
    clearTimeout(timeout)
    setPlay(false)
    setTimingType('Session')
    setTimeLeft(1500)
    setBreakLength(5)
    setSessionLength(25)
  }

  const resetTimer = () => {
    const audio = document.getElementById('beep')
    clearTimeout(timeout)
    if(!timeLeft && timingType === 'Session') {
      setTimeLeft(breakLength * 60);
      setTimingType('Break')
      audio.play()
    } 
    if(!timeLeft && timingType === 'Break') {
      setTimeLeft(sessionLength * 60)
      setTimingType('Session')
      audio.play()
    }
  }

  const clock = () => {
    if(play) {  
      clearTimeout(timeout)
      seTTimeout(setTimeout(() => {
        if (play && timeLeft) {
          setTimeLeft(prevTimeLeft => prevTimeLeft - 1);
        }
      }, 1000))
      resetTimer()
      console.log(timeLeft)
    } else {
      clearTimeout(timeout)
    }
  }

  useEffect(() => {
    clock()
  }, [play, timeLeft])

  function timeFormatter() {
    const minutes = Math.floor(timeLeft / 60)
    const seconds = timeLeft - minutes * 60
    const formattedMinutes = minutes < 10 ? '0' + minutes : minutes
    const formattedSeconds = seconds < 10 ? '0' + seconds : seconds

    return `${formattedMinutes}:${formattedSeconds}`
  }

  return (
    <>
      <h1>Timer</h1>
      <div id='break-label'>
        <p>Break Length</p>
        <button id='break-decrement' onClick={handleBreakDecrease} disabled={play}><i className="fa-solid fa-arrow-down"></i></button>
        <p id="break-length">{breakLength}</p>
        <button id='break-increment' onClick={handleBreakIncrease} disabled={play}><i className="fa-solid fa-arrow-up"></i></button>
      </div>

      <div id='session-label'>
        <p>Session Length</p>
        <button id='session-decrement' onClick={handleSessionDecrease} disabled={play}><i className="fa-solid fa-arrow-down"></i></button>
        <p id="session-length">{sessionLength}</p>
        <button id='session-increment' onClick={handleSessionIncrease} disabled={play}><i className="fa-solid fa-arrow-up"></i></button>
      </div>

      <div id="timer-label">
        <h2>{timingType}</h2>
        <div id="time-left">{timeFormatter()}</div>
        <button id="start_stop" onClick={handlePlay}><i className="fa-solid fa-play"></i></button>
        <button id="reset" onClick={handleReset}><i className="fa-solid fa-rotate"></i></button>
      </div>

      <audio
        id="beep" 
        preload="auto"
        src="https://raw.githubusercontent.com/freeCodeCamp/cdn/master/build/testable-projects-fcc/audio/BeepSound.wav"
      />
    </>
  ) 
}

export { Timer }