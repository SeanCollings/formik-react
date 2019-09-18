import React from 'react';

import Main from './Main';
import { ThemeProvider } from './contexts';

const App = () =>
  <div className="ui container" style={{ marginTop: '25px' }}>
    <ThemeProvider>
      <Main />
    </ThemeProvider>
  </div>;

export default App;
