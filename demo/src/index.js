import React from 'react';
import ReactDOM from 'react-dom';

import MTable from '../../src/MTable';

const target = document.querySelector('#root');

const App = () => (
  <MTable />
);

ReactDOM.render(<App />, target);
