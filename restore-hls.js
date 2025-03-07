const fs = require('fs');
const path = require('path');

// Main function - restore the HLS directory
function main() {
  const hlsDir = path.join(__dirname, 'public', 'assets', 'hls');
  const hlsDirBackup = path.join(__dirname, 'public', 'assets', 'hls-backup');
  
  if (fs.existsSync(hlsDirBackup)) {
    console.log('Restoring HLS directory from backup...');
    
    // Remove the empty directory created during build
    if (fs.existsSync(hlsDir)) {
      fs.rmSync(hlsDir, { recursive: true, force: true });
    }
    
    // Restore from backup
    fs.renameSync(hlsDirBackup, hlsDir);
    
    console.log('Done! HLS directory has been restored.');
  } else {
    console.log('HLS backup directory not found. Nothing to restore.');
  }
}

main(); 