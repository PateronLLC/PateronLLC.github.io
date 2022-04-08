import React from 'react';
import { Button, Typography } from '@mui/material';
import StatsModal from './StatsModal.js';
import CreateUserModal from './CreateUserModal.js';
import LoginModal from './LoginModal.js';

const Header = ({ stats, fetchStats, toggleModal, modalState }) => {
  // useEffect(() => {
  //   fetchStats();
  // }, [fetchStats]);

  return (
    <>
      <div style={{ height: '20px' }}></div>
      <div className="header">
        <div className="stats">
          {/* ternary operator to display button if logged in */}
          <Button
            variant="text"
            onClick={() => {
              fetchStats();
              toggleModal('statsModal');
            }}
          >
            Stats
          </Button>
        </div>
        <Typography variant="h3" sx={{ fontWeight: 'bold' }}>
          {' '}
          Wordle+{' '}
        </Typography>
        <div className="login">
          <Button variant="text" onClick={() => toggleModal('loginModal')}>
            Login
          </Button>
          <Button variant="text" onClick={() => toggleModal('createUserModal')}>
            Create Account
          </Button>
        </div>
        <LoginModal modalState={modalState} toggleModal={toggleModal} />
        <CreateUserModal modalState={modalState} toggleModal={toggleModal} />
        <StatsModal modalState={modalState} toggleModal={toggleModal} stats={stats} />
      </div>
    </>
  );
};

export default Header;
