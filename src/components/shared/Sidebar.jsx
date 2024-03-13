import React from "react";
import ProductIcon from "../icons/ProductIcon";
import ProfileIcon from "../icons/ProfileIcon";
import CategoryIcon from "../icons/CategoryIcon";
import LogoutIcon from "../icons/LogoutIcon";
import { Link } from 'react-router-dom'
import UserIcon from "../icons/UserIcon";

const sidebarItems = [
    {
        title: 'profile',
        icon: <ProfileIcon color="blue-50" hover="hover:scale-[1.1] hover:ease-in" transition="transition duration-150 ease-out" />
    },
    {
        title: 'categories',
        icon: <CategoryIcon color="blue-50" hover="hover:scale-[1.1] hover:ease-in" transition="transition duration-150 ease-out" />
    },
    {
        title: 'products',
        icon: <ProductIcon color="blue-50" hover="hover:scale-[1.1] hover:ease-in" transition="transition duration-150 ease-out" />
    },
    {
        title: 'users',
        icon: <UserIcon color="blue-50" hover="hover:scale-[1.1] hover:ease-in" transition="transition duration-150 ease-out" />,
    },
    {
        title: 'logout',
        icon: <LogoutIcon color="blue-50" hover="hover:scale-[1.1] hover:ease-in" transition="transition duration-150 ease-out" />,
    }
]

const Sidebar = () => {
    return (
        <div className="fixed flex rounded-none md:rounded-r-full left-0 bottom-0 bg-blue-950 w-full md:w-20 h-16 md:h-full z-10 justify-center items-center">
            <div className="md:block hidden h-3/5 overflow-y-auto">
                <div className="py-4 px-2 h-full">
                    <ul className="h-full flex flex-col justify-around">
                        {sidebarItems.map(item => {
                            return (
                                <li key={item.title}>
                                    <Link to={`/${item.title}`}>
                                        {item.icon}
                                    </Link>
                                </li>
                            );
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