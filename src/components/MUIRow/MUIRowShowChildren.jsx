import React, { useContext } from 'react';
import clsx from 'clsx';
import PropTypes from 'prop-types';
import { IconButton } from '@material-ui/core';
import TableCell from '@material-ui/core/TableCell';
import makeStyles from '@material-ui/core/styles/makeStyles';
import ArrowForwardIosOutlinedIcon from '@material-ui/icons/ArrowForwardIosOutlined';

import TableContext from '../TableContext';

const useStyles = makeStyles(theme => ({
  open: {
    transform: 'rotate(90deg)',
  },
  closed: {
    transform: 'rotate(0)',
  },
}));

const MUIRowShowChildren = ({ row, open, handleClick }) => {
  const classes = useStyles();

  const [context] = useContext(TableContext);
  const { options: { treeTable, childrenField } } = context;

  return treeTable && (
    <TableCell padding="checkbox">
      {!!!!row[childrenField] && !!row[childrenField].length && (
        <IconButton
          className={clsx({ [classes.open]: open, [classes.closed]: !open })}
          onClick={handleClick}
          children={<ArrowForwardIosOutlinedIcon />}
        />
      )}
    </TableCell>
  );
};

MUIRowShowChildren.propTypes = {
  row: PropTypes.object,
  open: PropTypes.bool,
  handleClick: PropTypes.func,
};

export default MUIRowShowChildren;
