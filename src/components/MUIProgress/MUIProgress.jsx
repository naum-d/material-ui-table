import React, { useContext } from 'react';
import { fade } from '@material-ui/core';
import Paper from '@material-ui/core/Paper';
import makeStyles from '@material-ui/core/styles/makeStyles';
import CircularProgress from '@material-ui/core/CircularProgress';

import TableContext from '../TableContext';

const useStyles = makeStyles(theme => ({
  progress: props => ({
    padding: 0,
    position: 'absolute',
    top: props ? '140px' : '0',
    left: '0',
    right: '0',
    bottom: '0',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    border: 'none',
    boxShadow: 'none',
    backgroundColor: fade(theme.palette.background.default, 0.7),
    zIndex: 1200,
  }),
}));

const MUIProgress = () => {
  const [context] = useContext(TableContext);
  const { options: { isLoading, showFilter } } = context;

  const classes = useStyles(showFilter);

  return !!isLoading && (
    <Paper className={classes.progress}>
      <CircularProgress />
    </Paper>
  );
};

export default MUIProgress;
