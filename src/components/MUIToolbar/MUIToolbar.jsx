import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Button from '@material-ui/core/Button';
import ClearIcon from '@material-ui/icons/Clear';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import ButtonGroup from '@material-ui/core/ButtonGroup';
import makeStyles from '@material-ui/core/styles/makeStyles';
import InputAdornment from '@material-ui/core/InputAdornment';

import TableContext from '../TableContext';
import { turnOffEvent } from '../../methods';

const useStyles = makeStyles(theme => ({
  root: {
    padding: theme.spacing(1),
  },
  toolbarSelected: {
    padding: theme.spacing(1),
    color: theme.palette.common.white,
    backgroundColor: theme.palette.secondary.light,
  },
}));

const MUIToolbar = () => {
  const classes = useStyles();

  const [context, setContext] = useContext(TableContext);
  const { table, options: { search, selected, orderTable, showSearch }, methods: { onSearchChange }, actions } = context;

  const handleSearchChange = e => {
    const { value: search } = turnOffEvent(e, e.target);
    !!onSearchChange
      ? onSearchChange(search)
      : setContext(old => ({ ...old, options: { ...old.options, search, page: 0 } }));
  };

  const handleClear = e => {
    turnOffEvent(e);
    !!onSearchChange
      ? onSearchChange('')
      : setContext(old => ({ ...old, options: { ...old.options, search: '', page: 0 } }));
  };

  const renderBaseActions = () => {
    return Object.keys(actions.toolbar).map((key) => {
      const { onClick, component } = actions.toolbar[key];
      const props = { key, onClick: (e) => turnOffEvent(e, onClick)(JSON.parse(table), orderTable) };
      return !!component ? component(props) : <Button {...props} children={key} />;
    });
  };

  const renderActionsSelected = () => {
    return Object.keys(actions.toolbarSelected).map((key) => {
      const { onClick, component } = actions.toolbarSelected[key];
      const props = { key, onClick: e => turnOffEvent(e, onClick)(selected) };
      return !!component ? component(props) : <Button {...props} children={key} />;
    });
  };

  const renderInputProps = () => {
    return {
      endAdornment: (
        <InputAdornment
          position="end"
          children={<IconButton disabled={!search} onClick={handleClear} children={<ClearIcon fontSize="small" />} />}
        />
      ),
    };
  };

  return (
    <Grid container justify="space-between" alignItems="center" spacing={2} className={classes.root}>
      {!!showSearch && (
        <Grid item xs={6}>
          <TextField
            fullWidth
            value={search}
            placeholder="Search"
            onChange={handleSearchChange}
            InputProps={renderInputProps()}
          />
        </Grid>
      )}

      {!!selected.length && (
        <Grid item xs={6}>
          <Paper className={classes.toolbarSelected}>
            <Grid container alignItems="center" justify="space-between">
              <Grid item xs={2} children={<Typography children={`${selected.length} Selected`} />} />
              <ButtonGroup color="inherit" size="small" children={renderActionsSelected()} />
            </Grid>
          </Paper>
        </Grid>
      )}

      {!selected.length && (
        <Grid item>
          <ButtonGroup color="primary" size="small" children={renderBaseActions()} />
        </Grid>
      )}
    </Grid>
  );
};

MUIToolbar.propTypes = {
  qwerty: PropTypes.string,
};

export default MUIToolbar;
