# Set execution policy to bypass for this script
Set-ExecutionPolicy -Scope Process -ExecutionPolicy Bypass

# Install dependencies
Write-Host "Installing dependencies..." -ForegroundColor Green
npm install

# Install gh-pages
Write-Host "Installing gh-pages..." -ForegroundColor Green
npm install gh-pages --save-dev

# Run the development server
Write-Host "Starting development server..." -ForegroundColor Green
npm run dev 