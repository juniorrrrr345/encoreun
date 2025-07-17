import React, { useEffect, useState } fromreact';
import[object Object] useParams, Link } fromreact-router-dom;
import { motion } fromframer-motion';
import[object Object]FiShoppingCart, FiHeart, FiStar, FiChevronLeft, FiChevronRight } from react-icons/fi';
import useProductStore from '../store/useProductStore';
import Loader from '../components/Loader;const CategoryPage = () => {
  const { category } = useParams();
  const { products, loading, fetchProducts } = useProductStore();
  const [categoryProducts, setCategoryProducts] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const productsPerPage = 2
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
        [object Object]
          _id: '1,
          name: 'Produit Premium',
          description: 'Un produit exceptionnel de haute qualité,
          price: 89.99,
          image: 'https://images.unsplash.com/photo-144198630091764674d600d8?w=400&h=400&fit=crop',
          rating: 4.8,
          reviews: 124
        },
        [object Object]
          _id: '2,
          name: 'Collection Exclusive',
          description: 'Édition limitée avec des matériaux nobles,
          price:149.99,
          image: 'https://images.unsplash.com/photo-1523275335684378986baf30?w=400&h=400&fit=crop',
          rating: 4.9,
          reviews: 89
        },
        [object Object]
          _id: '3,
          name: Design Moderne',
          description: 'Style contemporain et élégant,
          price:199.99,
          image: 'https://images.unsplash.com/photo-1557404209285e560060?w=400&h=400&fit=crop',
          rating: 4.7,
          reviews: 156
        },
        [object Object]
          _id: '4,
          name:Édition Spéciale',
          description: 'Produit unique avec finitions soignées,
          price:299.99,
          image: 'https://images.unsplash.com/photo-156472354b33ff0c4443?w=400&h=400&fit=crop',
          rating: 5.0,
          reviews: 67
        },
        [object Object]
          _id: '5,
          name: 'Collection Classic',
          description:Intemporel et raffiné,
          price:179.99,
          image: 'https://images.unsplash.com/photo-15422910267eec264c27ff?w=400&h=400&fit=crop',
          rating: 4.6,
          reviews: 203
        },
        [object Object]
          _id: '6,
          name: 'Designer Series',
          description: 'Création exclusive de nos designers,
          price:399.99,
          image: 'https://images.unsplash.com/photo-15261703758854d8ecf779?w=400&h=400&fit=crop',
          rating: 4.9,
          reviews: 45      }
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
      <div className=min-h-screen flex items-center justify-center>      <Loader size="large />
      </div>
    );
  }

  return (
    <div className=min-h-screen px-6-8
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate=[object Object]{ opacity: 1        transition={{ duration: 0.6 }}
        className=max-w-6 mx-auto"
      >
        {/* Header */}
        <div className=text-center mb-12     <h1 className=font-custom text-4xl md:text-5xl font-bold bg-gradient-to-r from-pink-400o-purple-400 bg-clip-text text-transparent mb-4 capitalize">
            {category}
          </h1>
          <p className=text-xl text-gray-20>            Découvrez notre sélection de produits dans la catégorie {category}
          </p>
        </div>

        {/* Products Grid */}
        {currentProducts.length ===0? (
          <div className=text-center py-16      <p className="text-gray-30-6>
              Aucun produit disponible dans cette catégorie pour le moment.
            </p>
            <p className="text-gray-40>
              Revenez bientôt pour découvrir nos nouveautés !
            </p>
          </div>
        ) : (
          <>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6>          {currentProducts.map((product, index) => (
                <motion.div
                  key={product._id}
                  initial={{ opacity: 0, y: 30 }}
                  animate=[object Object]{ opacity: 1, y: 0 }}
                  transition={{ duration:0.6, delay: index * 0.1 }}
                  className="bg-gray-8000rop-blur-sm border border-gray-700unded-2xl overflow-hidden hover:bg-gray-800/70 transition-all duration-30er:transform hover:scale-105 group"
                >
                  {/* Product Image */}
                  <div className="aspect-square relative overflow-hidden">
                  [object Object]product.image ? (
                      <img 
                        src={product.image} 
                        alt={product.name}
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                      />
                    ) : (
                      <div className="w-full h-full bg-gradient-to-br from-pink-500/20purple-500 flex items-center justify-center">
                        <div className="text-gray-400 text-4xl">📦</div>
                      </div>
                    )}
                    
                    {/* Overlay with actions */}
                    <div className="absolute inset-0bg-black/0 group-hover:bg-black/20 transition-all duration-300 flex items-center justify-center opacity-0 group-hover:opacity-100">
                      <div className="flex gap-2">
                        <Link
                          to={`/product/${product._id}`}
                          className=w-10g-pink-500 rounded-full flex items-center justify-center text-white hover:bg-pink-600 transition-colors"
                        >
                          <FiShoppingCart size={18} />
                        </Link>
                        <button className="w-10-white/20op-blur-sm rounded-full flex items-center justify-center text-white hover:bg-white/30 transition-colors">
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
                    <p className="text-gray-300 text-sm mb-3                   {product.description}
                    </p>
                    
                    {/* Rating */}
                    {product.rating && (
                      <div className=flex items-center gap-1 mb-3">
                        <div className=flex items-center">
                          {[...Array(5)].map((_, i) => (
                            <FiStar 
                              key={i}
                              size={14}
                              className={i < Math.floor(product.rating) ? 'text-yellow-40 fill-current :text-gray-400                   />
                          ))}
                        </div>
                        <span className=text-xs text-gray-400">
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
                        className=px-42ink-50text-white text-sm rounded-full hover:bg-pink-600 transition-colors"
                      >
                        Voir détails
                      </Link>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
            
        [object Object]/* Pagination */}
            {totalPages > 1 && (
              <div className="flex justify-center items-center gap-4 mt-8>
                <button
                  onClick={() => setCurrentPage(Math.max(1 currentPage - 1))}
                  disabled={currentPage === 1}
                  className=flex items-center gap-2 px-4 py-2 bg-gray-800text-white rounded-lg hover:bg-gray-7000 disabled:opacity-50isabled:cursor-not-allowed transition-colors"
                >
                  <FiChevronLeft size={20} />
                  Précédent
                </button>
                
                <div className="flex gap-2">
                  {[...Array(totalPages)].map((_, index) => (
                    <button
                      key={index}
                      onClick={() => setCurrentPage(index + 1)}
                      className={`w-1010nded-lg flex items-center justify-center transition-colors ${
                        currentPage === index + 1
                          ?bg-pink-500 text-white'
                          : 'bg-gray-800ext-gray-300 hover:bg-gray-700/50'
                      }`}
                    >
                      {index + 1}
                    </button>
                  ))}
                </div>
                
                <button
                  onClick={() => setCurrentPage(Math.min(totalPages, currentPage + 1))}
                  disabled={currentPage === totalPages}
                  className=flex items-center gap-2 px-4 py-2 bg-gray-800text-white rounded-lg hover:bg-gray-7000 disabled:opacity-50isabled:cursor-not-allowed transition-colors"
                >
                  Suivant
                  <FiChevronRight size={20} />
                </button>
              </div>
            )}
          </>
        )}
      </motion.div>
    </div>
  );
};

export default CategoryPage;