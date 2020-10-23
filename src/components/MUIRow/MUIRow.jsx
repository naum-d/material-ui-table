import React, { useContext, useEffect, useState } from 'react';
import clsx from 'clsx';
import * as PropTypes from 'prop-types';
import TableRow from '@material-ui/core/TableRow';
import Checkbox from '@material-ui/core/Checkbox';
import TableCell from '@material-ui/core/TableCell';
import makeStyles from '@material-ui/core/styles/makeStyles';

import TableContext from '../TableContext';
import { turnOffEvent } from '../../methods';

const useStyles = makeStyles(() => ({
  row: {
    '&:hover': {
      cursor: 'pointer',
    },
  },
}));

const MUIRow = props => {
  const classes = useStyles();
  const [checked, setChecked] = useState(false);
  const [context, setContext] = useContext(TableContext);

  const { row } = props;
  const { options: { columns, selected, canSelect, rowHover } } = context;

  useEffect(() => {
    setChecked(!!selected.find(i => i.id === row.id));
  }, [selected, row]);

  const handleCheck = () => {
    const index = selected.findIndex(i => i.id === row.id);
    const newList = index === -1
      ? [...selected, row]
      : [...selected.slice(0, index), ...selected.slice(index + 1)];

    setContext(old => ({ ...old, options: { ...old.options, selected: newList } }));
  };

  const handleClick = e => {
    turnOffEvent(e);
    canSelect && handleCheck();
  };

  return (
    <TableRow hover={rowHover} selected={checked} onClick={handleClick} className={clsx({[classes.row]: rowHover})}>
      {canSelect && (
        <TableCell padding="checkbox">
          <Checkbox {...{ checked }} />
        </TableCell>
      )}


      {columns.map(({ field, cellProps, lookup }) => (
        <TableCell key={field} {...cellProps} >
          {!lookup && row[field]}
          {!!lookup && lookup(row[field])}
        </TableCell>
      ))}
    </TableRow>
  );
};

MUIRow.propTypes = {
  row: PropTypes.object,
};

export default MUIRow;
