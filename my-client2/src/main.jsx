import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx';
import './index.css';
import custom from './Until/Customutil.js';
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer } from 'react-toastify';

const data =  await custom.get('/test')
console.log(data);


ReactDOM.createRoot(document.getElementById('root')).render(
  <>
    <App />
    <ToastContainer position='top-center'/>
  </>
);
