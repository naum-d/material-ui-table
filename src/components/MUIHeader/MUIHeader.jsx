import React, { useContext } from 'react';
import { TableHead } from '@material-ui/core';
import Button from '@material-ui/core/Button';
import TableRow from '@material-ui/core/TableRow';
import TableCell from '@material-ui/core/TableCell';
import ButtonGroup from '@material-ui/core/ButtonGroup';
import TableSortLabel from '@material-ui/core/TableSortLabel';

import TableContext from '../TableContext';
import { turnOffEvent } from '../../methods';
import MUIHeaderCheckbox from './MUIHeaderCheckbox';

const MUIHeader = () => {

  const [context, setContext] = useContext(TableContext);
  const { columns, options: { order, orderBy, canSelect, treeTable }, methods: { onOrderChange }, actions } = context;
  const { line, header } = actions;

  const handleSort = column => e => {
    turnOffEvent(e);
    const direction = (orderBy === column && order === 'asc') ? 'desc' : 'asc';

    !!onOrderChange
      ? onOrderChange(direction, column)
      : setContext(old => ({ ...old, options: { ...old.options, order: direction, orderBy: column } }));
  };

  const renderHeadCell = () => {
    return columns.map(({ field, label, cellProps, canSort = true }) => (
      <TableCell key={field} {...cellProps} sortDirection={!!orderBy && orderBy === field && order}>
        {canSort
          ? (
            <TableSortLabel active={!!orderBy && orderBy === field} direction={order} onClick={handleSort(field)}>
              {label}
            </TableSortLabel>
          )
          : label
        }
      </TableCell>
    ));
  };

  const renderActions = () => {
    return Object.keys(header).map(key => {
      const { onClick, component } = header[key];
      const props = { key, onClick: e => turnOffEvent(e, onClick)() };
      return !!component ? component(props) : <Button {...props} children={key} />;
    });
  };

  return (
    <TableHead>
      <TableRow>
        {treeTable && <TableCell padding="checkbox" />}
        {canSelect && <MUIHeaderCheckbox />}

        {renderHeadCell()}

        {!!Object.keys({ ...line, ...header }).length && (
          <TableCell padding="checkbox" align="right">
            <ButtonGroup size="small" variant="outlined" color="primary" children={renderActions()} />
          </TableCell>
        )}
      </TableRow>
    </TableHead>
  );
};

MUIHeader.propTypes = {};

export default MUIHeader;
