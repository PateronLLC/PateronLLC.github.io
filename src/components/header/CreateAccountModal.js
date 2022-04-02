import React, { useState } from 'react';
import {
	Button,
	Dialog,
	DialogContent,
	DialogContentText,
	DialogTitle,
	Input,
	InputLabel,
	FormControl,
	TextField,
	Paper,
} from '@mui/material';

const CreateAccountModal = (props) => {
  const handleClick = (event) => {
    console.log(event.target[0].value);
    console.log(event.target[2].value);
    console.log(event.target[4].value);
    
    const newUser = {
      username: event.target[0].value,
      password: event.target[2].value
    }

    fetch('/user', {
      method: 'POST',
      header: {
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
      },
      body: JSON.stringify(newUser),
    })
    .then((status) => status.json())
    .then((json) => console.log('success', json))
    .catch(error => console.error('error in fetch', error))
  }

	return (
		<form
			onSubmit={(e) => {
				e.preventDefault();
				handleClick(e);
			}}
      className='create-user-form'
		>
			<TextField
				id="username"
				label="Username"
				variant="outlined"
				required
			></TextField>
			<TextField
				id="password"
				label="Password"
				variant="outlined"
				required
			></TextField>
			<TextField
				id="verifyPassword"
				label="Verify Password"
				variant="outlined"
				required
			></TextField>
			<Button variant='contained' type='submit' >Submit</Button>
		</form>
	);
};
export default CreateAccountModal;


// (async () => {
//   const rawResponse = await fetch('https://httpbin.org/post', {
//     method: 'POST',
//     headers: {
//       'Accept': 'application/json',
//       'Content-Type': 'application/json'
//     },
//     body: JSON.stringify({a: 1, b: 'Textual content'})
//   });
//   const content = await rawResponse.json();

//   console.log(content);
// })();