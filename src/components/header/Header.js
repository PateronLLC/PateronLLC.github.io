import React from 'react';
import { Button, Typography } from '@mui/material';

const Header = () => {

  return (
  <div className="header">
    <div className="stats">
      <Button variant="text">Stats</Button>
    </div>
    <Typography variant="h3" sx={{ fontWeight: 'bold' }}> Wordle+ </Typography>
    <div className="login">
      <Button variant="text">Login</Button>
      <Button variant="text">Create Account</Button>
    </div>
  </div>
  )
}

export default Header