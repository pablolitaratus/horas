import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import Register from './pages/register';
import "primereact/resources/themes/lara-light-indigo/theme.css"; 
import "primereact/resources/primereact.min.css";                  
import "primeicons/primeicons.css";   
import Layout from './layout/layout';
const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
    <Layout />
);

