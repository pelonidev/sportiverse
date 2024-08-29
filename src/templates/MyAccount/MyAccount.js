import React, { useState, useEffect } from 'react';
import { deepEqual } from '../../utils/ObjectUtils';
import { useSelector } from 'react-redux';
import './MyAccount.css';

function MyAccount() {
  const [userData, setUserData] = useState({});
  const [formData, setFormData] = useState({});
  const [feedbackMessage, setFeedbackMessage] = useState({type:'', message:''});
  const [isFormUnmodified, setIsFormUnmodified] = useState(true);
  const userStore = useSelector(state => state.user);

  useEffect(() => {
    fetch(`http://localhost:8000/api/v1/${userStore.role === 3 ? 'customer' : 'seller'}/${userStore.username}`, {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${userStore.token}`,
        'Content-Type': 'application/json'
      }
    })
    .then(response => response.json())
    .then(data => {
      console.log({data});
      setUserData(data);
      setFormData(data);
    })
    .catch(error => console.error(error));
  }, []);

  useEffect(() => {
    setIsFormUnmodified(deepEqual(userData, formData));
  }, [formData, userData]);

  const handleInputChange = (field) => (event) => {
    setFormData({
      ...formData,
      [field]: event.target.value
    });
    setFeedbackMessage({type:'', message:''})
  };

  const handleSubmitAccount = async (event) => {
    event.preventDefault();
    fetch(`http://localhost:8000/api/v1/${userStore.role === 3 ? 'customer' : 'seller'}/${userStore.username}`, {
      method: 'PATCH',
      headers: {
        'Authorization': `Bearer ${userStore.token}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(formData)
    })
    .then(response => response.json())
    .then(()=>{
      setFeedbackMessage({type: 'success', message: 'Cambios realizados correctamente'})
      fetch(`http://localhost:8000/api/v1/${userStore.role === 3 ? 'customer' : 'seller'}/${userStore.username}`, {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${userStore.token}`,
          'Content-Type': 'application/json'
        }
      })
      .then(response => response.json())
      .then(data => {
        setUserData(data);
        setFormData(data);
      })
      .catch(error => console.error(error));
    })
    .catch(() => {
      setFeedbackMessage({type: 'error', message: 'Ha habido algún problema realizando los cambios'})
    });
  };

  return (
    <div>
      <h1>Mi Cuenta</h1>
      <form onSubmit={handleSubmitAccount}>
        <ul>
          <li className='account-li'>
            <label>Nombre: </label>
            <input type="text" value={formData.full_name || ''} onChange={handleInputChange('full_name')} />
          </li>
          <li className='account-li'>
            <label>Email: </label>
            <input type="email" value={formData.email || ''} onChange={handleInputChange('email')} />
          </li>
          <li className='account-li'>
            <label>Dirección: </label>
            <input type="text" value={formData.address || ''} onChange={handleInputChange('address')} />
          </li>
          <li className='account-li'>
            <label>Teléfono: </label>
            <input type="phone" value={formData.phone || ''} onChange={handleInputChange('phone')} />
          </li>
          <li className='account-li'>
            <label>Nombre de usuario: </label>
            <input type="text" value={formData.username || ''} onChange={handleInputChange('username')} />
          </li>
        </ul>
        <input type='submit' value='Guardar' disabled={isFormUnmodified} />
        {feedbackMessage && feedbackMessage.message
        ? (<div className={`feedback-container ${feedbackMessage.type}`}>
          <span>{feedbackMessage.message}</span>
        </div>) : (null)}
      </form>
    </div>
  );
}

export default MyAccount;
