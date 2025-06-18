import React from 'react';
import { AppProvider } from './Appcontext';
import Main from './Main';
import ScreenShare from "./ScreenShare";

function App() {
  return (
      <AppProvider>
        <Main />
      </AppProvider>

  );
}

export default App;