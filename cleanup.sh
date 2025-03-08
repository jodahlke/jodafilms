#!/bin/bash

echo "Cleaning up unnecessary files after Cloudinary migration..."

# Remove test HTML files
echo "Removing test HTML files..."
rm -f public/cloud-test.html
rm -f public/fixed-video-test.html
rm -f public/test-video.html
rm -f public/video-test.html

# Remove test directories
echo "Removing test directories..."
rm -rf public/comprehensive-test
rm -rf public/hero-test
rm -rf public/proxy-test
rm -rf public/simple-test
rm -rf public/test

# Clean up empty video directories but keep READMEs with updated message
echo "Updating video directories..."

# Update the README.txt for portfolio videos
mkdir -p public/assets/videos/Mp4\ portfolio/Portfolio/
cat > public/assets/videos/Mp4\ portfolio/Portfolio/README.txt << EOF
Videos have been migrated to Cloudinary and are now loaded directly from the cloud.
See troubleshooting-log.md for details on the migration process.
EOF

# Update the README.txt for hero video
mkdir -p public/assets/videos/hero/
cat > public/assets/videos/hero/README.txt << EOF
Hero video has been migrated to Cloudinary and is now loaded directly from the cloud.
See troubleshooting-log.md for details on the migration process.
EOF

# Remove macOS metadata files
echo "Removing .DS_Store files..."
find public -name ".DS_Store" -delete

echo "Cleanup complete!"
echo "All unnecessary files have been removed. The thumbnails directory has been kept as it's still in use." 