import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from "./contexts/AuthContext";
import Sidebar from './components/shared/Sidebar'
import HomeView from './components/views/HomeView'
import ProfileView from './components/views/ProfileView'
import ProductsView from './components/views/ProductsView'
import UsersView from './components/views/UsersView'
import CategoriesView from './components/views/CategoriesView'

export default function App() {
  return (
    <AuthProvider>
      <Router>
        <div className="body flex h-full w-full bg-blue-200 text-white"> {/* Utiliza la clase h-screen para que ocupe toda la altura */}
          <Sidebar />
          <div className="flex md:mt-16 mb-20 md:mb-0 justify-center items-center w-full"> {/* Utiliza flex-1 para que el contenido ocupe todo el espacio restante */}
            <Routes>
              <Route path="/" element={<HomeView />} />
              <Route path="/profile" element={<ProfileView />} />
              <Route path="/categories" element={<CategoriesView />} />
              <Route path="/products" element={<ProductsView />} />
              <Route path="/users" element={<UsersView />} />
            </Routes>
          </div>
        </div>
      </Router>
    </AuthProvider>
  );
}