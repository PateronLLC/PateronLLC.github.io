import React from 'react';
import Histogram from './Histogram.js';
import { Button, Dialog, DialogContent, DialogTitle } from '@mui/material';
import { StatBar } from './StatBar.js';

const StatsModal = ({ stats, modalState, toggleModal }) => {
  return (
    <>
      <Dialog
        open={modalState.statsModal}
        onClose={() => toggleModal('statsModal')}
        sx={{ textAlign: 'center' }}
      >
        <DialogTitle>Statistics</DialogTitle>
        <DialogContent className="dialog-content" sx={{ fontWeight: 'bold' }}>
          User Stats
          <StatBar stats={stats} />
          <Histogram stats={stats} title="Guesses To Win Histogram" />
          <Button
            onClick={() => {
              toggleModal('statsModal');
            }}
            variant="contained"
            className="dialogtext"
            sx={{ marginTop: '10px' }}
          >
            Close Modal
          </Button>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default StatsModal;
