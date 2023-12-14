import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './components/App';
import AppProvider from './context/AppContext';
import ControlsProvider from './context/ControlsContext';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <AppProvider>
      <ControlsProvider>
        <App />
      </ControlsProvider>
    </AppProvider>
  </React.StrictMode>,
);
