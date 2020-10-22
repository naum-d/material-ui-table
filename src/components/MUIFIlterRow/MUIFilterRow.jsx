import React, { useContext } from 'react';
import { TableRow } from '@material-ui/core';
import TableCell from '@material-ui/core/TableCell';
import TextField from '@material-ui/core/TextField';

import TableContext from '../TableContext';
import { turnOffEvent } from '../../methods';

const MUIFilterRow = () => {

  const [context, setContext] = useContext(TableContext);
  const { columns, options: { canSelect, filters, showFilter, treeTable }, methods: { onFiltersChange } } = context;

  const handleFilterChange = (value, field) => {
    const { [field]: val, ...cleanObj } = filters;
    const newFilters = { ...cleanObj, ...(!!value.toString().length ? { [field]: value } : {}) };

    !!onFiltersChange
      ? onFiltersChange(newFilters)
      : setContext(old => ({ ...old, options: { ...old.options, filters: newFilters, page: 0 } }));
  };

  const renderFilters = () => {
    return columns.map(({ field, label, filterField, canFilter = true, customFilter }) => {
      const props = {
        label,
        name: field,
        value: filters[filterField || field] || '',
        onChange: !!customFilter ? handleFilterChange : e => turnOffEvent(e, handleFilterChange)(e.target.value, field),
      };

      return (
        <TableCell key={field}>
          {!!canFilter && !!customFilter && customFilter(props)}
          {!!canFilter && !customFilter && <TextField fullWidth {...{ ...props }} />}
        </TableCell>
      );
    });
  };

  return !!showFilter && (
    <TableRow>
      {!!treeTable && <TableCell padding="checkbox" />}
      {!!canSelect && <TableCell padding="checkbox" />}

      {renderFilters()}

      <TableCell />
    </TableRow>
  );
};

export default MUIFilterRow;
