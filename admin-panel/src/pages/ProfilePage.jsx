import React, { useState } from 'react';

const ProfilePage = () => {
  const [profile, setProfile] = useState({
    name: 'Admin User',
    email: 'admin@boutique.com',
    role: 'Administrateur',
    avatar: 'https://via.placeholder.com/100',
    phone: '+33 1 23 45 67 89',
    address: '123 Rue de la Paix, 75001 Paris, France',
    joinDate: '2023-01-15'
  });

  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState(profile);

  const handleSave = () => {
    setProfile(formData);
    setIsEditing(false);
  };

  const handleCancel = () => {
    setFormData(profile);
    setIsEditing(false);
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const stats = [
    { label: 'Commandes traitées', value: '156', icon: '📦' },
    { label: 'Produits gérés', value: '89', icon: '🛍️' },
    { label: 'Clients servis', value: '1,234', icon: '👥' },
    { label: 'Chiffre d\'affaires', value: '€12,345', icon: '💰' }
  ];

  const recentActivity = [
    { action: 'Commande #1234 traitée', time: 'Il y a 2 heures', icon: '✅' },
    { action: 'Nouveau produit ajouté', time: 'Il y a 4 heures', icon: '➕' },
    { action: 'Stock mis à jour', time: 'Il y a 6 heures', icon: '📊' },
    { action: 'Client contacté', time: 'Il y a 1 jour', icon: '📞' }
  ];

  return (
    <div className="space-y-6">
      {/* En-tête */}
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Profil utilisateur</h1>
        <p className="text-gray-600">Gérez vos informations personnelles</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Informations principales */}
        <div className="lg:col-span-2">
          <div className="bg-white shadow rounded-lg">
            <div className="px-4 py-5 sm:p-6">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-lg leading-6 font-medium text-gray-900">
                  Informations personnelles
                </h3>
                {!isEditing ? (
                  <button
                    onClick={() => setIsEditing(true)}
                    className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition-colors"
                  >
                    Modifier
                  </button>
                ) : (
                  <div className="flex space-x-2">
                    <button
                      onClick={handleSave}
                      className="bg-green-600 text-white px-4 py-2 rounded-md hover:bg-green-700 transition-colors"
                    >
                      Sauvegarder
                    </button>
                    <button
                      onClick={handleCancel}
                      className="bg-gray-300 text-gray-700 px-4 py-2 rounded-md hover:bg-gray-400 transition-colors"
                    >
                      Annuler
                    </button>
                  </div>
                )}
              </div>

              <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Nom complet
                  </label>
                  {isEditing ? (
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  ) : (
                    <p className="text-sm text-gray-900">{profile.name}</p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Email
                  </label>
                  {isEditing ? (
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  ) : (
                    <p className="text-sm text-gray-900">{profile.email}</p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Téléphone
                  </label>
                  {isEditing ? (
                    <input
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  ) : (
                    <p className="text-sm text-gray-900">{profile.phone}</p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Rôle
                  </label>
                  <p className="text-sm text-gray-900">{profile.role}</p>
                </div>

                <div className="sm:col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Adresse
                  </label>
                  {isEditing ? (
                    <textarea
                      name="address"
                      value={formData.address}
                      onChange={handleChange}
                      rows={3}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  ) : (
                    <p className="text-sm text-gray-900">{profile.address}</p>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Avatar et infos rapides */}
          <div className="bg-white shadow rounded-lg p-6">
            <div className="text-center">
              <img
                className="mx-auto h-24 w-24 rounded-full"
                src={profile.avatar}
                alt={profile.name}
              />
              <h3 className="mt-4 text-lg font-medium text-gray-900">{profile.name}</h3>
              <p className="text-sm text-gray-500">{profile.role}</p>
              <p className="text-xs text-gray-400 mt-1">
                Membre depuis {new Date(profile.joinDate).toLocaleDateString('fr-FR')}
              </p>
            </div>
          </div>

          {/* Statistiques */}
          <div className="bg-white shadow rounded-lg p-6">
            <h3 className="text-lg font-medium text-gray-900 mb-4">Statistiques</h3>
            <div className="space-y-4">
              {stats.map((stat) => (
                <div key={stat.label} className="flex items-center justify-between">
                  <div className="flex items-center">
                    <span className="text-lg mr-3">{stat.icon}</span>
                    <span className="text-sm text-gray-600">{stat.label}</span>
                  </div>
                  <span className="text-sm font-medium text-gray-900">{stat.value}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Activité récente */}
          <div className="bg-white shadow rounded-lg p-6">
            <h3 className="text-lg font-medium text-gray-900 mb-4">Activité récente</h3>
            <div className="space-y-4">
              {recentActivity.map((activity, index) => (
                <div key={index} className="flex items-start">
                  <span className="text-sm mr-3 mt-0.5">{activity.icon}</span>
                  <div className="flex-1">
                    <p className="text-sm text-gray-900">{activity.action}</p>
                    <p className="text-xs text-gray-500">{activity.time}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Paramètres de sécurité */}
      <div className="bg-white shadow rounded-lg">
        <div className="px-4 py-5 sm:p-6">
          <h3 className="text-lg leading-6 font-medium text-gray-900 mb-4">
            Paramètres de sécurité
          </h3>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <h4 className="text-sm font-medium text-gray-900">Changer le mot de passe</h4>
                <p className="text-sm text-gray-500">Mettez à jour votre mot de passe</p>
              </div>
              <button className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition-colors">
                Modifier
              </button>
            </div>
            <div className="flex items-center justify-between">
              <div>
                <h4 className="text-sm font-medium text-gray-900">Authentification à deux facteurs</h4>
                <p className="text-sm text-gray-500">Ajoutez une couche de sécurité supplémentaire</p>
              </div>
              <button className="bg-gray-300 text-gray-700 px-4 py-2 rounded-md hover:bg-gray-400 transition-colors">
                Activer
              </button>
            </div>
            <div className="flex items-center justify-between">
              <div>
                <h4 className="text-sm font-medium text-gray-900">Sessions actives</h4>
                <p className="text-sm text-gray-500">Gérez vos connexions actives</p>
              </div>
              <button className="bg-gray-300 text-gray-700 px-4 py-2 rounded-md hover:bg-gray-400 transition-colors">
                Voir
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;