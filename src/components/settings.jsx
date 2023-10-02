const Settings = () => (
  <>
    <label id='break-label'>
      <p>Break Length</p>
      <p id="break-length">5</p>
      <button id='break-decrement'></button>
      <button id='break-increment'></button>
    </label>

    <label id='session-label'>
      <p>Session Length</p>
      <p id="session-length">25</p>
      <button id='session-decrement'></button>
      <button id='session-increment'></button>
    </label>
  </>
)

export { Settings }