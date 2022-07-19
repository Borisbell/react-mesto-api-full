import React, { useEffect, useState } from 'react';
import {Route, Switch, Redirect, useHistory } from 'react-router-dom';
import Login from './Login.js';
import Register from './Register.js';
import MyProfile from './MyProfile.js';
import ProtectedRoute from './ProtectedRoute';
import * as auth from '../auth.js';

const App = () => {
  const [loggedIn, setLoggedIn] = useState(false);
  const [userData, setUserData] = useState('');
  const history = useHistory();

  const handleLogin = ({ email, password }) => {
    return auth.authorize(email, password)
      .then((data) => {
        if (data.token) {
          localStorage.setItem('jwt', data.token);
          tokenCheck();
        }
      })
  }

  const handleRegister = ({email, password }) => {
    return auth.register(email, password)
    .then(() => {
      setTimeout(() => {history.push('/signin')}, 3000)
    });
  }

  const tokenCheck = () => {
    if (localStorage.getItem('jwt')){
      let jwt = localStorage.getItem('jwt');
      auth.getContent(jwt)
        .then((res) => {
          setLoggedIn(true);
          setUserData(res.email);
        })
        .then(() => {
          history.push('/');
        });
      };
    }

  const signOut = () => {
    localStorage.removeItem('jwt');
    setLoggedIn(false);
    setUserData(null);
    history.push('/signin');
    }

  useEffect(() => {
    tokenCheck();
  }, []);

  useEffect(() => {
      if (loggedIn) {
        history.push('/');
      }
  }, [loggedIn, history]);

  return (
      <Switch>
        <ProtectedRoute exact path="/" loggedIn={loggedIn}>
            <MyProfile userData={userData} loggedIn={loggedIn} signOut={signOut}/>
        </ProtectedRoute>
        <Route path="/signin">
            <Login handleLogin={handleLogin} tokenCheck={tokenCheck} loggedIn={loggedIn}/>
        </Route>
        <Route path="/signup">
          <div className="registerContainer">
            <Register handleRegister={handleRegister} />
          </div>
        </Route>
        <Route >
          {loggedIn ? <Redirect to="/" /> : <Redirect to="/signin" />}
        </Route>
      </Switch>
  );
}

export default App;