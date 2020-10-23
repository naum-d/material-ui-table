import React, { useCallback, useState } from 'react';
import PropTypes from 'prop-types';
import MUITable from '@naum-d/material-ui-table';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import ButtonGroup from '@material-ui/core/ButtonGroup';
import makeStyles from '@material-ui/core/styles/makeStyles';

const useStyles = makeStyles(theme => ({
  root: {
    padding: theme.spacing(2),
  },
}));

const AppTableContainer = () => {
  const classes = useStyles();
  const [search, setSearch] = useState('');
  const [canSelect, setCanSelect] = useState(false);

  const columns = [
    { field: 'name', label: 'Name' },
    { field: 'surname', label: 'Surname', canSort: false, canSearch: false },
    { field: 'number', label: 'Number' },
    { field: 'email', label: 'Email' },
  ];

  const table = [
    { id: 1, name: 'qwerty', surname: 'alskdajd', number: 1231312, email: '1adlka;d' },
    { id: 2, name: 'adasd', surname: 'alskdajd', number: 1231312, email: '1adlka;d' },
    { id: 3, name: 'zczc', surname: 'alskdajd', number: 98789, email: '1adlka;d' },
    { id: 4, name: 'kjlkjl', surname: 'alskdajd', number: 4353, email: '1adlka;d' },
    { id: 5, name: 'qwerty', surname: 'alskdajd', number: 1231312, email: '1adlka;d' },
    { id: 6, name: 'qwerty', surname: 'alskdajd', number: 345, email: '1adlka;d' },
    { id: 7, name: 'qwerty', surname: 'alskdajd', number: 345, email: '1adlka;d' },
  ];

  const handleOrderChange = useCallback((order, orderBy) => {
    console.log('ON ORDER CHANGE', order, orderBy);
  }, []);

  const handleSearchChange = useCallback(search => {
    console.log('ON SEARCH', search);
  }, []);

  return (
    <Grid container spacing={2} className={classes.root}>
      <Grid item xs={2}>
        <TextField value={search} onChange={e => setSearch(e.target.value)} />
      </Grid>
      <Grid item xs={2}>
        <ButtonGroup color="primary">
          <Button onClick={() => setCanSelect(old => !old)} children={`Can Select ${canSelect}`} />
        </ButtonGroup>
      </Grid>

      <Grid item xs={12}>
        <Paper>
          <MUITable
            options={{ search, table, columns, canSelect, rowsCount: table.length }}
            methods={{
              onOrderChange: handleOrderChange,
              onSearchChange: handleSearchChange,
            }}
            actions={{
              toolbarSelected: {
                saveSelected: {
                  onClick: arr => console.log('###', arr),
                  component: props => <Button {...props} children="Save" />,
                },
                dropSelected: {
                  onClick: arr => console.log('@@@', arr),
                  component: props => <Button {...props} children="Delete" />,
                },
              },
            }}
          />
        </Paper>
      </Grid>
    </Grid>
  );
};

AppTableContainer.propTypes = {
  name: PropTypes.string,
};

export default AppTableContainer;
