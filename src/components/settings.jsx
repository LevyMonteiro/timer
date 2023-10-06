const Settings = () => (
  <>
    <label id='break-label'>
      <p>Break Length</p>
      <button id='break-decrement'><i class="fa-solid fa-arrow-down"></i></button>
      <p id="break-length">5</p>
      <button id='break-increment'><i class="fa-solid fa-arrow-up"></i></button>
    </label>

    <label id='session-label'>
      <p>Session Length</p>
      <button id='session-decrement'><i class="fa-solid fa-arrow-down"></i></button>
      <p id="session-length">25</p>
      <button id='session-increment'><i class="fa-solid fa-arrow-up"></i></button>
    </label>
  </>
)

export { Settings }