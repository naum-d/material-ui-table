import React, { useContext, useEffect, useState } from 'react';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import ButtonGroup from '@material-ui/core/ButtonGroup';
import makeStyles from '@material-ui/core/styles/makeStyles';
import LastPageOutlinedIcon from '@material-ui/icons/LastPageOutlined';
import FirstPageOutlinedIcon from '@material-ui/icons/FirstPageOutlined';
import NavigateNextOutlinedIcon from '@material-ui/icons/NavigateNextOutlined';
import NavigateBeforeOutlinedIcon from '@material-ui/icons/NavigateBeforeOutlined';

import MUITableSize from './MUITableSize';
import TableContext from '../TableContext';
import { turnOffEvent } from '../../methods';

const useStyles = makeStyles(theme => ({
  root: {
    padding: theme.spacing(1, 0.5),
  },
}));

const MUITablePagination = () => {
  const classes = useStyles();

  const [lastPage, setLastPage] = useState(0);
  const [context, setContext] = useContext(TableContext);
  const { options, methods: { onPageChange } } = context;
  const { page, size, rowsCount, serverPaging, withPaging, orderTable } = options;

  useEffect(() => {
    setLastPage(Math.floor((serverPaging ? rowsCount : orderTable.length) / size));
  }, [serverPaging, rowsCount, orderTable, size]);

  const handleChangePage = page => e => {
    turnOffEvent(e);
    onPageChange
      ? onPageChange(page)
      : setContext(old => ({ ...old, options: { ...old.options, page } }));
  };

  return (
    <Grid container justify="flex-end" spacing={1} className={classes.root}>
      <MUITableSize />

      {!!withPaging && (
        <Grid item>
          <ButtonGroup size="small" variant="text">
            <Button disabled={page === 0} onClick={handleChangePage(0)}>
              <FirstPageOutlinedIcon fontSize="small" />
            </Button>

            <Button disabled={page === 0} onClick={handleChangePage(page - 1)}>
              <NavigateBeforeOutlinedIcon fontSize="small" />
            </Button>

            <Button>{page + 1}</Button>

            <Button disabled={lastPage === page} onClick={handleChangePage(page + 1)}>
              <NavigateNextOutlinedIcon fontSize="small" />
            </Button>

            <Button disabled={lastPage === page} onClick={handleChangePage(lastPage)}>
              <LastPageOutlinedIcon fontSize="small" />
            </Button>
          </ButtonGroup>
        </Grid>
      )}
    </Grid>
  );
};

export default MUITablePagination;
