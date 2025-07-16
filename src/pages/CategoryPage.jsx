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
  const productsPerPage = 12; // Augmenté pour afficher plus de produits

  useEffect(() => {
    fetchProducts();
  }, [fetchProducts]);

  useEffect(() => {
    // Filtrer les produits par catégorie
    if (products.length > 0) {
      const filtered = products.filter(product => 
        product.category?.toLowerCase() === category?.toLowerCase() ||
        product.name?.toLowerCase().includes(category?.toLowerCase()) ||
        product.description?.toLowerCase().includes(category?.toLowerCase())
      );
      setCategoryProducts(filtered);
    } else {
      // Produits CBD par défaut pour la démo
      const demoProducts = [
        // Catégorie Huiles CBD
        {
          _id: 'cbd1',
          name: 'Huile CBD 5%',
          category: 'huiles-cbd',
          description: 'Huile CBD naturelle et bio',
          price: 29.99,
          image: 'https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=400&h=400&fit=crop'
        },
        {
          _id: 'cbd2',
          name: 'Huile CBD 10%',
          category: 'huiles-cbd',
          description: 'Huile CBD premium 10%',
          price: 49.99,
          image: 'https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=400&h=400&fit=crop'
        },
        {
          _id: 'cbd3',
          name: 'Huile CBD 15%',
          category: 'huiles-cbd',
          description: 'Huile CBD forte 15%',
          price: 69.99,
          image: 'https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=400&h=400&fit=crop'
        },
        {
          _id: 'cbd4',
          name: 'Huile CBD 20%',
          category: 'huiles-cbd',
          description: 'Huile CBD extra forte 20%',
          price: 89.99,
          image: 'https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=400&h=400&fit=crop'
        },
        // Catégorie Fleurs CBD
        {
          _id: 'cbd5',
          name: 'Fleurs CBD Amnesia',
          category: 'fleurs-cbd',
          description: 'Fleurs CBD premium 15%',
          price: 34.99,
          image: 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=400&h=400&fit=crop'
        },
        {
          _id: 'cbd6',
          name: 'Fleurs CBD OG Kush',
          category: 'fleurs-cbd',
          description: 'Fleurs CBD classique 12%',
          price: 29.99,
          image: 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=400&h=400&fit=crop'
        },
        {
          _id: 'cbd7',
          name: 'Fleurs CBD Lemon Haze',
          category: 'fleurs-cbd',
          description: 'Fleurs CBD citronnées 14%',
          price: 32.99,
          image: 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=400&h=400&fit=crop'
        },
        {
          _id: 'cbd8',
          name: 'Fleurs CBD Purple Haze',
          category: 'fleurs-cbd',
          description: 'Fleurs CBD violettes 13%',
          price: 31.99,
          image: 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=400&h=400&fit=crop'
        },
        // Catégorie Cosmétiques CBD
        {
          _id: 'cbd9',
          name: 'Crème CBD Visage',
          category: 'cosmetiques-cbd',
          description: 'Crème hydratante au CBD',
          price: 29.99,
          image: 'https://images.unsplash.com/photo-1556228720-195a672e8a03?w=400&h=400&fit=crop'
        },
        {
          _id: 'cbd10',
          name: 'Sérum CBD Anti-âge',
          category: 'cosmetiques-cbd',
          description: 'Sérum régénérant au CBD',
          price: 39.99,
          image: 'https://images.unsplash.com/photo-1556228720-195a672e8a03?w=400&h=400&fit=crop'
        },
        {
          _id: 'cbd11',
          name: 'Masque CBD',
          category: 'cosmetiques-cbd',
          description: 'Masque purifiant au CBD',
          price: 19.99,
          image: 'https://images.unsplash.com/photo-1556228720-195a672e8a03?w=400&h=400&fit=crop'
        },
        {
          _id: 'cbd12',
          name: 'Baume CBD Corps',
          category: 'cosmetiques-cbd',
          description: 'Baume apaisant au CBD',
          price: 24.99,
          image: 'https://images.unsplash.com/photo-1556228720-195a672e8a03?w=400&h=400&fit=crop'
        },
        // Catégorie Comestibles CBD
        {
          _id: 'cbd13',
          name: 'Gummies CBD',
          category: 'comestibles-cbd',
          description: 'Bonbons gélifiés au CBD',
          price: 24.99,
          image: 'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=400&h=400&fit=crop'
        },
        {
          _id: 'cbd14',
          name: 'Chocolat CBD',
          category: 'comestibles-cbd',
          description: 'Chocolat noir au CBD',
          price: 19.99,
          image: 'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=400&h=400&fit=crop'
        },
        {
          _id: 'cbd15',
          name: 'Miel CBD',
          category: 'comestibles-cbd',
          description: 'Miel naturel au CBD',
          price: 34.99,
          image: 'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=400&h=400&fit=crop'
        },
        {
          _id: 'cbd16',
          name: 'Thé CBD',
          category: 'comestibles-cbd',
          description: 'Thé vert au CBD',
          price: 14.99,
          image: 'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=400&h=400&fit=crop'
        },
        // Catégorie Accessoires
        {
          _id: 'cbd17',
          name: 'Vaporisateur CBD',
          category: 'accessoires',
          description: 'Vaporisateur portable CBD',
          price: 89.99,
          image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=400&h=400&fit=crop'
        },
        {
          _id: 'cbd18',
          name: 'Grinder CBD',
          category: 'accessoires',
          description: 'Grinder en aluminium',
          price: 19.99,
          image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=400&h=400&fit=crop'
        },
        {
          _id: 'cbd19',
          name: 'Briquet CBD',
          category: 'accessoires',
          description: 'Briquet jetable',
          price: 2.99,
          image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=400&h=400&fit=crop'
        },
        {
          _id: 'cbd20',
          name: 'Filtres CBD',
          category: 'accessoires',
          description: 'Filtres à cigarette',
          price: 4.99,
          image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=400&h=400&fit=crop'
        },
        // Catégorie Bien-être
        {
          _id: 'cbd21',
          name: 'Huile de Massage CBD',
          category: 'bien-etre',
          description: 'Huile de massage relaxante',
          price: 39.99,
          image: 'https://images.unsplash.com/photo-1515372039744-b8f02a3ae446?w=400&h=400&fit=crop'
        },
        {
          _id: 'cbd22',
          name: 'Bougie CBD',
          category: 'bien-etre',
          description: 'Bougie parfumée au CBD',
          price: 24.99,
          image: 'https://images.unsplash.com/photo-1515372039744-b8f02a3ae446?w=400&h=400&fit=crop'
        },
        {
          _id: 'cbd23',
          name: 'Diffuseur CBD',
          category: 'bien-etre',
          description: 'Diffuseur d\'huiles essentielles',
          price: 59.99,
          image: 'https://images.unsplash.com/photo-1515372039744-b8f02a3ae446?w=400&h=400&fit=crop'
        },
        {
          _id: 'cbd24',
          name: 'Coussin CBD',
          category: 'bien-etre',
          description: 'Coussin chauffant au CBD',
          price: 44.99,
          image: 'https://images.unsplash.com/photo-1515372039744-b8f02a3ae446?w=400&h=400&fit=crop'
        }
      ];
      
      // Filtrer par catégorie si spécifiée
      if (category) {
        const filtered = demoProducts.filter(product => 
          product.category?.toLowerCase() === category?.toLowerCase() ||
          product.name?.toLowerCase().includes(category?.toLowerCase()) ||
          product.description?.toLowerCase().includes(category?.toLowerCase())
        );
        setCategoryProducts(filtered);
      } else {
        setCategoryProducts(demoProducts);
      }
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
              Aucun produit trouvé pour la catégorie "{category}".
            </p>
            <p className="text-gray-400 mb-8">
              Essayez une autre catégorie ou revenez bientôt pour découvrir nos nouveautés !
            </p>
            <Link
              to="/"
              className="px-6 py-3 bg-pink-500 text-white rounded-full hover:bg-pink-600 transition-colors"
            >
              Retour à l'accueil
            </Link>
          </div>
        ) : (
          <div className="products-grid grid grid-cols-1 md:grid-cols-2 gap-4 max-w-4xl mx-auto">
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
          </div>
        )}
      </motion.div>
    </div>
  );
};

export default CategoryPage;