import React from 'react';
import {
	Button,
	Dialog,
	DialogContent,
	DialogContentText,
	DialogTitle,
	Input,
	InputLabel,
	FormControl,
	FormHelperText,
} from '@mui/material';

const LoginModal = (props) => {
	return (
		<FormControl>
			<InputLabel htmlFor="my-input">Email Purple</InputLabel>
			<Input id="my-input" aria-describedby="my-helper-text" />
			<FormHelperText id="my-helper-text">
				We'll never share your email.
			</FormHelperText>
		</FormControl>
	);
};
export default LoginModal;
