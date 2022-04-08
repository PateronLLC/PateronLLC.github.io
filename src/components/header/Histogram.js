import React from 'react';
import { DialogContentText } from '@mui/material';

const HistogramBar = ({ winTurns, winTurnsMax, index }) => {
  return (
    <>
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
            height: `${(winTurns / winTurnsMax) * 80}%`,
            width: '90%',
          }}
        >
          {winTurns}
        </div>
        <div style={{ height: '20px', width: '90%' }}>{index + 1}</div>
      </div>
    </>
  );
};

const Histogram = ({ stats, title }) => {
  const winTurnsMax = Math.max(...stats.histogram);
  return (
    <>
      <DialogContentText sx={{ padding: '10px' }}>{title}</DialogContentText>
      <div className="histogram-flex">
        {stats.histogram.map((el, idx) => {
          return <HistogramBar winTurns={el} winTurnsMax={winTurnsMax} index={idx} key={idx} />;
        })}
      </div>
    </>
  );
};

export default Histogram;
