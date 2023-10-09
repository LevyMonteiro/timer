import  { useState } from 'react'

const Settings = () => {  
  const [breakLength, setBreakLength] = useState(5)

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
  
  return  (
    <>
      <label id='break-label'>
        <p>Break Length</p>
        <button id='break-decrement' onClick={handleBreakDecrease}><i class="fa-solid fa-arrow-down"></i></button>
        <p id="break-length">{ breakLength }</p>
        <button id='break-increment' onClick={handleBreakIncrease}><i class="fa-solid fa-arrow-up"></i></button>
      </label>

      <label id='session-label'>
        <p>Session Length</p>
        <button id='session-decrement'><i class="fa-solid fa-arrow-down"></i></button>
        <p id="session-length">25</p>
        <button id='session-increment'><i class="fa-solid fa-arrow-up"></i></button>
      </label>
    </>
  )
}

export { Settings }