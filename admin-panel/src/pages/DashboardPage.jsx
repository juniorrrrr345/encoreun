import React from 'react';
import { useQuery } from 'react-query';

const DashboardPage = () => {
  // Simuler des données pour le dashboard
  const stats = [
    { name: 'Total des ventes', value: '€12,345', change: '+12%', changeType: 'positive' },
    { name: 'Commandes', value: '156', change: '+8%', changeType: 'positive' },
    { name: 'Produits', value: '89', change: '+3%', changeType: 'positive' },
    { name: 'Clients', value: '1,234', change: '+15%', changeType: 'positive' },
  ];

  const recentOrders = [
    { id: '#1234', customer: 'Jean Dupont', amount: '€89.99', status: 'Livré', date: '2024-01-15' },
    { id: '#1235', customer: 'Marie Martin', amount: '€156.50', status: 'En cours', date: '2024-01-14' },
    { id: '#1236', customer: 'Pierre Durand', amount: '€67.25', status: 'En attente', date: '2024-01-13' },
    { id: '#1237', customer: 'Sophie Bernard', amount: '€234.00', status: 'Livré', date: '2024-01-12' },
  ];

  const statusColors = {
    'Livré': 'bg-green-100 text-green-800',
    'En cours': 'bg-blue-100 text-blue-800',
    'En attente': 'bg-yellow-100 text-yellow-800',
  };

  return (
    <div className="space-y-6">
      {/* En-tête */}
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Tableau de bord</h1>
        <p className="text-gray-600">Vue d'ensemble de votre boutique</p>
      </div>

      {/* Statistiques */}
      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat) => (
          <div key={stat.name} className="bg-white overflow-hidden shadow rounded-lg">
            <div className="p-5">
              <div className="flex items-center">
                <div className="flex-shrink-0">
                  <div className="w-8 h-8 bg-blue-500 rounded-md flex items-center justify-center">
                    <span className="text-white text-sm font-medium">📊</span>
                  </div>
                </div>
                <div className="ml-5 w-0 flex-1">
                  <dl>
                    <dt className="text-sm font-medium text-gray-500 truncate">
                      {stat.name}
                    </dt>
                    <dd className="flex items-baseline">
                      <div className="text-2xl font-semibold text-gray-900">
                        {stat.value}
                      </div>
                      <div className={`ml-2 flex items-baseline text-sm font-semibold ${
                        stat.changeType === 'positive' ? 'text-green-600' : 'text-red-600'
                      }`}>
                        {stat.change}
                      </div>
                    </dd>
                  </dl>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Graphique et commandes récentes */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Graphique des ventes */}
        <div className="bg-white shadow rounded-lg">
          <div className="px-4 py-5 sm:p-6">
            <h3 className="text-lg leading-6 font-medium text-gray-900 mb-4">
              Ventes des 7 derniers jours
            </h3>
            <div className="h-64 flex items-end justify-between space-x-2">
              {[65, 78, 90, 81, 95, 88, 92].map((value, index) => (
                <div key={index} className="flex-1 bg-blue-500 rounded-t" style={{ height: `${value}%` }}>
                  <div className="text-xs text-center text-white mt-1">
                    {value}%
                  </div>
                </div>
              ))}
            </div>
            <div className="mt-4 flex justify-between text-xs text-gray-500">
              <span>Lun</span>
              <span>Mar</span>
              <span>Mer</span>
              <span>Jeu</span>
              <span>Ven</span>
              <span>Sam</span>
              <span>Dim</span>
            </div>
          </div>
        </div>

        {/* Commandes récentes */}
        <div className="bg-white shadow rounded-lg">
          <div className="px-4 py-5 sm:p-6">
            <h3 className="text-lg leading-6 font-medium text-gray-900 mb-4">
              Commandes récentes
            </h3>
            <div className="space-y-4">
              {recentOrders.map((order) => (
                <div key={order.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                  <div className="flex items-center space-x-3">
                    <div className="flex-shrink-0">
                      <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                        <span className="text-blue-600 text-sm font-medium">🛒</span>
                      </div>
                    </div>
                    <div>
                      <p className="text-sm font-medium text-gray-900">{order.id}</p>
                      <p className="text-sm text-gray-500">{order.customer}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-sm font-medium text-gray-900">{order.amount}</p>
                    <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${statusColors[order.status]}`}>
                      {order.status}
                    </span>
                  </div>
                </div>
              ))}
            </div>
            <div className="mt-4">
              <button className="text-sm text-blue-600 hover:text-blue-500 font-medium">
                Voir toutes les commandes →
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Actions rapides */}
      <div className="bg-white shadow rounded-lg">
        <div className="px-4 py-5 sm:p-6">
          <h3 className="text-lg leading-6 font-medium text-gray-900 mb-4">
            Actions rapides
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <button className="flex items-center p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
              <span className="text-2xl mr-3">➕</span>
              <span className="text-sm font-medium text-gray-900">Ajouter un produit</span>
            </button>
            <button className="flex items-center p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
              <span className="text-2xl mr-3">📋</span>
              <span className="text-sm font-medium text-gray-900">Gérer les commandes</span>
            </button>
            <button className="flex items-center p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
              <span className="text-2xl mr-3">👥</span>
              <span className="text-sm font-medium text-gray-900">Voir les clients</span>
            </button>
            <button className="flex items-center p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
              <span className="text-2xl mr-3">📊</span>
              <span className="text-sm font-medium text-gray-900">Rapports</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardPage;