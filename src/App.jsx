import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { SignedIn, SignedOut, RedirectToSignIn } from '@clerk/clerk-react';
import { AppProvider } from './context/AppContext';
import { useTokenRefresh } from './hooks/useTokenRefresh';
import Header from './components/Header';
import Footer from './components/Footer';

// Pages
import Home from './pages/Home';
import ProductsPage from './pages/ProductsPage';
import CartPage from './pages/CartPage';
import CheckoutPage from './pages/CheckoutPage';
import OrdersPage from './pages/OrdersPage';
import OrderSuccessPage from './pages/OrderSuccessPage';
import ProfilePage from './pages/ProfilePage';
import About from './pages/About';
import Contact from './pages/Contact';
import SignInPage from './pages/SignInPage';
import SignUpPage from './pages/SignUpPage';

// Admin Pages
import AdminLayout from './pages/admin/AdminLayout';
import AdminDashboard from './pages/admin/AdminDashboard';
import AdminOrders from './pages/admin/AdminOrders';
import AdminProducts from './pages/admin/AdminProducts';
import AdminCustomers from './pages/admin/AdminCustomers';
import AdminAnalytics from './pages/admin/AdminAnalytics';
import AdminSettings from './pages/admin/AdminSettings';

// Protected Route Component
const ProtectedRoute = ({ children }) => {
  return (
    <>
      <SignedIn>{children}</SignedIn>
      <SignedOut>
        <RedirectToSignIn />
      </SignedOut>
    </>
  );
};

function App() {
  // Enable automatic token refresh
  useTokenRefresh();

  return (
    <AppProvider>
      <Routes>
        {/* Admin Routes - No Header/Footer */}
        <Route
          path="/admin/*"
          element={
            <ProtectedRoute>
              <AdminLayout />
            </ProtectedRoute>
          }
        >
          <Route index element={<AdminDashboard />} />
          <Route path="orders" element={<AdminOrders />} />
          <Route path="products" element={<AdminProducts />} />
          <Route path="customers" element={<AdminCustomers />} />
          <Route path="analytics" element={<AdminAnalytics />} />
          <Route path="settings" element={<AdminSettings />} />
        </Route>

        {/* Main App Routes - With Header/Footer */}
        <Route
          path="/*"
          element={
            <div className="min-h-screen flex flex-col">
              <Header />
              <main className="flex-grow">
                <Routes>
                  {/* Public Routes */}
                  <Route path="/" element={<Home />} />
                  <Route path="/products" element={<ProductsPage />} />
                  <Route path="/about" element={<About />} />
                  <Route path="/contact" element={<Contact />} />
                  
                  {/* Auth Routes */}
                  <Route path="/sign-in/*" element={<SignInPage />} />
                  <Route path="/sign-up/*" element={<SignUpPage />} />
                  
                  {/* Legacy redirects */}
                  <Route path="/login" element={<Navigate to="/sign-in" replace />} />
                  <Route path="/register" element={<Navigate to="/sign-up" replace />} />

                  {/* Protected Routes */}
                  <Route 
                    path="/cart" 
                    element={
                      <ProtectedRoute>
                        <CartPage />
                      </ProtectedRoute>
                    } 
                  />
                  <Route 
                    path="/checkout" 
                    element={
                      <ProtectedRoute>
                        <CheckoutPage />
                      </ProtectedRoute>
                    } 
                  />
                  <Route 
                    path="/orders" 
                    element={
                      <ProtectedRoute>
                        <OrdersPage />
                      </ProtectedRoute>
                    } 
                  />
                  <Route 
                    path="/order-success" 
                    element={
                      <ProtectedRoute>
                        <OrderSuccessPage />
                      </ProtectedRoute>
                    } 
                  />
                  <Route 
                    path="/profile" 
                    element={
                      <ProtectedRoute>
                        <ProfilePage />
                      </ProtectedRoute>
                    } 
                  />

                  {/* 404 */}
                  <Route 
                    path="*" 
                    element={
                      <div className="min-h-screen flex items-center justify-center bg-amber-50">
                        <div className="text-center">
                          <h1 className="text-6xl font-bold text-amber-900 mb-4">404</h1>
                          <p className="text-xl text-amber-700 mb-8">Page not found</p>
                          <a 
                            href="/" 
                            className="bg-gradient-to-r from-amber-600 to-amber-700 text-white px-8 py-3 rounded-xl font-semibold hover:shadow-lg transition-all"
                          >
                            Go Home
                          </a>
                        </div>
                      </div>
                    } 
                  />
                </Routes>
              </main>
              <Footer />
            </div>
          }
        />
      </Routes>
    </AppProvider>
  );
}

export default App;