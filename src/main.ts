import './style.css'
import typescriptLogo from './typescript.svg'
import viteLogo from '/vite.svg'
import { setupCounter } from './counter.ts'

document.querySelector<HTMLDivElement>('#app')!.innerHTML = `
  <div class="container">
    <h1>Time Zone Converter</h1>
    
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
import { initializeApp } from './timeZoneConverter'
initializeApp()
