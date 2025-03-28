// Define timezone data structure
interface TimeZone {
  id: string;
  name: string;
  abbreviation: string;
  offset: number;
  city?: string;
}

// List of common timezones
const timeZones: TimeZone[] = [
  { id: 'UTC', name: 'Coordinated Universal Time', abbreviation: 'UTC', offset: 0 },
  { id: 'GMT', name: 'Greenwich Mean Time', abbreviation: 'GMT', offset: 0, city: 'London' },
  { id: 'EST', name: 'Eastern Standard Time', abbreviation: 'EST', offset: -5, city: 'New York' },
  { id: 'EDT', name: 'Eastern Daylight Time', abbreviation: 'EDT', offset: -4, city: 'New York' },
  { id: 'CST', name: 'Central Standard Time', abbreviation: 'CST', offset: -6, city: 'Chicago' },
  { id: 'CDT', name: 'Central Daylight Time', abbreviation: 'CDT', offset: -5, city: 'Chicago' },
  { id: 'MST', name: 'Mountain Standard Time', abbreviation: 'MST', offset: -7, city: 'Denver' },
  { id: 'MDT', name: 'Mountain Daylight Time', abbreviation: 'MDT', offset: -6, city: 'Denver' },
  { id: 'PST', name: 'Pacific Standard Time', abbreviation: 'PST', offset: -8, city: 'Los Angeles' },
  { id: 'PDT', name: 'Pacific Daylight Time', abbreviation: 'PDT', offset: -7, city: 'Los Angeles' },
  { id: 'CET', name: 'Central European Time', abbreviation: 'CET', offset: 1, city: 'Paris' },
  { id: 'CEST', name: 'Central European Summer Time', abbreviation: 'CEST', offset: 2, city: 'Paris' },
  { id: 'IST', name: 'Indian Standard Time', abbreviation: 'IST', offset: 5.5, city: 'Mumbai' },
  { id: 'JST', name: 'Japan Standard Time', abbreviation: 'JST', offset: 9, city: 'Tokyo' },
  { id: 'AEST', name: 'Australian Eastern Standard Time', abbreviation: 'AEST', offset: 10, city: 'Sydney' },
  { id: 'AEDT', name: 'Australian Eastern Daylight Time', abbreviation: 'AEDT', offset: 11, city: 'Sydney' },
];

// Holds the selected timezones
let selectedTimeZones: TimeZone[] = [];
let sourceTimeZone: TimeZone | null = null;

// Format a time (hour) as a 2-digit string with AM/PM
function formatTime(hour: number): string {
  const h = hour % 12 === 0 ? 12 : hour % 12;
  const ampm = hour < 12 ? 'AM' : 'PM';
  return `${h}:00${ampm}`;
}

// Get time for a timezone based on UTC time
function getTimeForTimeZone(utcHour: number, timezone: TimeZone): number {
  const localHour = (utcHour + timezone.offset + 24) % 24;
  return Math.floor(localHour);
}

// Check if daylight saving time is in effect for a timezone based on current date
function isDST(timezone: TimeZone): boolean {
  // This is a simplified implementation
  // In a real app, this would use a proper timezone library like Luxon or Moment-Timezone
  const date = new Date();
  const month = date.getMonth(); // 0-indexed (0 = January, 11 = December)

  // Northern Hemisphere DST roughly applies from March to November
  if (timezone.city && ["New York", "Chicago", "Denver", "Los Angeles", "Paris", "London"].includes(timezone.city)) {
    return month > 2 && month < 10;
  }
  
  // Southern Hemisphere DST roughly applies from October to April
  if (timezone.city && ["Sydney"].includes(timezone.city)) {
    return month < 4 || month > 9;
  }

  return false;
}

// Adjust timezone offset for DST
function adjustForDST(timezone: TimeZone): TimeZone {
  if (!isDST(timezone)) {
    return timezone;
  }

  // Convert from standard time to DST
  if (timezone.abbreviation === 'EST') {
    return timeZones.find(tz => tz.abbreviation === 'EDT')!;
  }
  if (timezone.abbreviation === 'CST') {
    return timeZones.find(tz => tz.abbreviation === 'CDT')!;
  }
  if (timezone.abbreviation === 'MST') {
    return timeZones.find(tz => tz.abbreviation === 'MDT')!;
  }
  if (timezone.abbreviation === 'PST') {
    return timeZones.find(tz => tz.abbreviation === 'PDT')!;
  }
  if (timezone.abbreviation === 'CET') {
    return timeZones.find(tz => tz.abbreviation === 'CEST')!;
  }
  if (timezone.abbreviation === 'AEST') {
    return timeZones.find(tz => tz.abbreviation === 'AEDT')!;
  }

  return timezone;
}

// Generate time grid for 24 hours
function generateTimeGrid(): void {
  const tableElement = document.getElementById('timezone-table');
  if (!tableElement || !sourceTimeZone) return;

  // Clear existing content
  tableElement.innerHTML = '';

  // Create the table structure
  const table = document.createElement('table');
  table.className = 'timezone-grid';

  // Create header row with timezone names
  const headerRow = document.createElement('tr');
  headerRow.innerHTML = `<th>Time</th>`;
  
  // Add column for each timezone
  const currentTimezones = [sourceTimeZone, ...selectedTimeZones];
  currentTimezones.forEach(timezone => {
    const adjustedTz = adjustForDST(timezone);
    headerRow.innerHTML += `<th>${adjustedTz.abbreviation} (${adjustedTz.city || adjustedTz.name})</th>`;
  });
  
  table.appendChild(headerRow);

  // Create 24 rows for each hour
  for (let hour = 0; hour < 24; hour++) {
    const row = document.createElement('tr');
    row.id = `hour-${hour}`;
    row.className = 'hour-row';
    
    // Add the source time cell
    const sourceTime = formatTime(hour);
    row.innerHTML = `<td class="time-cell">${sourceTime}</td>`;
    
    // For each timezone, calculate the corresponding time
    currentTimezones.forEach((timezone, index) => {
      const adjustedTz = adjustForDST(timezone);
      const offsetFromSource = adjustedTz.offset - adjustForDST(sourceTimeZone!).offset;
      const tzHour = (hour + offsetFromSource + 24) % 24;
      const tzTime = formatTime(tzHour);
      
      // Add a special class to the source timezone column
      const cellClass = index === 0 ? 'source-time-cell' : 'time-cell';
      row.innerHTML += `<td class="${cellClass}">${tzTime}</td>`;
    });
    
    // Add hover events
    row.addEventListener('mouseover', () => highlightTime(hour));
    row.addEventListener('mouseout', () => removeHighlight());
    
    table.appendChild(row);
  }
  
  tableElement.appendChild(table);
  
  // Add event listeners for selection
  setupTimeSelection();
}

// Highlight times across all timezones for the same moment
function highlightTime(sourceHour: number): void {
  const rows = document.querySelectorAll('.hour-row');
  rows.forEach(row => {
    row.classList.add('highlighted');
  });
  
  // Highlight the specific hour row
  const hourRow = document.getElementById(`hour-${sourceHour}`);
  if (hourRow) {
    hourRow.classList.add('active-highlight');
  }
}

// Remove highlight
function removeHighlight(): void {
  const rows = document.querySelectorAll('.hour-row');
  rows.forEach(row => {
    row.classList.remove('highlighted');
    row.classList.remove('active-highlight');
  });
}

// Setup time period selection
function setupTimeSelection(): void {
  let isDragging = false;
  let startHour: number | null = null;
  let endHour: number | null = null;
  
  const rows = document.querySelectorAll('.hour-row');
  
  rows.forEach((row, index) => {
    row.addEventListener('mousedown', () => {
      isDragging = true;
      startHour = index;
      endHour = index;
      updateSelection();
    });
    
    row.addEventListener('mousemove', () => {
      if (isDragging) {
        endHour = index;
        updateSelection();
      }
    });
  });
  
  document.addEventListener('mouseup', () => {
    isDragging = false;
  });
  
  function updateSelection(): void {
    if (startHour === null || endHour === null) return;
    
    // Clear existing selection
    rows.forEach(row => row.classList.remove('selected'));
    
    // Calculate the range
    const start = Math.min(startHour, endHour);
    const end = Math.max(startHour, endHour);
    
    // Apply selection
    for (let i = start; i <= end; i++) {
      rows[i].classList.add('selected');
    }
    
    // Display the selection info
    displaySelectionInfo(start, end);
  }
}

// Display information about the selected time period
function displaySelectionInfo(startHour: number, endHour: number): void {
  const infoElement = document.createElement('div');
  infoElement.className = 'selection-info';
  infoElement.innerHTML = '<h3>Selected Time Period</h3>';
  
  const currentTimezones = [sourceTimeZone!, ...selectedTimeZones];
  
  currentTimezones.forEach(timezone => {
    const adjustedTz = adjustForDST(timezone);
    const offsetFromSource = adjustedTz.offset - adjustForDST(sourceTimeZone!).offset;
    
    const tzStartHour = (startHour + offsetFromSource + 24) % 24;
    const tzEndHour = (endHour + offsetFromSource + 24) % 24;
    
    const startTime = formatTime(tzStartHour);
    const endTime = formatTime(tzEndHour);
    
    infoElement.innerHTML += `<p><strong>${adjustedTz.abbreviation} (${adjustedTz.city || adjustedTz.name}):</strong> ${startTime} - ${endTime}</p>`;
  });
  
  // Remove existing info if present
  const existingInfo = document.querySelector('.selection-info');
  if (existingInfo) {
    existingInfo.remove();
  }
  
  // Add the new info
  const tableContainer = document.getElementById('timezone-table');
  if (tableContainer) {
    tableContainer.appendChild(infoElement);
  }
}

// Populate timezone dropdowns
function populateTimeZoneDropdowns(): void {
  const sourceSelect = document.getElementById('source-timezone') as HTMLSelectElement;
  const addSelect = document.getElementById('add-timezone-select') as HTMLSelectElement;
  
  if (!sourceSelect || !addSelect) return;
  
  // Clear existing options
  sourceSelect.innerHTML = '';
  addSelect.innerHTML = '';
  
  // Add options
  timeZones.forEach(timezone => {
    const sourceOption = document.createElement('option');
    sourceOption.value = timezone.id;
    sourceOption.textContent = `${timezone.abbreviation} - ${timezone.name} ${timezone.city ? `(${timezone.city})` : ''}`;
    sourceSelect.appendChild(sourceOption);
    
    const addOption = document.createElement('option');
    addOption.value = timezone.id;
    addOption.textContent = `${timezone.abbreviation} - ${timezone.name} ${timezone.city ? `(${timezone.city})` : ''}`;
    addSelect.appendChild(addOption);
  });
}

// Update the list of selected timezones
function updateTimeZoneList(): void {
  const listElement = document.getElementById('timezone-list');
  if (!listElement) return;
  
  // Clear existing list
  listElement.innerHTML = '';
  
  // Add each selected timezone
  selectedTimeZones.forEach((timezone, index) => {
    const item = document.createElement('div');
    item.className = 'timezone-item';
    
    const adjustedTz = adjustForDST(timezone);
    
    item.innerHTML = `
      <span>${adjustedTz.abbreviation} - ${adjustedTz.name} ${adjustedTz.city ? `(${adjustedTz.city})` : ''}</span>
      <div class="timezone-controls">
        <button class="move-up" ${index === 0 ? 'disabled' : ''}>↑</button>
        <button class="move-down" ${index === selectedTimeZones.length - 1 ? 'disabled' : ''}>↓</button>
        <button class="remove-timezone">×</button>
      </div>
    `;
    
    // Add event listeners
    const upButton = item.querySelector('.move-up');
    const downButton = item.querySelector('.move-down');
    const removeButton = item.querySelector('.remove-timezone');
    
    if (upButton) {
      upButton.addEventListener('click', () => {
        if (index > 0) {
          [selectedTimeZones[index - 1], selectedTimeZones[index]] = [selectedTimeZones[index], selectedTimeZones[index - 1]];
          updateTimeZoneList();
          generateTimeGrid();
        }
      });
    }
    
    if (downButton) {
      downButton.addEventListener('click', () => {
        if (index < selectedTimeZones.length - 1) {
          [selectedTimeZones[index], selectedTimeZones[index + 1]] = [selectedTimeZones[index + 1], selectedTimeZones[index]];
          updateTimeZoneList();
          generateTimeGrid();
        }
      });
    }
    
    if (removeButton) {
      removeButton.addEventListener('click', () => {
        selectedTimeZones.splice(index, 1);
        updateTimeZoneList();
        generateTimeGrid();
      });
    }
    
    listElement.appendChild(item);
  });
}

// Sort timezones by offset relative to source
function sortTimeZones(): void {
  if (!sourceTimeZone) return;
  
  const sourceOffset = adjustForDST(sourceTimeZone).offset;
  
  selectedTimeZones.sort((a, b) => {
    const offsetA = adjustForDST(a).offset - sourceOffset;
    const offsetB = adjustForDST(b).offset - sourceOffset;
    return offsetA - offsetB;
  });
  
  updateTimeZoneList();
  generateTimeGrid();
}

// Initialize the application
export function initializeApp(): void {
  // Populate dropdowns
  populateTimeZoneDropdowns();
  
  // Set default source timezone (UTC)
  sourceTimeZone = timeZones[0];
  
  // Add event listeners
  const sourceSelect = document.getElementById('source-timezone') as HTMLSelectElement;
  const addSelect = document.getElementById('add-timezone-select') as HTMLSelectElement;
  const addButton = document.getElementById('add-timezone-btn');
  const sortButton = document.getElementById('sort-btn');
  
  if (sourceSelect) {
    sourceSelect.addEventListener('change', () => {
      const selectedId = sourceSelect.value;
      sourceTimeZone = timeZones.find(tz => tz.id === selectedId) || null;
      generateTimeGrid();
    });
  }
  
  if (addButton && addSelect) {
    addButton.addEventListener('click', () => {
      const selectedId = addSelect.value;
      const selectedTz = timeZones.find(tz => tz.id === selectedId);
      
      if (selectedTz && !selectedTimeZones.some(tz => tz.id === selectedId)) {
        selectedTimeZones.push(selectedTz);
        updateTimeZoneList();
        generateTimeGrid();
      }
    });
  }
  
  if (sortButton) {
    sortButton.addEventListener('click', sortTimeZones);
  }
  
  // Initialize with a default additional timezone
  if (timeZones.length > 1) {
    selectedTimeZones = [timeZones[1]]; // Add GMT as default
    updateTimeZoneList();
  }
  
  // Generate the initial time grid
  generateTimeGrid();
} 