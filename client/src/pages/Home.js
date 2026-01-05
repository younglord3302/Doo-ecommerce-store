import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from '../utils/axios';

const Home = () => {
  const [featuredProducts, setFeaturedProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchFeaturedProducts();
  }, []);

  const fetchFeaturedProducts = async () => {
    try {
      const response = await axios.get('/products?featured=true&limit=6');
      setFeaturedProducts(response.data.data.products);
    } catch (error) {
      console.error('Failed to fetch featured products:', error);
      // Set empty array to prevent crashes
      setFeaturedProducts([]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-24">
      {/* Hero Section */}
      <section className="relative overflow-hidden pt-20 pb-32">
        <div className="container mx-auto px-4 relative z-10 text-center">
          <div className="inline-block animate-float mb-6">
            <span className="glass px-4 py-1.5 rounded-full text-xs font-bold tracking-widest text-accent-indigo uppercase">
              The Future of Elegance
            </span>
          </div>
          <h1 className="text-6xl md:text-8xl font-black mb-8 leading-tight tracking-tighter">
            Build your <span className="text-gradient">Empire</span><br />
            with <span className="text-white italic underline decoration-accent-rose/30">Artistry</span>
          </h1>
          <p className="max-w-2xl mx-auto text-lg md:text-xl text-gray-400 mb-12 font-medium">
            Curating the finest digital solutions and products for the modern aesthetic. Join the revolution of premium design.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
            <Link to="/products" className="btn-glow px-10 py-4 text-base">
              Explore Collection
            </Link>
            <Link to="/register" className="glass px-10 py-4 rounded-full font-bold hover:bg-white/10 transition-all">
              Join the Studio
            </Link>
          </div>
        </div>

        {/* Decorative elements */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-accent-indigo/10 rounded-full blur-[120px] -z-10"></div>
      </section>

      {/* Featured Products */}
      <section className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row items-end justify-between mb-16 gap-6">
          <div className="space-y-4">
            <h2 className="text-4xl font-black tracking-tight">Featured <span className="text-accent-indigo">Masterpieces</span></h2>
            <p className="text-gray-400 max-w-md">Our hand-picked selection of high-end arrivals designed to elevate your lifestyle.</p>
          </div>
          <Link to="/products" className="text-sm font-bold text-accent-indigo hover:text-white transition-colors flex items-center gap-2 group">
            View All Products
            <svg className="w-4 h-4 transition-transform group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </Link>
        </div>

        {loading ? (
          <div className="flex justify-center items-center h-64">
            <div className="w-12 h-12 rounded-full border-t-2 border-r-2 border-accent-indigo animate-spin"></div>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
            {featuredProducts.map((product) => (
              <div key={product._id} className="glass-card group hover:-translate-y-2">
                <div className="relative h-64 mb-6 rounded-xl overflow-hidden">
                  <img
                    src={product.images[0]?.url || '/placeholder.jpg'}
                    alt={product.images[0]?.alt || product.name}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-dark-900 via-transparent to-transparent opacity-60"></div>
                  <div className="absolute bottom-4 left-4">
                    <span className="glass px-3 py-1 rounded-full text-[10px] font-black uppercase text-accent-cyan">
                      {product.category || 'Luxury'}
                    </span>
                  </div>
                </div>
                <div className="space-y-4">
                  <div className="flex justify-between items-start">
                    <h3 className="text-xl font-bold">{product.name}</h3>
                    <span className="text-xl font-black text-white">${product.price}</span>
                  </div>
                  <p className="text-gray-400 text-sm line-clamp-2">
                    {product.description}
                  </p>
                  <Link
                    to={`/products/${product._id}`}
                    className="w-full btn-glow text-center block text-sm"
                  >
                    View Details
                  </Link>
                </div>
              </div>
            ))}
          </div>
        )}
      </section>

      {/* Features Section */}
      <section className="bg-white/5 py-24 backdrop-blur-sm">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-16">
            <div className="space-y-6">
              <div className="w-14 h-14 rounded-2xl bg-accent-indigo/20 flex items-center justify-center text-accent-indigo">
                <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
                </svg>
              </div>
              <h3 className="text-2xl font-bold">Priority Logistics</h3>
              <p className="text-gray-400 leading-relaxed">Exquisite packaging and worldwide shipping, ensuring your masterpiece arrives in pristine condition.</p>
            </div>
            <div className="space-y-6">
              <div className="w-14 h-14 rounded-2xl bg-accent-cyan/20 flex items-center justify-center text-accent-cyan">
                <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="text-2xl font-bold">Secure Protocol</h3>
              <p className="text-gray-400 leading-relaxed">Multi-layered security for every transaction. Your data and privacy are held in the highest regard.</p>
            </div>
            <div className="space-y-6">
              <div className="w-14 h-14 rounded-2xl bg-accent-rose/20 flex items-center justify-center text-accent-rose">
                <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M18.364 5.636l-3.536 3.536m0 5.656l3.536 3.536M9.172 9.172L5.636 5.636m3.536 9.192l-3.536 3.536M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-5 0a4 4 0 11-8 0 4 4 0 018 0z" />
                </svg>
              </div>
              <h3 className="text-2xl font-bold">Concierge Service</h3>
              <p className="text-gray-400 leading-relaxed">Dedicated artisans ready to assist you 24/7. Excellence in support is our primary objective.</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
