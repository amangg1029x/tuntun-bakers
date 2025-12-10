import React, { useState, useEffect } from 'react';
import { useAuth } from '@clerk/clerk-react';
import adminAPI from '../../services/adminAPI';
import { productAPI } from '../../services/api';
import {
  Plus,
  Edit2,
  Trash2,
  Search,
  Package,
  AlertCircle,
  X,
  Save,
  TrendingUp,
  Star
} from 'lucide-react';
import { toast } from 'react-hot-toast';

const AdminProducts = () => {
  const { getToken } = useAuth();
  const [loading, setLoading] = useState(true);
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('all');
  const [stockFilter, setStockFilter] = useState('all');
  const [showProductModal, setShowProductModal] = useState(false);
  const [editingProduct, setEditingProduct] = useState(null);
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    price: '',
    category: 'Breads',
    emoji: '🍞',
    stockQuantity: 100,
    rating: 4.5,
    reviews: 0,
    tags: [],
    prepTime: 'Fresh daily',
    isNew: false,
    isTrending: false,
    inStock: true
  });

  const categories = ['Breads', 'Cakes', 'Pastries', 'Cookies', 'Specials'];
  const commonEmojis = ['🍞', '🥖', '🎂', '🍰', '🥐', '🍪', '🥧', '🍩', '🧁', '🍮'];

  useEffect(() => {
    fetchProducts();
  }, []);

  useEffect(() => {
    filterProducts();
  }, [searchTerm, categoryFilter, stockFilter, products]);

  const fetchProducts = async () => {
    try {
      setLoading(true);
      const response = await productAPI.getAll();
      setProducts(response.data);
      setFilteredProducts(response.data);
    } catch (error) {
      console.error('Failed to fetch products:', error);
      toast.error('Failed to load products');
    } finally {
      setLoading(false);
    }
  };

  const filterProducts = () => {
    let filtered = [...products];

    if (searchTerm) {
      filtered = filtered.filter(product =>
        product.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        product.description?.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    if (categoryFilter !== 'all') {
      filtered = filtered.filter(product => product.category === categoryFilter);
    }

    if (stockFilter === 'low') {
      filtered = filtered.filter(product => product.stockQuantity <= 5 && product.stockQuantity > 0);
    } else if (stockFilter === 'out') {
      filtered = filtered.filter(product => !product.inStock || product.stockQuantity === 0);
    }

    setFilteredProducts(filtered);
  };

  const handleOpenModal = (product = null) => {
    if (product) {
      setEditingProduct(product);
      setFormData({
        name: product.name,
        description: product.description,
        price: product.price,
        category: product.category,
        emoji: product.emoji,
        stockQuantity: product.stockQuantity,
        rating: product.rating,
        reviews: product.reviews,
        tags: product.tags || [],
        prepTime: product.prepTime,
        isNew: product.isNew,
        isTrending: product.isTrending,
        inStock: product.inStock
      });
    } else {
      setEditingProduct(null);
      setFormData({
        name: '',
        description: '',
        price: '',
        category: 'Breads',
        emoji: '🍞',
        stockQuantity: 100,
        rating: 4.5,
        reviews: 0,
        tags: [],
        prepTime: 'Fresh daily',
        isNew: false,
        isTrending: false,
        inStock: true
      });
    }
    setShowProductModal(true);
  };

  const handleSaveProduct = async () => {
    try {
      const token = await getToken();
      
      if (editingProduct) {
        await adminAPI.updateProduct(token, editingProduct._id, formData);
        toast.success('Product updated successfully!');
      } else {
        await adminAPI.createProduct(token, formData);
        toast.success('Product created successfully!');
      }
      
      setShowProductModal(false);
      fetchProducts();
    } catch (error) {
      console.error('Failed to save product:', error);
      toast.error('Failed to save product');
    }
  };

  const handleDeleteProduct = async (productId) => {
    if (!window.confirm('Are you sure you want to delete this product?')) return;

    try {
      const token = await getToken();
      await adminAPI.deleteProduct(token, productId);
      toast.success('Product deleted successfully!');
      fetchProducts();
    } catch (error) {
      console.error('Failed to delete product:', error);
      toast.error('Failed to delete product');
    }
  };

  const handleUpdateStock = async (productId, stockData) => {
    try {
      const token = await getToken();
      await adminAPI.updateProductStock(token, productId, stockData);
      toast.success('Stock updated successfully!');
      fetchProducts();
    } catch (error) {
      console.error('Failed to update stock:', error);
      toast.error('Failed to update stock');
    }
  };

  const ProductModal = () => (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4" onClick={() => setShowProductModal(false)}>
      <div className="bg-white rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto" onClick={(e) => e.stopPropagation()}>
        <div className="sticky top-0 bg-gradient-to-r from-amber-600 to-amber-700 text-white p-6 rounded-t-2xl">
          <div className="flex items-center justify-between">
            <h2 className="text-2xl font-bold">{editingProduct ? 'Edit Product' : 'Add New Product'}</h2>
            <button onClick={() => setShowProductModal(false)} className="p-2 hover:bg-amber-800 rounded-lg">
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        <div className="p-6 space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="col-span-2">
              <label className="block text-sm font-semibold text-gray-700 mb-2">Product Name *</label>
              <input
                type="text"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                className="w-full px-4 py-2 border-2 border-gray-300 rounded-lg focus:border-amber-500 focus:outline-none"
                placeholder="e.g., Chocolate Croissant"
              />
            </div>

            <div className="col-span-2">
              <label className="block text-sm font-semibold text-gray-700 mb-2">Description *</label>
              <textarea
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                rows="3"
                className="w-full px-4 py-2 border-2 border-gray-300 rounded-lg focus:border-amber-500 focus:outline-none"
                placeholder="Describe your product..."
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">Price (₹) *</label>
              <input
                type="number"
                value={formData.price}
                onChange={(e) => setFormData({ ...formData, price: Number(e.target.value) })}
                className="w-full px-4 py-2 border-2 border-gray-300 rounded-lg focus:border-amber-500 focus:outline-none"
                placeholder="0.00"
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">Category *</label>
              <select
                value={formData.category}
                onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                className="w-full px-4 py-2 border-2 border-gray-300 rounded-lg focus:border-amber-500 focus:outline-none"
              >
                {categories.map(cat => (
                  <option key={cat} value={cat}>{cat}</option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">Emoji</label>
              <div className="flex gap-2 flex-wrap mb-2">
                {commonEmojis.map(emoji => (
                  <button
                    key={emoji}
                    onClick={() => setFormData({ ...formData, emoji })}
                    className={`text-2xl p-2 rounded-lg hover:bg-gray-100 ${
                      formData.emoji === emoji ? 'bg-amber-100 ring-2 ring-amber-500' : ''
                    }`}
                  >
                    {emoji}
                  </button>
                ))}
              </div>
              <input
                type="text"
                value={formData.emoji}
                onChange={(e) => setFormData({ ...formData, emoji: e.target.value })}
                className="w-full px-4 py-2 border-2 border-gray-300 rounded-lg focus:border-amber-500 focus:outline-none"
                placeholder="Or enter custom emoji"
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">Stock Quantity *</label>
              <input
                type="number"
                value={formData.stockQuantity}
                onChange={(e) => setFormData({ ...formData, stockQuantity: Number(e.target.value) })}
                className="w-full px-4 py-2 border-2 border-gray-300 rounded-lg focus:border-amber-500 focus:outline-none"
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">Prep Time</label>
              <input
                type="text"
                value={formData.prepTime}
                onChange={(e) => setFormData({ ...formData, prepTime: e.target.value })}
                className="w-full px-4 py-2 border-2 border-gray-300 rounded-lg focus:border-amber-500 focus:outline-none"
                placeholder="e.g., Fresh daily"
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">Rating</label>
              <input
                type="number"
                step="0.1"
                min="0"
                max="5"
                value={formData.rating}
                onChange={(e) => setFormData({ ...formData, rating: Number(e.target.value) })}
                className="w-full px-4 py-2 border-2 border-gray-300 rounded-lg focus:border-amber-500 focus:outline-none"
              />
            </div>

            <div className="col-span-2">
              <label className="block text-sm font-semibold text-gray-700 mb-2">Tags (comma separated)</label>
              <input
                type="text"
                value={formData.tags.join(', ')}
                onChange={(e) => setFormData({ ...formData, tags: e.target.value.split(',').map(t => t.trim()).filter(Boolean) })}
                className="w-full px-4 py-2 border-2 border-gray-300 rounded-lg focus:border-amber-500 focus:outline-none"
                placeholder="e.g., Vegan, Gluten-Free"
              />
            </div>

            <div className="col-span-2 space-y-3">
              <label className="flex items-center gap-3 cursor-pointer">
                <input
                  type="checkbox"
                  checked={formData.inStock}
                  onChange={(e) => setFormData({ ...formData, inStock: e.target.checked })}
                  className="w-5 h-5 text-amber-600 rounded"
                />
                <span className="font-semibold text-gray-700">In Stock</span>
              </label>
              <label className="flex items-center gap-3 cursor-pointer">
                <input
                  type="checkbox"
                  checked={formData.isNew}
                  onChange={(e) => setFormData({ ...formData, isNew: e.target.checked })}
                  className="w-5 h-5 text-amber-600 rounded"
                />
                <span className="font-semibold text-gray-700">Mark as New</span>
              </label>
              <label className="flex items-center gap-3 cursor-pointer">
                <input
                  type="checkbox"
                  checked={formData.isTrending}
                  onChange={(e) => setFormData({ ...formData, isTrending: e.target.checked })}
                  className="w-5 h-5 text-amber-600 rounded"
                />
                <span className="font-semibold text-gray-700">Mark as Trending</span>
              </label>
            </div>
          </div>

          <div className="flex gap-3 pt-4">
            <button
              onClick={() => setShowProductModal(false)}
              className="flex-1 px-6 py-3 border-2 border-gray-300 rounded-lg font-semibold hover:bg-gray-50 transition-colors"
            >
              Cancel
            </button>
            <button
              onClick={handleSaveProduct}
              className="flex-1 px-6 py-3 bg-gradient-to-r from-amber-600 to-amber-700 text-white rounded-lg font-semibold hover:shadow-lg transition-all flex items-center justify-center gap-2"
            >
              <Save className="w-5 h-5" />
              {editingProduct ? 'Update Product' : 'Create Product'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );

  if (loading) {
    return (
      <div className="flex items-center justify-center h-96">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-amber-600 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-600 font-semibold">Loading products...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Products Management</h1>
          <p className="text-gray-600">Manage your bakery's product catalog</p>
        </div>
        <button
          onClick={() => handleOpenModal()}
          className="flex items-center gap-2 bg-gradient-to-r from-amber-600 to-amber-700 text-white px-6 py-3 rounded-xl font-semibold hover:shadow-lg transition-all"
        >
          <Plus className="w-5 h-5" />
          Add Product
        </button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-white rounded-xl p-4 shadow-lg">
          <p className="text-sm text-gray-600 mb-1">Total Products</p>
          <p className="text-2xl font-bold text-gray-900">{products.length}</p>
        </div>
        <div className="bg-white rounded-xl p-4 shadow-lg">
          <p className="text-sm text-gray-600 mb-1">In Stock</p>
          <p className="text-2xl font-bold text-green-600">{products.filter(p => p.inStock).length}</p>
        </div>
        <div className="bg-white rounded-xl p-4 shadow-lg">
          <p className="text-sm text-gray-600 mb-1">Low Stock</p>
          <p className="text-2xl font-bold text-orange-600">{products.filter(p => p.stockQuantity <= 5 && p.stockQuantity > 0).length}</p>
        </div>
        <div className="bg-white rounded-xl p-4 shadow-lg">
          <p className="text-sm text-gray-600 mb-1">Out of Stock</p>
          <p className="text-2xl font-bold text-red-600">{products.filter(p => !p.inStock || p.stockQuantity === 0).length}</p>
        </div>
      </div>

      {/* Filters */}
      <div className="bg-white rounded-2xl p-6 shadow-lg">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              type="text"
              placeholder="Search products..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border-2 border-gray-300 rounded-lg focus:border-amber-500 focus:outline-none"
            />
          </div>
          <select
            value={categoryFilter}
            onChange={(e) => setCategoryFilter(e.target.value)}
            className="px-4 py-2 border-2 border-gray-300 rounded-lg focus:border-amber-500 focus:outline-none"
          >
            <option value="all">All Categories</option>
            {categories.map(cat => (
              <option key={cat} value={cat}>{cat}</option>
            ))}
          </select>
          <select
            value={stockFilter}
            onChange={(e) => setStockFilter(e.target.value)}
            className="px-4 py-2 border-2 border-gray-300 rounded-lg focus:border-amber-500 focus:outline-none"
          >
            <option value="all">All Stock Status</option>
            <option value="low">Low Stock</option>
            <option value="out">Out of Stock</option>
          </select>
        </div>
      </div>

      {/* Products Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredProducts.length > 0 ? (
          filteredProducts.map((product) => (
            <div key={product._id} className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow">
              <div className="relative bg-gradient-to-br from-amber-50 to-orange-50 h-48 flex items-center justify-center">
                <div className="text-7xl">{product.emoji}</div>
                {product.isNew && (
                  <span className="absolute top-3 left-3 bg-green-500 text-white px-3 py-1 rounded-full text-xs font-bold flex items-center gap-1">
                    <Star className="w-3 h-3" /> New
                  </span>
                )}
                {product.isTrending && (
                  <span className="absolute top-3 right-3 bg-purple-500 text-white px-3 py-1 rounded-full text-xs font-bold flex items-center gap-1">
                    <TrendingUp className="w-3 h-3" /> Trending
                  </span>
                )}
                {(!product.inStock || product.stockQuantity === 0) && (
                  <div className="absolute inset-0 bg-gray-900/60 flex items-center justify-center">
                    <span className="bg-red-500 text-white px-4 py-2 rounded-lg font-bold">Out of Stock</span>
                  </div>
                )}
              </div>
              <div className="p-4">
                <h3 className="font-bold text-gray-900 text-lg mb-1">{product.name}</h3>
                <p className="text-sm text-gray-600 mb-3 line-clamp-2">{product.description}</p>
                <div className="flex items-center justify-between mb-3">
                  <span className="text-2xl font-bold text-amber-700">₹{product.price}</span>
                  <span className="text-sm text-gray-600">{product.category}</span>
                </div>
                <div className="flex items-center justify-between mb-4 pb-4 border-b border-gray-200">
                  <div>
                    <p className="text-xs text-gray-600">Stock</p>
                    <p className={`font-bold ${
                      product.stockQuantity === 0 ? 'text-red-600' :
                      product.stockQuantity <= 5 ? 'text-orange-600' :
                      'text-green-600'
                    }`}>
                      {product.stockQuantity} units
                    </p>
                  </div>
                  <div>
                    <p className="text-xs text-gray-600">Rating</p>
                    <p className="font-bold text-gray-900">{product.rating} ⭐</p>
                  </div>
                </div>
                <div className="flex gap-2">
                  <button
                    onClick={() => handleOpenModal(product)}
                    className="flex-1 flex items-center justify-center gap-2 bg-amber-100 text-amber-700 px-4 py-2 rounded-lg font-semibold hover:bg-amber-200 transition-colors"
                  >
                    <Edit2 className="w-4 h-4" />
                    Edit
                  </button>
                  <button
                    onClick={() => handleDeleteProduct(product._id)}
                    className="flex items-center justify-center bg-red-100 text-red-700 px-4 py-2 rounded-lg font-semibold hover:bg-red-200 transition-colors"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          ))
        ) : (
          <div className="col-span-full text-center py-12">
            <Package className="w-16 h-16 text-gray-300 mx-auto mb-4" />
            <p className="text-gray-500 font-semibold">No products found</p>
          </div>
        )}
      </div>

      {/* Product Modal */}
      {showProductModal && <ProductModal />}
    </div>
  );
};

export default AdminProducts;