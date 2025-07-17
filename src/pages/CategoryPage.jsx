import React, { useEffect, useState } fromreact';
import[object Object] useParams, Link } fromreact-router-dom;
import { motion } fromframer-motion';
import { FiArrowLeft, FiShoppingCart, FiHeart, FiStar, FiSearch } from react-icons/fi';
import useProductStore from '../store/useProductStore';
import Loader from '../components/Loader;const CategoryPage = () => {
  const { category } = useParams();
  const { products, loading, fetchProductsByCategory } = useProductStore();
  const [searchTerm, setSearchTerm] = useState();
  const sortBy, setSortBy] = useState('name');

  useEffect(() => [object Object]
    if (category) {
      fetchProductsByCategory(category);
    }
  }, [category, fetchProductsByCategory]);

  // Données de démonstration si lAPI ne répond pas
  const demoProducts =     [object Object]   _id: 1      name: 'Produit Premium Ultra',
      description: 'Un produit exceptionnel de haute qualité avec des finitions soignées.',
      price: 299.99     originalPrice: 399.99,
      rating: 4.8      reviews:124     image: 'https://images.unsplash.com/photo-144198630091764674d600d8?w=600&h=600p,category: category
    },
    [object Object]   _id: 2 name: 'Collection Élégance',
      description: Design moderne et fonctionnalité pour une expérience incomparable.',
      price: 199.99     originalPrice: 249.99,
      rating: 4.6
      reviews: 89     image: 'https://images.unsplash.com/photo-1523275335684378986baf30?w=600&h=600p,category: category
    },
    [object Object]   _id: 3    name: 'Édition Limitée',
      description: 'Produit unique avec des matériaux nobles et un design exclusif.',
      price: 449.99     originalPrice: 549.99,
      rating: 4.9      reviews:156     image: 'https://images.unsplash.com/photo-1557404209285e560060?w=600&h=600p,category: category
    },
    [object Object]   _id: 4      name: 'Série Classique',
      description: 'Élégance intemporelle avec une qualité artisanale exceptionnelle.',
      price: 179.99     originalPrice: 229.99,
      rating: 4.7      reviews:23     image: 'https://images.unsplash.com/photo-156472354b33ff0c4443?w=600&h=600p,category: category
    }
  ];

  const productsToShow = products.length > 0 ? products : demoProducts;

  // Filtrer et trier les produits
  const filteredProducts = productsToShow
    .filter(product => 
      product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      product.description.toLowerCase().includes(searchTerm.toLowerCase())
    )
    .sort((a, b) => {
      switch (sortBy) {
        case 'price-asc':
          return a.price - b.price;
        case 'price-desc':
          return b.price - a.price;
        case 'rating':
          return b.rating - a.rating;
        case 'name:
        default:
          return a.name.localeCompare(b.name);
      }
    });

  const getCategoryDisplayName = (categorySlug) => {
    const categoryMap = [object Object]     vetements': Vêtements,
     beaute:Beauté,
     maison:Maison,
     bijoux:Bijoux,   tech: 'Tech',
     sport:Sport
    };
    return categoryMap[categorySlug] || categorySlug.charAt(0rCase() + categorySlug.slice(1);
  };

  const handleCommander = (productId) => {
    // Lien externe vers une plateforme de commande
    window.open('https://www.amazon.fr', _blank');
  };

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
        {/* Header avec bouton retour */}
        <div className="mb-8>
          <Link 
            to="/category"
            className=inline-flex items-center text-pink-400over:text-pink-300 transition-colors"
          >
            <FiArrowLeft className="mr-2/>
            Retour aux catégories
          </Link>
        </div>

     [object Object]/* Titre de la catégorie */}
        <div className="text-center mb-8     <h1 className=font-custom text-4xl md:text-5xl font-bold bg-gradient-to-r from-pink-40ia-pink-300o-purple-400 bg-clip-text text-transparent mb-4>
      [object Object]getCategoryDisplayName(category)}
          </h1>
          <p className=text-xl text-gray-20           {filteredProducts.length} produit{filteredProducts.length > 1?s} trouvé{filteredProducts.length > 1 ? 's' :}      </p>
        </div>

        {/* Barre de recherche et tri */}
        <div className=mb-8 space-y-4        {/* Recherche */}
          <div className="relative>         <FiSearch className="absolute left-4 top-1/2 transform -translate-y-1text-gray-40 />            <input
              type="text"
              placeholder="Rechercher dans cette catégorie..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className=w-full pl-12 pr-4 py-3 bg-gray-8000rop-blur-sm border border-gray-70050nded-xl text-white placeholder-gray-400focus:outline-none focus:border-pink-500 transition-colors"
            />
          </div>

          {/* Tri */}
          <div className="flex justify-end">
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className=px-4 py-2 bg-gray-8000rop-blur-sm border border-gray-70050nded-lg text-white focus:outline-none focus:border-pink-500 transition-colors"
            >
              <option value="name">Nom A-Z</option>
              <option value="price-asc>Prix croissant</option>
              <option value="price-desc>Prix décroissant</option>
              <option value="rating>Meilleures notes</option>
            </select>
          </div>
        </div>

        {/* Grille des produits */}
        {filteredProducts.length >0? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6           {filteredProducts.map((product, index) => (
              <motion.div
                key={product._id}
                initial={{ opacity: 0, y: 30 }}
                animate=[object Object]{ opacity: 1, y: 0 }}
                transition={{ duration:0.6, delay: index * 0.1}
              >
                <div className="bg-gray-8000rop-blur-sm border border-gray-700unded-2xl overflow-hidden hover:bg-gray-800/70 transition-all duration-30er:transform hover:scale-15hover:shadow-xl">
                  {/* Image du produit */}
                  <div className="aspect-square relative overflow-hidden">
                    <img
                      src={product.image}
                      alt={product.name}
                      className="w-full h-full object-cover hover:scale-110 transition-transform duration-300"
                    />
                    <div className="absolute inset-0gradient-to-t from-black/50o-transparent" />
                    
                    {/* Boutons d'action */}
                    <div className="absolute top-4 right-4 space-y-2">
                      <button className="w-10-white/20op-blur-sm rounded-full flex items-center justify-center text-white hover:bg-white/30 transition-colors">
                        <FiHeart size={18} />
                      </button>
                      <button className="w-10-white/20op-blur-sm rounded-full flex items-center justify-center text-white hover:bg-white/30 transition-colors">
                        <FiShoppingCart size={18} />
                      </button>
                    </div>
                  </div>

                  {/* Contenu */}
                  <div className="p-4">
                    <Link to={`/product/${product._id}`}>
                      <h3 className="text-lg font-semibold text-white hover:text-pink-300 transition-colors mb-2">
                        {product.name}
                      </h3>
                    </Link>
                    
                    <p className="text-gray-300 text-sm mb-3                   {product.description}
                    </p>

                    {/* Rating */}
                    <div className=flex items-center gap-2 mb-3">
                      <div className=flex items-center">
                        {[...Array(5)].map((_, i) => (
                          <FiStar 
                            key={i}
                            size={14}
                            className={i < Math.floor(product.rating) ? 'text-yellow-40 fill-current :text-gray-400                   />
                        ))}
                      </div>
                      <span className="text-gray-400 text-xs">
                      [object Object]product.rating} ({product.reviews})
                      </span>
                    </div>

                    {/* Prix */}
                    <div className=flex items-center justify-between">
                      <div className=flex items-center gap-2">
                        <span className=text-xl font-bold text-pink-400">
                          {product.price}€
                        </span>
                        {product.originalPrice > product.price && (
                          <span className=text-sm text-gray-40                   {product.originalPrice}€
                          </span>
                        )}
                      </div>
                      
                      <button
                        onClick={() => handleCommander(product._id)}
                        className=px-42ink-500 text-white rounded-lg hover:bg-pink-600 transition-colors text-sm"
                      >
                        Commander
                      </button>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        ) : (
          /* Aucun produit trouvé */
          <div className=text-center py-12>
            <div className="text-gray-40-4>
              Aucun produit trouvé dans cette catégorie
            </div>
            <Link
              to="/category"
              className=inline-flex items-center px-63ink-500 text-white rounded-lg hover:bg-pink-600 transition-colors"
            >
              Retour aux catégories
            </Link>
          </div>
        )}
      </motion.div>
    </div>
  );
};

export default CategoryPage;