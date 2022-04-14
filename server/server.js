// import { router as authRouter } from './routes/authRouter';
// import helmet from 'helmet';
import express from 'express';
import path, { dirname } from 'path';
import { fileURLToPath } from 'url';
import userRouter from './routes/userRouter.js';
import groupRouter from './routes/groupRouter.js';
import cookieParser from 'cookie-parser';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const app = express();
const PORT = 9000;

console.log('Node Environment:', process.env.NODE_ENV);
// app.use(helmet());
app.use(express.json());
app.use(cookieParser());

app.use('/user', userRouter);
app.use('/group', groupRouter);

app.use('/', express.static(path.join(__dirname, '../build')));

//catch all route handler for unknown routes
app.use((req, res) => {
	return res.status(404).send("Sorry, I can't find that endpoint.");
});

//global express error handler
app.use((err, req, res, next) => {
	const defaultError = {
		log: 'Express error handler caught unknown middleware error',
		status: 500,
		message: { err: 'An error occured' },
	};
	const errorObj = Object.assign({}, defaultError, err);
	console.error(errorObj.log);
	return res.status(errorObj.status).json(errorObj.message);
});

app.listen(PORT, () => {
	// req
	console.log(`Server listening on port ${PORT}`);
});

export default app;
