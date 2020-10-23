import React, { useContext, useEffect, useState } from 'react';
import Checkbox from '@material-ui/core/Checkbox';
import TableCell from '@material-ui/core/TableCell';

import TableContext from '../TableContext';
import { turnOffEvent } from '../../methods';

const MUIHeaderCheckbox = () => {
  const [context, setContext] = useContext(TableContext);
  const { options: { table, selected, rowsCount } } = context;

  const [checked, setChecked] = useState(false);
  const [indeterminate, setIndeterminate] = useState(false);

  useEffect(() => {
    setChecked(!!rowsCount && rowsCount === selected.length);
    setIndeterminate(!!selected.length && selected.length < rowsCount);
  }, [selected, rowsCount]);

  const handleChange = e => {
    turnOffEvent(e);
    !!checked
      ? setContext(old => ({ ...old, options: { ...old.options, selected: [] } }))
      : setContext(old => ({ ...old, options: { ...old.options, selected: [...table] } }));
  };

  return (
    <TableCell padding="checkbox">
      <Checkbox {...{ checked, indeterminate }} onClick={handleChange} />
    </TableCell>
  );
};

export default MUIHeaderCheckbox;
