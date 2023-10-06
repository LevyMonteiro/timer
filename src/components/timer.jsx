const Timer = () => (
 <>
  <label id="timer-label">
    <h2>Session</h2>
    <div id="time-left">
      <span id="session-minutes">25</span>:<span id="session-seconds">00</span>
    </div>
    <button id="start_stop"><i class="fa-solid fa-play"></i></button>
    <button id="reset"><i class="fa-solid fa-rotate"></i></button>
  </label>
 </>
)

export { Timer }