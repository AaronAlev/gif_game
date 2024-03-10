import './styles/index.css';
import React from 'react';
import { createRoot } from 'react-dom/client';
import App from './App';
import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import 'firebase/database';

const firebaseConfig = {
 // Hidden
};

const app = initializeApp(firebaseConfig);
const auth = getAuth();

const container = document.getElementById('root');
const root = createRoot(container);
root.render(<App />);

export { app, auth };

