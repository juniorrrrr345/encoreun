import { create } from 'zustand';
import toast from 'react-hot-toast';

// Données de démonstration pour les produits
const demoProducts = [
  {
    _id: '1',
    name: 'T-shirt Premium',
    description: 'T-shirt en coton bio de haute qualité, confortable et durable',
    price: 29.99,
    category: 'vetements',
    image: '/images/products/tshirt.jpg',
    video: '/videos/products/tshirt.mp4',
    orderLink: 'https://example.com/order/tshirt'
  },
  {
    _id: '2',
    name: 'Crème Hydratante',
    description: 'Crème hydratante naturelle pour une peau douce et éclatante',
    price: 24.99,
    category: 'beaute',
    image: '/images/products/cream.jpg',
    video: '/videos/products/cream.mp4',
    orderLink: 'https://example.com/order/cream'
  },
  {
    _id: '3',
    name: 'Vase Décoratif',
    description: 'Vase élégant en céramique pour sublimer votre intérieur',
    price: 45.00,
    category: 'maison',
    image: '/images/products/vase.jpg',
    video: '/videos/products/vase.mp4',
    orderLink: 'https://example.com/order/vase'
  },
  {
    _id: '4',
    name: 'Bracelet Élégant',
    description: 'Bracelet en argent sterling avec fermoir sécurisé',
    price: 89.99,
    category: 'bijoux',
    image: '/images/products/bracelet.jpg',
    video: '/videos/products/bracelet.mp4',
    orderLink: 'https://example.com/order/bracelet'
  },
  {
    _id: '5',
    name: 'Écouteurs Sans Fil',
    description: 'Écouteurs bluetooth avec qualité audio exceptionnelle',
    price: 129.99,
    category: 'tech',
    image: '/images/products/headphones.jpg',
    video: '/videos/products/headphones.mp4',
    orderLink: 'https://example.com/order/headphones'
  },
  {
    _id: '6',
    name: 'Ballon de Football',
    description: 'Ballon professionnel pour tous types de terrains',
    price: 34.99,
    category: 'sport',
    image: '/images/products/football.jpg',
    video: '/videos/products/football.mp4',
    orderLink: 'https://example.com/order/football'
  }
];

// Données de démonstration pour les catégories
const demoCategories = [
  {
    _id: '1',
    name: 'Vêtements',
    slug: 'vetements',
    description: 'Mode et accessoires tendance',
    image: '/images/categories/clothing.jpg',
    color: 'gray',
    productCount: 12
  },
  {
    _id: '2',
    name: 'Beauté',
    slug: 'beaute',
    description: 'Produits de beauté et cosmétiques',
    image: '/images/categories/beauty.jpg',
    color: 'gray',
    productCount: 8
  },
  {
    _id: '3',
    name: 'Maison',
    slug: 'maison',
    description: 'Décoration et accessoires maison',
    image: '/images/categories/home.jpg',
    color: 'gray',
    productCount: 15
  },
  {
    _id: '4',
    name: 'Bijoux',
    slug: 'bijoux',
    description: 'Bijoux et accessoires précieux',
    image: '/images/categories/jewelry.jpg',
    color: 'gray',
    productCount: 6
  },
  {
    _id: '5',
    name: 'Tech',
    slug: 'tech',
    description: 'Gadgets et accessoires tech',
    image: '/images/categories/tech.jpg',
    color: 'gray',
    productCount: 10
  },
  {
    _id: '6',
    name: 'Sport',
    slug: 'sport',
    description: 'Équipements et vêtements de sport',
    image: '/images/categories/sport.jpg',
    color: 'gray',
    productCount: 14
  }
];

const useProductStore = create((set, get) => ({
  products: [],
  categories: [],
  loading: false,
  selectedProduct: null,

  // Récupérer tous les produits
  fetchProducts: async () => {
    set({ loading: true });
    try {
      // Simuler un délai de chargement
      await new Promise(resolve => setTimeout(resolve, 1000));
      set({ products: demoProducts, loading: false });
    } catch (error) {
      set({ loading: false });
      toast.error('Erreur lors du chargement des produits');
    }
  },

  // Récupérer un produit par ID
  fetchProductById: async (id) => {
    set({ loading: true });
    try {
      await new Promise(resolve => setTimeout(resolve, 500));
      const product = demoProducts.find(p => p._id === id);
      if (product) {
        set({ selectedProduct: product, loading: false });
        return product;
      } else {
        set({ loading: false });
        toast.error('Produit non trouvé');
        return null;
      }
    } catch (error) {
      set({ loading: false });
      toast.error('Produit non trouvé');
      return null;
    }
  },

  // Récupérer les produits par catégorie
  fetchProductsByCategory: async (category) => {
    set({ loading: true });
    try {
      await new Promise(resolve => setTimeout(resolve, 800));
      const filteredProducts = demoProducts.filter(p => p.category === category);
      set({ products: filteredProducts, loading: false });
    } catch (error) {
      set({ loading: false });
      toast.error('Erreur lors du chargement de la catégorie');
    }
  },

  // Récupérer les catégories
  fetchCategories: async () => {
    try {
      await new Promise(resolve => setTimeout(resolve, 600));
      set({ categories: demoCategories });
    } catch (error) {
      toast.error('Erreur lors du chargement des catégories');
    }
  },

  // Créer un nouveau produit (admin)
  createProduct: async (productData) => {
    set({ loading: true });
    try {
      await new Promise(resolve => setTimeout(resolve, 1000));
      const newProduct = {
        _id: Date.now().toString(),
        ...productData
      };
      set((state) => ({
        products: [...state.products, newProduct],
        loading: false
      }));
      toast.success('Produit créé avec succès');
      return newProduct;
    } catch (error) {
      set({ loading: false });
      toast.error('Erreur lors de la création du produit');
      throw error;
    }
  },

  // Mettre à jour un produit (admin)
  updateProduct: async (id, productData) => {
    set({ loading: true });
    try {
      await new Promise(resolve => setTimeout(resolve, 800));
      const updatedProduct = { _id: id, ...productData };
      set((state) => ({
        products: state.products.map(p => p._id === id ? updatedProduct : p),
        loading: false
      }));
      toast.success('Produit mis à jour avec succès');
      return updatedProduct;
    } catch (error) {
      set({ loading: false });
      toast.error('Erreur lors de la mise à jour du produit');
      throw error;
    }
  },

  // Supprimer un produit (admin)
  deleteProduct: async (id) => {
    try {
      await new Promise(resolve => setTimeout(resolve, 500));
      set((state) => ({
        products: state.products.filter(p => p._id !== id)
      }));
      toast.success('Produit supprimé avec succès');
    } catch (error) {
      toast.error('Erreur lors de la suppression du produit');
    }
  },

  // Rechercher des produits
  searchProducts: async (query) => {
    set({ loading: true });
    try {
      await new Promise(resolve => setTimeout(resolve, 600));
      const filteredProducts = demoProducts.filter(p => 
        p.name.toLowerCase().includes(query.toLowerCase()) ||
        p.description.toLowerCase().includes(query.toLowerCase())
      );
      set({ products: filteredProducts, loading: false });
    } catch (error) {
      set({ loading: false });
      toast.error('Erreur lors de la recherche');
    }
  }
}));

export default useProductStore;