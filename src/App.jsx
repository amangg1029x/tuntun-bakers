import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import ProductsPage from './pages/ProductsPage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import Header from './components/Header';
import Footer from './components/Footer';
import About from './pages/About';
import Contact from './pages/Contact';
import OrdersPage from './pages/OrdersPage';
import CartPage from './pages/CartPage';
import { AppProvider } from './context/AppContext';

function App() {
  return (
    <AppProvider>
      <Router>
        <Routes>
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/*" element={
            <>
              <Header />
              <Routes>
                <Route path = "/" element = {<Home />} />
                <Route path = "/products" element = {<ProductsPage />} />
                <Route path = "/about" element = {<About />} />
                <Route path = "/contact" element = {<Contact />} />
                <Route path = "/orders" element = {<OrdersPage />} />
                <Route path = "/cart" element = {<CartPage />} />
              </Routes>
              <Footer />
            </>
          } />
        </Routes>
      </Router>
    </AppProvider>
  );
}

export default App;