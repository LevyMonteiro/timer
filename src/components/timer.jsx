import { useEffect, useState } from 'react'
import '../styles/timer.css'

const Timer = () => {
  const [breakLength, setBreakLength] = useState(5)
  const [sessionLength, setSessionLength] = useState(25)
  const [timeLeft, setTimeLeft] = useState(1500)
  const [play, setPlay] = useState(false)
  const [timingType, setTimingType] = useState('Session')
  const [timeout, seTTimeout] = useState()

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

  const notifier = {
    getPermission: async () => {
      const permission = await Notification.requestPermission()
    
      if(permission !== 'granted') {
        throw new Error('Notifications permition denied!')
      }
    },
    notify: async (title, body) => {
      new Notification(title, {body, icon: '../relogio.png'})
    }
  }

  const handlePlay = async () => {
    clearTimeout(timeout)
    setPlay(!play)

    try {
      await notifier.getPermission()
    } catch(err) {
      console.log(err)
    }
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

    if(timeLeft === 0) {
      setTimeout(() => {
        if(timingType === 'Session') {
          setTimeLeft(breakLength * 60);
          setTimingType('Break')
          notifier.notify('Session over', 'Time for a break, take the opportunity to catch some air and stretch your body!')
          audio.play()
        } else if(timingType === 'Break') {
            setTimeLeft(sessionLength * 60)
            setTimingType('Session')
            notifier.notify('Break over', "Let's refocus and eliminate distractions!")
            audio.play()
          }
      }, 0)
    }
  }

  const clock = () => {
    if(play) {  
      if (timeLeft > 0) {
        seTTimeout(setTimeout(() => setTimeLeft(prevTimeLeft => prevTimeLeft - 1), 1000))
      }
      resetTimer()
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
      <div className="firstRow">
        <div id='break-label'>
          <p>Break Length</p>
          <div className="btnRow">
            <button className='btn' id='break-decrement' onClick={handleBreakDecrease} disabled={play}><i className="fa-solid fa-arrow-down"></i></button>
            <p id="break-length">{breakLength}</p>
            <button className='btn' id='break-increment' onClick={handleBreakIncrease} disabled={play}><i className="fa-solid fa-arrow-up"></i></button>
          </div>
        </div>

        <div id='session-label'>
          <p>Session Length</p>
          <div className="btnRow">
            <button className='btn' id='session-decrement' onClick={handleSessionDecrease} disabled={play}><i className="fa-solid fa-arrow-down"></i></button>
            <p id="session-length">{sessionLength}</p>
            <button className='btn' id='session-increment' onClick={handleSessionIncrease} disabled={play}><i className="fa-solid fa-arrow-up"></i></button>
          </div>
        </div>
      </div>

      <div className="secondRow">
        <div id="timer-label">
          <div className={timeLeft <= 30 ? "red countdown" : "countdown"}>
            <h3>{timingType}</h3>
            <div id="time-left">{timeFormatter()}</div>
          </div>
          <div className="btnRow">
            <button className='btn' id="start_stop" onClick={handlePlay}><i className={!play ? "fa-solid fa-play" : "fa-solid fa-pause" }></i></button>
            <button className='btn' id="reset" onClick={handleReset}><i className="fa-solid fa-rotate"></i></button>
          </div>
        </div>
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