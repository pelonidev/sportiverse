import React, { useState, useEffect, useContext } from "react";
import { AuthContext } from "../../contexts/AuthContext";
import LoginForm from "../templates/LoginForm";
import ProfileContent from "../templates/ProfileContent";

const ProfileView = () => {
    const { login } = useContext(AuthContext);

    const [errorLogin, setErrorLogin] = useState("");
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [userData, setUserData] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const token = localStorage.getItem('token');
        if (token) {
            // Aquí podrías agregar lógica para verificar la validez del token en el servidor
            setIsLoggedIn(true);
        }
        setLoading(false);
    }, []);


    const handleLogin = async (inputValues) => {
        try {
            const response = await fetch('http://127.0.0.1:8000/api/v1/auth/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ username: inputValues.username, password: inputValues.password })
            });
            const data = await response.json();

            if (data.token) {
                localStorage.setItem('token', data.token);
                setIsLoggedIn(true);
                setUserData(data);
                login();
            } else {
                setErrorLogin("Error al iniciar sesión. Comprueba el usuario y contraseña")
            }
        } catch (error) {
            console.error('Error en la autenticación:', error);
        }
    };

    const handleRegister = async (inputValues) => {
        try {
            const response = await fetch('http://127.0.0.1:8000/api/v1/auth/register', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    "full_name": inputValues.name,
                    email: inputValues.email,
                    phone: inputValues.phone,
                    address: inputValues.address,
                    role: inputValues.role,
                    username: inputValues.username,
                    password: inputValues.password
                })
            });
            const data = await response.json();
        } catch (error) {
            console.error('Error en el registro:', error);
        }
    };

    // Muestra un indicador de carga mientras se verifica la autenticación
    if (loading) {
        return <div></div>;
    }

    return (
        isLoggedIn ? <ProfileContent userData={userData} /> : <LoginForm onLogin={handleLogin} onRegister={handleRegister} errorLogin={errorLogin} />
    );
}

export default ProfileView