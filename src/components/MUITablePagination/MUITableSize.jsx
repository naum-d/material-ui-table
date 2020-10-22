import React, { Fragment, useContext } from 'react';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import MenuItem from '@material-ui/core/MenuItem';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';

import TableContext from '../TableContext';
import { turnOffEvent } from '../../methods';

const MUITableSize = () => {

  const [context, setContext] = useContext(TableContext);

  const { options, methods: { onPageSizeChange } } = context;
  const { size, rowsCount, minSize, showAll, showSize, tableSizes } = options;

  const handleShowAll = e => {
    turnOffEvent(e);
    const newSize = size === rowsCount ? minSize : rowsCount;
    onPageSizeChange
      ? onPageSizeChange(newSize)
      : setContext(old => ({ ...old, options: { ...old.options, page: 0, size: newSize } }));
  };

  const handlePageSizeChange = e => {
    const { value: size } = turnOffEvent(e, e.target);
    !!onPageSizeChange
      ? onPageSizeChange(size)
      : setContext(old => ({ ...old, options: { ...old.options, size, page: 0 } }));
  };

  return (
    <Fragment>
      {!!showAll && (
        <Grid item>
          <Button variant="outlined" size="small" disabled={minSize > rowsCount} onClick={handleShowAll}>
            {size === rowsCount ? 'Hide' : 'Show All'}
          </Button>
        </Grid>
      )}

      {!!showSize && (
        <Grid item>
          <Grid container justify="center" alignItems="center" spacing={1}>
            <Grid item children={<Typography variant="subtitle2" children="Table Size:" />} />
            <Grid item>
              <TextField select value={size} onChange={handlePageSizeChange}>
                {tableSizes.map(size => (
                  <MenuItem key={size} value={size} children={size} />
                ))}
              </TextField>
            </Grid>
          </Grid>
        </Grid>
      )}
    </Fragment>
  );
};

export default MUITableSize;
