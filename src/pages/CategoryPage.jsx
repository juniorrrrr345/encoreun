import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FiShoppingCart, FiHeart, FiStar, FiChevronLeft, FiChevronRight } from 'react-icons/fi';
import useProductStore from '../store/useProductStore';
import Loader from '../components/Loader';

const CategoryPage = () => {
  const { category } = useParams();
  const { products, loading, fetchProducts } = useProductStore();
  const [categoryProducts, setCategoryProducts] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const productsPerPage = 2;

  useEffect(() => {
    fetchProducts();
  }, [fetchProducts]);

  useEffect(() => {
    // Filtrer les produits par catégorie
    if (products.length > 0) {
      const filtered = products.filter(product => 
        product.category?.toLowerCase() === category?.toLowerCase() ||
        product.name?.toLowerCase().includes(category?.toLowerCase())
      );
      setCategoryProducts(filtered);
    } else {
      // Produits par défaut pour la démo
      setCategoryProducts([
        {
          _id: '1',
          name: 'Produit Premium',
          description: 'Un produit exceptionnel de haute qualité',
          price: 89.99,
          image: 'https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=400&h=400&fit=crop',
          rating: 4.8,
          reviews: 124
        },
        {
          _id: '2',
          name: 'Collection Exclusive',
          description: 'Édition limitée avec des matériaux nobles',
          price: 149.99,
          image: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=400&h=400&fit=crop',
          rating: 4.9,
          reviews: 89
        },
        {
          _id: '3',
          name: 'Design Moderne',
          description: 'Style contemporain et élégant',
          price: 199.99,
          image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=400&h=400&fit=crop',
          rating: 4.7,
          reviews: 156
        },
        {
          _id: '4',
          name: 'Édition Spéciale',
          description: 'Produit unique avec finitions soignées',
          price: 299.99,
          image: 'https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=400&h=400&fit=crop',
          rating: 5.0,
          reviews: 67
        },
        {
          _id: '5',
          name: 'Collection Classic',
          description: 'Intemporel et raffiné',
          price: 179.99,
          image: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=400&h=400&fit=crop',
          rating: 4.6,
          reviews: 203
        },
        {
          _id: '6',
          name: 'Designer Series',
          description: 'Création exclusive de nos designers',
          price: 399.99,
          image: 'https://images.unsplash.com/photo-1526170375885-4d8ecf77b99f?w=400&h=400&fit=crop',
          rating: 4.9,
          reviews: 45
        }
      ]);
    }
  }, [products, category]);

  // Calcul de la pagination pour les produits
  const totalPages = Math.ceil(categoryProducts.length / productsPerPage);
  const startIndex = (currentPage - 1) * productsPerPage;
  const endIndex = startIndex + productsPerPage;
  const currentProducts = categoryProducts.slice(startIndex, endIndex);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader size="large" />
      </div>
    );
  }

  return (
    <div className="min-h-screen px-6 py-8">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="max-w-6xl mx-auto"
      >
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="font-custom text-4xl md:text-5xl font-bold bg-gradient-to-r from-pink-400 to-purple-400 bg-clip-text text-transparent mb-4 capitalize">
            {category}
          </h1>
          <p className="text-xl text-gray-200">
            Découvrez notre sélection de produits dans la catégorie {category}
          </p>
        </div>

        {/* Products Grid */}
        {currentProducts.length === 0 ? (
          <div className="text-center py-16">
            <p className="text-gray-300 text-lg mb-6">
              Aucun produit disponible dans cette catégorie pour le moment.
            </p>
            <p className="text-gray-400">
              Revenez bientôt pour découvrir nos nouveautés !
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-2 gap-4">
            {currentProducts.map((product, index) => (
              <motion.div
                key={product._id}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="bg-gray-800/50 backdrop-blur-sm border border-gray-700/50 rounded-2xl overflow-hidden hover:bg-gray-800/70 transition-all duration-300 hover:transform hover:scale-105 group"
              >
                {/* Product Image */}
                <div className="aspect-square relative overflow-hidden">
                  {product.image ? (
                    <img 
                      src={product.image} 
                      alt={product.name}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                    />
                  ) : (
                    <div className="w-full h-full bg-gradient-to-br from-pink-500/20 to-purple-500/20 flex items-center justify-center">
                      <div className="text-gray-400 text-4xl">📦</div>
                    </div>
                  )}
                  
                  {/* Overlay with actions */}
                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-all duration-300 flex items-center justify-center opacity-0 group-hover:opacity-100">
                    <div className="flex gap-2">
                      <Link
                        to={`/product/${product._id}`}
                        className="w-10 h-10 bg-pink-500 rounded-full flex items-center justify-center text-white hover:bg-pink-600 transition-colors"
                      >
                        <FiShoppingCart size={18} />
                      </Link>
                      <button className="w-10 h-10 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center text-white hover:bg-white/30 transition-colors">
                        <FiHeart size={18} />
                      </button>
                    </div>
                  </div>
                </div>

                {/* Product Info */}
                <div className="p-4">
                  <h3 className="text-white font-semibold mb-2 truncate">
                    {product.name}
                  </h3>
                  <p className="text-gray-300 text-sm mb-3 line-clamp-2">
                    {product.description}
                  </p>
                  
                  {/* Rating */}
                  {product.rating && (
                    <div className="flex items-center gap-1 mb-3">
                      <div className="flex items-center">
                        {[...Array(5)].map((_, i) => (
                          <FiStar 
                            key={i}
                            size={14}
                            className={i < Math.floor(product.rating) ? 'text-yellow-400 fill-current' : 'text-gray-400'}
                          />
                        ))}
                      </div>
                      <span className="text-xs text-gray-400">
                        ({product.reviews})
                      </span>
                    </div>
                  )}
                  
                  {/* Price and Action */}
                  <div className="flex justify-between items-center">
                    <span className="text-pink-400 font-bold text-lg">
                      {product.price}€
                    </span>
                    <Link
                      to={`/product/${product._id}`}
                      className="px-4 py-2 bg-pink-500 text-white text-sm rounded-full hover:bg-pink-600 transition-colors"
                    >
                      Voir détails
                    </Link>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
          
          {/* Pagination */}
          {totalPages > 1 && (
            <div className="flex justify-center items-center gap-4 mt-8">
              <button
                onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
                disabled={currentPage === 1}
                className="flex items-center gap-2 px-4 py-2 bg-gray-800/50 text-white rounded-lg hover:bg-gray-700/50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
              >
                <FiChevronLeft size={20} />
                Précédent
              </button>
              
              <div className="flex gap-2">
                {[...Array(totalPages)].map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentPage(index + 1)}
                    className={`w-10 h-10 rounded-lg flex items-center justify-center transition-colors ${
                      currentPage === index + 1
                        ? 'bg-pink-500 text-white'
                        : 'bg-gray-800/50 text-gray-300 hover:bg-gray-700/50'
                    }`}
                  >
                    {index + 1}
                  </button>
                ))}
              </div>
              
              <button
                onClick={() => setCurrentPage(Math.min(totalPages, currentPage + 1))}
                disabled={currentPage === totalPages}
                className="flex items-center gap-2 px-4 py-2 bg-gray-800/50 text-white rounded-lg hover:bg-gray-700/50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
              >
                Suivant
                <FiChevronRight size={20} />
              </button>
            </div>
          )}
        )}
      </motion.div>
    </div>
  );
};

export default CategoryPage;