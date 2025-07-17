import { useState, useEffect } from 'react';
import toast from 'react-hot-toast';

const useCart = () => {
  const [cartItems, setCartItems] = useState([]);
  const [cartItemCount, setCartItemCount] = useState(0);

  // Charger le panier depuis localStorage au démarrage
  useEffect(() => {
    const savedCart = localStorage.getItem('cart');
    if (savedCart) {
      const parsedCart = JSON.parse(savedCart);
      setCartItems(parsedCart);
      setCartItemCount(parsedCart.length);
    }
  }, []);

  // Sauvegarder le panier dans localStorage et émettre un événement
  const saveCart = (items) => {
    localStorage.setItem('cart', JSON.stringify(items));
    setCartItems(items);
    setCartItemCount(items.length);
    
    // Émettre un événement personnalisé pour notifier les autres composants
    const event = new CustomEvent('cartUpdated', { 
      detail: items.length 
    });
    window.dispatchEvent(event);
  };

  // Ajouter un produit au panier
  const addToCart = (product, quantity = 1) => {
    const existingItem = cartItems.find(item => item._id === product._id);
    
    if (existingItem) {
      const updatedItems = cartItems.map(item =>
        item._id === product._id
          ? { ...item, quantity: item.quantity + quantity }
          : item
      );
      saveCart(updatedItems);
      toast.success(`Quantité mise à jour dans le panier`);
    } else {
      const newItem = { ...product, quantity };
      const updatedItems = [...cartItems, newItem];
      saveCart(updatedItems);
      toast.success(`${product.name} ajouté au panier`);
    }
  };

  // Supprimer un produit du panier
  const removeFromCart = (productId) => {
    const updatedItems = cartItems.filter(item => item._id !== productId);
    saveCart(updatedItems);
    toast.success('Produit retiré du panier');
  };

  // Mettre à jour la quantité d'un produit
  const updateQuantity = (productId, quantity) => {
    if (quantity <= 0) {
      removeFromCart(productId);
      return;
    }

    const updatedItems = cartItems.map(item =>
      item._id === productId ? { ...item, quantity } : item
    );
    saveCart(updatedItems);
  };

  // Vider le panier
  const clearCart = () => {
    saveCart([]);
    toast.success('Panier vidé');
  };

  // Calculer le total du panier
  const getTotalPrice = () => {
    return cartItems.reduce((total, item) => total + (item.price * item.quantity), 0);
  };

  // Calculer le nombre total d'articles
  const getTotalItems = () => {
    return cartItems.reduce((total, item) => total + item.quantity, 0);
  };

  return {
    cartItems,
    cartItemCount,
    addToCart,
    removeFromCart,
    updateQuantity,
    clearCart,
    getTotalPrice,
    getTotalItems
  };
};

export default useCart;