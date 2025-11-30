import React, { useState, useEffect, useMemo } from 'react';
import { ShoppingCart, Heart, Star, Search, SlidersHorizontal, X, ChevronDown, Plus, Minus, Sparkles, TrendingUp, Clock, Award } from 'lucide-react';
import ProductCard from "../components/ProductCard";
import FloatingMenu from '../components/FloatingMenu';
import { productAPI } from '../services/api';
import { useCart, useFavorites } from '../context/AppContext';

const ProductsPage = () => {
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState('featured');
  const { cart, addToCart } = useCart();
  const { favorites, toggleFavorite } = useFavorites();
  const [showFilters, setShowFilters] = useState(false);
  const [priceRange, setPriceRange] = useState([0, 1000]);
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch products from API
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);
        const response = await productAPI.getAll({
          category: selectedCategory !== 'All' ? selectedCategory : undefined,
          search: searchQuery,
          sort: sortBy
        });
        // Support common response shapes
        const items = response?.data?.data ?? response?.data ?? response ?? [];
        setProducts(Array.isArray(items) ? items : []);
      } catch (error) {
        console.error('Failed to load products:', error);
        setError('Failed to load products. Please try again.');
        setProducts([]);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, [selectedCategory, searchQuery, sortBy]);

  // derive categories from products
  const categories = useMemo(() => {
    const cats = new Set(products.map(p => p.category).filter(Boolean));
    return ['All', ...Array.from(cats)];
  }, [products]);

  // Filter products using fetched products
  const filteredProducts = useMemo(() => {
    const lowerQuery = searchQuery.trim().toLowerCase();
    const list = products.filter(product => {
      const matchesCategory = selectedCategory === 'All' || product.category === selectedCategory;
      const name = (product.name || '').toString().toLowerCase();
      const desc = (product.description || '').toString().toLowerCase();
      const matchesSearch = !lowerQuery || name.includes(lowerQuery) || desc.includes(lowerQuery);
      const price = Number(product.price ?? 0);
      const matchesPrice = price >= (priceRange[0] ?? 0) && price <= (priceRange[1] ?? Infinity);
      return matchesCategory && matchesSearch && matchesPrice;
    });

    // Sorting - protect against missing fields
    if (sortBy === 'price-low') {
      list.sort((a, b) => (Number(a.price ?? 0) - Number(b.price ?? 0)));
    } else if (sortBy === 'price-high') {
      list.sort((a, b) => (Number(b.price ?? 0) - Number(a.price ?? 0)));
    } else if (sortBy === 'rating') {
      list.sort((a, b) => (Number(b.rating ?? 0) - Number(a.rating ?? 0)));
    } else if (sortBy === 'popular') {
      list.sort((a, b) => (Number(b.reviews ?? 0) - Number(a.reviews ?? 0)));
    }
    // 'featured' or unknown -> keep API order (or current order)
    return list;
  }, [products, selectedCategory, searchQuery, priceRange, sortBy]);

  const totalCartItems = (cart || []).reduce((sum, item) => sum + (item.quantity ?? 0), 0);

  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50 via-orange-50 to-amber-50">
      {error && (
  <div className="bg-red-50 border-2 border-red-200 rounded-xl p-4 text-center">
    <AlertCircle className="w-8 h-8 text-red-600 mx-auto mb-2" />
    <p className="text-red-700">{error}</p>
    <button onClick={fetchProducts} className="mt-4 btn-primary">
      Retry
    </button>
  </div>
)}
      {/* Header */}
      <div className="bg-white shadow-sm sticky top-0 z-40">
        <div className="container mx-auto px-4 py-6">
          <div className="flex items-center justify-between mt-12">
            <div>
              <h1 className="text-4xl font-bold text-amber-950 mb-2">Our Products</h1>
              {loading ? (
                <p className="text-amber-700">Loading products...</p>
              ) : (
                <p className="text-amber-700">Discover {products.length} delicious items</p>
              )}
            </div>
            <div className="hidden md:flex items-center gap-4">
              <div className="text-right">
                <div className="text-2xl font-bold text-amber-900">{filteredProducts.length}</div>
                <div className="text-sm text-amber-700">Items Found</div>
              </div>
            </div>
          </div>

          {/* Search and Filters */}
          <div className="flex flex-col md:flex-row gap-4 mt-4">
            <div className="flex-1 relative">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-amber-600" />
              <input
                type="text"
                placeholder="Search for your favorite treats..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-12 pr-4 py-3 rounded-xl border-2 border-amber-200 focus:border-amber-500 focus:outline-none transition-all"
              />
            </div>

            <div className="flex gap-2">
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="px-4 py-3 rounded-xl border-2 border-amber-200 focus:border-amber-500 focus:outline-none bg-white text-amber-900 font-medium"
              >
                <option value="featured">Featured</option>
                <option value="popular">Most Popular</option>
                <option value="rating">Highest Rated</option>
                <option value="price-low">Price: Low to High</option>
                <option value="price-high">Price: High to Low</option>
              </select>

              <button
                onClick={() => setShowFilters(!showFilters)}
                className="px-4 py-3 rounded-xl border-2 border-amber-200 hover:border-amber-500 transition-all bg-white"
              >
                <SlidersHorizontal className="w-5 h-5 text-amber-900" />
              </button>
            </div>
          </div>

          {/* Category Tabs */}
          <div className="hidden md:flex gap-2 mt-4 overflow-x-auto pb-2 pl-2 pt-2 scrollbar-hide">
            {categories.map((category, idx) => (
              <button
                key={idx}
                onClick={() => setSelectedCategory(category)}
                className={`px-6 py-2 rounded-full font-medium whitespace-nowrap transition-all duration-300 ${
                  selectedCategory === category
                    ? 'bg-gradient-to-r from-amber-600 to-amber-700 text-white shadow-lg scale-105'
                    : 'bg-white text-amber-900 hover:bg-amber-100'
                }`}
              >
                {category}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Products Grid */}
      <div className="container mx-auto px-4 py-8">
        {loading ? (
          <div className="text-center py-20">
            <div className="w-16 h-16 border-4 border-amber-600 border-t-transparent rounded-full animate-spin mx-auto"></div>
            <p className="text-amber-900 mt-4">Loading products...</p>
          </div>
        ) : filteredProducts.length === 0 ? (
          <div className="text-center py-20">
            <div className="text-6xl mb-4">😔</div>
            <h3 className="text-2xl font-bold text-amber-900 mb-2">No products found</h3>
            <p className="text-amber-700">Try adjusting your filters or search terms</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredProducts.map((product, idx) => (
              <div
                key={product.id ?? idx}
                style={{ animationDelay: `${idx * 50}ms` }}
                className="animate-fadeInUp"
              >
                <ProductCard
                  product={product}
                  onAddToCart={addToCart}
                  isFavorite={favorites.includes(product._id)}
                  onToggleFavorite={toggleFavorite}
                />
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Floating Menu */}
      <div className='lg:hidden'>
        <FloatingMenu
          categories={categories}
          selectedCategory={selectedCategory}
          onCategorySelect={setSelectedCategory}
          cartCount={totalCartItems}
        />
      </div>

      <style>{`
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        @keyframes fadeIn {
          from {
            opacity: 0;
          }
          to {
            opacity: 1;
          }
        }
        .animate-fadeInUp {
          animation: fadeInUp 0.6s ease-out forwards;
        }
        .animate-fadeIn {
          animation: fadeIn 0.3s ease-out;
        }
        .scrollbar-hide {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
        .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }
      `}</style>
    </div>
  );
};

export default ProductsPage;
