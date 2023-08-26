import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'
import Home from './pagez/Home';
import Login from './pagez/Login';
import Register from './pagez/Register';
import NewTicket from './pagez/NewTicket';
import PrivateRoute from './components/PrivateRoute'
import Tickets from './pagez/Tickets';
import Ticket from './pagez/Ticket';

function App() {
  return (
    <>
      <BrowserRouter>
        <div className='container'>
          <Header />
          <Routes>
            <Route path='/' element={<Home />} />
            <Route path='/login' element={<Login />} />
            <Route path='/register' element={<Register />} />
            <Route path='/new-ticket' element={<PrivateRoute />} >
              <Route path='/new-ticket' element={<NewTicket />} /> 
            </Route>
            <Route path='/tickets' element={<PrivateRoute />} >
              <Route path='/tickets' element={<Tickets />} /> 
            </Route>
            <Route path='/ticket/:ticketId' element={<PrivateRoute />} >
              <Route path='/ticket/:ticketId' element={<Ticket />} /> 
            </Route>
          </Routes>
        </div>
      </BrowserRouter>
      <ToastContainer />
    </>
  );
}

export default App;
