import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './output.css';

// Grab the root element safely
const rootElement = document.getElementById('root');

if (!rootElement) {
  throw new Error("Root element not found. Did you forget to add <div id='root'></div> in index.html?");
}

const root = ReactDOM.createRoot(rootElement);

root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);