import React, { useState, useEffect } from 'react';
import { useCart, useFavorites } from '../context/AppContext';
import { productAPI } from '../services/api';
import ProductCard from '../components/ProductCard';

const FeaturedProducts = () => {
  const { addToCart } = useCart();
  const { favorites, toggleFavorite } = useFavorites();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchFeaturedProducts = async () => {
      try {
        const response = await productAPI.getAll({ limit: 4 });
        // Get featured products based on tags/ratings
        const featured = response.data.data
          .filter(p => p.isTrending || p.isNew)
          .slice(0, 4);
        setProducts(featured);
      } catch (error) {
        console.error('Failed to load featured products:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchFeaturedProducts();
  }, []);

  return (
    <section id="products" className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <div className="inline-block bg-amber-100 text-amber-800 px-4 py-2 rounded-full text-sm font-semibold mb-4">
            Our Specialties
          </div>
          <h2 className="text-4xl md:text-5xl font-bold text-amber-950 mb-4">
            Featured Products
          </h2>
          <p className="text-lg text-amber-800 max-w-2xl mx-auto">
            Handpicked favorites loved by our customers
          </p>
        </div>

        {loading ? (
          <div className="text-center py-12">
            <div className="w-12 h-12 border-4 border-amber-600 border-t-transparent rounded-full animate-spin mx-auto"></div>
          </div>
        ) : (
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {products.map((product) => (
              <ProductCard
                key={product._id}
                product={product}
                onAddToCart={addToCart}
                isFavorite={favorites.includes(product._id)}
                onToggleFavorite={toggleFavorite}
              />
            ))}
          </div>
        )}

        <div className="text-center mt-12">
          
          <a href="/products"
            className="inline-block bg-white text-amber-900 px-8 py-4 rounded-xl font-semibold text-lg hover:shadow-xl hover:scale-105 transition-all duration-300 border-2 border-amber-300 hover:border-amber-500"
          >
            View All Products →
          </a>
        </div>
      </div>
    </section>
  );
};

export default FeaturedProducts;