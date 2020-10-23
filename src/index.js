import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';

import { defaultProps } from './defaultProps';
import TableContext from './components/TableContext';
import MUIToolbar from './components/MUIToolbar/MUIToolbar';

const MUITable = (props) => {

  const [context, setContext] = useState(defaultProps);

  useEffect(() => {
    setContext(old =>
      ({
        ...old,
        options: { ...old.options, ...props.options },
        methods: { ...old.methods, ...props.methods },
        actions: { ...old.actions, ...props.actions },
      }),
    );
  }, [props]);

  return (
    <TableContext.Provider value={[context, setContext]}>
      <MUIToolbar />
    </TableContext.Provider>
  );
};

MUITable.propTypes = {
  options: PropTypes.shape({
    size: PropTypes.number,
    page: PropTypes.number,
    search: PropTypes.string,
    table: PropTypes.array,
    selected: PropTypes.array,
  }),
  methods: PropTypes.shape({
    onSearchChange: PropTypes.func,
  }),
  actions: PropTypes.shape({
    toolbar: PropTypes.object,
    toolbarSelected: PropTypes.object,
  }),
};

MUITable.defaultProps = { ...defaultProps };

export default MUITable;
