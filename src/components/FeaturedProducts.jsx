import React, { useState } from 'react';
import { ShoppingCart, Heart, Star } from 'lucide-react';

const FeaturedProducts = () => {
  const [favorites, setFavorites] = useState([]);

  const products = [
    {
      id: 1,
      name: 'Sourdough Bread',
      price: 120,
      emoji: '🍞',
      rating: 4.8,
      description: 'Artisan sourdough with crispy crust',
      tag: 'Best Seller'
    },
    {
      id: 2,
      name: 'Chocolate Croissant',
      price: 80,
      emoji: '🥐',
      rating: 4.9,
      description: 'Buttery layers with dark chocolate',
      tag: 'Popular'
    },
    {
      id: 3,
      name: 'Red Velvet Cake',
      price: 450,
      emoji: '🎂',
      rating: 5.0,
      description: 'Rich & creamy celebration cake',
      tag: 'Premium'
    },
    {
      id: 4,
      name: 'Blueberry Muffin',
      price: 60,
      emoji: '🧁',
      rating: 4.7,
      description: 'Fresh blueberries in every bite',
      tag: 'New'
    }
  ];

  const toggleFavorite = (id) => {
    setFavorites((prev) =>
      prev.includes(id) ? prev.filter((fav) => fav !== id) : [...prev, id]
    );
  };

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
            <div
              key={product.id}
              className="group bg-gradient-to-br from-amber-50 to-orange-50 rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              {/* Product Tag */}
              <div className="relative">
                <div className="absolute top-4 left-4 z-10">
                  <span className="bg-gradient-to-r from-amber-600 to-orange-600 text-white px-3 py-1 rounded-full text-xs font-bold shadow-lg">
                    {product.tag}
                  </span>
                </div>

                {/* Favorite Button */}
                <button
                  onClick={() => toggleFavorite(product.id)}
                  className="absolute top-4 right-4 z-10 bg-white p-2 rounded-full shadow-lg hover:scale-110 transition-transform duration-300"
                >
                  <Heart
                    className={`w-5 h-5 ${
                      favorites.includes(product.id)
                        ? 'fill-red-500 text-red-500'
                        : 'text-amber-600'
                    }`}
                  />
                </button>

                {/* Product Image Placeholder */}
                <div className="bg-gradient-to-br from-amber-100 to-orange-100 aspect-square flex items-center justify-center group-hover:scale-105 transition-transform duration-500">
                  <span className="text-9xl group-hover:scale-110 transition-transform duration-300">
                    {product.emoji}
                  </span>
                </div>
              </div>

              {/* Product Info */}
              <div className="p-6">
                <div className="flex items-center justify-between mb-2">
                  <h3 className="text-xl font-bold text-amber-950 group-hover:text-amber-700 transition-colors">
                    {product.name}
                  </h3>
                  <div className="flex items-center space-x-1 bg-amber-100 px-2 py-1 rounded-full">
                    <Star className="w-4 h-4 fill-amber-500 text-amber-500" />
                    <span className="text-sm font-bold text-amber-900">
                      {product.rating}
                    </span>
                  </div>
                </div>

                <p className="text-amber-700 text-sm mb-4">{product.description}</p>

                <div className="flex items-center justify-between">
                  <div>
                    <span className="text-2xl font-bold text-amber-900">
                      ₹{product.price}
                    </span>
                  </div>
                  <button className="bg-gradient-to-r from-amber-600 to-amber-700 text-white p-3 rounded-xl hover:shadow-lg hover:scale-110 transition-all duration-300 group/btn">
                    <ShoppingCart className="w-5 h-5 group-hover/btn:animate-bounce" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* View All Button */}
        <div className="text-center mt-12">
          <a href="products">  
          <button className="bg-white text-amber-900 px-8 py-4 rounded-xl font-semibold text-lg hover:shadow-xl hover:scale-105 transition-all duration-300 border-2 border-amber-300 hover:border-amber-500">
            View All Products →
          </button>
          </a>
        </div>
      </div>
    </section>
  );
};

export default FeaturedProducts;