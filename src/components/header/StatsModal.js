import React from 'react';
import Histogram from './Histogram.js';
import { Button, Dialog, DialogContent, DialogContentText, DialogTitle } from '@mui/material';
import { StatBar } from './StatBar.js';

const StatsModal = ({ stats, setStats }) => {
  return (
    <>
      <Dialog
        open={stats.modal}
        onClose={() => {
          setStats({ ...stats, modal: false });
        }}
        sx={{textAlign: 'center'}}
      >
        <DialogTitle>Statistics</DialogTitle>
        <DialogContent className="dialog-content" sx={{fontWeight:'bold'}}>
          User Stats
          <DialogContentText className="dialogtext">
            <StatBar stats={stats} />
          </DialogContentText>
          <Histogram stats={stats} title="Guesses To Win Histogram" />
          <Button
            onClick={() => {
              setStats({ ...stats, modal: false });
            }}
            variant="contained"
            className="dialogtext"
            sx={{marginTop:'10px'}}
          >
            Close Modal
          </Button>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default StatsModal;
