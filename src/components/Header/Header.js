import React, { useState } from'react';
import { Link } from 'react-router-dom';
import { GiHamburgerMenu } from "react-icons/gi";
import { ImCross } from "react-icons/im";
import { useSelector, useDispatch } from 'react-redux'
import { setLoggedOut } from '../../redux/userSlice'
import SportiverseServices from '../../services'
import iconSportiverse from '../../images/icono2.png'

import './Header.css';

function Header() {
  const dispatch = useDispatch();
  const userStore = useSelector(state => state.user);
  const handleLogout = (event) => {
    event.preventDefault();
    SportiverseServices.logout(userStore.token)
    .then(() => {
        dispatch(setLoggedOut())
    })
    .catch((error) => console.error(error));
  };
  const [respNavOpened, setRespNavOpened] = useState(false);

  return (
    <header className="header">
      <nav>
        <Link to="/" className='logo'><img className='icon-sportiverse' src={iconSportiverse}/> Sportiverse</Link>
        <div>
          <ul id='navbar' className={respNavOpened ? 'opened' : ''}>
            <li><Link to="/" className='active'>Inicio</Link></li>
            <li><Link to="/productos">Productos</Link></li>
            {userStore.isLoggedIn ? (
              <>
                <li><Link to="/cuenta">Mi Cuenta</Link></li>
                <li><button className='logout-btn' onClick={handleLogout}>Cerrar sesión</button></li>
              </>
            )
            : (<li><Link to="/iniciar-sesion">Iniciar sesión</Link></li>)}
          </ul>
        </div>
        <div id='responsive-nav-btn' onClick={()=>setRespNavOpened(!respNavOpened)}>
          {respNavOpened ? (<ImCross/>) : (<GiHamburgerMenu/>)}
        </div>
      </nav>
    </header>
  );
}

export default Header;