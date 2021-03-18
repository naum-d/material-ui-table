import React, { useCallback, useEffect, useState } from 'react';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Button from '@material-ui/core/Button';
import makeStyles from '@material-ui/core/styles/makeStyles';
import MUITable from '@naum_d/material-ui-table';

const useStyles = makeStyles(theme => ({
  root: {
    padding: theme.spacing(2),
  },

  paper: {
    position: 'relative',
  },
}));

const AppTableContainer = () => {
  const classes = useStyles();
  const [table, setTable] = useState([]);
  const [page, setPage] = useState(0);
  const [size, setSize] = useState(5);
  const [search, setSearch] = useState('');
  const [order, setOrder] = useState('asc');
  const [orderBy, setOrderBy] = useState(null);
  const [filters, setFilters] = useState({});
  const [getUrl, setGetUrl] = useState('');
  const [rowsCount, setRowsCount] = useState(0);
  const [showFilter, setShowFilter] = useState(false);
  const [showRowForm, setShowRowForm] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    let url = `page=${page + 1}&pageSize=${size}`;
    url += !!orderBy ? `&orderBy=${orderBy}&orderDirection=${order}` : '';
    url += '&&';
    setGetUrl(old => !!old.length ? `${url}${old.split('&&')[1]}` : url);
  }, [page, size, order, orderBy]);

  useEffect(() => {
    const timer = setTimeout(() => {
      let url = '&';
      url += !!search.length ? `&search=${search}` : '';
      url += !!Object.keys(filters).length ? Object.keys(filters).map(key => `&${key}=${filters[key]}`) : '';
      setGetUrl(old => !!old.length ? `${old.split('&&')[0]}&${url}` : old);
    }, 500);
    return () => clearTimeout(timer);
  }, [filters, search]);

  useEffect(() => {
    if (!!getUrl.length) {
      setIsLoading(true);
      const url = `http://localhost:8000/api/matches`;
      const data = {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'X-Requested-With': 'XMLHttpRequest',
          'Authorization': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI1ZWM3NzZhZWQxZTU0ZjU0NTZiMjdjM2UiLCJlbWFpbCI6ImFkbWluQGFkbWluLmNvbSIsImlhdCI6MTYxNjA0ODM1OX0.KyVJ7LB_wIN7_fOXYNSKEUmWVLwT5zr2LfWa0FYn5Hw',
        },
      };

      fetch(url, data)
        .then(resp => resp.json())
        .then(resp => {
          console.log(resp);
          setTable(resp);
          // setRowsCount(total);
          // setIsLoading(false);
        });
    }
  }, [getUrl]);

  const columns = [
    { field: 'status', label: 'Status' },
    { field: 'dateCreated', label: 'Date Created' },
  ];

  const handleOrderChange = useCallback((order, orderBy) => {
    console.log('ON ORDER CHANGE', order, orderBy);
    setOrderBy(orderBy);
    setOrder(order);
  }, []);

  const handleSearchChange = useCallback(search => {
    console.log('ON SEARCH', search);
    setSearch(search);
  }, []);

  const handlePageChange = useCallback(page => {
    console.log('ON PAGE CHANGE', page);
    setPage(page);
  }, []);

  const handlePageSizeChange = useCallback(size => {
    console.log('ON PAGE SIZE CHANGE', size);
    setSize(size);
  }, []);

  const handleFiltersChange = filters => {
    setFilters(filters);
  };

  return (
    <Grid container spacing={4} className={classes.root}>
      <Grid item xs={12}>
        <Paper>
          <MUITable
            {...{ table, columns }}
            options={{
              page,
              size,
              order,
              orderBy,
              search,
              filters,
              isLoading,
              showFilter,
              showRowForm,
              rowsCount,
              treeTable: true,
              showSearch: false,
              tableLabel: 'Matches',
              childrenField: 'dtc_values',
            }}
            methods={{
              onPageChange: handlePageChange,
              onOrderChange: handleOrderChange,
              onSearchChange: handleSearchChange,
              onPageSizeChange: handlePageSizeChange,
              onFiltersChange: handleFiltersChange,
              onRowClick: row => console.log(row),
            }}
            actions={{
              toolbar: {
                'to file': { onClick: (table, sorted) => console.log(table, sorted) },
              },
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
              header: {
                add: { onClick: () => setShowRowForm(old => !old) },
                filter: { onClick: () => setShowFilter(old => !old) },
              },
              createForm: {
                save: { onClick: form => console.log('SAVE FORM', form) },
              },
              updateForm: {
                save: { onClick: form => console.log('SAVE FORM', form) },
                close: { onClick: (form, showForm) => showForm(false) },
              },
              line: {
                edit: { onClick: (row, showForm) => showForm() },
              },
            }}
          />
        </Paper>
      </Grid>
    </Grid>
  );
};

export default AppTableContainer;
