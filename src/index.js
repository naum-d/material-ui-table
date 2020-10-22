import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import Grid from '@material-ui/core/Grid';
import Table from '@material-ui/core/Table';
import makeStyles from '@material-ui/core/styles/makeStyles';
import TableContainer from '@material-ui/core/TableContainer';

import { defaultProps } from './defaultProps';
import MUIBody from './components/MUIBody/MUIBody';
import TableContext from './components/TableContext';
import MUIHeader from './components/MUIHeader/MUIHeader';
import MUIToolbar from './components/MUIToolbar/MUIToolbar';
import MUIProgress from './components/MUIProgress/MUIProgress';
import MUITablePagination from './components/MUITablePagination/MUITablePagination';

const useStyles = makeStyles(theme => ({
  root: {
    padding: theme.spacing(0),
    position: 'relative',
  },
}));

const MUITable = props => {

  const classes = useStyles();
  const [context, setContext] = useState({
    columns: props.columns,
    table: JSON.stringify(props.table),
    options: { ...defaultProps.options, ...props.options },
    methods: { ...defaultProps.methods, ...props.methods },
    actions: { ...defaultProps.actions, ...props.actions },
  });

  useEffect(() => {
    setContext(old => ({
        ...old,
        columns: props.columns,
        table: JSON.stringify(props.table),
        options: { ...old.options, ...props.options },
        methods: { ...old.methods, ...props.methods },
        actions: { ...old.actions, ...props.actions },
      }),
    );
  }, [props]);

  return (
    <TableContext.Provider value={[context, setContext]}>
      <MUIToolbar />
      <Grid container className={classes.root}>
        <MUIProgress />
        <TableContainer>
          <Table>
            <MUIHeader />
            <MUIBody />
          </Table>
        </TableContainer>
        <MUITablePagination />
      </Grid>
    </TableContext.Provider>
  );
};

MUITable.propTypes = {
  table: PropTypes.array,
  columns: PropTypes.array,

  options: PropTypes.shape({
    size: PropTypes.number,
    page: PropTypes.number,
    search: PropTypes.string,
    order: PropTypes.string,
    orderBy: PropTypes.string,
    selected: PropTypes.array,
    canSelect: PropTypes.bool,
    rowsCount: PropTypes.number,
    minSize: PropTypes.number,
    showAll: PropTypes.bool,
    showSize: PropTypes.bool,
    tableSizes: PropTypes.array,
    withPaging: PropTypes.bool,
    isLoading: PropTypes.bool,
    showFilter: PropTypes.bool,
    filters: PropTypes.object,
    showRowForm: PropTypes.bool,
    rowFormValues: PropTypes.object,
    treeTable: PropTypes.bool,
    parentField: PropTypes.string,
    childrenField: PropTypes.string,
    serverPaging: PropTypes.bool,
    showSearch: PropTypes.bool,
  }),
  methods: PropTypes.shape({
    onRowClick: PropTypes.oneOfType([PropTypes.oneOf([null]), PropTypes.func]),
    onPageChange: PropTypes.oneOfType([PropTypes.oneOf([null]), PropTypes.func]),
    onOrderChange: PropTypes.oneOfType([PropTypes.oneOf([null]), PropTypes.func]),
    onSearchChange: PropTypes.oneOfType([PropTypes.oneOf([null]), PropTypes.func]),
    onFiltersChange: PropTypes.oneOfType([PropTypes.oneOf([null]), PropTypes.func]),
    onPageSizeChange: PropTypes.oneOfType([PropTypes.oneOf([null]), PropTypes.func]),
    onSelectAllChange: PropTypes.oneOfType([PropTypes.oneOf([null]), PropTypes.func]),
  }),
  actions: PropTypes.shape({
    line: PropTypes.object,
    header: PropTypes.object,
    toolbar: PropTypes.object,
    createForm: PropTypes.object,
    updateForm: PropTypes.object,
    toolbarSelected: PropTypes.object,
  }),
};

MUITable.defaultProps = {
  ...defaultProps,
  options: { ...defaultProps.options },
  methods: { ...defaultProps.methods },
  actions: { ...defaultProps.actions },

};

export default MUITable;
