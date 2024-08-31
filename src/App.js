import React from 'react';
import './App.css';
import { Routes, Route, BrowserRouter as Router } from 'react-router-dom';
import { UserProvider } from './UserContext';
import TodoList from './TodoList';
import GoogleLogin from './GoogleLogin';
import Form from './Form';
import Basket from './Basket';
import Comment from './Comment';

function App() {
  return (
    <div className="App">
        <Router>
          <UserProvider>
            <Routes>
              <Route path='/' element={<GoogleLogin/>}/>
              <Route path='/todolist' element={<TodoList/>}/>
              <Route path='/add' element={<Form/>}/>
              <Route path='/basket' element={<Basket/>}/>
              <Route path='/comment' element={<Comment/>}/>


            </Routes>
          </UserProvider>
        </Router>
    </div>
  );
}

export default App;
