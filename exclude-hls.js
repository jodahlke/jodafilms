const fs = require('fs');
const path = require('path');

// Main function - just rename the directory during build
function main() {
  const hlsDir = path.join(__dirname, 'public', 'assets', 'hls');
  const hlsDirBackup = path.join(__dirname, 'public', 'assets', 'hls-backup');
  
  if (fs.existsSync(hlsDir)) {
    console.log('Temporarily renaming HLS directory for build...');
    
    // If there's an existing backup dir, remove it first
    if (fs.existsSync(hlsDirBackup)) {
      fs.rmSync(hlsDirBackup, { recursive: true, force: true });
    }
    
    // Rename the directory
    fs.renameSync(hlsDir, hlsDirBackup);
    
    // Create empty hls directory to maintain structure
    fs.mkdirSync(hlsDir, { recursive: true });
    
    console.log('Done! HLS directory has been moved to hls-backup for the build.');
  } else {
    console.log('HLS directory not found. Nothing to do.');
  }
}

main(); 