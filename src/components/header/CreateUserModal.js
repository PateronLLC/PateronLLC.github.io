import React from 'react';
import {
  Button,
  Dialog,
  DialogContent,
  // DialogContentText,
  DialogTitle,
  // Input,
  // InputLabel,
  // FormControl,
  TextField,
  // Paper,
} from '@mui/material';

const CreateUserModal = ({ toggleModal, modalState }) => {
  const handleClick = (event) => {
    console.log(event.target[0].value);
    console.log(event.target[2].value);
    console.log(event.target[4].value);

    const newUser = {
      username: event.target[0].value,
      password: event.target[2].value,
    };

    fetch('/user', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(newUser),
    })
      .then((response) => response.json())
      .then((data) => console.log('success', data))
      .catch((error) => console.error('error in fetch', error));
  };

  return (
    <>
      <Dialog
        open={modalState.createUserModal}
        onClose={() => toggleModal('createUserModal')}
        sx={{ textAlign: 'center' }}
      >
        <DialogTitle>Create User Account</DialogTitle>

        <DialogContent className="dialog-content" sx={{ fontWeight: 'bold' }}>
          Create new user here
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleClick(e);
            }}
            className="create-user-form"
          >
            <TextField id="username" label="Username" variant="outlined" required></TextField>
            <TextField id="password" label="Password" variant="outlined" required></TextField>
            <TextField
              id="verifyPassword"
              label="Verify Password"
              variant="outlined"
              required
            ></TextField>
            <Button variant="contained" type="submit">
              Submit
            </Button>
          </form>
          <Button
            onClick={() => {
              toggleModal('createUserModal');
            }}
            variant="contained"
            className="dialogtext"
            sx={{ marginTop: '10px' }}
          >
            Close
          </Button>
        </DialogContent>
      </Dialog>
    </>
  );
};
export default CreateUserModal;

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
