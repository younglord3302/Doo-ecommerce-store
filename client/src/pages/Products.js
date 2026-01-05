import React, { useState, useEffect, useCallback } from 'react';
import { Link } from 'react-router-dom';
import axios from '../utils/axios';
import { useCart } from '../context/CartContext';
import { toast } from 'react-toastify';

const Products = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [category, setCategory] = useState('');
  const [categories, setCategories] = useState([]);
  const [pagination, setPagination] = useState({});
  const [currentPage, setCurrentPage] = useState(1);

  const { addToCart } = useCart();

  const fetchCategories = async () => {
    try {
      const response = await axios.get('/products/categories/list');
      setCategories(response.data.data.categories);
    } catch (error) {
      console.error('Failed to fetch categories:', error);
    }
  };

  const fetchProducts = useCallback(async () => {
    try {
      setLoading(true);
      const params = new URLSearchParams({
        page: currentPage,
        limit: 12,
        ...(search && { search }),
        ...(category && { category })
      });

      const response = await axios.get(`/products?${params}`);
      setProducts(response.data.data.products);
      setPagination(response.data.data.pagination);
    } catch (error) {
      console.error('Failed to fetch products:', error);
      toast.error('Failed to load products');
    } finally {
      setLoading(false);
    }
  }, [currentPage, search, category]);

  useEffect(() => {
    fetchCategories();
    fetchProducts();
  }, [currentPage, search, category, fetchProducts]);

  const handleAddToCart = async (productId) => {
    try {
      await addToCart(productId, 1);
      toast.success('Added to cart!');
    } catch (error) {
      // Error handled in context
    }
  };

  const handleSearch = (e) => {
    e.preventDefault();
    setCurrentPage(1);
    fetchProducts();
  };

  return (
    <div className="container mx-auto px-4 space-y-12">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-8 pt-8">
        <div>
          <h1 className="text-5xl font-black tracking-tighter">The <span className="text-gradient">Collection</span></h1>
          <p className="text-gray-400 mt-2">Discover our curated selection of high-end digital masterpieces.</p>
        </div>

        {/* Search and Filter */}
        <div className="flex flex-col sm:flex-row gap-4 flex-1 max-w-xl">
          <form onSubmit={handleSearch} className="flex-1 relative group">
            <input
              type="text"
              placeholder="Search catalog..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="input-artistic pl-12"
            />
            <svg className="w-5 h-5 text-gray-500 absolute left-4 top-1/2 -translate-y-1/2 group-focus-within:text-accent-indigo transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </form>
          <select
            value={category}
            onChange={(e) => {
              setCategory(e.target.value);
              setCurrentPage(1);
            }}
            className="input-artistic sm:w-48 appearance-none cursor-pointer"
          >
            <option value="">All Masterpieces</option>
            {categories.map((cat) => (
              <option key={cat} value={cat}>{cat}</option>
            ))}
          </select>
        </div>
      </div>

      {/* Products Grid */}
      {loading ? (
        <div className="flex justify-center items-center h-96">
          <div className="w-16 h-16 rounded-full border-t-2 border-r-2 border-accent-indigo animate-spin"></div>
        </div>
      ) : products.length === 0 ? (
        <div className="text-center py-32 glass rounded-3xl">
          <h2 className="text-3xl font-black text-gray-500 mb-4">No masterpieces found</h2>
          <p className="text-gray-400">Our artisans are currently crafting more. Try adjusting your filters.</p>
        </div>
      ) : (
        <div className="space-y-16">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
            {products.map((product) => (
              <div key={product._id} className="glass-card group flex flex-col">
                <Link to={`/products/${product._id}`} className="relative h-64 mb-6 rounded-xl overflow-hidden block">
                  <img
                    src={product.images[0]?.url || '/placeholder.jpg'}
                    alt={product.images[0]?.alt || product.name}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-dark-900/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
                  <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all scale-90 group-hover:scale-100">
                    <span className="glass px-6 py-2 rounded-full text-xs font-bold uppercase tracking-widest text-white">
                      View Work
                    </span>
                  </div>
                </Link>
                
                <div className="flex-1 flex flex-col space-y-4">
                  <div className="flex justify-between items-start gap-4">
                    <Link to={`/products/${product._id}`} className="flex-1">
                      <h3 className="text-lg font-bold group-hover:text-accent-indigo transition-colors">{product.name}</h3>
                    </Link>
                    <div className="flex flex-col items-end">
                      <span className="text-lg font-black text-white">${product.price}</span>
                      {product.originalPrice && (
                        <span className="text-xs text-gray-500 line-through">
                          ${product.originalPrice}
                        </span>
                      )}
                    </div>
                  </div>

                  <p className="text-gray-400 text-sm line-clamp-2 flex-1">
                    {product.description}
                  </p>

                  <button
                    onClick={() => handleAddToCart(product._id)}
                    disabled={!product.isAvailable}
                    className="w-full btn-glow text-sm disabled:opacity-50 disabled:cursor-not-allowed disabled:shadow-none"
                  >
                    {product.isAvailable ? 'Acquire Piece' : 'Currently Unavailable'}
                  </button>
                </div>
              </div>
            ))}
          </div>

          {/* Pagination */}
          {pagination.pages > 1 && (
            <div className="flex justify-center pb-12">
              <div className="glass p-2 rounded-2xl flex space-x-2">
                <button
                  onClick={() => setCurrentPage(currentPage - 1)}
                  disabled={currentPage === 1}
                  className="p-3 rounded-xl hover:bg-white/10 disabled:opacity-30 transition-colors"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                  </svg>
                </button>
                {Array.from({ length: pagination.pages }, (_, i) => i + 1).map((page) => (
                  <button
                    key={page}
                    onClick={() => setCurrentPage(page)}
                    className={`w-11 h-11 flex items-center justify-center rounded-xl text-sm font-bold transition-all ${
                      page === currentPage
                        ? 'bg-accent-indigo text-white shadow-lg shadow-accent-indigo/20 scale-110'
                        : 'text-gray-400 hover:bg-white/10 hover:text-white'
                    }`}
                  >
                    {page}
                  </button>
                ))}
                <button
                  onClick={() => setCurrentPage(currentPage + 1)}
                  disabled={currentPage === pagination.pages}
                  className="p-3 rounded-xl hover:bg-white/10 disabled:opacity-30 transition-colors"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </button>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default Products;
