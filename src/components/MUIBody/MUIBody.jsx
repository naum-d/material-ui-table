import React, { useContext, useEffect, useState } from 'react';
import TableRow from '@material-ui/core/TableRow';
import TableCell from '@material-ui/core/TableCell';
import TableBody from '@material-ui/core/TableBody';

import TableContext from '../TableContext';
import { getComparator, searchInTable, stableSort } from '../../methods';

const MUIBody = () => {
  const [context, setContext] = useContext(TableContext);

  const { options: { size, page, search, order, orderBy, table, columns } } = context;

  const [searchTable, setSearchTable] = useState([]);
  const [filterTable, setFilterTable] = useState([]);
  const [orderTable, setOrderTable] = useState([]);
  const [print, setPrint] = useState([]);

  useEffect(() => {
    setSearchTable(!!search.length ? searchInTable(search, table, columns) : table);
  }, [search, table, columns]);

  useEffect(() => {
    setOrderTable(!!orderBy ? stableSort(searchTable, getComparator(order, orderBy)) : searchTable);
  }, [searchTable, order, orderBy]);

  useEffect(() => {
    setPrint(orderTable);
    console.log('-----', page, size);
  }, [orderTable, page, size]);

  const renderRows = () => {
    return print.map(row => (
      <TableRow key={row.id}>
        {columns.map(({ field, cellProps, lookup }) => (
          <TableCell key={field} {...cellProps} >
            {!lookup && row[field]}
            {!!lookup && lookup(row[field])}
          </TableCell>
        ))}
      </TableRow>
    ));
  };

  return (
    <TableBody>
      {renderRows()}
    </TableBody>
  );
};

MUIBody.propTypes = {};

export default MUIBody;
