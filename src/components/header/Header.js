import React, { useEffect } from 'react';
import { Button, Typography } from '@mui/material';
import StatsModal from './StatsModal';
import CreateAccountModal from './CreateAccountModal';

const Header = ({ stats, setStats }) => {
	useEffect(() => {
		fetchStats();
	}, []);

	function fetchStats() {
		// const res = await fetch(`https://wordlepl.us/stats?id=`);
		// const json = await res.json();
		// console.log(`stats response ${json.response}`);
		// // setStats(json.response);
		// //display modal with stats
		// handle error
		console.log('Fetching stats placeholder');
	}

	const loginClick = (event) => {};
	const createAccountClick = (event) => {};

	return (
		<>
      <div style={{height:'20px'}}></div>
			<CreateAccountModal></CreateAccountModal>
			<div className="header">
				<div className="stats">
					{/* ternary operator to display button if logged in */}
					<Button
						variant="text"
						onClick={() => {
							fetchStats();
							setStats({ ...stats, modal: true });
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
					<Button variant="text" onClick={loginClick}>
						Login
					</Button>
					<Button variant="text" onClick={createAccountClick}>
						Create Account
					</Button>
				</div>
				<StatsModal stats={stats} setStats={setStats} />
			</div>
		</>
	);
};

export default Header;
