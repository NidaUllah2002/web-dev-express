const { dirname, join } = require('path');
const express = require('express');
const router = require('./routes');
const dotenv = require('dotenv');

exports.default = function (public_path, port) {
    const app = express();
    dotenv.config({ path: join(dirname(public_path), '.env') });

    app.set('view engine', 'hbs');
    app.use(express.static(public_path));
    app.use('/', router.default);

    app.all('*', (_, res) => res.send('Nothing is here, have you checked under the bed?'));

    app.listen(port, () => console.log(`The app is running on http://localhost:${port}`));
};
