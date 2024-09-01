export default {
    /**
     * Se llama al servicio login
     * @param {String} username nombre de usuario
     * @param {String} password contraseña
     * @return {Promise} Promesa con el resultado de la llamada a login
     */
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
                    throw new Error('Error al iniciar sesión');
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
    },
    /**
     * Se llama al servicio post /products
     * @param {String} token token de sesión del usuario
     * @param {Object} params params necesarios para la llamada al servicio
     * @return {Promise} Promesa con el resultado de la llamada a post /products
     */
    registerProduct(token, params)
    {
        return new Promise((resolve, reject) => {
            fetch('http://localhost:8000/api/v1/seller/products', {
                method: 'POST',
                headers: {
                    'Authorization': 'Bearer ' + token,
                },
                body: params
            })
            .then(response => response.json())
            .then((response) => {
                if (response.status === 'OK') {
                    resolve();
                } else {
                    throw new Error('Error al registrar el producto');
                }
            })
            .catch((error) => {
                reject(error);
            });
        });
    },
    /**
     * Se llama al servicio post /categories
     * @param {String} token token de sesión del usuario
     * @param {Object} params params necesarios para la llamada al servicio
     * @return {Promise} Promesa con el resultado de la llamada a post /categories
     */
    registerCategory(token, params)
    {
        return new Promise((resolve, reject) => {
            fetch('http://localhost:8000/api/v1/admin/categories', {
                method: 'POST',
                headers: {
                    'Authorization': 'Bearer ' + token,
                },
                body: params
            })
            .then(response => response.json())
            .then((response) => {
                if (response.status === 'OK') {
                    resolve();
                } else {
                    throw new Error('Error al registrar el producto');
                }
            })
            .catch((error) => {
                reject(error);
            });
        });
    },
    /**
     * Se llama al servicio patch /categories
     * @param {String} token token de sesión del usuario
     * @param {Number} catId id de la categoría que se quiere editar
     * @param {Object} params params necesarios para la llamada al servicio
     * @return {Promise} Promesa con el resultado de la llamada a patch /categories
     */
    editCategory(token, catId, params)
    {
        return new Promise((resolve, reject) => {
            fetch(`http://localhost:8000/api/v1/admin/categories/${catId}`, {
                method: 'POST',
                headers: {
                    'Authorization': 'Bearer ' + token,
                },
                body: params
            })
            .then(response => response.json())
            .then((response) => {
                if (response.status === 'OK') {
                    resolve();
                } else {
                    throw new Error('Error al registrar el producto');
                }
            })
            .catch((error) => {
                reject(error);
            });
        });
    },
    /**
     * Se llama al servicio get /public/categories
     * @return {Promise} Promesa con el resultado de la llamada a get /public/categories
     */
    getCategories()
    {
        return new Promise((resolve, reject) => {
            fetch('http://localhost:8000/api/v1/public/categories', {
                method: 'GET',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                },
            })
            .then(response => response.json())
            .then((response) => {
                console.log({response})
                if (response.status === 'OK') {
                    resolve(response.CategoriesList);
                } else {
                    throw new Error('Error al obtener las categorías');
                }
            })
            .catch((error) => {
                reject(error);
            });
        });
    },
    /**
     * Se llama al servicio get /admin/categories
     * @param {String} token token de sesión del usuario
     * @return {Promise} Promesa con el resultado de la llamada a get /admin/categories
     */
    getCategoriesAsAdmin(token)
    {
        return new Promise((resolve, reject) => {
            fetch('http://localhost:8000/api/v1/admin/categories', {
                method: 'GET',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer ' + token
                },
            })
            .then(response => response.json())
            .then((response) => {
                if (response.status === 'OK') {
                    resolve(response.CategoriesList);
                } else {
                    throw new Error('Error al obtener las categorías como admin');
                }
            })
            .catch((error) => {
                reject(error);
            });
        });
    },
    /**
     * Se llama al servicio get /admin/categories/{catId}
     * @param {String} token token de sesión del usuario
     * @param {Number} catId id de la categoría de la que obtener el detalle
     * @return {Promise} Promesa con el resultado de la llamada a get /admin/categories/{catId}
     */
    getCategoryAsAdmin(token, catId)
    {
        return new Promise((resolve, reject) => {
            fetch(`http://localhost:8000/api/v1/admin/categories/${catId}`, {
                method: 'GET',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer ' + token
                },
            })
            .then(response => response.json())
            .then((response) => {
                if (response.status === 'OK') {
                    resolve(response.data);
                } else {
                    throw new Error('Error al obtener la categoría como admin');
                }
            })
            .catch((error) => {
                reject(error);
            });
        });
    },
    /**
     * Se llama al servicio get /public/products
     * @return {Promise} Promesa con el resultado de la llamada a get /public/products
     */
    getProducts()
    {
        return new Promise((resolve, reject) => {
            fetch('http://localhost:8000/api/v1/public/products', {
                method: 'GET',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
            })
            .then(response => response.json())
            .then((response) => {
                if (response.status === 'OK') {
                    resolve(response.ProductsList);
                } else {
                    throw new Error('Error al obtener los productos');
                }
            })
            .catch((error) => {
                reject(error);
            });
        });
    },
    /**
     * Se llama al servicio get /admin/products
     * @param {String} token token de sesión del usuario
     * @return {Promise} Promesa con el resultado de la llamada a get /admin/products
     */
    getProductsAsAdmin(token)
    {
        return new Promise((resolve, reject) => {
            fetch('http://localhost:8000/api/v1/admin/products', {
                method: 'GET',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer ' + token
                },
            })
            .then(response => response.json())
            .then((response) => {
                if (response.status === 'OK') {
                    resolve(response.ProductsList);
                } else {
                    throw new Error('Error al obtener los productos como admin');
                }
            })
            .catch((error) => {
                reject(error);
            });
        });
    },
    /**
     * Se llama al servicio get /seller/products
     * @param {String} token token de sesión del usuario
     * @return {Promise} Promesa con el resultado de la llamada a get /seller/products
     */
    getProductsAsSeller(token)
    {
        return new Promise((resolve, reject) => {
            fetch('http://localhost:8000/api/v1/seller/products', {
                method: 'GET',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer ' + token
                },
            })
            .then(response => response.json())
            .then((response) => {
                if (response.status === 'OK') {
                    resolve(response.ProductsList);
                } else {
                    throw new Error('Error al obtener los productos como vendedor');
                }
            })
            .catch((error) => {
                reject(error);
            });
        });
    },
    /**
     * Se llama al servicio get /seller/products/{productId}
     * @param {String} token token de sesión del usuario
     * @param {Number} productId id de la categoría de la que obtener el detalle
     * @return {Promise} Promesa con el resultado de la llamada a get /seller/products/{productId}
     */
    getProductAsSeller(token, productId)
    {
        return new Promise((resolve, reject) => {
            fetch(`http://localhost:8000/api/v1/seller/products/${productId}`, {
                method: 'GET',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer ' + token
                },
            })
            .then(response => response.json())
            .then((response) => {
                if (response.status === 'OK') {
                    resolve(response.data);
                } else {
                    throw new Error('Error al obtener el producto como seller');
                }
            })
            .catch((error) => {
                reject(error);
            });
        });
    },
    /**
     * Se llama al servicio patch /products
     * @param {String} token token de sesión del usuario
     * @param {Number} productId id de la categoría que se quiere editar
     * @param {Object} params params necesarios para la llamada al servicio
     * @return {Promise} Promesa con el resultado de la llamada a patch /products
     */
    editProductAsSeller(token, productId, params)
    {
        return new Promise((resolve, reject) => {
            fetch(`http://localhost:8000/api/v1/seller/products/${productId}`, {
                method: 'POST',
                headers: {
                    'Authorization': 'Bearer ' + token,
                },
                body: params
            })
            .then(response => response.json())
            .then((response) => {
                if (response.status === 'OK') {
                    resolve();
                } else {
                    throw new Error('Error al editar el producto');
                }
            })
            .catch((error) => {
                reject(error);
            });
        });
    },
    /**
     * Se llama al servicio get /admin/users
     * @param {String} token token de sesión del usuario
     * @return {Promise} Promesa con el resultado de la llamada a get /admin/users
     */
    getUsersAsAdmin(token)
    {
        return new Promise((resolve, reject) => {
            fetch('http://localhost:8000/api/v1/admin/users', {
                method: 'GET',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer ' + token
                },
            })
            .then(response => response.json())
            .then((response) => {
                if (response.status === 'OK') {
                    resolve(response.UsersList);
                } else {
                    throw new Error('Error al obtener los usuarios');
                }
            })
            .catch((error) => {
                reject(error);
            });
        });
    },
    /**
     * Se llama al servicio get /seller/users
     * @param {String} token token de sesión del usuario
     * @return {Promise} Promesa con el resultado de la llamada a get /seller/users
     */
    getUsersAsSeller(token)
    {
        return new Promise((resolve, reject) => {
            fetch('http://localhost:8000/api/v1/seller/users', {
                method: 'GET',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer ' + token
                },
            })
            .then(response => response.json())
            .then((response) => {
                if (response.status === 'OK') {
                    resolve(response.UsersList);
                } else {
                    throw new Error('Error al obtener los usuarios');
                }
            })
            .catch((error) => {
                reject(error);
            });
        });
    },
    /**
     * Se llama al servicio delete /admin/user/{userId}
     * @param {String} token token de sesión del usuario
     * @param {Number} userId id del usuario a eliminar
     * @return {Promise} Promesa con el resultado de la llamada a delete /admin/user/{userId}
     */
    deleteUser(token, userId)
    {
        return new Promise((resolve, reject) => {
            fetch(`http://localhost:8000/api/v1/admin/users/${userId}`, {
                method: 'DELETE',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer ' + token
                },
            })
            .then(response => response.json())
            .then((response) => {
                if (response.status === 'OK') {
                    resolve();
                } else {
                    throw new Error('Error al eliminar el usuario');
                }
            })
            .catch((error) => {
                reject(error);
            });
        });
    },
    /**
     * Se llama al servicio delete /seller/product/{productId}
     * @param {String} token token de sesión del usuario
     * @param {Number} productId id del usuario a eliminar
     * @return {Promise} Promesa con el resultado de la llamada a delete /seller/product/{productId}
     */
    deleteProductAsSeller(token, productId)
    {
        return new Promise((resolve, reject) => {
            fetch(`http://localhost:8000/api/v1/seller/products/${productId}`, {
                method: 'DELETE',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer ' + token
                },
            })
            .then(response => response.json())
            .then((response) => {
                if (response.status === 'OK') {
                    resolve();
                } else {
                    throw new Error('Error al eliminar el producto');
                }
            })
            .catch((error) => {
                reject(error);
            });
        });
    },
    /**
     * Se llama al servicio delete /admin/product/{productId}
     * @param {String} token token de sesión del usuario
     * @param {Number} productId id del producto a eliminar
     * @return {Promise} Promesa con el resultado de la llamada a delete /admin/product/{productId}
     */
    deleteProductAsAdmin(token, productId)
    {
        return new Promise((resolve, reject) => {
            fetch(`http://localhost:8000/api/v1/admin/products/${productId}`, {
                method: 'DELETE',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer ' + token
                },
            })
            .then(response => response.json())
            .then((response) => {
                if (response.status === 'OK') {
                    resolve();
                } else {
                    throw new Error('Error al eliminar el producto');
                }
            })
            .catch((error) => {
                reject(error);
            });
        });
    },
    /**
     * Se llama al servicio delete /admin/categories/{categoryId}
     * @param {String} token token de sesión del usuario
     * @param {Number} categoryId id de la categoría a eliminar
     * @return {Promise} Promesa con el resultado de la llamada a delete /admin/categories/{categoryId}
     */
    deleteCategory(token, categoryId)
    {
        return new Promise((resolve, reject) => {
            fetch(`http://localhost:8000/api/v1/admin/categories/${categoryId}`, {
                method: 'DELETE',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer ' + token
                },
            })
            .then(response => response.json())
            .then((response) => {
                if (response.status === 'OK') {
                    resolve();
                } else {
                    throw new Error('Error al eliminar el usuario');
                }
            })
            .catch((error) => {
                reject(error);
            });
        });
    },
    /**
     * Se llama al servicio PATCH /admin/products/{productId}
     * @param {String} token token de sesión del usuario
     * @param {Number} productId id de la categoría a eliminar
     * @param {Number} status estado a actualizar en el producto
     * @return {Promise} Promesa con el resultado de la llamada a PATCH /admin/products/{productId}
     */
    activateDeactivateProduct(token, productId, status)
    {
        return new Promise((resolve, reject) => {
            fetch(`http://localhost:8000/api/v1/admin/products/${productId}`, {
                method: 'PATCH',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer ' + token
                },
                body: JSON.stringify({ status }),
            })
            .then(response => response.json())
            .then((response) => {
                if (response.status === 'OK') {
                    resolve();
                } else {
                    throw new Error('Error al actualizar el estado del producto');
                }
            })
            .catch((error) => {
                reject(error);
            });
        });
    }
}