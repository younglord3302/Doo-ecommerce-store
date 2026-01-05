const path = require('path');
const fs = require('fs');

// Log that we are starting from the root index.js
console.log('Starting application from root index.js...');

// Change directory to server to ensure paths and .env work correctly
const serverPath = path.join(__dirname, 'server');
if (fs.existsSync(serverPath)) {
    console.log('Changing directory to:', serverPath);
    process.chdir(serverPath);
    // Start the server
    require('./server.js');
} else {
    console.error('Error: server directory not found at', serverPath);
    process.exit(1);
}
