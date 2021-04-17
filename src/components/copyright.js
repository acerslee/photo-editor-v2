import React from 'react';
import Typography from '@material-ui/core/Typography';

export default function Copyright() {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      <p>'Copyright © ' Alex Lee Photo-Editor {new Date().getFullYear()}</p>
    </Typography>
  );
}