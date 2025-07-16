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
  const productsPerPage = 8; // Augmenté pour afficher plus de produits

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
      // Produits par défaut pour la démo avec catégories
      const demoProducts = [
        // Catégorie Vêtements
        {
          _id: 'vet1',
          name: 'T-shirt Premium',
          category: 'vetements',
          description: 'T-shirt en coton bio de haute qualité',
          price: 29.99,
          image: 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=400&h=400&fit=crop',
          rating: 4.8,
          reviews: 124
        },
        {
          _id: 'vet2',
          name: 'Jean Classic',
          category: 'vetements',
          description: 'Jean confortable et élégant',
          price: 79.99,
          image: 'https://images.unsplash.com/photo-1542272604-787c3835535d?w=400&h=400&fit=crop',
          rating: 4.6,
          reviews: 89
        },
        {
          _id: 'vet3',
          name: 'Pull Hiver',
          category: 'vetements',
          description: 'Pull chaud et doux pour l\'hiver',
          price: 59.99,
          image: 'https://images.unsplash.com/photo-1434389677669-e08b4cac3105?w=400&h=400&fit=crop',
          rating: 4.7,
          reviews: 156
        },
        {
          _id: 'vet4',
          name: 'Robe Élégante',
          category: 'vetements',
          description: 'Robe parfaite pour toutes occasions',
          price: 89.99,
          image: 'https://images.unsplash.com/photo-1515372039744-b8f02a3ae446?w=400&h=400&fit=crop',
          rating: 4.9,
          reviews: 203
        },
        // Catégorie Beauté
        {
          _id: 'bea1',
          name: 'Crème Hydratante',
          category: 'beaute',
          description: 'Crème hydratante 24h',
          price: 24.99,
          image: 'https://images.unsplash.com/photo-1556228720-195a672e8a03?w=400&h=400&fit=crop',
          rating: 4.8,
          reviews: 234
        },
        {
          _id: 'bea2',
          name: 'Sérum Anti-âge',
          category: 'beaute',
          description: 'Sérum révolutionnaire',
          price: 49.99,
          image: 'https://images.unsplash.com/photo-1571781926291-c477ebfd024b?w=400&h=400&fit=crop',
          rating: 4.9,
          reviews: 167
        },
        {
          _id: 'bea3',
          name: 'Masque Visage',
          category: 'beaute',
          description: 'Masque purifiant',
          price: 19.99,
          image: 'https://images.unsplash.com/photo-1556228578-92a0c9a8c4e5?w=400&h=400&fit=crop',
          rating: 4.6,
          reviews: 98
        },
        {
          _id: 'bea4',
          name: 'Parfum Exclusif',
          category: 'beaute',
          description: 'Fragrance unique et durable',
          price: 89.99,
          image: 'https://images.unsplash.com/photo-1541643600914-78b084683601?w=400&h=400&fit=crop',
          rating: 4.7,
          reviews: 145
        },
        // Catégorie Maison
        {
          _id: 'mai1',
          name: 'Lampe Design',
          category: 'maison',
          description: 'Lampe moderne pour votre intérieur',
          price: 129.99,
          image: 'https://images.unsplash.com/photo-1507473885765-e6ed057f782c?w=400&h=400&fit=crop',
          rating: 4.8,
          reviews: 78
        },
        {
          _id: 'mai2',
          name: 'Coussin Décoratif',
          category: 'maison',
          description: 'Coussin confortable et élégant',
          price: 39.99,
          image: 'https://images.unsplash.com/photo-1584100936595-c0654b55a2e2?w=400&h=400&fit=crop',
          rating: 4.5,
          reviews: 112
        },
        {
          _id: 'mai3',
          name: 'Vase Artisanal',
          category: 'maison',
          description: 'Vase unique fait main',
          price: 69.99,
          image: 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=400&h=400&fit=crop',
          rating: 4.7,
          reviews: 89
        },
        {
          _id: 'mai4',
          name: 'Tapis Moderne',
          category: 'maison',
          description: 'Tapis contemporain pour votre salon',
          price: 199.99,
          image: 'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=400&h=400&fit=crop',
          rating: 4.6,
          reviews: 156
        },
        // Catégorie Bijoux
        {
          _id: 'bij1',
          name: 'Bague Diamant',
          category: 'bijoux',
          description: 'Bague en or blanc avec diamant',
          price: 299.99,
          image: 'https://images.unsplash.com/photo-1605100804763-247f67b3557e?w=400&h=400&fit=crop',
          rating: 4.9,
          reviews: 67
        },
        {
          _id: 'bij2',
          name: 'Collier Or',
          category: 'bijoux',
          description: 'Collier élégant en or 18k',
          price: 189.99,
          image: 'https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?w=400&h=400&fit=crop',
          rating: 4.8,
          reviews: 134
        },
        {
          _id: 'bij3',
          name: 'Bracelet Argent',
          category: 'bijoux',
          description: 'Bracelet en argent sterling',
          price: 79.99,
          image: 'https://images.unsplash.com/photo-1611591437281-460bfbe1220a?w=400&h=400&fit=crop',
          rating: 4.6,
          reviews: 98
        },
        {
          _id: 'bij4',
          name: 'Montre Luxe',
          category: 'bijoux',
          description: 'Montre automatique de luxe',
          price: 599.99,
          image: 'https://images.unsplash.com/photo-1524592094714-0f0654e20314?w=400&h=400&fit=crop',
          rating: 4.9,
          reviews: 45
        },
        // Catégorie Tech
        {
          _id: 'tec1',
          name: 'Smartphone Pro',
          category: 'tech',
          description: 'Smartphone dernière génération',
          price: 899.99,
          image: 'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=400&h=400&fit=crop',
          rating: 4.8,
          reviews: 234
        },
        {
          _id: 'tec2',
          name: 'Casque Audio',
          category: 'tech',
          description: 'Casque sans fil haute qualité',
          price: 149.99,
          image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=400&h=400&fit=crop',
          rating: 4.7,
          reviews: 167
        },
        {
          _id: 'tec3',
          name: 'Ordinateur Portable',
          category: 'tech',
          description: 'Laptop performant pour tous usages',
          price: 1299.99,
          image: 'https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=400&h=400&fit=crop',
          rating: 4.9,
          reviews: 89
        },
        {
          _id: 'tec4',
          name: 'Tablette Ultra',
          category: 'tech',
          description: 'Tablette ultra-fine et rapide',
          price: 499.99,
          image: 'https://images.unsplash.com/photo-1544244015-0df4b3ffc6b0?w=400&h=400&fit=crop',
          rating: 4.6,
          reviews: 145
        },
        // Catégorie Sport
        {
          _id: 'spo1',
          name: 'Sneakers Running',
          category: 'sport',
          description: 'Chaussures de course professionnelles',
          price: 129.99,
          image: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=400&h=400&fit=crop',
          rating: 4.8,
          reviews: 178
        },
        {
          _id: 'spo2',
          name: 'Ballon Football',
          category: 'sport',
          description: 'Ballon officiel de compétition',
          price: 49.99,
          image: 'https://images.unsplash.com/photo-1552318965-6e6be7484ada?w=400&h=400&fit=crop',
          rating: 4.6,
          reviews: 112
        },
        {
          _id: 'spo3',
          name: 'Raquette Tennis',
          category: 'sport',
          description: 'Raquette professionnelle',
          price: 89.99,
          image: 'https://images.unsplash.com/photo-1551698618-1dfe5d97d256?w=400&h=400&fit=crop',
          rating: 4.7,
          reviews: 98
        },
        {
          _id: 'spo4',
          name: 'Vélo Fitness',
          category: 'sport',
          description: 'Vélo d\'appartement connecté',
          price: 299.99,
          image: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=400&h=400&fit=crop',
          rating: 4.5,
          reviews: 67
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
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
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