import React, { useState, useEffect } from 'react';
import { categoryService } from '../services/api';
import toast from 'react-hot-toast';

const CategoriesPage = () => {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showAddModal, setShowAddModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('');

  // État pour le formulaire
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    parent: '',
    isActive: true,
    isFeatured: false,
    sortOrder: 0,
    metaTitle: '',
    metaDescription: '',
    image: null,
    imagePreview: null
  });

  // Charger les catégories
  const loadCategories = async () => {
    try {
      setLoading(true);
      setError(null);
      
      const response = await categoryService.getAllCategories();
      setCategories(response.data.categories || []);
    } catch (err) {
      console.error('Erreur:', err);
      
      if (err.code === 'ERR_NETWORK' || err.code === 'ECONNREFUSED') {
        setError('Impossible de se connecter au serveur. Vérifiez que l\'API est démarrée.');
      } else if (err.response?.status === 404) {
        setError('Aucune catégorie trouvée.');
      } else {
        setError('Erreur lors du chargement des catégories: ' + (err.response?.data?.message || err.message));
      }
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadCategories();
  }, []);

  // Gérer le changement d'image
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFormData(prev => ({
        ...prev,
        image: file,
        imagePreview: URL.createObjectURL(file)
      }));
    }
  };

  // Réinitialiser le formulaire
  const resetForm = () => {
    setFormData({
      name: '',
      description: '',
      parent: '',
      isActive: true,
      isFeatured: false,
      sortOrder: 0,
      metaTitle: '',
      metaDescription: '',
      image: null,
      imagePreview: null
    });
  };

  // Ouvrir le modal d'ajout
  const handleAddClick = () => {
    resetForm();
    setShowAddModal(true);
  };

  // Ouvrir le modal d'édition
  const handleEditClick = (category) => {
    setSelectedCategory(category);
    setFormData({
      name: category.name,
      description: category.description || '',
      parent: category.parent?._id || '',
      isActive: category.isActive,
      isFeatured: category.isFeatured,
      sortOrder: category.sortOrder || 0,
      metaTitle: category.metaTitle || '',
      metaDescription: category.metaDescription || '',
      image: null,
      imagePreview: category.image || null
    });
    setShowEditModal(true);
  };

  // Soumettre le formulaire
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    try {
      const formDataToSend = new FormData();
      formDataToSend.append('name', formData.name);
      formDataToSend.append('description', formData.description);
      formDataToSend.append('isActive', formData.isActive);
      formDataToSend.append('isFeatured', formData.isFeatured);
      formDataToSend.append('sortOrder', formData.sortOrder);
      formDataToSend.append('metaTitle', formData.metaTitle);
      formDataToSend.append('metaDescription', formData.metaDescription);
      
      if (formData.parent) {
        formDataToSend.append('parent', formData.parent);
      }
      
      if (formData.image) {
        formDataToSend.append('image', formData.image);
      }

      if (showEditModal && selectedCategory) {
        await categoryService.updateCategory(selectedCategory._id, formDataToSend);
        toast.success('Catégorie mise à jour avec succès');
      } else {
        await categoryService.createCategory(formDataToSend);
        toast.success('Catégorie créée avec succès');
      }

      setShowAddModal(false);
      setShowEditModal(false);
      resetForm();
      loadCategories();
    } catch (err) {
      const errorMessage = err.response?.data?.message || 'Erreur lors de la sauvegarde de la catégorie';
      setError(errorMessage);
      toast.error(errorMessage);
      console.error('Erreur:', err);
    }
  };

  // Supprimer une catégorie
  const handleDelete = async (id) => {
    if (window.confirm('Êtes-vous sûr de vouloir supprimer cette catégorie ?')) {
      try {
        await categoryService.deleteCategory(id);
        toast.success('Catégorie supprimée avec succès');
        loadCategories();
      } catch (err) {
        const errorMessage = err.response?.data?.message || 'Erreur lors de la suppression de la catégorie';
        setError(errorMessage);
        toast.error(errorMessage);
        console.error('Erreur:', err);
      }
    }
  };

  // Activer/Désactiver une catégorie
  const handleToggleStatus = async (id) => {
    try {
      await categoryService.toggleStatus(id);
      loadCategories();
    } catch (err) {
      setError('Erreur lors du changement de statut');
      console.error('Erreur:', err);
    }
  };

  // Filtrer les catégories
  const filteredCategories = categories.filter(category => {
    const matchesSearch = category.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         (category.description && category.description.toLowerCase().includes(searchTerm.toLowerCase()));
    const matchesStatus = !filterStatus || 
                         (filterStatus === 'active' && category.isActive) ||
                         (filterStatus === 'inactive' && !category.isActive);
    
    return matchesSearch && matchesStatus;
  });

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="loader"></div>
      </div>
    );
  }

  return (
    <div className="space-y-6 animate-fade-in">
      {/* En-tête */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-white mb-2">Gestion des catégories</h1>
          <p className="text-gray-400">Gérez les catégories de votre boutique</p>
        </div>
        <button
          onClick={handleAddClick}
          className="btn-primary flex items-center gap-2"
        >
          <span className="text-lg">+</span>
          Ajouter une catégorie
        </button>
      </div>

      {/* Message d'erreur */}
      {error && (
        <div className="bg-red-900 border border-red-700 text-red-200 px-4 py-3 rounded-lg shadow-lg">
          {error}
        </div>
      )}

      {/* Filtres et recherche */}
      <div className="card">
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="flex-1">
            <input
              type="text"
              placeholder="Rechercher une catégorie..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="input-field"
            />
          </div>
          <select 
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value)}
            className="input-field"
          >
            <option value="">Tous les statuts</option>
            <option value="active">Actives</option>
            <option value="inactive">Inactives</option>
          </select>
        </div>
      </div>

      {/* Liste des catégories */}
      <div className="table-container">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-700">
            <thead>
              <tr>
                <th className="table-header px-6 py-3 text-left">
                  Catégorie
                </th>
                <th className="table-header px-6 py-3 text-left">
                  Description
                </th>
                <th className="table-header px-6 py-3 text-left">
                  Parent
                </th>
                <th className="table-header px-6 py-3 text-left">
                  Statut
                </th>
                <th className="table-header px-6 py-3 text-left">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-700">
              {filteredCategories.map((category) => (
                <tr key={category._id} className="table-row">
                  <td className="table-cell">
                    <div className="flex items-center">
                      {category.image && (
                        <div className="flex-shrink-0 h-10 w-10">
                          <img 
                            className="h-10 w-10 rounded-md object-cover border border-gray-600" 
                            src={category.image} 
                            alt={category.name} 
                          />
                        </div>
                      )}
                      <div className="ml-4">
                        <div className="text-sm font-medium text-white">{category.name}</div>
                        <div className="text-sm text-gray-400">Ordre: {category.sortOrder}</div>
                      </div>
                    </div>
                  </td>
                  <td className="table-cell">
                    <div className="text-sm text-gray-300">
                      {category.description ? (
                        category.description.length > 50 
                          ? `${category.description.substring(0, 50)}...` 
                          : category.description
                      ) : (
                        <span className="text-gray-500">Aucune description</span>
                      )}
                    </div>
                  </td>
                  <td className="table-cell">
                    <div className="text-sm text-gray-300">
                      {category.parent ? category.parent.name : 'Catégorie principale'}
                    </div>
                  </td>
                  <td className="table-cell">
                    <span className={category.isActive ? 'status-active' : 'status-inactive'}>
                      {category.isActive ? 'Active' : 'Inactive'}
                    </span>
                  </td>
                  <td className="table-cell">
                    <div className="flex space-x-3">
                      <button 
                        onClick={() => handleEditClick(category)}
                        className="text-blue-400 hover:text-blue-300 transition-colors"
                      >
                        Modifier
                      </button>
                      <button 
                        onClick={() => handleToggleStatus(category._id)}
                        className="text-yellow-400 hover:text-yellow-300 transition-colors"
                      >
                        {category.isActive ? 'Désactiver' : 'Activer'}
                      </button>
                      <button 
                        onClick={() => handleDelete(category._id)}
                        className="text-red-400 hover:text-red-300 transition-colors"
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

      {/* Modal d'ajout/édition */}
      {(showAddModal || showEditModal) && (
        <div className="modal-overlay">
          <div className="modal-content animate-bounce-in">
            <div className="mt-3">
              <h3 className="text-xl font-bold text-white mb-6">
                {showAddModal ? 'Ajouter une catégorie' : 'Modifier la catégorie'}
              </h3>
              
              <form onSubmit={handleSubmit} className="space-y-4">
                {/* Nom */}
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">Nom *</label>
                  <input
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({...formData, name: e.target.value})}
                    className="input-field"
                  />
                </div>

                {/* Description */}
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">Description</label>
                  <textarea
                    value={formData.description}
                    onChange={(e) => setFormData({...formData, description: e.target.value})}
                    rows="3"
                    className="input-field"
                  />
                </div>

                {/* Catégorie parent */}
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">Catégorie parent</label>
                  <select
                    value={formData.parent}
                    onChange={(e) => setFormData({...formData, parent: e.target.value})}
                    className="input-field"
                  >
                    <option value="">Aucune (catégorie principale)</option>
                    {categories
                      .filter(cat => cat._id !== selectedCategory?._id)
                      .map(cat => (
                        <option key={cat._id} value={cat._id}>
                          {cat.name}
                        </option>
                      ))
                    }
                  </select>
                </div>

                {/* Image */}
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">Image de fond</label>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleImageChange}
                    className="input-field"
                  />
                  {formData.imagePreview && (
                    <div className="mt-2">
                      <img 
                        src={formData.imagePreview} 
                        alt="Aperçu" 
                        className="h-20 w-20 object-cover rounded-md border border-gray-600"
                      />
                    </div>
                  )}
                </div>

                {/* Ordre de tri */}
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">Ordre de tri</label>
                  <input
                    type="number"
                    value={formData.sortOrder}
                    onChange={(e) => setFormData({...formData, sortOrder: parseInt(e.target.value) || 0})}
                    className="input-field"
                  />
                </div>

                {/* Options */}
                <div className="space-y-3">
                  <label className="flex items-center">
                    <input
                      type="checkbox"
                      checked={formData.isActive}
                      onChange={(e) => setFormData({...formData, isActive: e.target.checked})}
                      className="rounded border-gray-600 bg-gray-800 text-blue-600 focus:ring-blue-500"
                    />
                    <span className="ml-2 text-sm text-gray-300">Active</span>
                  </label>
                  <label className="flex items-center">
                    <input
                      type="checkbox"
                      checked={formData.isFeatured}
                      onChange={(e) => setFormData({...formData, isFeatured: e.target.checked})}
                      className="rounded border-gray-600 bg-gray-800 text-blue-600 focus:ring-blue-500"
                    />
                    <span className="ml-2 text-sm text-gray-300">Mise en avant</span>
                  </label>
                </div>

                {/* Boutons */}
                <div className="flex justify-end space-x-3 pt-6">
                  <button
                    type="button"
                    onClick={() => {
                      setShowAddModal(false);
                      setShowEditModal(false);
                      resetForm();
                    }}
                    className="btn-secondary"
                  >
                    Annuler
                  </button>
                  <button
                    type="submit"
                    className="btn-primary"
                  >
                    {showAddModal ? 'Créer' : 'Modifier'}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CategoriesPage;