import React, { useContext, useEffect } from 'react';
import PropTypes from 'prop-types';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Button from '@material-ui/core/Button';
import Toolbar from '@material-ui/core/Toolbar';
import ClearIcon from '@material-ui/icons/Clear';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import ButtonGroup from '@material-ui/core/ButtonGroup';
import makeStyles from '@material-ui/core/styles/makeStyles';
import InputAdornment from '@material-ui/core/InputAdornment';

import TableContext from '../TableContext';
import { turnOffEvent } from '../../helpers/helpers';

const useStyles = makeStyles(theme => ({
  toolbarSelected: {
    padding: theme.spacing(1),
    color: theme.palette.common.white,
    backgroundColor: theme.palette.secondary.light,
  },
}));

const MUIToolbar = () => {
  const classes = useStyles();
  const [context, setContext] = useContext(TableContext);

  const { options: { search, table, selected }, methods: { onSearchChange }, actions } = context;

  useEffect(() => {
    onSearchChange(search);
    setContext(old => ({ ...old, options: { ...old.options, page: 0 } }));
  }, [onSearchChange, search, setContext]);

  const handleSearchChange = e => {
    const { value: search } = turnOffEvent(e, e.target);
    setContext({ ...context, options: { ...context.options, search } });
  };

  const handleClear = e => {
    turnOffEvent(e);
    setContext({ ...context, options: { ...context.options, search: '' } });
  };

  const renderBaseActions = () => {
    return Object.keys(actions.toolbar).map((key) => {
      const { onClick, component } = actions.toolbar[key];
      const props = { key, onClick: (e) => turnOffEvent(e, onClick)(table) };
      return !!component ? component(props) : <Button {...props} children={key} />;
    });
  };

  const renderActionsSelected = () => {
    return Object.keys(actions.toolbarSelected).map((key) => {
      const { onClick, component } = actions.toolbarSelected[key];
      const props = { key, onClick: (e) => turnOffEvent(e, onClick)(selected) };
      return !!component ? component(props) : <Button {...props} children={key} />;
    });
  };

  const renderInputProps = () => {
    return {
      endAdornment: <InputAdornment children={<IconButton onClick={handleClear} children={<ClearIcon />} />} />,
    };
  };

  return (
    <Toolbar>
      <Grid container spacing={1} alignItems="center" justify="space-between">
        <Grid item xs={6}>
          <TextField
            fullWidth
            value={search}
            placeholder="Search"
            onChange={handleSearchChange}
            InputProps={renderInputProps()}
          />
        </Grid>

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
          <ButtonGroup color="primary" size="small" children={renderBaseActions()} />
        )}
      </Grid>
    </Toolbar>
  );
};

MUIToolbar.propTypes = {
  qwerty: PropTypes.string,
};

export default MUIToolbar;
