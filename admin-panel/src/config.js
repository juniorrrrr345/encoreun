// Configuration pour le mode développement
export const config = {
  // Mode développement - contourne l'authentification
  bypassAuth: true,
  
  // Données mockées pour le développement
  mockUser: {
    id: 1,
    name: 'Administrateur',
    email: 'admin@example.com',
    role: 'admin'
  },
  
  // URL de l'API (désactivée en mode développement)
  apiUrl: 'http://localhost:5000/api',
  
  // Configuration des données mockées
  mockData: {
    products: [
      {
        id: 1,
        name: 'iPhone 15 Pro',
        description: 'Dernier iPhone avec puce A17 Pro',
        price: 1199.99,
        stock: 25,
        status: 'active',
        category: 'Électronique',
        image: 'https://via.placeholder.com/300x200?text=iPhone+15+Pro',
        createdAt: '2024-01-15T10:00:00Z'
      },
      {
        id: 2,
        name: 'MacBook Air M2',
        description: 'Ordinateur portable ultra-léger',
        price: 1499.99,
        stock: 15,
        status: 'active',
        category: 'Informatique',
        image: 'https://via.placeholder.com/300x200?text=MacBook+Air',
        createdAt: '2024-01-16T14:30:00Z'
      },
      {
        id: 3,
        name: 'AirPods Pro',
        description: 'Écouteurs sans fil avec réduction de bruit',
        price: 249.99,
        stock: 50,
        status: 'active',
        category: 'Audio',
        image: 'https://via.placeholder.com/300x200?text=AirPods+Pro',
        createdAt: '2024-01-17T09:15:00Z'
      }
    ],
    orders: [
      {
        id: 1,
        customerName: 'Jean Dupont',
        customerEmail: 'jean@example.com',
        total: 1199.99,
        status: 'pending',
        paymentStatus: 'paid',
        items: [
          { productId: 1, quantity: 1, price: 1199.99 }
        ],
        createdAt: '2024-01-20T09:15:00Z'
      },
      {
        id: 2,
        customerName: 'Marie Martin',
        customerEmail: 'marie@example.com',
        total: 1749.98,
        status: 'shipped',
        paymentStatus: 'paid',
        items: [
          { productId: 2, quantity: 1, price: 1499.99 },
          { productId: 3, quantity: 1, price: 249.99 }
        ],
        createdAt: '2024-01-19T16:45:00Z'
      },
      {
        id: 3,
        customerName: 'Pierre Durand',
        customerEmail: 'pierre@example.com',
        total: 249.99,
        status: 'completed',
        paymentStatus: 'paid',
        items: [
          { productId: 3, quantity: 1, price: 249.99 }
        ],
        createdAt: '2024-01-18T11:30:00Z'
      }
    ]
  }
};