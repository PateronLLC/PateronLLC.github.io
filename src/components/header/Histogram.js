import React from 'react';
import { DialogContentText, DialogContent } from '@mui/material';

const Histogram = ({ stats, title }) => {
	const winTurnsMax = Math.max(...stats.histogram);
	return (
		<>
			<DialogContentText sx={{ padding: '10px' }}>{title}</DialogContentText>
			<div className="histogram-flex">
				{stats.histogram.map((el, idx) => {
					return (
						<div
							style={{
								height: '100%',
								width: '16%',
								display: 'flex',
								flexDirection: 'column',
								justifyContent: 'flex-end',
							}}
						>
							<div
								style={{
									color: 'white',
									backgroundColor: '#1976d2',
									height: `${(el / winTurnsMax) * 80}%`,
									width: '90%',
								}}
							>
								{el}
							</div>
							<div style={{ height: '20px', width: '90%' }}>{idx + 1}</div>
						</div>
					);
				})}
			</div>
		</>
	);
};

export default Histogram;
