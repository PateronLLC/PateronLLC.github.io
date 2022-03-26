import React from 'react';
import Histogram from './Histogram';
import {
	Button,
	Dialog,
	DialogContent,
	DialogContentText,
	DialogTitle,
} from '@mui/material';
import {StatBar} from './StatBar';

const StatsModal = ({ stats, setStats }) => {
	return (
		<>
			<Dialog
				open={stats.modal}
				onClose={() => {
					setStats({...stats, modal: false})
				}}
			>
				<DialogTitle>Statistics</DialogTitle>
				<DialogContent className="dialog-content">
					<DialogContentText className="dialogtext"></DialogContentText>
          <StatBar stats={stats} />
          <Histogram stats={stats} />
					<Button
						onClick={() => {
              setStats({...stats, modal: false})
						}}
						variant="contained"
						className="dialogtext"
					>
						Close Modal
					</Button>
				</DialogContent>
			</Dialog>
		</>
	);
};

export default StatsModal;
