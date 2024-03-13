import React, { useState } from 'react';

const LoginForm = () => {
    const [name, setName] = useState('');
    const [phone, setPhone] = useState('');
    const [email, setEmail] = useState('');
    const [username, setUsername] = useState('');
    const [address, setAddress] = useState('');
    const [role, setRole] = useState('customer');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [isRegistering, setIsRegistering] = useState(false);
    const [registrationSuccess, setRegistrationSuccess] = useState(false);

    const handleLogin = async () => {
        try {
            const response = await fetch('http://127.0.0.1:8000/api/v1/auth/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ username, password })
            });
            const data = await response.json();
            console.log(data);

            if (data.token) {
                localStorage.setItem('token', data.token);
                localStorage.setItem('token', data.token);
            } else {
                console.error('El servidor no devolvió un token de autenticación.');
            }
        } catch (error) {
            console.error('Error en la autenticación:', error);
        }
    };

    const handleRegister = async () => {
        console.log({ name, email, phone, address, role, username, password });
        try {
            const response = await fetch('http://127.0.0.1:8000/api/v1/auth/register', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ "full_name": name, email, phone, address, role, username, password })
            });
            const data = await response.json();
            console.log(data);
            if (data.status === 'OK') {
                setRegistrationSuccess(true);
                setIsRegistering(false);
            } else {
                // Manejar otros casos de respuesta del servidor si es necesario
            }
        } catch (error) {
            console.error('Error en el registro:', error);
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (isRegistering) {
            if (password === confirmPassword) {
                handleRegister();
            } else {
                alert('Las contraseñas no coinciden.');
            }
        } else {
            handleLogin();
        }
    };

    const toggleLoginSignup = () => {
        setIsRegistering(prevState => !prevState);
    };

    return (<div>
        <form onSubmit={handleSubmit} className="w-full max-w-xs mx-auto text-blue-950 font-bold text-base">
            <div className="mb-4">
                <label htmlFor="username" className="block">Usuario:</label>
                <input type="username" id="username" className="border-b-2 border-blue-950 bg-white w-full p-2 focus:outline-none" value={username} onChange={(e) => setUsername(e.target.value)} required />
            </div>
            {isRegistering && (
                <div className="registering">
                    <div className="full-name mb-4">
                        <label htmlFor="name" className="block">Nombre completo:</label>
                        <input type="text" id="name" className="border-b-2 border-blue-950 bg-white w-full p-2 focus:outline-none" value={name} onChange={(e) => setName(e.target.value)} required />
                    </div>
                    <div className="email mb-4">
                        <label htmlFor="email" className="block">Email:</label>
                        <input type="email" id="email" className="border-b-2 border-blue-950 bg-white w-full p-2 focus:outline-none" value={email} onChange={(e) => setEmail(e.target.value)} required />
                    </div>
                    <div className="phone mb-4">
                        <label htmlFor="phone" className="block">Teléfono:</label>
                        <input type="phone" id="phone" className="border-b-2 border-blue-950 bg-white w-full p-2 focus:outline-none" value={phone} onChange={(e) => setPhone(e.target.value)} required />
                    </div>
                    <div className="address mb-4">
                        <label htmlFor="address" className="block">Dirección:</label>
                        <input type="text" id="address" className="border-b-2 border-blue-950 bg-white w-full p-2 focus:outline-none" value={address} onChange={(e) => setAddress(e.target.value)} required />
                    </div>
                    <div className="role mb-4">
                        <label htmlFor="role" className="block">Rol:</label>

                        <div className="flex mt-2">
                            <input type="radio" id="admin" name="role" value="admin" className="hidden peer" checked={role === "admin"} onChange={(e) => {
                                console.log(e.target.value)
                                setRole(e.target.value)
                            }} />
                            <label htmlFor="admin" className="cursor-pointer p-1 rounded-md peer-checked:bg-blue-300">Administrador</label>
                        </div>

                        <div className="flex mt-2">
                            <input type="radio" id="vendedor" name="role" value="seller" className="hidden peer" checked={role === "seller"} onChange={(e) => {
                                console.log(e.target.value)
                                setRole(e.target.value)
                            }} />
                            <label htmlFor="vendedor" className="cursor-pointer p-1 rounded-md peer-checked:bg-blue-300">Vendedor</label>
                        </div>

                        <div className="flex mt-2">
                            <input type="radio" id="cliente" name="role" value="customer" className="hidden peer" checked={role === "customer"} onChange={(e) => {
                                console.log(e.target.value)
                                setRole(e.target.value)
                            }} />
                            <label htmlFor="cliente" className="cursor-pointer p-1 rounded-md peer-checked:bg-blue-300">Cliente</label>
                        </div>
                    </div>
                </div>
            )}
            <div className="mb-4">
                <label htmlFor="password" className="block">Contraseña:</label>
                <input type="password" id="password" className="border-b-2 border-blue-950 bg-white w-full p-2 focus:outline-none" value={password} onChange={(e) => setPassword(e.target.value)} required />
            </div>
            {isRegistering && (
                <div className="mb-4">
                    <label htmlFor="confirmPassword" className="block">Confirmar contraseña:</label>
                    <input type="password" id="confirmPassword" className="border-b-2 border-blue-950 bg-white w-full p-2 focus:outline-none" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} required />
                </div>
            )}
            <div className="flex items-center justify-end mt-6">
                <button type="submit" className="bg-white border-blue-950 text-blue-950 font-bold py-2 px-4 rounded hover:bg-blue-950 hover:text-white hover:border-blue-950 hover:outline-none focus:outline-none focus:shadow-outline transition duration-150 ease-out">
                    {isRegistering ? 'Registrarse' : 'Iniciar Sesión'}
                </button>
            </div>
            {registrationSuccess && (
                <p className="mt-6 bg-green-100 p-1 text-green-500 text-justify">Te has registrado correctamente. Ya puedes iniciar sesión.</p>
            )}
        </form>
        <div className="flex justify-end">
            <button className="bg-transparent text-blue-950 text-sm p-0 mt-k hover:underline border-0 mt-4 focus:outline-none" onClick={toggleLoginSignup}>
                {isRegistering ? 'Ir a Iniciar Sesión' : 'Ir a Registrarse'}
            </button>
        </div>
    </div>
    );
};

export default LoginForm;