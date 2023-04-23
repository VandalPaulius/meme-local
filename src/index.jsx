import * as React from 'react';
import * as ReactDOMClient from 'react-dom/client';
import { App } from './app';

const root = ReactDOMClient.createRoot(document.getElementById('react-root'));
root.render(<App />);
