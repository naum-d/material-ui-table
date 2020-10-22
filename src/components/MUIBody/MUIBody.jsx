import React, { useContext, useEffect, useState } from 'react';
import TableRow from '@material-ui/core/TableRow';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';

import MUIRow from '../MUIRow/MUIRow';
import TableContext from '../TableContext';
import MUIRowForm from '../MUIRowForm/MUIRowForm';
import MUIFilterRow from '../MUIFIlterRow/MUIFilterRow';
import { arrayToTree, getComparator, getFilterTable, searchInTable, stableSort } from '../../methods';

const MUIBody = () => {
  const [context, setContext] = useContext(TableContext);
  const { table: strTable, columns, options } = context;
  const { size, page, search, order, orderBy, orderTable, filters, parentField, serverPaging } = options;

  const [emptyRows, setEmptyRows] = useState(size);
  const [print, setPrint] = useState([]);

  useEffect(() => {
    if (!serverPaging && strTable.length > 2) {
      console.log('!!! ORDER TABLE');
      setContext(old => ({ ...old, options: { ...old.options, isLoading: true } }));

      const timer = setTimeout(() => {
        const table = JSON.parse(strTable);
        const searchTable = !!search.length ? searchInTable(search, table, columns) : table;
        const filterTable = !!Object.keys(filters).length ? getFilterTable(searchTable, filters, columns) : searchTable;
        const treeTable = !!parentField.length ? arrayToTree(filterTable, parentField) : filterTable;
        const orderTable = !!orderBy ? stableSort(treeTable, getComparator(order, orderBy)) : treeTable;

        setContext(old => ({ ...old, options: { ...old.options, orderTable, isLoading: false } }));
      }, 500);

      return () => clearTimeout(timer);
    }

    setContext(old => ({ ...old, options: { ...old.options, orderTable: JSON.parse(strTable) } }));
  }, [filters, order, orderBy, parentField, search, serverPaging, setContext, columns, strTable]);

  useEffect(() => {
    if (!serverPaging) {
      const printTable = orderTable.slice(page * size, page * size + size);
      setEmptyRows(Math.min(size, size - printTable.length));
      setPrint(printTable);
    }
    else {
      setPrint(orderTable);
      setEmptyRows(Math.min(size, size - orderTable.length));
    }
  }, [orderTable, page, serverPaging, size]);

  return (
    <TableBody>
      <MUIFilterRow />
      <MUIRowForm />

      {print.map(row => <MUIRow key={row.id} {...{ row }} />)}

      {emptyRows > 0 && (
        <TableRow style={{ height: 53 * emptyRows }} children={<TableCell colSpan={12} />} />
      )}
    </TableBody>
  );
};

MUIBody.propTypes = {};

export default MUIBody;
