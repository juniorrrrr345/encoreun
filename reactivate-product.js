import axios from 'axios';

async function reactivateProduct() {
  try {
    const response = await axios.patch('http://localhost:5000/api/products/687840984cb161d7b5ddd61c/toggle-status');
    console.log('Produit réactivé:', response.data);
  } catch (error) {
    console.error('Erreur:', error.response?.data || error.message);
  }
}

reactivateProduct();