import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import toast from 'react-hot-toast';

const useAuthStore = create(
  persist(
    (set, get) => ({
      user: null,
      isAuthenticated: false,
      loading: false,

      // Connexion
      login: async (username, password) => {
        set({ loading: true });
        
        try {
          // Vérification des identifiants
          if (username === 'Junior' && password === '1ss3ACI07dH3IvIv') {
            const user = {
              id: 1,
              username: 'Junior',
              role: 'admin',
              name: 'Administrateur'
            };
            
            set({ 
              user, 
              isAuthenticated: true, 
              loading: false 
            });
            
            toast.success('Connexion réussie');
            return true;
          } else {
            set({ loading: false });
            toast.error('Identifiants incorrects');
            return false;
          }
        } catch (error) {
          set({ loading: false });
          toast.error('Erreur de connexion');
          return false;
        }
      },

      // Déconnexion
      logout: () => {
        set({ 
          user: null, 
          isAuthenticated: false 
        });
        toast.success('Déconnexion réussie');
      },

      // Vérifier l'authentification
      checkAuth: () => {
        const { user, isAuthenticated } = get();
        return isAuthenticated && user !== null;
      }
    }),
    {
      name: 'auth-storage',
      partialize: (state) => ({ 
        user: state.user, 
        isAuthenticated: state.isAuthenticated 
      })
    }
  )
);

export default useAuthStore;