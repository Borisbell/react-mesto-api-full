import React, { useState } from 'react';
import Header from './Header';
import InfoTooltip from './InfoTooltip';

const Login = (props) => {
  const [formParams, setFormParams] = useState({
    email: '',
    password: '',
  });
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
    props.handleLogin({ email, password })
    .catch(err => {
      setSignupSuccess(false);
      setIsToolTipOpen(true);
    })
  }

  const handleCloseToolTip = () => {
    setIsToolTipOpen(false)
  }

  return(
    <div className="page">
      <Header loggedIn={props.loggedIn} navText='Регистрация' navLink='signup'/>
        <div className="register">
          <h2 className="name name_place_register">
            Вход
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
                      Войти
              </button>
            </div>
          </form>
        </div>
        <InfoTooltip isOpen={isToolTipOpen} 
                   onClose={handleCloseToolTip} 
                   success={signupSuccess}
                   message=''  
                   />
      </div>
  );
}

export default Login;