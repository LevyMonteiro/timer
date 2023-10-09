import  { useState } from 'react'

const Settings = () => {  
  const [breakLength, setBreakLength] = useState(5)
  const [sessionLength, setSessionLength] = useState(25)

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
    }
  }

  function handleSessionIncrease() {
    if (sessionLength < 60) {
      setSessionLength(sessionLength + 1)
    }
  }

  return  (
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
    </>
  )
}

export { Settings }