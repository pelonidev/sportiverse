import React, { useState } from 'react';

const LoginForm = ({ onLogin, onRegister, errorLogin }) => {
    const initialValues = {
        username: '',
        password: '',
        confirmPassword: '',
        name: '',
        email: '',
        phone: '',
        address: '',
        role: 'customer'
    };
    const initialStates = {
        username: { hasFocus: false, hasValue: false },
        password: { hasFocus: false, hasValue: false },
        confirmPassword: { hasFocus: false, hasValue: false },
        name: { hasFocus: false, hasValue: false },
        email: { hasFocus: false, hasValue: false },
        phone: { hasFocus: false, hasValue: false },
        address: { hasFocus: false, hasValue: false }
    }
    const [isRegistering, setIsRegistering] = useState(false);
    const [registrationSuccess, setRegistrationSuccess] = useState(false);
    const [inputValues, setInputValues] = useState(initialValues);
    const [inputStates, setInputStates] = useState(initialStates);

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (isRegistering) {
            if (inputValues.password === inputValues.confirmPassword) {
                await onRegister(inputValues)
                    .then(() => {
                        setRegistrationSuccess(true);
                        setIsRegistering(false);
                    })
            } else {
                alert('Las contraseñas no coinciden.');
            }
        } else {
            await onLogin(inputValues);
        }
    };

    const toggleLoginSignup = () => {
        setInputValues(initialValues);
        setInputStates(initialStates);
        setIsRegistering(prevState => !prevState);
    };

    const handleFocusChange = (fieldName, event) => {
        setInputStates(prevState => ({
            ...prevState,
            [fieldName]: { ...prevState[fieldName], hasFocus: event.type === 'focus' }
        }));
    }

    const handleInputChange = (fieldName, event) => {
        const { value } = event.target;
        setInputValues(prevState => ({
            ...prevState,
            [fieldName]: value
        }));
        setInputStates(prevState => ({
            ...prevState,
            [fieldName]: { ...prevState[fieldName], hasValue: value.trim().length > 0 }
        }));
    }

    return (
        <div className="bg-white overflow-auto overflow-x-hidden rounded-none w-full h-full shadow-none md:shadow-xl md:rounded-xl md:h-fit md:w-fit md:max-w-80 flex justify-center items-center" >
            <div className="w-full p-8 h-full text-base">
                <form onSubmit={handleSubmit} className="w-full mx-auto text-blue-950 ">
                    <div>
                        <div className="w-full md:flex justify-between">
                            {isRegistering && (
                                <div className="md:w-1/2 md:mr-4">
                                    <span className="">Información de contacto:</span>
                                    <div className="mb-4 w-full rounded bg-gray-200 p-4">
                                        <div className="full-name mb-4">
                                            <label
                                                htmlFor="name"
                                                className={
                                                    inputStates.name.hasFocus
                                                        ? 'block transition duration-150 ease-out'
                                                        : (inputStates.name.hasValue
                                                            ? 'block'
                                                            : 'block transition duration-150 ease-out translate-y-8 translate-x-2')}>
                                                Nombre completo:
                                            </label>
                                            <input
                                                type="text"
                                                id="name"
                                                className="border rounded border-blue-950 bg-white w-full p-2 focus:outline-none"
                                                value={inputValues.name}
                                                onFocus={(e) => handleFocusChange('name', e)}
                                                onBlur={(e) => handleFocusChange('name', e)}
                                                onChange={(e) => handleInputChange('name', e)}
                                                required
                                            />
                                        </div>
                                        <div className="email mb-4">
                                            <label
                                                htmlFor="email"
                                                className={inputStates.email.hasFocus
                                                    ? 'block transition duration-150 ease-out'
                                                    : (inputStates.email.hasValue
                                                        ? 'block'
                                                        : 'block transition duration-150 ease-out translate-y-8 translate-x-2')}>
                                                Email:
                                            </label>
                                            <input
                                                type="email"
                                                id="email"
                                                className="border rounded border-blue-950 bg-white w-full p-2 focus:outline-none"
                                                value={inputValues.email}
                                                onFocus={(e) => handleFocusChange('email', e)}
                                                onBlur={(e) => handleFocusChange('email', e)}
                                                onChange={(e) => handleInputChange('email', e)}
                                                required
                                            />
                                        </div>
                                        <div className="phone mb-4">
                                            <label
                                                htmlFor="phone"
                                                className={inputStates.phone.hasFocus
                                                    ? 'block transition duration-150 ease-out'
                                                    : (inputStates.phone.hasValue
                                                        ? 'block'
                                                        : 'block transition duration-150 ease-out translate-y-8 translate-x-2')}>
                                                Teléfono:
                                            </label>
                                            <input
                                                type="phone"
                                                id="phone"
                                                className="border rounded border-blue-950 bg-white w-full p-2 focus:outline-none"
                                                value={inputValues.phone}
                                                onFocus={(e) => handleFocusChange('phone', e)}
                                                onBlur={(e) => handleFocusChange('phone', e)}
                                                onChange={(e) => handleInputChange('phone', e)}
                                                required
                                            />
                                        </div>
                                        <div className="address mb-4">
                                            <label
                                                htmlFor="address"
                                                className={inputStates.address.hasFocus
                                                    ? 'block transition duration-150 ease-out'
                                                    : (inputStates.address.hasValue
                                                        ? 'block'
                                                        : 'block transition duration-150 ease-out translate-y-8 translate-x-2')}>
                                                Dirección:
                                            </label>
                                            <input
                                                type="text"
                                                id="address"
                                                className="border rounded border-blue-950 bg-white w-full p-2 focus:outline-none"
                                                value={inputValues.address} onFocus={(e) => handleFocusChange('address', e)}
                                                onBlur={(e) => handleFocusChange('address', e)}
                                                onChange={(e) => handleInputChange('address', e)}
                                                required />
                                        </div>
                                    </div>
                                    <label htmlFor="role" className="block"><span className="">Rol:</span></label>
                                    <div className="mb-4 w-full rounded bg-gray-200 p-4">
                                        <input
                                            type="radio"
                                            id="admin"
                                            name="role"
                                            value="admin"
                                            className="hidden peer"
                                            checked={inputValues.role === "admin"}
                                            onChange={(e) => handleInputChange('role', e)}
                                        />
                                        <label htmlFor="admin" className={`block text-center cursor-pointer p-1 border border-gray-200 rounded-md ${inputValues.role === 'admin' ? 'peer-checked:bg-white peer-checked:border-blue-950' : ''}`}>Administrador</label>
                                        <input
                                            type="radio"
                                            id="vendedor"
                                            name="role"
                                            value="seller"
                                            className="hidden peer"
                                            checked={inputValues.role === "seller"}
                                            onChange={(e) => handleInputChange('role', e)}
                                        />
                                        <label htmlFor="vendedor" className={`mt-2 block text-center cursor-pointer p-1 border border-gray-200 rounded-md ${inputValues.role === 'seller' ? 'peer-checked:bg-white peer-checked:border-blue-950' : ''}`}>Vendedor</label>
                                        <input
                                            type="radio"
                                            id="cliente"
                                            name="role"
                                            value="customer"
                                            className="hidden peer"
                                            checked={inputValues.role === "customer"}
                                            onChange={(e) => handleInputChange('role', e)}
                                        />
                                        <label htmlFor="cliente" className={`mt-2 block text-center cursor-pointer p-1 border border-gray-200 rounded-md ${inputValues.role === 'customer' ? 'peer-checked:bg-white peer-checked:border-blue-950' : ''}`}>Cliente</label>
                                    </div>
                                </div>
                            )}
                            <div className={`${isRegistering ? 'md:w-1/2 md:mr-4' : 'w-full'}`}>
                                <span className={`${isRegistering ? 'block' : 'hidden'}`}>Información del usuario:</span>
                                <div className={`rounded ${isRegistering ? 'bg-gray-200 p-4' : 'bg-transparent w-full'}`}>
                                    <div className={`mb-4 ${isRegistering ? '' : 'w-full'}`}>
                                        <label htmlFor="username" className={inputStates.username.hasFocus ? 'block transition duration-150 ease-out' : (inputStates.username.hasValue ? 'block' : 'block transition duration-150 ease-out translate-y-8 translate-x-2')}>Usuario:</label>
                                        <input type="username" id="username" className="border rounded border-blue-950 bg-white w-full p-2 focus:outline-none" value={inputValues.username} onFocus={(e) => handleFocusChange('username', e)} onBlur={(e) => handleFocusChange('username', e)} onChange={(e) => handleInputChange('username', e)} required />
                                    </div>
                                    <div className="mb-4">
                                        <label htmlFor="password" className={inputStates.password.hasFocus ? 'block transition duration-150 ease-out' : (inputStates.password.hasValue ? 'block' : 'block transition duration-150 ease-out translate-y-8 translate-x-2')}>Contraseña:</label>
                                        <input type="password" id="password" className="border rounded border-blue-950 bg-white w-full p-2 focus:outline-none" value={inputValues.password} onFocus={(e) => handleFocusChange('password', e)} onBlur={(e) => handleFocusChange('password', e)} onChange={(e) => handleInputChange('password', e)} required />
                                    </div>
                                    {isRegistering && (
                                        <div className="mb-4">
                                            <label htmlFor="confirmPassword" className={inputStates.confirmPassword.hasFocus ? 'block transition duration-150 ease-out' : (inputStates.confirmPassword.hasValue ? 'block' : 'block transition duration-150 ease-out translate-y-8 translate-x-2')}>Confirmar contraseña:</label>
                                            <input type="password" id="confirmPassword" className="border rounded border-blue-950 bg-white w-full p-2 focus:outline-none" value={inputValues.confirmPassword} onFocus={(e) => handleFocusChange('confirmPassword', e)} onBlur={(e) => handleFocusChange('confirmPassword', e)} onChange={(e) => handleInputChange('confirmPassword', e)} required />
                                        </div>
                                    )}
                                </div>
                            </div>
                        </div>
                        <div className="flex items-center mt-6">
                            <button type="submit" className="w-full bg-blue-950 border-none text-white font-bold py-2 px-4 rounded hover:bg-blue-900 hover:border-blue-950 hover:outline-none focus:outline-none focus:shadow-outline transition duration-150 ease-out">
                                {isRegistering ? 'Registrarse' : 'Iniciar sesión'}
                            </button>
                        </div>
                    </div>
                </form >
                <div className="flex items-center">
                    <button className="mb-8 bg-transparent w-full text-blue-950 rounded py-2 px-4 border-blue-950 hover:border-blue-950 hover:bg-blue-50 mt-4 focus:outline-none" onClick={toggleLoginSignup}>
                        {isRegistering ? 'Ir a Iniciar sesión' : 'Ir a Registrarse'}
                    </button>
                </div>
                {errorLogin && <p className="bg-red-100 p-1 rounded text-red-500 text-justify">{errorLogin}</p>}
                {registrationSuccess && (
                    <p className="bg-green-100 p-1 rounded text-green-500 text-justify">Te has registrado correctamente. Ya puedes iniciar sesión.</p>
                )}
            </div >
        </div >
    );
};

export default LoginForm;