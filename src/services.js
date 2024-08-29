export default {
    login(username, password)
    {
        return new Promise((resolve, reject) => {
            fetch('http://localhost:8000/api/v1/auth/login', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ username, password }),
            })  
            .then(response => response.json())
            .then((response) => {
                if (response.status === 'OK') {
                    resolve(response);
                } else {
                    throw new Error('Error al cerrar sesión');
                }
            })
            .catch((error) => {
                reject(error);
            });
        });
    },
    /**
     * Se llama al servicio logout
     * @param {String} token token de sesión del usuario
     * @return {Promise} Promesa con el resultado de la llamada a logout
     */
    logout(token)
    {
        return new Promise((resolve, reject) => {
            fetch('http://localhost:8000/api/v1/auth/logout', {
                method: 'POST',
                headers: {
                    'Authorization': 'Bearer ' + token,
                    'Content-Type': 'application/json'
                }
            })
            .then(response => response.json())
            .then((response) => {
                if (response.status === 'OK') {
                    resolve();
                } else {
                    throw new Error('Error al cerrar sesión');
                }
            })
            .catch((error) => {
                reject(error);
            });
        });
    }
}