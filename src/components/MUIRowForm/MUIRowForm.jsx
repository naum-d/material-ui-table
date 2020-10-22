import React, { useContext } from 'react';
import { TableRow } from '@material-ui/core';
import Button from '@material-ui/core/Button';
import TableCell from '@material-ui/core/TableCell';
import TextField from '@material-ui/core/TextField';
import ButtonGroup from '@material-ui/core/ButtonGroup';

import TableContext from '../TableContext';
import { turnOffEvent } from '../../methods';

const MUIRowForm = () => {

  const [context, setContext] = useContext(TableContext);
  const { columns, options, actions: { createForm } } = context;
  const { canSelect, showRowForm, rowFormValues, treeTable } = options;

  const handleInputChange = (value, field) => {
    const newValues = { ...rowFormValues, [field]: value };
    setContext(old => ({ ...old, options: { ...old.options, rowFormValues: newValues } }));
  };

  const renderForm = () => {
    return columns.map(({ field, label, customInput, formCell = true }) => {
      const props = {
        label,
        name: field,
        value: rowFormValues[field] || '',
        onChange: !!customInput ? handleInputChange : e => turnOffEvent(e, handleInputChange)(e.target.value, field),
      };
      return (
        <TableCell key={field}>
          {!!formCell && !!customInput && customInput(props)}
          {!!formCell && !customInput && <TextField {...props} />}
        </TableCell>
      );
    });
  };

  const renderActions = () => {
    return Object.keys(createForm).map(key => {
      const { onClick, component } = createForm[key];
      const props = { key, onClick: e => turnOffEvent(e, onClick)(rowFormValues) };
      return !!component ? component(props) : <Button {...props} children={key} />;
    });
  };

  return !!showRowForm && (
    <TableRow>
      {!!treeTable && <TableCell padding="checkbox" />}
      {!!canSelect && <TableCell padding="checkbox" />}

      {renderForm()}

      {!!Object.keys(createForm).length && (
        <TableCell padding="checkbox" align="right">
          <ButtonGroup size="small" variant="text" color="primary" children={renderActions()} />
        </TableCell>
      )}
    </TableRow>
  );
};

export default MUIRowForm;
