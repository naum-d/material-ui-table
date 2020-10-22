import React, { Fragment, useContext, useEffect, useState } from 'react';
import clsx from 'clsx';
import * as PropTypes from 'prop-types';
import Button from '@material-ui/core/Button';
import TableRow from '@material-ui/core/TableRow';
import Checkbox from '@material-ui/core/Checkbox';
import TableCell from '@material-ui/core/TableCell';
import TextField from '@material-ui/core/TextField';
import ButtonGroup from '@material-ui/core/ButtonGroup';
import makeStyles from '@material-ui/core/styles/makeStyles';

import TableContext from '../TableContext';
import MUIRowShowChildren from './MUIRowShowChildren';
import { getFromObject, turnOffEvent } from '../../methods';

const useStyles = makeStyles(theme => ({
  row: {
    '&:hover': {
      cursor: 'pointer',
    },
  },
  cell: level => ({
    paddingLeft: theme.spacing(level * 4 || 2),
  }),
}));

const MUIRow = ({ row, level, closed }) => {
  const classes = useStyles(level);
  const [form, setForm] = useState({});
  const [open, setOpen] = useState(false);
  const [checked, setChecked] = useState(false);
  const [showForm, setShowForm] = useState(false);

  const [context, setContext] = useContext(TableContext);
  const { columns, options, actions, methods: { onRowClick } } = context;
  const { selected, canSelect, childrenField, treeTable } = options;
  const { header, line, updateForm } = actions;

  useEffect(() => {
    setChecked(!!selected.find(i => i.id === row.id));
  }, [selected, row]);

  const handleCheck = () => {
    const newList = checked
      ? [...selected.filter(i => i.id !== row.id)]
      : [...selected, row];

    setContext(old => ({ ...old, options: { ...old.options, selected: newList } }));
  };

  const handleClick = e => {
    turnOffEvent(e);
    !!canSelect
      ? !!onRowClick ? onRowClick(row, checked) : handleCheck()
      : !!onRowClick && onRowClick(row);
  };

  const handleShowForm = () => {
    setForm(row);
    setShowForm(true);
  };

  const handleFormChange = (value, field) => {
    setForm(old => ({ ...old, [field]: value }));
  };

  const handleShowChildren = e => {
    turnOffEvent(e);
    setOpen(old => !old);
  };

  const renderForm = () => {
    return columns.map(({ field, label, customInput, formCell = true }) => {
      const props = {
        label,
        name: field,
        disabled: !formCell,
        value: form[field] || '',
        onClick: e => turnOffEvent(e),
        onChange: !!customInput ? handleFormChange : e => turnOffEvent(e, handleFormChange)(e.target.value, field),
      };
      return (
        <TableCell key={field}>
          {!!customInput && customInput(props)}
          {!customInput && <TextField {...props} />}
        </TableCell>
      );
    });
  };

  const renderLineActions = () => {
    return Object.keys(line).map(key => {
      const { onClick, component } = line[key];
      const props = { key, onClick: e => turnOffEvent(e, onClick)(row, handleShowForm) };
      return !!component ? component(props, row) : <Button {...props} children={key} />;
    });
  };

  const renderFormActions = () => {
    return Object.keys(updateForm).map(key => {
      const { onClick, component } = updateForm[key];
      const props = { key, onClick: e => turnOffEvent(e, onClick)(form, setShowForm) };
      return !!component ? component(props) : <Button {...props} children={key} />;
    });
  };

  return !closed && (
    <Fragment>
      <TableRow
        selected={checked}
        onClick={handleClick}
        hover={canSelect || !!onRowClick}
        className={clsx({ [classes.row]: canSelect || !!onRowClick })}
      >
        <MUIRowShowChildren {...{ row, level, open }} handleClick={handleShowChildren} />

        {canSelect && (
          <TableCell padding="checkbox">
            <Checkbox {...{ checked }} />
          </TableCell>
        )}

        {!showForm && columns.map(({ field, cellProps, lookup }) => (
          <TableCell key={field} className={classes.cell} {...cellProps} >
            {!lookup && getFromObject(field, row)}
            {!!lookup && lookup(getFromObject(field, row))}
          </TableCell>
        ))}

        {!!showForm && renderForm()}

        {!!Object.keys({ ...line, ...header, ...updateForm }).length && (
          <TableCell padding="checkbox" align="right">
            {!showForm && <ButtonGroup size="small" variant="text" color="primary" children={renderLineActions()} />}
            {!!showForm && <ButtonGroup size="small" variant="text" color="primary" children={renderFormActions()} />}
          </TableCell>
        )}
      </TableRow>

      {!!treeTable && !!row[childrenField] && row[childrenField].map(childRow => (
        <MUIRow key={childRow.id} row={childRow} level={level + 1} closed={!open} />
      ))}
    </Fragment>
  );
};

MUIRow.propTypes = {
  row: PropTypes.object,
  closed: PropTypes.bool,
  level: PropTypes.number,
};

MUIRow.defaultProps = {
  level: 0,
  closed: false,
};

export default MUIRow;
