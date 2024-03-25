import { AuthContext } from "../../contexts/AuthContext";
import React, { useContext } from "react";
import ProductIcon from "../icons/ProductIcon";
import ProfileIcon from "../icons/ProfileIcon";
import CategoryIcon from "../icons/CategoryIcon";
import LogoutIcon from "../icons/LogoutIcon";
import { Link } from 'react-router-dom'
import UserIcon from "../icons/UserIcon";
import { useNavigate } from "react-router-dom";

const Sidebar = () => {
    const navigateTo = useNavigate();
    const { logout } = useContext(AuthContext);
    const { isLoggedIn } = useContext(AuthContext);

    const sidebarItems = [
        {
            title: 'profile',
            icon: <ProfileIcon color="blue-950" hover="hover:scale-[1.1] hover:ease-in" transition="transition duration-150 ease-out" />
        },
        {
            title: 'categories',
            icon: <CategoryIcon color="blue-950" hover="hover:scale-[1.1] hover:ease-in" transition="transition duration-150 ease-out" />
        },
        {
            title: 'products',
            icon: <ProductIcon color="blue-950" hover="hover:scale-[1.1] hover:ease-in" transition="transition duration-150 ease-out" />
        },
        {
            title: 'users',
            role: 'admin',
            icon: <UserIcon color="blue-950" hover="hover:scale-[1.1] hover:ease-in" transition="transition duration-150 ease-out" />,
        },
        {
            title: 'logout',
            role: 'logged',
            icon: <LogoutIcon color="blue-950" hover="hover:scale-[1.1] hover:ease-in" transition="transition duration-150 ease-out" />,
        }
    ]

    const handleLogout = async () => {
        try {
            const response = await fetch('http://127.0.0.1:8000/api/v1/auth/logout', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer ' + localStorage.getItem('token') // Asegúrate de enviar el token de autenticación en el encabezado Authorization
                }
            });

            const data = await response.json();

            if (response.ok) {
                // Proceso de cierre de sesión exitoso, puedes realizar cualquier acción adicional aquí, como redireccionar al usuario a la página de inicio de sesión
                logout();
                navigateTo('/')
                console.log('Cierre de sesión exitoso:', data);
            } else {
                // Manejar errores de cierre de sesión si es necesario
                console.error('Error en el cierre de sesión:', data);
            }
        } catch (error) {
            console.error('Error en el cierre de sesión:', error);
        }
    };

    return (
        <div className="fixed flex left-0 bottom-0 md:top-0 h-20 z-10 w-full justify-center items-center bg-blue-200">
            <div className="md:flex flex-row w-full hidden overflow-y-hidden">
                <div className="w-full">
                    <ul className="w-full flex flex-row justify-around">
                        {sidebarItems.map(item => {
                            if (item.title === 'logout') {
                                if (isLoggedIn) {
                                    return (
                                        <li key={item.title}>
                                            <button className="bg-transparent p-0 border-none" onClick={handleLogout}>
                                                {item.icon}
                                            </button>
                                        </li>);
                                }
                            } else {
                                return (
                                    <li key={item.title}>
                                        <Link to={`/${item.title}`}>
                                            {item.icon}
                                        </Link>
                                    </li>
                                );
                            }
                        })}
                    </ul>
                </div>
            </div>
            {/* Pestañas para dispositivos móviles y tablets */}
            <div className="md:hidden w-full h-16 flex justify-around items-center">
                {/* iconos */}
            </div>
        </div>
    );
}

export default Sidebar