import { create } from 'zustand';
import api from '../lib/axios';
import toast from 'react-hot-toast';

const useAuthStore = create((set, get) => ({
  user: null,
  loading: false,
  checkingAuth: true,

  signup: async ({ name, email, password, confirmPassword }) => {
    set({ loading: true });
    
    if (password !== confirmPassword) {
      set({ loading: false });
      return toast.error('Les mots de passe ne correspondent pas');
    }

    try {
      const response = await api.post('/auth/signup', {
        name,
        email,
        password
      });
      
      set({ user: response.data, loading: false });
      toast.success('Compte créé avec succès !');
    } catch (error) {
      set({ loading: false });
      toast.error(error.response?.data?.message || 'Une erreur est survenue');
    }
  },

  login: async (email, password) => {
    set({ loading: true });
    
    try {
      const response = await api.post('/auth/login', {
        email,
        password
      });
      
      set({ user: response.data, loading: false });
      toast.success('Connexion réussie !');
    } catch (error) {
      set({ loading: false });
      toast.error(error.response?.data?.message || 'Une erreur est survenue');
    }
  },

  logout: async () => {
    try {
      await api.post('/auth/logout');
      set({ user: null });
      toast.success('Déconnexion réussie');
    } catch (error) {
      toast.error(error.response?.data?.message || 'Erreur lors de la déconnexion');
    }
  },

  checkAuth: async () => {
    set({ checkingAuth: true });
    
    try {
      const response = await api.get('/auth/profile');
      set({ user: response.data, checkingAuth: false });
    } catch (error) {
      console.log(error.message);
      set({ checkingAuth: false, user: null });
    }
  },

  refreshToken: async () => {
    if (!get().checkingAuth) {
      set({ checkingAuth: true });
      
      try {
        const response = await api.post('/auth/refresh-token');
        set({ checkingAuth: false });
        return response.data;
      } catch (error) {
        set({ user: null, checkingAuth: false });
        throw error;
      }
    }
  }
}));

export default useAuthStore;