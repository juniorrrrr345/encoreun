import React, { useState, useEffect } from 'react';

const InfoPage = () => {
  const [infoData, setInfoData] = useState({
    title: 'Informations',
    subtitle: 'Découvrez notre univers et restez connecté',
    aboutTitle: 'À propos de notre boutique',
    aboutText1: 'Bienvenue dans notre boutique en ligne où nous proposons une sélection soigneusement choisie de produits de qualité. Notre mission est de vous offrir une expérience d\'achat exceptionnelle avec des articles tendance et des prix compétitifs.',
    aboutText2: 'Nous nous engageons à vous fournir un service client de qualité et une satisfaction garantie. N\'hésitez pas à nous contacter pour toute question ou assistance.',
    socialTitle: 'Suivez-nous sur les réseaux sociaux',
    socialSubtitle: 'Restez informé de nos dernières nouveautés, promotions et actualités !',
    socialLinks: {
      instagram: { name: 'Instagram', url: '#', username: '@avecamour', active: true },
      facebook: { name: 'Facebook', url: '#', username: '@avecamour', active: true },
      twitter: { name: 'Twitter', url: '#', username: '@avecamour', active: true },
      youtube: { name: 'YouTube', url: '#', username: 'Avec Amour', active: true },
      linkedin: { name: 'LinkedIn', url: '#', username: 'Avec Amour', active: true }
    }
  });

  const [isEditing, setIsEditing] = useState(false);
  const [saving, setSaving] = useState(false);

  // Charger les données depuis le localStorage
  useEffect(() => {
    const savedData = localStorage.getItem('infoPageData');
    if (savedData) {
      setInfoData(JSON.parse(savedData));
    }
  }, []);

  // Sauvegarder les données
  const handleSave = async () => {
    setSaving(true);
    try {
      // Simuler une sauvegarde
      await new Promise(resolve => setTimeout(resolve, 1000));
      localStorage.setItem('infoPageData', JSON.stringify(infoData));
      setIsEditing(false);
    } catch (error) {
      console.error('Erreur lors de la sauvegarde:', error);
    } finally {
      setSaving(false);
    }
  };

  // Annuler les modifications
  const handleCancel = () => {
    const savedData = localStorage.getItem('infoPageData');
    if (savedData) {
      setInfoData(JSON.parse(savedData));
    }
    setIsEditing(false);
  };

  // Mettre à jour un champ
  const handleChange = (field, value) => {
    setInfoData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  // Mettre à jour un lien social
  const handleSocialChange = (platform, field, value) => {
    setInfoData(prev => ({
      ...prev,
      socialLinks: {
        ...prev.socialLinks,
        [platform]: {
          ...prev.socialLinks[platform],
          [field]: value
        }
      }
    }));
  };

  // Ajouter un nouveau réseau social
  const addNewSocial = () => {
    const newKey = `custom_${Date.now()}`;
    setInfoData(prev => ({
      ...prev,
      socialLinks: {
        ...prev.socialLinks,
        [newKey]: {
          name: 'Nouveau réseau',
          url: '',
          username: '',
          active: true
        }
      }
    }));
  };

  // Supprimer un réseau social
  const removeSocial = (platform) => {
    setInfoData(prev => {
      const newSocialLinks = { ...prev.socialLinks };
      delete newSocialLinks[platform];
      return {
        ...prev,
        socialLinks: newSocialLinks
      };
    });
  };

  return (
    <div className="space-y-6">
      {/* En-tête */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Gestion des informations</h1>
          <p className="text-gray-600">Modifiez le contenu de la page Informations</p>
        </div>
        <div className="flex space-x-3">
          {!isEditing ? (
            <button
              onClick={() => setIsEditing(true)}
              className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition-colors"
            >
              Modifier
            </button>
          ) : (
            <>
              <button
                onClick={handleCancel}
                className="px-4 py-2 text-gray-700 bg-gray-200 rounded-md hover:bg-gray-300 transition-colors"
              >
                Annuler
              </button>
              <button
                onClick={handleSave}
                disabled={saving}
                className="bg-green-600 text-white px-4 py-2 rounded-md hover:bg-green-700 transition-colors disabled:opacity-50"
              >
                {saving ? 'Sauvegarde...' : 'Sauvegarder'}
              </button>
            </>
          )}
        </div>
      </div>

      {/* Formulaire */}
      <div className="bg-white shadow rounded-lg p-6">
        <div className="space-y-6">
          {/* Titre et sous-titre */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Titre principal
              </label>
              <input
                type="text"
                value={infoData.title}
                onChange={(e) => handleChange('title', e.target.value)}
                disabled={!isEditing}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:bg-gray-100"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Sous-titre
              </label>
              <input
                type="text"
                value={infoData.subtitle}
                onChange={(e) => handleChange('subtitle', e.target.value)}
                disabled={!isEditing}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:bg-gray-100"
              />
            </div>
          </div>

          {/* Section À propos */}
          <div>
            <h3 className="text-lg font-medium text-gray-900 mb-4">Section À propos</h3>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Titre de la section
                </label>
                <input
                  type="text"
                  value={infoData.aboutTitle}
                  onChange={(e) => handleChange('aboutTitle', e.target.value)}
                  disabled={!isEditing}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:bg-gray-100"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Premier paragraphe
                </label>
                <textarea
                  rows="3"
                  value={infoData.aboutText1}
                  onChange={(e) => handleChange('aboutText1', e.target.value)}
                  disabled={!isEditing}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:bg-gray-100"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Deuxième paragraphe
                </label>
                <textarea
                  rows="3"
                  value={infoData.aboutText2}
                  onChange={(e) => handleChange('aboutText2', e.target.value)}
                  disabled={!isEditing}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:bg-gray-100"
                />
              </div>
            </div>
          </div>

          {/* Section Réseaux sociaux */}
          <div>
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-medium text-gray-900">Réseaux sociaux</h3>
              {isEditing && (
                <button
                  onClick={addNewSocial}
                  className="text-sm bg-blue-100 text-blue-700 px-3 py-1 rounded-md hover:bg-blue-200 transition-colors"
                >
                  + Ajouter un réseau
                </button>
              )}
            </div>
            <div className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Titre de la section
                  </label>
                  <input
                    type="text"
                    value={infoData.socialTitle}
                    onChange={(e) => handleChange('socialTitle', e.target.value)}
                    disabled={!isEditing}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:bg-gray-100"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Sous-titre
                  </label>
                  <input
                    type="text"
                    value={infoData.socialSubtitle}
                    onChange={(e) => handleChange('socialSubtitle', e.target.value)}
                    disabled={!isEditing}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:bg-gray-100"
                  />
                </div>
              </div>

              {/* Liens sociaux */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {Object.entries(infoData.socialLinks).map(([platform, data]) => (
                  <div key={platform} className="border border-gray-200 rounded-lg p-4">
                    <div className="flex items-center justify-between mb-3">
                      <h4 className="font-medium text-gray-900">{data.name}</h4>
                      <div className="flex items-center space-x-2">
                        <label className="flex items-center">
                          <input
                            type="checkbox"
                            checked={data.active}
                            onChange={(e) => handleSocialChange(platform, 'active', e.target.checked)}
                            disabled={!isEditing}
                            className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                          />
                          <span className="ml-2 text-sm text-gray-700">Actif</span>
                        </label>
                        {isEditing && platform.startsWith('custom_') && (
                          <button
                            onClick={() => removeSocial(platform)}
                            className="text-red-600 hover:text-red-800 text-sm"
                            title="Supprimer ce réseau"
                          >
                            ✕
                          </button>
                        )}
                      </div>
                    </div>
                    <div className="space-y-2">
                      <div>
                        <label className="block text-xs text-gray-600 mb-1">Nom du réseau</label>
                        <input
                          type="text"
                          value={data.name}
                          onChange={(e) => handleSocialChange(platform, 'name', e.target.value)}
                          disabled={!isEditing}
                          placeholder="Ex: Instagram, TikTok, WhatsApp..."
                          className="w-full px-2 py-1 text-sm border border-gray-300 rounded focus:outline-none focus:ring-1 focus:ring-blue-500 disabled:bg-gray-100"
                        />
                      </div>
                      <div>
                        <label className="block text-xs text-gray-600 mb-1">URL</label>
                        <input
                          type="text"
                          value={data.url}
                          onChange={(e) => handleSocialChange(platform, 'url', e.target.value)}
                          disabled={!isEditing}
                          placeholder="https://..."
                          className="w-full px-2 py-1 text-sm border border-gray-300 rounded focus:outline-none focus:ring-1 focus:ring-blue-500 disabled:bg-gray-100"
                        />
                      </div>
                      <div>
                        <label className="block text-xs text-gray-600 mb-1">Nom d'utilisateur</label>
                        <input
                          type="text"
                          value={data.username}
                          onChange={(e) => handleSocialChange(platform, 'username', e.target.value)}
                          disabled={!isEditing}
                          placeholder="@username ou nom de la page"
                          className="w-full px-2 py-1 text-sm border border-gray-300 rounded focus:outline-none focus:ring-1 focus:ring-blue-500 disabled:bg-gray-100"
                        />
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Aperçu */}
      {!isEditing && (
        <div className="bg-white shadow rounded-lg p-6">
          <h3 className="text-lg font-medium text-gray-900 mb-4">Aperçu</h3>
          <div className="bg-gray-50 rounded-lg p-4">
            <h1 className="text-2xl font-bold text-gray-900 mb-2">{infoData.title}</h1>
            <p className="text-gray-600 mb-6">{infoData.subtitle}</p>
            
            <div className="mb-6">
              <h2 className="text-xl font-bold text-gray-900 mb-3">{infoData.aboutTitle}</h2>
              <p className="text-gray-700 mb-3">{infoData.aboutText1}</p>
              <p className="text-gray-700">{infoData.aboutText2}</p>
            </div>
            
            <div>
              <h2 className="text-xl font-bold text-gray-900 mb-3">{infoData.socialTitle}</h2>
              <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
                {Object.entries(infoData.socialLinks)
                  .filter(([_, data]) => data.active)
                  .map(([platform, data]) => (
                    <div key={platform} className="text-center p-3 bg-white rounded border">
                      <div className="font-medium text-gray-900">{data.name}</div>
                      <div className="text-sm text-gray-600">{data.username}</div>
                    </div>
                  ))}
              </div>
              <p className="text-gray-600 text-sm mt-3">{infoData.socialSubtitle}</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default InfoPage;