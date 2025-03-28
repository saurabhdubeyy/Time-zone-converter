# Time Zone Converter

An interactive web application that allows users to compare and convert times across multiple time zones with support for daylight saving time changes.

## Live Demo

Visit the live application: [Time Zone Converter](https://saurabhdubeyy.github.io/Time-zone-converter/)

## Features

- **Multiple Time Zone Support**: Add, remove, and compare multiple time zones simultaneously
- **Interactive Time Grid**: View a 24-hour grid showing time alignment across all selected time zones
- **Daylight Saving Time Awareness**: Automatic adjustment for DST based on the current date
- **Time Period Selection**: Highlight specific time periods to see the corresponding times in all zones
- **Time Zone Management**:
  - Reorder time zones with up/down controls
  - Sort time zones by offset relative to the source time zone
  - Remove unwanted time zones with a single click
- **Visual Highlighting**: Hover over any hour to highlight the equivalent time across all zones
- **Responsive Design**: Works on desktop and mobile devices

## How to Use

### Basic Usage

1. **Select a Source Time Zone**:
   - Choose your base time zone from the dropdown list at the top

2. **Add Additional Time Zones**:
   - Select a time zone from the dropdown in the "Additional Time Zones" section
   - Click the "Add Time Zone" button
   - Add as many time zones as needed for comparison

3. **View the Time Grid**:
   - The application displays a 24-hour grid showing how times align across all selected zones
   - The source time zone appears first, followed by all additional time zones

### Advanced Features

4. **Highlight Time Periods**:
   - Click and drag across the time grid to select a specific period
   - The selected period will highlight, showing the corresponding times in all zones
   - The start and end times for each time zone will be displayed below the grid

5. **Reorder Time Zones**:
   - Use the up (↑) and down (↓) arrows next to each time zone to change their order in the display

6. **Sort Time Zones**:
   - Click the "Sort by Offset" button to automatically arrange time zones based on their offset relative to the source
   - This places earlier time zones (negative offset) before the source, and later time zones (positive offset) after

7. **Remove Time Zones**:
   - Click the "×" button next to any time zone to remove it from the comparison

### Daylight Saving Time

The application automatically detects and adjusts for daylight saving time based on:

- The current date
- The geographic region of the selected time zones
- Standard DST rules for both Northern and Southern hemispheres

## Technical Implementation

### Technologies Used

- **TypeScript**: For type-safe JavaScript development
- **Vanilla JavaScript**: For DOM manipulation and core functionality
- **CSS3**: For responsive styling and visual effects
- **Vite**: For fast development and optimized builds
- **GitHub Pages**: For hosting and deployment

### Core Components

- **Time Zone Data Structure**: Comprehensive database of time zones with abbreviations, names, and UTC offsets
- **DST Detection Algorithm**: Logic to determine if daylight saving time is in effect based on date and location
- **Time Grid Generator**: Dynamic table creation to display time relationships across zones
- **Event Handlers**: For interactive highlighting, selection, and time zone management

### Code Architecture

The application follows a modular design with separation of concerns:

- **Data Management**: Handling time zone information and selections
- **UI Rendering**: Generating the visual interface and time grid
- **User Interactions**: Managing mouse events, selections, and controls
- **Time Calculations**: Converting and displaying times across different zones

## Development

### Prerequisites

- Node.js (v14.0.0 or higher)
- npm (v6.0.0 or higher)

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/saurabhdubeyy/Time-zone-converter.git
   cd Time-zone-converter
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the development server:
   ```bash
   npm run dev
   ```

4. Open your browser and navigate to:
   ```
   http://localhost:5173
   ```

### Building for Production

1. Create a production build:
   ```bash
   npm run build
   ```

2. Preview the production build locally:
   ```bash
   npm run preview
   ```

### Deployment

The application is configured for easy deployment to GitHub Pages:

1. Update the `vite.config.ts` file with your repository name if needed
2. Run the deployment script:
   ```bash
   npm run deploy
   ```

## Future Enhancements

- Add more time zones with regional variations
- Implement custom time input for specific date/time conversions
- Add calendar integration for scheduling across time zones
- Create shareable links for specific time zone comparisons
- Add dark mode support

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the LICENSE file for details. 