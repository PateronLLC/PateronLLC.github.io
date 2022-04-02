const express = require('express');
const path = require('path');
const app = express();
const router = express.Router();
const helmet = require('helmet');

const PORT = 9000;

app.use(helmet())
app.use(express.json());

app.use('/static', express.static(path.join(__dirname, '../build/static')));

app.get('/', function (req, res) {
	res.sendFile(path.resolve(__dirname, '../build/index.html'));
});

app.listen(PORT, () => {
	console.log(`Server listening on port ${PORT}`);
});
