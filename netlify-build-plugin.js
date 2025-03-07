// Netlify build plugin to handle Next.js static site generation
module.exports = {
  onPreBuild: ({ utils }) => {
    console.log('Preparing for Next.js static export build...');
  },
  onBuild: ({ utils }) => {
    console.log('Next.js build completed successfully!');
  },
  onPostBuild: ({ utils }) => {
    console.log('Post-build processing...');
    
    // Create a _redirects file to handle client-side routing
    utils.status.show({
      title: 'Creating Netlify redirects for Next.js client-side routing',
      summary: 'Adding _redirects file to the publish directory',
    });
    
    // Add a _redirects file for SPA routing
    const fs = require('fs');
    fs.writeFileSync('out/_redirects', `
# Handle SPA routing
/*    /index.html   200
    `.trim());
    
    console.log('Successfully created redirects file');
  },
  onSuccess: () => {
    console.log('Build successfully completed!');
  },
}; 