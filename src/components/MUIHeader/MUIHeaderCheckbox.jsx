import React, { useContext, useEffect, useState } from 'react';
import Checkbox from '@material-ui/core/Checkbox';
import TableCell from '@material-ui/core/TableCell';

import TableContext from '../TableContext';
import { turnOffEvent } from '../../methods';

const MUIHeaderCheckbox = () => {
  const [context, setContext] = useContext(TableContext);
  const { table, options: { selected, rowsCount, orderTable }, methods: { onSelectAllChange } } = context;

  const [checked, setChecked] = useState(false);
  const [indeterminate, setIndeterminate] = useState(false);

  useEffect(() => {
    setChecked(selected.length >= orderTable.length);
    setIndeterminate(!!selected.length && selected.length < orderTable.length);
  }, [orderTable, rowsCount, selected]);

  const handleChange = e => {
    turnOffEvent(e);
    if (!!onSelectAllChange) {
      !!checked ? onSelectAllChange([]) : onSelectAllChange([...JSON.parse(table)]);
    }
    else {
      !!checked
        ? setContext(old => ({ ...old, options: { ...old.options, selected: [] } }))
        : setContext(old => ({ ...old, options: { ...old.options, selected: [...JSON.parse(table)] } }));
    }
  };

  return (
    <TableCell padding="checkbox">
      <Checkbox {...{ checked, indeterminate }} onClick={handleChange} />
    </TableCell>
  );
};

export default MUIHeaderCheckbox;
