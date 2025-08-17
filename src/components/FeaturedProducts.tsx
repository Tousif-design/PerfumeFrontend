import React, { useState } from 'react';
import { Star, Award, Gem, Sparkles, Crown, Shield, Eye, Heart, ShoppingCart, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import Image1 from '../Assets/pic13.png';
import Image2 from '../Assets/pic14.png';
import Image3 from '../Assets/pic4.png';

const FeaturedProducts = () => {
  const [hoveredProduct, setHoveredProduct] = useState(null);

  const products = [
    {
      id: 1,
      name: "Mukhallat Al Oud Al Aseel",
      price: "$299",
      originalPrice: "$399",
      rating: 4.9,
      reviews: 156,
      image: Image1,
      badge: "Bestseller",
      badgeIcon: Award,
      description: "A rare blend of pure Cambodian oud with aged Indian sandalwood, enriched with precious saffron threads from Kashmir and a touch of Bulgarian rose absolute. This traditional mukhallat represents centuries of perfumery mastery.",
      premium: true,
      exclusive: true,
      category: "Luxury Oud"
    },
    {
      id: 2,
      name: "Jasmine Al Ward Al Abyad",
      price: "$179",
      originalPrice: "$229",
      rating: 4.8,
      reviews: 89,
      image: Image2,
      badge: "Limited",
      badgeIcon: Gem,
      description: "Rare night-blooming jasmine sambac from the valleys of Kashmir, blended with Madagascar vanilla beans and ethereal white musk essence. A floral masterpiece that captures the essence of moonlit gardens.",
      premium: false,
      exclusive: false,
      category: "Floral"
    },
    {
      id: 3,
      name: "Sandalwood Al Hindi Al Asli",
      price: "$149",
      originalPrice: "$199",
      rating: 4.7,
      reviews: 203,
      image: Image3,
      badge: "New",
      badgeIcon: Sparkles,
      description: "Pure Mysore sandalwood oil aged for 15 years, delicately blended with Damask rose petals and ancient amber resin. This traditional blend brings serenity and spiritual connection.",
      premium: false,
      exclusive: false,
      category: "Woody"
    },
    {
      id: 4,
      name: "Amber Al Anbar Al Qadeem",
      price: "$219",
      originalPrice: "$279",
      rating: 4.9,
      reviews: 127,
      image: Image1,
      badge: "Premium",
      badgeIcon: Crown,
      description: "Ancient Baltic amber resin aged for decades, combined with rare agarwood from the sacred forests of Assam and oriental spices including cardamom, clove, and cinnamon. A regal blend fit for royalty.",
      premium: true,
      exclusive: true,
      category: "Oriental"
    },
  ];

  const getBadgeColor = (badge) => {
    switch(badge) {
      case 'Bestseller': return 'from-amber-500 to-yellow-600';
      case 'Limited': return 'from-purple-500 to-pink-600';
      case 'New': return 'from-green-500 to-emerald-600';
      case 'Premium': return 'from-blue-500 to-indigo-600';
      default: return 'from-gray-500 to-gray-600';
    }
  };

  const getSavingsPercentage = (price, originalPrice) => {
    const current = parseInt(price.slice(1));
    const original = parseInt(originalPrice.slice(1));
    return Math.round(((original - current) / original) * 100);
  };

  return (
    <section className="relative min-h-screen bg-gradient-to-br from-[#f8efe3] via-[#f6e7d7] to-[#f3e3c3] ornament-pattern-ultra py-20 overflow-hidden">
      {/* Background Pattern */}
      {/* Remove the old pattern divs, since ornament-pattern-ultra handles it */}
      {/* Floating Elements */}
      <div className="absolute top-20 left-10 w-20 h-20 bg-gradient-to-br from-amber-400 to-orange-500 rounded-full blur-xl opacity-20 animate-pulse"></div>
      <div className="absolute top-40 right-20 w-32 h-32 bg-gradient-to-br from-purple-400 to-pink-500 rounded-full blur-xl opacity-20 animate-pulse" style={{animationDelay: '1s'}}></div>
      <div className="absolute bottom-20 left-1/4 w-24 h-24 bg-gradient-to-br from-blue-400 to-cyan-500 rounded-full blur-xl opacity-20 animate-pulse" style={{animationDelay: '2s'}}></div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Header Section */}
        <div className="text-center mb-16 animate-fade-in-up">
          <div className="flex items-center justify-center mb-8">
            <div className="flex items-center space-x-4">
              <div className="w-16 h-0.5 bg-gradient-to-r from-transparent via-amber-500 to-amber-600"></div>
              <div className="flex items-center space-x-3 px-6 py-2 bg-white/70 backdrop-blur-sm rounded-full shadow-lg border border-amber-200">
                <Shield className="w-5 h-5 text-amber-600" />
                <span className="text-amber-800 font-semibold tracking-wider uppercase text-sm">Featured Collection</span>
                <Crown className="w-5 h-5 text-amber-600" />
              </div>
              <div className="w-16 h-0.5 bg-gradient-to-r from-amber-600 via-amber-500 to-transparent"></div>
            </div>
          </div>
          
          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-6 bg-gradient-to-r from-slate-800 via-slate-700 to-slate-900 bg-clip-text text-transparent">
            Artisan <span className="bg-gradient-to-r from-amber-600 via-yellow-500 to-amber-700 bg-clip-text text-transparent">Masterpieces</span>
          </h2>
          
          <p className="text-lg sm:text-xl text-slate-600 max-w-4xl mx-auto leading-relaxed font-light">
            Discover our most treasured creations, each bottle representing decades of mastery 
            and the world's most exceptional ingredients, handcrafted for the discerning connoisseur.
          </p>
        </div>

       

        {/* Products Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mb-16">
          {products.map((product, index) => (
            <div 
              key={product.id}
              className={`group relative bg-white rounded-3xl shadow-2xl transition-all duration-700 transform hover:-translate-y-2 overflow-hidden ${
                product.premium ? 'ring-2 ring-amber-200' : ''
              }`}
              style={{ animationDelay: `${index * 0.1}s` }}
              onMouseEnter={() => setHoveredProduct(product.id)}
              onMouseLeave={() => setHoveredProduct(null)}
            >
              {/* Image Container */}
              <div className="relative overflow-hidden">
                <img 
                  src={product.image} 
                  alt={product.name}
                  className="w-full h-72 object-cover transition-transform duration-500 group-hover:scale-105"
                />
                
                {/* Overlay Gradient */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                
                {/* Badges */}
                <div className="absolute top-4 left-4 flex flex-col space-y-2">
                  <div className={`bg-gradient-to-r ${getBadgeColor(product.badge)} text-white px-3 py-1 rounded-full text-xs font-bold flex items-center space-x-1 shadow-lg`}>
                    <product.badgeIcon className="w-3 h-3" />
                    <span>{product.badge}</span>
                  </div>
                  {product.exclusive && (
                    <div className="bg-gradient-to-r from-slate-700 to-slate-800 text-white px-3 py-1 rounded-full text-xs font-bold shadow-lg">
                      Exclusive
                    </div>
                  )}
                </div>

                {/* Category Tag */}
                <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm text-slate-700 px-3 py-1 rounded-full text-xs font-medium">
                  {product.category}
                </div>

                {/* Quick Actions */}
                <div className={`absolute bottom-4 right-4 flex space-x-2 transition-all duration-300 ${
                  hoveredProduct === product.id ? 'opacity-100 transform translate-y-0' : 'opacity-0 transform translate-y-4'
                }`}>
                  <button className="w-10 h-10 bg-white/90 backdrop-blur-sm rounded-full flex items-center justify-center shadow-lg hover:bg-white transition-colors">
                    <Eye className="w-4 h-4 text-slate-700" />
                  </button>
                  <button className="w-10 h-10 bg-white/90 backdrop-blur-sm rounded-full flex items-center justify-center shadow-lg hover:bg-white transition-colors">
                    <Heart className="w-4 h-4 text-slate-700" />
                  </button>
                </div>

                {/* Premium Crown */}
                {product.premium && (
                  <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-16 h-16 bg-gradient-to-br from-amber-400 to-yellow-600 rounded-full flex items-center justify-center shadow-xl opacity-0 group-hover:opacity-90 transition-all duration-500 animate-pulse">
                    <Crown className="w-8 h-8 text-white" />
                  </div>
                )}
              </div>

              {/* Content */}
              <div className="p-6">
                {/* Rating */}
                <div className="flex items-center space-x-2 mb-3">
                  <div className="flex items-center space-x-1">
                    {[...Array(5)].map((_, i) => (
                      <Star 
                        key={i} 
                        className={`w-4 h-4 ${i < Math.floor(product.rating) ? 'text-amber-500 fill-current' : 'text-gray-300'}`} 
                      />
                    ))}
                  </div>
                  <span className="text-sm text-slate-600 font-medium">
                    {product.rating} ({product.reviews})
                  </span>
                </div>

                {/* Product Name */}
                <h3 className="text-xl font-bold mb-3 text-slate-800 group-hover:text-amber-700 transition-colors">
                  {product.name}
                </h3>
                
                {/* Description */}
                <p className="text-slate-600 text-sm mb-4 leading-relaxed line-clamp-3">
                  {product.description}
                </p>

                {/* Pricing */}
                <div className="flex items-center justify-between mb-6">
                  <div className="flex items-center space-x-2">
                    <span className="text-2xl font-bold bg-gradient-to-r from-amber-600 to-yellow-600 bg-clip-text text-transparent">
                      {product.price}
                    </span>
                    <span className="text-slate-400 line-through text-sm">{product.originalPrice}</span>
                  </div>
                  <div className="bg-green-100 text-green-700 px-3 py-1 rounded-full text-xs font-bold">
                    {getSavingsPercentage(product.price, product.originalPrice)}% OFF
                  </div>
                </div>

                {/* Add to Cart Button */}
              <Link to='collections'>
                <button className="w-full bg-gradient-to-r from-amber-600 to-yellow-600 hover:from-amber-700 hover:to-yellow-700 text-white py-3 px-6 rounded-2xl font-semibold transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl flex items-center justify-center space-x-2 group">
                  <ShoppingCart className="w-5 h-5" />
                  <span>Add to Collection</span>
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </button>
              </Link>
              </div>

              {/* Remove this block to fix the white overlay on hover */}
              {/* 
              <div className="absolute inset-0 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none">
                <div className="absolute inset-0 rounded-3xl bg-gradient-to-r from-amber-200 via-yellow-200 to-amber-200 p-0.5">
                  <div className="w-full h-full rounded-3xl bg-white"></div>
                </div>
              </div>
              */}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturedProducts;