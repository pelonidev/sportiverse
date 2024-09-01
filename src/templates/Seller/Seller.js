import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux'
import SportiverseServices from '../../services'
import { deepEqual } from '../../utils/ObjectUtils';

import { useNavigate } from 'react-router-dom';
import './Seller.css';

function Seller() {
  const userStore = useSelector(state => state.user);
  const [activeSection, setActiveSection] = useState('products');
  //-- para listar categorías, productos y usuarios--
  const [products, setProducts] = useState([]);
  const [users, setUsers] = useState([]);
  const [categories, setCategories] = useState([]);

  //-- gestión formulario producto--
  const [productName, setProductName] = useState('');
  const [productDescription, setProductDescription] = useState('');
  const [productPrice, setProductPrice] = useState(undefined);
  const [productStock, setProductStock] = useState(undefined);
  const [categoryId, setCategoryId] = useState(undefined);
  const [productImage, setProductImage] = useState()
  const navigate = useNavigate();

  function handleChangeImage(event) {
    event.preventDefault();
    setProductImage(event.target.files[0]);
  }

  const handleSubmitProduct = (event) => {
    event.preventDefault();
    const formDataFilled = new FormData();
    formDataFilled.append('name', productName);
    formDataFilled.append('description', productDescription);
    formDataFilled.append('price', productPrice);
    formDataFilled.append('stock', productStock);
    formDataFilled.append('category_id', categoryId || categories[0].id);
    formDataFilled.append('image', productImage);
    SportiverseServices.registerProduct(userStore.token, formDataFilled)
      .then(() => SportiverseServices.getProductsAsSeller(userStore.token))
      .then(data => {
        setProducts(data)})
      .catch((error) => console.error(error));
  };

  const [formData, setFormData] = useState(undefined);
  const [isFormUnmodified, setIsFormUnmodified] = useState(true);
  const [productModal, setProductModal] = useState({
    show: false,
    content: {}
  });
  const [preview, setPreview] = useState()

  const handleChangeProductImage = (event) => {
    event.preventDefault();
    setProductImage(event.target.files[0]);
  }
  const handleProductModal = (active, productId) => {
    if(active)
    {
      SportiverseServices.getProductAsSeller(userStore.token, productId)
        .then(response => {
          setProductModal({
            show: true,
            content: response
          })
          setFormData(response)
        })
    }
    else
    {
      setProductModal({
        show: false,
        content: {}
      })
    }
  };

  const handleSubmitEditProduct = (event) => {
    event.preventDefault();
    const formDataFilled = new FormData();
    formDataFilled.append('name', formData.name);
    formDataFilled.append('description', formData.description);
    formDataFilled.append('price', formData.price);
    formDataFilled.append('stock', formData.stock);
    formDataFilled.append('category_id', formData.category_id);
    if(productModal.content.image !== formData.image)
    {
      formDataFilled.append('image', formData.image);
    }

    SportiverseServices.editProductAsSeller(userStore.token, productModal.content.id, formDataFilled)
      .then(() => SportiverseServices.getProductAsSeller(userStore.token))
      .then(data => {
        console.log({data})
        setProducts(data)})
      .catch((error) => console.error(error));
  };

  const handleInputChange = (field) => (event) => {
    setFormData({
      ...formData,
      [field]: field === 'image' ? event.target.files[0] : event.target.value
    });
  };
  useEffect(() => {
    if (formData && formData.image === productModal.content.image) {
        setPreview(undefined)
        return
    }

    const objectUrl = formData && URL.createObjectURL(formData && formData.image)
    setPreview(objectUrl)

    // free memory when ever this component is unmounted
    return () => URL.revokeObjectURL(objectUrl)
  }, [formData && formData.image])

  useEffect(() => {
    setIsFormUnmodified(deepEqual(productModal.content, formData));
  }, [formData, productModal.content]);
  
  useEffect(() => {
    if (activeSection === 'users') {
      SportiverseServices.getUsersAsSeller(userStore.token)
        .then(data => setUsers(data))
        .catch(error => console.error(error));
    } else if (activeSection === 'products') {
      SportiverseServices.getProductsAsSeller(userStore.token)
        .then(data => {
          setProducts(data);
          return SportiverseServices.getCategories();
        })
        .then(data => {
          console.log({data})
          setCategories(data)})
        .catch(error => console.error(error));
    }
  }, [activeSection]);

  const handleDeleteUser = (userId) => {
    SportiverseServices.deleteUser(userStore.token, userId)
      .then(() => SportiverseServices.getUsersAsAdmin(userStore.token))
      .then(data => setUsers(data))
      .catch(error => console.error(error));
  }

  const handledeleteProductAsSeller = (productId) => {
    SportiverseServices.deleteProductAsSeller(userStore.token, productId)
      .then(() => SportiverseServices.getProductsAsSeller(userStore.token))
      .then(data => setProducts(data))
      .catch(error => console.error(error));
  }

  const sections = {
    users: () => (
      <section className='seller-section seller-users'>
        <h2>Lista de usuarios</h2>
        {users.length > 0
        ? (<ul>
            {users.map(user => (<li><button className='delete' onClick={() => handleDeleteUser(user.id)}>X</button> {user.username}</li>))}
          </ul>)
          : (<span>No hay usuarios creados</span>)}
      </section>
    ),
    products: () => (
      <section className='seller-section seller-products'>
        <section className='list-products-section'>
          <h2>Lista de productos</h2>
          {products.length > 0
          ? (<ul>
              {products.map(product => (<li><button className='delete pointer' onClick={() => handledeleteProductAsSeller(product.id)}>X</button><span className='pointer' onClick={() => handleProductModal(true, product.id)}> {product.name}</span></li>))}
            </ul>)
            : (<span>No hay productos creados</span>)}
          {productModal.show
          ? (<div className='product-modal-container'>
              <div className='product-modal'>
                <span className='close-product-modal pointer' onClick={()=>handleProductModal(false)}>X</span>
                <form className='product-info' onSubmit={handleSubmitEditProduct}>
                  <img src={preview || formData.image_url}/>
                  <input type='file' onChange={handleInputChange('image')}/><br/>
                  <label>Nombre producto</label>
                  <input type='text' value={formData.name} className='input-product'  onChange={handleInputChange('name')}></input>
                  <label for="categories">Selecciona categoría:</label>
                  <select id="categories" value={formData.category_id} name="categories" onChange={handleInputChange('category_id')}>
                    {categories.map(category=>(<option value={category.id}>{category.name}</option>))}
                  </select>
                  <label>Descripción</label>
                  <textarea type='text' value={formData.description} className='input-product'  onChange={handleInputChange('description')}></textarea>
                  <label>Stock</label>
                  <input type="number" value={formData.stock} className='input-product' onChange={handleInputChange('stock')} />
                  <input type='submit' value='Guardar' disabled={isFormUnmodified}/>
                  <button className='cancel-modal-btn'>Cancelar</button>
                </form>
              </div>
            </div>)
          : (null)}
        </section>
        <section className='create-products-section'>
          <form onSubmit={handleSubmitProduct} className='login-form'>
            <h1>Registrar producto:</h1>
            <label>Nombre del producto</label>
            <input type="text" onChange={(event) => setProductName(event.target.value)} />
            <label>Precio € / unidad</label>
            <input type="number" onChange={(event) => setProductPrice(event.target.value)} />
            <label for="categories">Selecciona categoría:</label>
            <select id="categories" name="categories" onChange={(event) => setCategoryId(event.target.value)}>
              {categories.map(category=>(<option value={category.id}>{category.name}</option>))}
            </select>
            <label>
              Descripción
            </label>
            <textarea onChange={(event) => setProductDescription(event.target.value)} />
            <label>Stock</label>
            <input type="number" onChange={(event) => setProductStock(event.target.value)} />
            <label>
              Imagen
            </label>
            <input type="file" onChange={handleChangeImage}/>
            <input type='submit' value='Registrar producto'></input>
          </form>
        </section>
      </section>
    ),
  };
  return (
    <div>
      <nav className='seller-nav'>
        <ul>
          <li><a className={`seller-nav-link ${activeSection === 'products'? 'active' : ''}`} onClick={() => setActiveSection('products')}>Productos</a></li>
        </ul>
        <ul>
          <li><a className={`seller-nav-link ${activeSection === 'users'? 'active' : ''}`} onClick={() => setActiveSection('users')}>Usuarios</a></li>
        </ul>
      </nav>
      {sections[activeSection] ? sections[activeSection]() : <div>No se ha seleccionado ninguna sección</div>}
    </div>
  );
}

export default Seller;