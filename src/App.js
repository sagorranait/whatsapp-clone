import React from 'react'
import './App.css'
import Chats from './components/Chats'
import Sidebar from './components/Sidebar'
import {
  BrowserRouter as Router,
  Switch,
  Route
} from 'react-router-dom'
import Login from './components/Login'
import { getUser } from './features/userSlice'
import { useSelector } from 'react-redux'

const App = () => {
  const user = useSelector(getUser)
  return (
    <div className="app">
      {!user ? (
        <Login />
      ):(
        <div className="app__body">
          <Router>
          <Sidebar />
            <Switch>
              <Route path="/rooms/:roomId">
                <Chats />
              </Route>
              <Route path="/">
                <Chats />
              </Route>
            </Switch>
          </Router>
        </div>
      )}
    </div>
  );
}

export default App;
