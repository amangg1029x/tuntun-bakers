import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import ProductCard from './ProductCard';
import productData from '../data/productData.json';
import { useCart, useFavorites } from '../context/AppContext';

const FeaturedProducts = () => {

  const { addToCart } = useCart();
  const { favorites, toggleFavorite } = useFavorites();


  // Auto-select featured products
  const getFeaturedProducts = () => {
  const allProducts = productData.products;
  
  // Best Seller: Trending products, sorted by reviews
  const bestSeller = allProducts
    .filter(p => p.isTrending)
    .sort((a, b) => b.reviews - a.reviews)[0];
  
  // Popular: Highest rating
  const popular = allProducts
    .sort((a, b) => b.rating - a.rating)[0];
  
  // Premium: Highest price OR has "Premium" tag
  const premium = allProducts
    .filter(p => p.tags.includes("Premium") || p.price >= 400)
    .sort((a, b) => b.price - a.price)[0];
  
  // New: isNew = true, or most recent
  const newProduct = allProducts
    .filter(p => p.isNew)[0] || allProducts[allProducts.length - 1];
  
  return [bestSeller, popular, premium, newProduct].filter(Boolean);
};

const products = getFeaturedProducts();

  return (
    <section id="products" className="py-20 bg-white">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="text-center mb-16">
          <div className="inline-block bg-amber-100 text-amber-800 px-4 py-2 rounded-full text-sm font-semibold mb-4">
            Our Specialties
          </div>
          <h2 className="text-4xl md:text-5xl font-bold text-amber-950 mb-4">
            Featured Products
          </h2>
          <p className="text-lg text-amber-800 max-w-2xl mx-auto">
            Handpicked favorites loved by our customers. Each item is baked fresh daily
            with premium ingredients.
          </p>
        </div>

        {/* Products Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {products.map((product, index) => (
            <ProductCard
              key={product.id}
              product={product}
              onAddToCart={addToCart}
              onToggleFavorite={toggleFavorite}
            />
          ))}
        </div>

        {/* View All Button */}
        <div className="text-center mt-12">
          <Link to="/products">  
          <button className="bg-white text-amber-900 px-8 py-4 rounded-xl font-semibold text-lg hover:shadow-xl hover:scale-105 transition-all duration-300 border-2 border-amber-300 hover:border-amber-500">
            View All Products →
          </button>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default FeaturedProducts;