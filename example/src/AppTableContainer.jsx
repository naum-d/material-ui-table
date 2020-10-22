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
      const url = `https://tc-dev.c-cars.tech/api/tc/internationalization/dtc/model/43`;
      const data = {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'X-Requested-With': 'XMLHttpRequest',
          'Authorization': 'Bearer eyJhbGciOiJSUzI1NiIsImtpZCI6Ijg1ZGViZDc5Mzc2YTUxMzMzNDZjZGZjYTQyYjU0NmJmIiwidHlwIjoiSldUIn0.eyJuYmYiOjE2MDQwNDE5MDksImV4cCI6MTYwNDA0NTUwOSwiaXNzIjoiaHR0cHM6Ly9kZXYwMDMuYy1jYXJzLnRlY2giLCJhdWQiOlsiaHR0cHM6Ly9kZXYwMDMuYy1jYXJzLnRlY2gvcmVzb3VyY2VzIiwiRGV2ZWxvcG1lbnQuU3F1YWRyb24uUHJveHkuQXBpIl0sImNsaWVudF9pZCI6Im5hdGl2ZSIsInN1YiI6IjMzYzRjMDQ1LWExZGMtNDJhMS05ODQ4LTJjYmIzZDUxMTM0NSIsImF1dGhfdGltZSI6MTYwNDAzNzM5MywiaWRwIjoibG9jYWwiLCJuYW1lIjoiMTIzMTIzMTIzIiwicGhvbmVOdW1iZXIiOiIxMjMxMjMxMjMiLCJlbWFpbCI6ImRtYWx5c2hldkBjLWNhcnMudGVjaCIsImh0dHA6Ly9zY2hlbWFzLm1pY3Jvc29mdC5jb20vd3MvMjAwOC8wNi9pZGVudGl0eS9jbGFpbXMvcm9sZSI6IkFkbWluaXN0cmF0b3IiLCJwZXJtaXNzaW9uIjpbImFkbWluIiwidmVoaWNsZXJlc3RyaWN0aW9uYnlwYXNzIiwiY29udHJhY3RvcnJlc3RyaWN0aW9uYnlwYXNzIl0sInNjb3BlIjpbIkRldmVsb3BtZW50LlNxdWFkcm9uLlByb3h5LkFwaSJdLCJhbXIiOlsicHdkIl19.X2XHhN9UKVelWGU3zsZbdF6SS_rf07-JFW2TyCFH-CsA9BKjmivdA8aolvHx_eCDjeE4vs-Z84igF7e4AfDstgrxBohpYmm6yc1g97k94vw9bCcKbOLMpLLdS5A-fc0OE_M6AtuFQ3xk5M8x_JjJnctOPLIWhxOn4Y_3DPElMAiUcxO2mgtALDdu34WISr0yO_OST4FLd7_iEyg_uf2OX1Y3AUQFDM5QjlmXhCNZuBQM7WfPMsA3UHa0f2rjZOywEbChVvAHueC4VTAY-DIj7FJebFeO60uDztSoQNu3OWu2KlomHvlFesCXGrOuUO2eYLj52YlInf_pI9PeCLiKpA',
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
    { field: 'ecu_id', label: 'ECU ID' },
    { field: 'dtc_value', label: 'DTC' },
    { field: 'en', label: 'EN' },
    { field: 'ru', label: 'RU' },
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
