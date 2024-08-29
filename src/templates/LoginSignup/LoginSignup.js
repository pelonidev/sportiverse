import React, { useState } from'react';
import './LoginSignup.css';
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom';
import { setLoggedIn } from '../../redux/userSlice'
import SportiverseServices from '../../services'

function LoginSignup() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const userStore = useSelector(state => state.user);
  const [loginHasErrors, setLoginHasErrors] = useState(false);
  const [errorsRegistering, setErrorsRegistering] = useState([]);
  const [isLoggingIn, setIsLoggingIn] = useState(true);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [fullNameRegister, setFullNameRegister] = useState('');
  const [emailRegister, setEmailRegister] = useState('');
  const [phoneRegister, setPhoneRegister] = useState('');
  const [addressRegister, setAddressRegister] = useState('');
  const [usernameRegister, setUsernameRegister] = useState('');
  const [passwordRegister, setPasswordRegister] = useState('');
  const [roleRegister, setRoleRegister] = useState('customer');

  const handleSubmitLogin = (event) => {
    event.preventDefault();
    SportiverseServices.login(username, password)
    .then(response => {
        dispatch(setLoggedIn({token: response.token, role: response.role, username: response.user.username}))
        navigate('/')
    })
    .catch(() => setLoginHasErrors(true));
  };
  const handleSubmitRegister = (event) => {
    event.preventDefault();
    fetch('http://localhost:8000/api/v1/auth/register', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        'full_name': 'MIGUEL ADMIN',
        email: emailRegister,
        phone: phoneRegister,
        address: addressRegister,
        username: usernameRegister,
        password: passwordRegister,
        role: roleRegister
      }),
    })
    .then(response => response.json())
    .then(response => {
      if(response.errors)
      {
        throw new Error(Object.keys(response.errors).join(','));
      }
      else
      {
        fetch('http://localhost:8000/api/v1/auth/login', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ 
            username: usernameRegister,
            password: passwordRegister
          }),
        })
        .then(response => response.json())
        .then(response => {
          if(response.token)
          {
            dispatch(setLoggedIn({token: response.token, role: response.role, username: response.user.username}))
            navigate('/')
          }
          else
          {
            setLoginHasErrors(true)
          }
        })
      }
    })
    .catch(error => {
      console.log(error.message)
      setErrorsRegistering(error.message.split(','))
    });
  };

  return (
    <div className='login-signup-container'>
      {isLoggingIn ? (
        <form onSubmit={handleSubmitLogin} className='login-form'>
          <h1>Hola de nuevo!</h1>
          <label>Nombre de usuario</label>
          <input type="text" onChange={(event) => setUsername(event.target.value)} />
          <label>Contraseña</label>
          <input type="password" onChange={(event) => setPassword(event.target.value)} />
          <input type='submit' value='Iniciar Sesión'></input>
        </form>
      ) : (
        <form onSubmit={handleSubmitRegister} className='register-form'>
          <h1>Regístrate!</h1>
          <div className='register-form-content'>
            <div className='register-form-column'>
              <label>Nombre completo</label>
              <input type="text" onChange={(event) => setFullNameRegister(event.target.value)} />
              <label>Dirección</label>
              <input type="text" onChange={(event) => setAddressRegister(event.target.value)} />
              <label>Teléfono</label>
              <input type="phone" onChange={(event) => setPhoneRegister(event.target.value)} />
            </div>
            <div className='register-form-column'>
              <fieldset>
                <legend>Selecciona el rol de tu usuario:</legend>
                <div>
                  <input type="radio" id="customer" name="role" value="customer" checked={roleRegister==='customer'} onChange={(event)=> setRoleRegister(event.currentTarget.value)} />
                  <label htmlFor="customer">Comprador</label>
                </div>
                <div>
                  <input type="radio" id="seller" name="role" value="seller" checked={roleRegister==='seller'} onChange={(event)=> setRoleRegister(event.currentTarget.value)} />
                  <label htmlFor="seller">Vendedor</label>
                </div>
              </fieldset>
              <label>Email</label>
              <input type="email" onChange={(event) => setEmailRegister(event.target.value)} />
              <label>Nombre de usuario</label>
              <input type="text" onChange={(event) => setUsernameRegister(event.target.value)} />
              <label>Contraseña</label>
              <input type="password" onChange={(event) => setPasswordRegister(event.target.value)} />
              <input type='submit' value='Registrarse'></input>
            </div>
          </div>
        </form>
      )}
      {errorsRegistering.length > 0
      ? (<ul className='errors'>
        {errorsRegistering.map(error=>(<li>Campo {error} no válido.</li>))}
      </ul>)
      : (null)}
      {loginHasErrors
      ? (<ul className='errors errors-login'>
        <li>Credenciales no válidas</li>
      </ul>)
      : (null)}
      <div className='link-no-user-container'>
        <button className='link-no-user' onClick={()=>{
            setIsLoggingIn(!isLoggingIn);
            setErrorsRegistering([]);
            setLoginHasErrors(false);
          }}>{isLoggingIn ? '¿Aún no tienes una cuenta?' : 'Iniciar sesión'}</button>
      </div>
    </div>
  );
}

export default LoginSignup;