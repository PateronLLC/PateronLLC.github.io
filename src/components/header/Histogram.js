import React from 'react';
import { DialogContentText, DialogContent } from '@mui/material';

const Histogram = ({ stats, title }) => {
  return (
    <>
      <DialogContentText>{title}</DialogContentText>
      <div className="histogram-flex">
        {stats.histogram.map((el, idx) => {
          if (idx !== 0 && idx < 7) {
            return (
              <div>
                <div
                  style={{
                    color: 'white',
                    backgroundColor: 'blue',
                    height: `${el * 20}px`,
                    width: '5vw',
                  }}
                >
                  {el}
                </div>
                <div>{idx}</div>
              </div>
            );
          }
        })}
      </div>
    </>
  );
};

export default Histogram;
