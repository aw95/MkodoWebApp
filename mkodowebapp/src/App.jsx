import React from 'react';
import { Route, Routes } from 'react-router-dom';
import './App.css'
import AppRoutes from './routing/AppRoutes';
import Layout from './pages/Layout';

function App() {

  return (
    <React.Fragment>
        <Routes>
            <Route path='' element={<Layout />}>
                {AppRoutes.map((route, index) => {
                    const { element, ...rest } = route;
                    return <Route key={index} {...rest} element={element} />;
                })}
                
            </Route>
        </Routes>
    </React.Fragment>
  )
}

export default App
