import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Header from './Header';
import InfoTooltip from './InfoTooltip';

const Register = (props) => {
  const [formParams, setFormParams] = useState({
    email: '',
    password: ''
  });
  const [message, setMessage] = useState('');
  const [signupSuccess, setSignupSuccess] = useState(true);
  const [isToolTipOpen, setIsToolTipOpen] = useState(false);

  const handleChange = (e) => {
    const {name, value} = e.target;
    setFormParams((prev) => ({
      ...prev,
      [name]: value
    }));
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    let { email, password} = formParams;
    props.handleRegister({ email, password })
      .then(() => {
        setSignupSuccess(true);
      })
      .catch(err => {
        setSignupSuccess(false);
        setMessage(JSON.stringify(err.message));
      })
      .finally(() => {
        setIsToolTipOpen(true)}
      )
  }

  const handleCloseToolTip = () => {
    setIsToolTipOpen(false)
  }

  return (
    <div className="page">
      <Header loggedIn={props.loggedIn} navText='Войти' navLink='signin'/>
      <div className="register">
        <h2 className="name name_place_register">
          Регистрация
        </h2>
        <form onSubmit={handleSubmit} className="register__form">
          <input id="email" 
                 name="email" 
                 type="email" 
                 value={formParams.email} 
                 onChange={handleChange} 
                 className="popup__input popup__input_place-register"
                 placeholder="Email"    
                 required
                 />
          <input id="password"  
              name="password" 
              type="password" 
              value={formParams.password} 
              onChange={handleChange}
              className="popup__input popup__input_place-register"
              placeholder="Пароль" 
              required/>
          <div className="register__button-container">
            <button type="submit" 
                    className="popup__submit popup__submit_place-register">
                    Зарегистрироваться
            </button>
          </div>
        </form>
        <div className="register__signin">
          <p className="register__signin-text">Уже зарегистрированы?</p>
          <Link to="signin" className="register__signin-text register__signin-link">Войти</Link>
        </div>
      </div>
      <InfoTooltip isOpen={isToolTipOpen} 
                   onClose={handleCloseToolTip} 
                   success={signupSuccess}
                   successMessage='Вы успешно зарегистрировались!'
                   message={message}  
                   />
    </div>
  );
}

export default Register;