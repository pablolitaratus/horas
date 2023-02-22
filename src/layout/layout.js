import React from 'react'
import Register from '../pages/register'
import ConfigToken from '../pages/configToken'
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import { ContextRegister } from '../storeData/context';
import TabMenuDemo from './menu'

function Layout () {
  
    const [token, setToken] = React.useState({endPoint: 'https://portalempleado.nextret.net/timeapi/api/register/workingdaysstretch',
                                              token: null});


    return (
    <ContextRegister.Provider value={token}>
      <div>
        <BrowserRouter>
          <nav>
            <TabMenuDemo />
          </nav>
          <Routes>
            <Route path="/home" element={<Register/>} />
            <Route path="/token" element={<ConfigToken setToken={setToken}/>} />
          </Routes>
        </BrowserRouter>
      </div>
    </ContextRegister.Provider>

    );
 
}

export default Layout;

