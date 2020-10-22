import React, { Fragment } from 'react';
import 'fontsource-roboto';
import CssBaseline from '@material-ui/core/CssBaseline';

import AppTableContainer from './AppTableContainer';

const App = () => {

  return (
    <Fragment>
      <CssBaseline />
      <main>
        <AppTableContainer />
      </main>
    </Fragment>
  );
};

export default App;
