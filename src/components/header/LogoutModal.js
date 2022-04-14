import React from 'react';
import {
	Button,
	Dialog,
	DialogContent,
	DialogTitle,
} from '@mui/material';

const LogoutModal = ({ toggleModal, modalState }) => {
	return (
		<Dialog
			open={modalState.logoutModal}
			onClose={() => toggleModal('logoutModal')}
			sx={{ textAlign: 'center' }}
		>
			<DialogTitle>Your are now logged out</DialogTitle>

			<DialogContent className="dialog-content" sx={{ fontWeight: 'bold' }}>
				<Button
					onClick={() => {
						toggleModal('logoutModal');
					}}
					variant="contained"
					className="dialogtext"
					sx={{ marginTop: '10px' }}
				>
					Close
				</Button>
			</DialogContent>
		</Dialog>
	);
};
export default LogoutModal;
