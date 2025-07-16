import React, { useState } from 'react';

const ProductsPage = () => {
  const [products, setProducts] = useState([
    {
      id: 1,
      name: 'T-shirt Premium',
      category: 'Vêtements',
      prices: [
        { name: 'Prix standard', price: 29.99, originalPrice: 39.99, discount: 25 },
        { name: 'Prix premium', price: 34.99, originalPrice: 44.99, discount: 22 }
      ],
      stock: 45,
      status: 'En stock',
      image: 'https://via.placeholder.com/50'
    },
    {
      id: 2,
      name: 'Sneakers Sport',
      category: 'Chaussures',
      prices: [
        { name: 'Prix standard', price: 89.99, originalPrice: 109.99, discount: 18 },
        { name: 'Prix premium', price: 99.99, originalPrice: 119.99, discount: 17 }
      ],
      stock: 12,
      status: 'En stock',
      image: 'https://via.placeholder.com/50'
    },
    {
      id: 3,
      name: 'Sac à dos Vintage',
      category: 'Accessoires',
      prices: [
        { name: 'Prix standard', price: 49.99, originalPrice: 59.99, discount: 17 }
      ],
      stock: 0,
      status: 'Rupture',
      image: 'https://via.placeholder.com/50'
    },
    {
      id: 4,
      name: 'Montre Élégante',
      category: 'Accessoires',
      prices: [
        { name: 'Prix standard', price: 199.99, originalPrice: 249.99, discount: 20 },
        { name: 'Prix premium', price: 229.99, originalPrice: 279.99, discount: 18 },
        { name: 'Prix VIP', price: 259.99, originalPrice: 309.99, discount: 16 }
      ],
      stock: 8,
      status: 'En stock',
      image: 'https://via.placeholder.com/50'
    }
  ]);

  const [showAddModal, setShowAddModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [editingProduct, setEditingProduct] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');

  const statusColors = {
    'En stock': 'bg-green-100 text-green-800',
    'Rupture': 'bg-red-100 text-red-800',
    'Faible stock': 'bg-yellow-100 text-yellow-800'
  };

  const filteredProducts = products.filter(product =>
    product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    product.category.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleDelete = (id) => {
    setProducts(products.filter(product => product.id !== id));
  };

  const handleEdit = (product) => {
    setEditingProduct(product);
    setShowEditModal(true);
  };

  const handleSavePrices = (productId, newPrices) => {
    setProducts(products.map(product => 
      product.id === productId 
        ? { ...product, prices: newPrices }
        : product
    ));
    setShowEditModal(false);
    setEditingProduct(null);
  };

  return (
    <div className="space-y-6">
      {/* En-tête */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Gestion des produits</h1>
          <p className="text-gray-600">Gérez votre catalogue de produits</p>
        </div>
        <button
          onClick={() => setShowAddModal(true)}
          className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition-colors"
        >
          + Ajouter un produit
        </button>
      </div>

      {/* Filtres et recherche */}
      <div className="bg-white p-4 rounded-lg shadow">
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="flex-1">
            <input
              type="text"
              placeholder="Rechercher un produit..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <select className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500">
            <option value="">Toutes les catégories</option>
            <option value="vetements">Vêtements</option>
            <option value="chaussures">Chaussures</option>
            <option value="accessoires">Accessoires</option>
          </select>
          <select className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500">
            <option value="">Tous les statuts</option>
            <option value="en-stock">En stock</option>
            <option value="rupture">Rupture</option>
            <option value="faible-stock">Faible stock</option>
          </select>
        </div>
      </div>

      {/* Liste des produits */}
      <div className="bg-white shadow rounded-lg overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Produit
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Catégorie
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Prix
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Stock
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Statut
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredProducts.map((product) => (
                <tr key={product.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <div className="flex-shrink-0 h-10 w-10">
                        <img className="h-10 w-10 rounded-md" src={product.image} alt={product.name} />
                      </div>
                      <div className="ml-4">
                        <div className="text-sm font-medium text-gray-900">{product.name}</div>
                        <div className="text-sm text-gray-500">ID: {product.id}</div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">{product.category}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm font-medium text-gray-900">
                      {product.prices.length > 1 ? (
                        <div className="space-y-1">
                          <div className="text-xs text-gray-500">{product.prices.length} options</div>
                          <div className="text-sm font-medium">
                            €{Math.min(...product.prices.map(p => p.price))} - €{Math.max(...product.prices.map(p => p.price))}
                          </div>
                        </div>
                      ) : (
                        <div>€{product.prices[0].price}</div>
                      )}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">{product.stock}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${statusColors[product.status]}`}>
                      {product.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    <div className="flex space-x-2">
                      <button 
                        onClick={() => handleEdit(product)}
                        className="text-blue-600 hover:text-blue-900"
                      >
                        Modifier
                      </button>
                      <button 
                        onClick={() => handleDelete(product.id)}
                        className="text-red-600 hover:text-red-900"
                      >
                        Supprimer
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Statistiques */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-white p-4 rounded-lg shadow">
          <div className="flex items-center">
            <div className="p-2 bg-blue-100 rounded-lg">
              <span className="text-blue-600 text-lg">📦</span>
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-500">Total produits</p>
              <p className="text-2xl font-bold text-gray-900">{products.length}</p>
            </div>
          </div>
        </div>
        <div className="bg-white p-4 rounded-lg shadow">
          <div className="flex items-center">
            <div className="p-2 bg-green-100 rounded-lg">
              <span className="text-green-600 text-lg">✅</span>
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-500">En stock</p>
              <p className="text-2xl font-bold text-gray-900">
                {products.filter(p => p.status === 'En stock').length}
              </p>
            </div>
          </div>
        </div>
        <div className="bg-white p-4 rounded-lg shadow">
          <div className="flex items-center">
            <div className="p-2 bg-red-100 rounded-lg">
              <span className="text-red-600 text-lg">⚠️</span>
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-500">Rupture</p>
              <p className="text-2xl font-bold text-gray-900">
                {products.filter(p => p.status === 'Rupture').length}
              </p>
            </div>
          </div>
        </div>
        <div className="bg-white p-4 rounded-lg shadow">
          <div className="flex items-center">
            <div className="p-2 bg-yellow-100 rounded-lg">
              <span className="text-yellow-600 text-lg">💰</span>
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-500">Valeur totale</p>
              <p className="text-2xl font-bold text-gray-900">
                €{products.reduce((sum, p) => sum + (Math.min(...p.prices.map(price => price.price)) * p.stock), 0).toFixed(2)}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Modal d'édition des prix */}
      {showEditModal && editingProduct && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-2xl mx-4">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-semibold">Modifier les prix - {editingProduct.name}</h3>
              <button 
                onClick={() => setShowEditModal(false)}
                className="text-gray-500 hover:text-gray-700"
              >
                ✕
              </button>
            </div>
            
            <div className="space-y-4">
              {editingProduct.prices.map((price, index) => (
                <div key={index} className="border border-gray-200 rounded-lg p-4">
                  <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Nom du prix
                      </label>
                      <input
                        type="text"
                        value={price.name}
                        onChange={(e) => {
                          const newPrices = [...editingProduct.prices];
                          newPrices[index].name = e.target.value;
                          setEditingProduct({...editingProduct, prices: newPrices});
                        }}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Prix actuel
                      </label>
                      <input
                        type="number"
                        step="0.01"
                        value={price.price}
                        onChange={(e) => {
                          const newPrices = [...editingProduct.prices];
                          newPrices[index].price = parseFloat(e.target.value);
                          setEditingProduct({...editingProduct, prices: newPrices});
                        }}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Prix original
                      </label>
                      <input
                        type="number"
                        step="0.01"
                        value={price.originalPrice}
                        onChange={(e) => {
                          const newPrices = [...editingProduct.prices];
                          newPrices[index].originalPrice = parseFloat(e.target.value);
                          setEditingProduct({...editingProduct, prices: newPrices});
                        }}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Réduction (%)
                      </label>
                      <input
                        type="number"
                        value={price.discount}
                        onChange={(e) => {
                          const newPrices = [...editingProduct.prices];
                          newPrices[index].discount = parseInt(e.target.value);
                          setEditingProduct({...editingProduct, prices: newPrices});
                        }}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                    </div>
                  </div>
                  <button
                    onClick={() => {
                      const newPrices = editingProduct.prices.filter((_, i) => i !== index);
                      setEditingProduct({...editingProduct, prices: newPrices});
                    }}
                    className="mt-2 text-red-600 hover:text-red-800 text-sm"
                  >
                    Supprimer ce prix
                  </button>
                </div>
              ))}
              
              <button
                onClick={() => {
                  const newPrices = [...editingProduct.prices, {
                    name: 'Nouveau prix',
                    price: 0,
                    originalPrice: 0,
                    discount: 0
                  }];
                  setEditingProduct({...editingProduct, prices: newPrices});
                }}
                className="w-full py-2 border-2 border-dashed border-gray-300 rounded-lg text-gray-600 hover:border-gray-400 hover:text-gray-800 transition-colors"
              >
                + Ajouter un prix
              </button>
            </div>
            
            <div className="flex justify-end space-x-3 mt-6">
              <button
                onClick={() => setShowEditModal(false)}
                className="px-4 py-2 text-gray-600 border border-gray-300 rounded-md hover:bg-gray-50"
              >
                Annuler
              </button>
              <button
                onClick={() => handleSavePrices(editingProduct.id, editingProduct.prices)}
                className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
              >
                Sauvegarder
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProductsPage;