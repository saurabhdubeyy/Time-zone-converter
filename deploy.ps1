# Set execution policy to bypass for this script
Set-ExecutionPolicy -Scope Process -ExecutionPolicy Bypass

# Build the project
Write-Host "Building the project..." -ForegroundColor Green
npm run build

# Deploy to GitHub Pages
Write-Host "Deploying to GitHub Pages..." -ForegroundColor Green
npm run deploy

# Push changes to GitHub
Write-Host "Pushing changes to GitHub..." -ForegroundColor Green
git add .
git commit -m "Deploy to GitHub Pages"
git push 