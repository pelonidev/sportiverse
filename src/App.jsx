import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Sidebar from './components/shared/Sidebar'
import ProfileView from './components/views/ProfileView'
import ProductsView from './components/views/ProductsView'
import UsersView from './components/views/UsersView'
import CategoriesView from './components/views/CategoriesView'

export default function App() {
  return (
    <Router>
      <div className="body flex h-screen w-full"> {/* Utiliza la clase h-screen para que ocupe toda la altura */}
        <Sidebar />
        <div className="flex md:ml-20 mb-16 md:mb-0 justify-center items-center w-full"> {/* Utiliza flex-1 para que el contenido ocupe todo el espacio restante */}
          <Routes>
            <Route path="/profile" element={<ProfileView />} />
            <Route path="/categories" element={<CategoriesView />} />
            <Route path="/products" element={<ProductsView />} />
            <Route path="/users" element={<UsersView />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
}