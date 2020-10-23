import React, { useContext, useEffect } from 'react';
import { TableHead } from '@material-ui/core';
import TableRow from '@material-ui/core/TableRow';
import TableCell from '@material-ui/core/TableCell';
import TableSortLabel from '@material-ui/core/TableSortLabel';

import TableContext from '../TableContext';
import { turnOffEvent } from '../../methods';
import MUIHeaderCheckbox from './MUIHeaderCheckbox';

const MUIHeader = () => {
  const [context, setContext] = useContext(TableContext);

  const { options: { columns, order, orderBy, canSelect }, methods: { onOrderChange } } = context;

  useEffect(() => {
    onOrderChange(order, orderBy);
  }, [onOrderChange, order, orderBy]);

  const handleSort = field => e => {
    turnOffEvent(e);
    const isAsc = orderBy === field && order === 'asc';
    const direction = isAsc ? 'desc' : 'asc';
    setContext(old => ({ ...old, options: { ...old.options, order: direction, orderBy: field } }));
  };

  const renderHeadCell = () => {
    return columns.map(({ field, label, cellProps, canSort = true }) => (
      <TableCell key={field} {...cellProps} sortDirection={!!orderBy && orderBy === field && order}>
        {canSort ? (
          <TableSortLabel active={!!orderBy && orderBy === field} direction={order} onClick={handleSort(field)}>
            {label}
          </TableSortLabel>
        ) : label}
      </TableCell>
    ));
  };

  return (
    <TableHead>
      <TableRow>
        {canSelect && <MUIHeaderCheckbox />}

        {renderHeadCell()}
      </TableRow>
    </TableHead>
  );
};

MUIHeader.propTypes = {};

export default MUIHeader;
