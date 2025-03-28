import './style.css'

document.querySelector<HTMLDivElement>('#app')!.innerHTML = `
  <div class="container">
    <header>
      <h1>Time Zone Converter</h1>
      <button id="dark-mode-toggle" class="theme-toggle">
        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
          <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path>
        </svg>
      </button>
    </header>
    
    <div class="custom-time-section">
      <h3>Custom Date & Time</h3>
      <div class="custom-time-inputs">
        <div class="date-input">
          <label for="custom-date">Date:</label>
          <input type="date" id="custom-date">
        </div>
        <div class="time-input">
          <label for="custom-time">Time:</label>
          <input type="time" id="custom-time">
        </div>
        <button id="apply-custom-time">Apply</button>
      </div>
    </div>
    
    <div class="timezone-selector">
      <div class="source-timezone">
        <h3>Source Time Zone</h3>
        <select id="source-timezone"></select>
      </div>
      
      <div class="additional-timezones">
        <h3>Additional Time Zones</h3>
        <div class="timezone-list" id="timezone-list">
          <!-- Additional time zones will be added here -->
        </div>
        <div class="add-timezone">
          <select id="add-timezone-select"></select>
          <button id="add-timezone-btn">Add Time Zone</button>
        </div>
      </div>
    </div>
    
    <div class="timezone-display">
      <div class="sort-options">
        <button id="sort-btn">Sort by Offset</button>
      </div>
      <div class="timezone-table" id="timezone-table">
        <!-- Time zone table will be rendered here -->
      </div>
    </div>
  </div>
`

// Initialize the application
import { initializeApp } from './timeZoneConverter.js'
initializeApp()
