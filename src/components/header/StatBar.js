import React from 'react';
import { DialogContentText } from '@mui/material';
// import { GameStats } from '../../lib/localStorage'
// import {
//   TOTAL_TRIES_TEXT,
//   SUCCESS_RATE_TEXT,
//   CURRENT_STREAK_TEXT,
//   BEST_STREAK_TEXT,
// } from '../../constants/strings'

// type Props = {
//   gameStats: GameStats
// }

const StatItem = ({ label, value }) => {
  return (
    <div className="stat-item">
      <DialogContentText className="dialogtext">{label}</DialogContentText>
      <DialogContentText className="dialogtext">{value}</DialogContentText>
      {/* <div className="text-3xl font-bold">{label}</div>
      <div className="text-xs">{value}</div> */}
    </div>
  );
};

export const StatBar = ({ stats }) => {
  return (
    <div className="stat-bar">
      <StatItem label="Total Games" value={stats.totalGames} />
      <StatItem label="Total Wins" value={`${stats.wins}`} />
      <StatItem label="Total losses" value={`${stats.totalGames - stats.wins}`} />
      <StatItem label="Current Streak" value={stats.currentStreak} />
      <StatItem label="Best Streak" value={stats.bestStreak} />
    </div>
  );
};
