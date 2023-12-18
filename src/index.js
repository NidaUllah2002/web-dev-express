const { default: app } = require('./app');
const path = require('path');
const __PROJECT_ROOT = path.dirname(__dirname);

try {
    app(path.join(__PROJECT_ROOT, 'public'), 3000);
} catch (error) {
    console.error('An unknwon error occurred!');
    process.exit(1);
}
