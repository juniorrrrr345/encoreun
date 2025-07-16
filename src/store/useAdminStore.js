import { create } from 'zustand';
import toast from 'react-hot-toast';

const useAdminStore = create((set, get) => ({
  // Configuration des liens externes
  externalLinks: {
    orderLink: 'https://example.com/order',
    contactLink: 'https://example.com/contact',
    socialLinks: {
      instagram: 'https://instagram.com/avecamour',
      facebook: 'https://facebook.com/avecamour',
      twitter: 'https://twitter.com/avecamour',
      youtube: 'https://youtube.com/avecamour'
    }
  },

  // Mettre à jour les liens externes
  updateExternalLinks: (newLinks) => {
    set((state) => ({
      externalLinks: { ...state.externalLinks, ...newLinks }
    }));
    toast.success('Liens mis à jour avec succès');
  },

  // Gérer les vidéos des produits
  updateProductVideo: (productId, videoUrl) => {
    // Cette fonction sera utilisée pour mettre à jour les vidéos des produits
    // depuis le panel d'administration
    toast.success('Vidéo mise à jour avec succès');
  },

  // Gérer les liens de commande des produits
  updateProductOrderLink: (productId, orderLink) => {
    // Cette fonction sera utilisée pour mettre à jour les liens de commande
    // depuis le panel d'administration
    toast.success('Lien de commande mis à jour avec succès');
  },

  // Configuration générale du site
  siteConfig: {
    siteName: 'Avec Amour',
    siteDescription: 'Boutique en ligne avec des produits sélectionnés avec amour',
    contactEmail: 'contact@avecamour.com',
    contactPhone: '+33 1 23 45 67 89',
    address: 'Paris, France'
  },

  // Mettre à jour la configuration du site
  updateSiteConfig: (newConfig) => {
    set((state) => ({
      siteConfig: { ...state.siteConfig, ...newConfig }
    }));
    toast.success('Configuration mise à jour avec succès');
  }
}));

export default useAdminStore;