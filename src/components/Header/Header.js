import React, { useState } from'react';
import { Link, useMatch } from 'react-router-dom';
import { GiHamburgerMenu } from "react-icons/gi";
import { ImCross } from "react-icons/im";
import { useSelector, useDispatch } from 'react-redux'
import { setLoggedOut } from '../../redux/userSlice'
import SportiverseServices from '../../services'
import iconSportiverse from '../../images/icono2.png'
import { useNavigate } from 'react-router-dom';
import { FaShoppingCart } from "react-icons/fa";

import './Header.css';

function Header() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const userStore = useSelector(state => state.user);
  const cartStore = useSelector(state => state.cart);
  const isAdmin = userStore.role === 1;
  const isSeller = userStore.role === 2;
  const isCustomer = userStore.role === 3;
  const isHomeActive = useMatch('/');
  const isProductosActive = useMatch('/productos');
  const isCuentaActive = useMatch('/cuenta');
  const isIniciarSesionActive = useMatch('/iniciar-sesion');
  const isAdminActive = useMatch('/admin');
  const isSellerActive = useMatch('/seller');

  const handleLogout = (event) => {
    event.preventDefault();
    setRespNavOpened(false);
    SportiverseServices.logout(userStore.token)
     .then(() => {
          navigate('/')
          dispatch(setLoggedOut())
      })
     .catch((error) => console.error(error));
  };
  const [respNavOpened, setRespNavOpened] = useState(false);

  return (
    <header className="header">
      <nav className='main-nav'>
        <Link to="/" className='logo'><img className='icon-sportiverse' src={iconSportiverse}/> Sportiverse</Link>
      <ul id="navbar" className={respNavOpened? "opened" : ""}>
        <li>
          <Link to="/" className={`nav-link ${isHomeActive? "active" : ""}`} onClick={() => setRespNavOpened(false)}>
            Inicio
          </Link>
        </li>
        <li>
          <Link to="/productos" className={`nav-link ${isProductosActive? "active" : ""}`} onClick={() => setRespNavOpened(false)}>
            Productos
          </Link>
        </li>
        {userStore.isLoggedIn? (
          <>
            {isAdmin? (
              <li>
                <Link to="/admin" className={`admin-link ${isAdminActive? "active" : ""}`} onClick={() => setRespNavOpened(false)}>
                  Admin
                </Link>
              </li>
            ) : isSeller ? (
              <li>
                <Link to="/seller" className={`admin-link ${isSellerActive? "active" : ""}`} onClick={() => setRespNavOpened(false)}>
                  Vendedor
                </Link>
              </li>
            ) : (
              <li>
                <Link to="/cuenta" className={`nav-link ${isCuentaActive? "active" : ""}`} onClick={() => setRespNavOpened(false)}>
                  Mi Cuenta
                </Link>
              </li>
            )}
            <li>
              <button className="logout-btn" onClick={handleLogout}>
                Cerrar sesión
              </button>
            </li>
            {
            isCustomer && (
              <li>
                <Link to="/cart" className='nav-link' style={{display: 'flex'}}>
                  <FaShoppingCart style={{fontSize:'1em'}}/>
                  {cartStore.cart.length > 0 && (<span style={{display: 'block', width: '0.1em', height: '0.1em'}}>{cartStore.cart.length}</span>)}
                </Link>
              </li>
            )}
          </>
        ) : (
          <li>
            <Link to="/iniciar-sesion" className={`nav-link ${isIniciarSesionActive? "active" : ""}`} onClick={() => setRespNavOpened(false)}>
              Iniciar sesión
            </Link>
          </li>
        )}
      </ul>
        <div id='responsive-nav-btn' onClick={()=>setRespNavOpened(!respNavOpened)}>
          {respNavOpened? (<ImCross/>) : (<GiHamburgerMenu/>)}
        </div>
      </nav>
    </header>
  );
}

export default Header;