import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux'
import SportiverseServices from '../../services'
import { deepEqual } from '../../utils/ObjectUtils';
import './Admin.css';

function Admin() {
  const userStore = useSelector(state => state.user);
  const [activeSection, setActiveSection] = useState('categories');
  //-- para listar categorías, productos y usuarios--
  const [categories, setCategories] = useState([]);
  const [products, setProducts] = useState([]);
  const [users, setUsers] = useState([]);

  //-- gestión formulario categoría--
  const [categoryName, setCategoryName] = useState('');
  const [categoryDescription, setCategoryDescription] = useState('');
  const [categoryImage, setCategoryImage] = useState(undefined);
  const [formData, setFormData] = useState(undefined);
  const [isFormUnmodified, setIsFormUnmodified] = useState(true);
  const [categoryModal, setCategoryModal] = useState({
    show: false,
    content: {}
  });
  const [preview, setPreview] = useState()

  const handleChangeCategoryImage = (event) => {
    event.preventDefault();
    setCategoryImage(event.target.files[0]);
  }
  const handleCategoryModal = (active, catId) => {
    if(active)
    {
      SportiverseServices.getCategoryAsAdmin(userStore.token, catId)
        .then(response => {
          setCategoryModal({
            show: true,
            content: response
          })
          setFormData(response)
        })
    }
    else
    {
      setCategoryModal({
        show: false,
        content: {}
      })
    }
  };
  const handleSubmitCategory = (event) => {
    event.preventDefault();
    const formDataFilled = new FormData();
    formDataFilled.append('name', categoryName);
    formDataFilled.append('description', categoryDescription);
    formDataFilled.append('slug', categoryName.toLowerCase());
    formDataFilled.append('image', categoryImage);
º
    SportiverseServices.registerCategory(userStore.token, formDataFilled)
      .then(() => SportiverseServices.getCategoriesAsAdmin(userStore.token))
      .then(data => {
        console.log({data})
        setCategories(data)})
      .catch((error) => console.error(error));
  };
  const handleSubmitEditCategory = (event) => {
    event.preventDefault();
    const formDataFilled = new FormData();
    formDataFilled.append('name', formData.name);
    formDataFilled.append('slug', formData.name.toLowerCase());
    formDataFilled.append('description', formData.description);
    if(categoryModal.content.image !== formData.image)
    {
      formDataFilled.append('image', formData.image);
    }

    SportiverseServices.editCategory(userStore.token, categoryModal.content.id, formDataFilled)
      .then(() => SportiverseServices.getCategoriesAsAdmin(userStore.token))
      .then(data => {
        console.log({data})
        setCategories(data)})
      .catch((error) => console.error(error));
  };

  const handleInputChange = (field) => (event) => {
    setFormData({
      ...formData,
      [field]: field === 'image' ? event.target.files[0] : event.target.value
    });
  };
  useEffect(() => {
    if (formData && formData.image === categoryModal.content.image) {
        setPreview(undefined)
        return
    }

    const objectUrl = formData && URL.createObjectURL(formData && formData.image)
    setPreview(objectUrl)

    // free memory when ever this component is unmounted
    return () => URL.revokeObjectURL(objectUrl)
  }, [formData && formData.image])

  useEffect(() => {
    setIsFormUnmodified(deepEqual(categoryModal.content, formData));
  }, [formData, categoryModal.content]);
  
  useEffect(() => {
    if (activeSection === 'categories') {
      SportiverseServices.getCategoriesAsAdmin(userStore.token)
        .then(data => setCategories(data))
        .catch(error => console.error(error));
    } else if (activeSection === 'users') {
      SportiverseServices.getUsersAsAdmin(userStore.token)
        .then(data => setUsers(data))
        .catch(error => console.error(error));
    } else if (activeSection === 'products') {
      SportiverseServices.getProductsAsAdmin(userStore.token)
        .then(data => setProducts(data))
        .catch(error => console.error(error));
    }
  }, [activeSection]);
  const handleDeleteUser = (userId) => {
    SportiverseServices.deleteUser(userStore.token, userId)
      .then(() => SportiverseServices.getUsersAsAdmin(userStore.token))
      .then(data => setUsers(data))
      .catch(error => console.error(error));
  }
  const handleDeleteCategory = (catId) => {
    SportiverseServices.deleteCategory(userStore.token, catId)
      .then(() => SportiverseServices.getCategoriesAsAdmin(userStore.token))
      .then(data => setCategories(data))
      .catch(error => console.error(error));
  }

  const handleDeleteProductAsAdmin = (productId) => {
    SportiverseServices.deleteProductAsAdmin(userStore.token, productId)
      .then(() => SportiverseServices.getProductsAsAdmin(userStore.token))
      .then(data => setProducts(data))
      .catch(error => console.error(error));
  }

  const handleActivateDeactivate = (productId, productStatus) => {
    const newStatus = productStatus === 0 ? 1 : 0;
    SportiverseServices.activateDeactivateProduct(userStore.token, productId, newStatus)
      .then(() => SportiverseServices.getProductsAsAdmin(userStore.token))
      .then(data => setProducts(data))
      .catch(error => console.error(error));
  }
  const sections = {
    categories: () => (
      <section className='admin-section admin-categories'>
        <section className='list-categories-section'>
          <h2>Lista de categorías</h2>
          {categories.length > 0
          ? (<ul>
              {categories.map(category => (<li><button className='delete pointer' onClick={() => handleDeleteCategory(category.id)}>X</button><span className='pointer' onClick={() => handleCategoryModal(true, category.id)}> {category.name}</span></li>))}
            </ul>)
            : (<span>No hay categorías creadas</span>)}
          {categoryModal.show
          ? (<div className='category-modal-container'>
              <div className='category-modal'>
                <span className='close-category-modal pointer' onClick={()=>handleCategoryModal(false)}>X</span>
                <form className='category-info' onSubmit={handleSubmitEditCategory}>
                  <img src={preview || formData.image_url}/>
                  <input type='file' onChange={handleInputChange('image')}/><br/>
                  <label>Nombre categoría</label>
                  <input type='text' value={formData.name} className='input-category'  onChange={handleInputChange('name')}></input>
                  <label>Descripción</label>
                  <textarea type='text' value={formData.description} className='input-category'  onChange={handleInputChange('description')}></textarea>
                  <input type='submit' value='Guardar' disabled={isFormUnmodified}/>
                  <button className='cancel-modal-btn'>Cancelar</button>
                </form>
              </div>
            </div>)
          : (null)}
        </section>
        <section className='create-categories-section'>
          <form onSubmit={handleSubmitCategory} className='category-form'>
            <h2>Crear categoría</h2>
            <label>Nombre de la categoría</label>
            <input type="text" onChange={(event) => setCategoryName(event.target.value)} />
            <label>
              Descripción
            </label>
            <textarea onChange={(event) => setCategoryDescription(event.target.value)} />
            <label>
              Imagen
            </label>
            <input type="file" onChange={handleChangeCategoryImage}/>
            <input type='submit' value='Registrar categoría'></input>
          </form>
        </section>
      </section>
    ),
    users: () => (
      <section className='admin-section admin-users'>
        <h2>Lista de usuarios</h2>
        {users.length > 0
        ? (<ul>
            {users.map(user => (<li><button className='delete' onClick={() => handleDeleteUser(user.id)}>X</button> {user.username}</li>))}
          </ul>)
          : (<span>No hay usuarios creados</span>)}
      </section>
    ),
    products: () => (
      <section className='admin-section admin-products'>
        <h2>Lista de productos</h2>
        {products.length > 0
        ? (<ul>
            {products.map(product => (<li><button className='delete pointer' onClick={() => handleDeleteProductAsAdmin(product.id)}>X</button><span className='pointer' onClick={() => handleProductModal(true, product.id)}> {product.name} </span><span className={`status ${product.status === 0 ? 'inactive' : 'active'}`}></span><button className='activate-deactivate pointer' onClick={() => handleActivateDeactivate(product.id, product.status)}>{product.status === 0 ? 'Activar' : 'Desactivar'}</button></li>))}
          </ul>)
          : (<span>No hay productos creadas</span>)}
      </section>
    ),
  };
  return (
    <div>
      <nav className='admin-nav'>
        <ul>
          <li><a className={`admin-nav-link ${activeSection === 'categories'? 'active' : ''}`} onClick={() => setActiveSection('categories')}>Categorías</a></li>
        </ul>
        <ul>
          <li><a className={`admin-nav-link ${activeSection === 'users'? 'active' : ''}`} onClick={() => setActiveSection('users')}>Usuarios</a></li>
        </ul>
        <ul>
          <li><a className={`admin-nav-link ${activeSection === 'products'? 'active' : ''}`} onClick={() => setActiveSection('products')}>Productos</a></li>
        </ul>
      </nav>
      {sections[activeSection] ? sections[activeSection]() : <div>No se ha seleccionado ninguna sección</div>}
    </div>
  );
}

export default Admin;