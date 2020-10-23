import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';

import { defaultProps } from './defaultProps';
import TableContext from './components/TableContext';
import MUIToolbar from './components/MUIToolbar/MUIToolbar';
import TableContainer from '@material-ui/core/TableContainer';
import Table from '@material-ui/core/Table';
import MUIHeader from './components/MUIHeader/MUIHeader';
import MUIBody from './components/MUIBody/MUIBody';

const MUITable = (props) => {

  const [context, setContext] = useState(defaultProps);

  useEffect(() => {
    setContext(old =>
      ({
        ...old,
        options: { ...old.options, ...props.options },
        methods: { ...old.methods, ...props.methods },
        actions: { ...old.actions, ...props.actions },
      }),
    );
  }, [props]);

  return (
    <TableContext.Provider value={[context, setContext]}>
      <MUIToolbar />
      <TableContainer>
        <Table>
          <MUIHeader />
          <MUIBody />
        </Table>
      </TableContainer>
    </TableContext.Provider>
  );
};

MUITable.propTypes = {
  options: PropTypes.shape({
    size: PropTypes.number,
    page: PropTypes.number,
    search: PropTypes.string,
    order: PropTypes.string,
    orderBy: PropTypes.string,
    table: PropTypes.array,
    columns: PropTypes.array,
    selected: PropTypes.array,
    canSelect: PropTypes.bool,
    rowsCount: PropTypes.number,
    rowHover: PropTypes.bool,
  }),
  methods: PropTypes.shape({
    onOrderChange: PropTypes.func,
    onSearchChange: PropTypes.func,
  }),
  actions: PropTypes.shape({
    toolbar: PropTypes.object,
    toolbarSelected: PropTypes.object,
  }),
};

MUITable.defaultProps = { ...defaultProps };

export default MUITable;
