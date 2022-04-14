import React from 'react';
import { Button, Typography } from '@mui/material';
import StatsModal from './StatsModal.js';
import CreateUserModal from './CreateUserModal.js';
import LoginModal from './LoginModal.js';
import LogoutModal from './LogoutModal.js';
import Cookies from 'js-cookie';

const Header = ({ stats, fetchStats, toggleModal, modalState, user }) => {
	return (
		<>
			<div style={{ height: '20px' }}></div>
			<div className="header">
				<div className="stats">
					{/* ternary operator to display button if logged in */}
					{user.username ? (
						<Button
							variant="text"
							onClick={() => {
								fetchStats();
								toggleModal('statsModal');
							}}
						>
							Stats
						</Button>
					) : null}
				</div>
				<Typography variant="h3" sx={{ fontWeight: 'bold' }}>
					{' '}
					Wordle+{' '}
				</Typography>
				<div className="login">
					{!user.username ? (
						<>
							<Button variant="text" onClick={() => toggleModal('loginModal')}>
								Login
							</Button>
							<Button
								variant="text"
								onClick={() => toggleModal('createUserModal')}
							>
								Create Account
							</Button>
						</>
					) : (
						<Button
							variant="text"
							onClick={() => {
								Cookies.remove('username');
								Cookies.remove('userId');
								toggleModal('logoutModal');
							}}
						>
							Logout
						</Button>
					)}
				</div>
				<LogoutModal modalState={modalState} toggleModal={toggleModal} />
				<LoginModal modalState={modalState} toggleModal={toggleModal} />
				<CreateUserModal modalState={modalState} toggleModal={toggleModal} />
				<StatsModal
					modalState={modalState}
					toggleModal={toggleModal}
					stats={stats}
				/>
			</div>
		</>
	);
};

export default Header;
