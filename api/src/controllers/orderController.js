const Order = require('../models/Order');
const Product = require('../models/Product');

// Obtenir toutes les commandes avec pagination et filtres
const getAllOrders = async (req, res) => {
  try {
    const {
      page = 1,
      limit = 10,
      status,
      paymentStatus,
      search,
      sortBy = 'createdAt',
      sortOrder = 'desc'
    } = req.query;

    // Construire les filtres
    const filters = {};
    
    if (status) {
      filters.status = status;
    }
    
    if (paymentStatus) {
      filters.paymentStatus = paymentStatus;
    }
    
    if (search) {
      filters.$or = [
        { orderNumber: { $regex: search, $options: 'i' } },
        { 'customer.name': { $regex: search, $options: 'i' } },
        { 'customer.email': { $regex: search, $options: 'i' } }
      ];
    }

    // Construire le tri
    const sort = {};
    sort[sortBy] = sortOrder === 'desc' ? -1 : 1;

    // Calculer la pagination
    const skip = (parseInt(page) - 1) * parseInt(limit);

    // Exécuter les requêtes
    const [orders, total] = await Promise.all([
      Order.find(filters)
        .sort(sort)
        .skip(skip)
        .limit(parseInt(limit))
        .populate('items.product', 'name mainImage'),
      Order.countDocuments(filters)
    ]);

    const totalPages = Math.ceil(total / parseInt(limit));

    res.status(200).json({
      success: true,
      data: {
        orders,
        pagination: {
          currentPage: parseInt(page),
          totalPages,
          totalItems: total,
          itemsPerPage: parseInt(limit)
        }
      }
    });
  } catch (error) {
    console.error('Erreur de récupération des commandes:', error);
    res.status(500).json({
      success: false,
      message: 'Erreur interne du serveur'
    });
  }
};

// Obtenir une commande par ID
const getOrderById = async (req, res) => {
  try {
    const order = await Order.findById(req.params.id)
      .populate('items.product', 'name mainImage price');

    if (!order) {
      return res.status(404).json({
        success: false,
        message: 'Commande non trouvée'
      });
    }

    res.status(200).json({
      success: true,
      data: { order }
    });
  } catch (error) {
    console.error('Erreur de récupération de la commande:', error);
    res.status(500).json({
      success: false,
      message: 'Erreur interne du serveur'
    });
  }
};

// Mettre à jour le statut d'une commande
const updateOrderStatus = async (req, res) => {
  try {
    const { status, adminNotes } = req.body;
    
    const order = await Order.findById(req.params.id);
    
    if (!order) {
      return res.status(404).json({
        success: false,
        message: 'Commande non trouvée'
      });
    }

    // Mettre à jour le statut
    await order.updateStatus(status);
    
    // Mettre à jour les notes admin si fournies
    if (adminNotes !== undefined) {
      order.adminNotes = adminNotes;
      await order.save();
    }

    res.status(200).json({
      success: true,
      message: 'Statut de la commande mis à jour avec succès',
      data: { order }
    });
  } catch (error) {
    console.error('Erreur de mise à jour du statut:', error);
    res.status(500).json({
      success: false,
      message: 'Erreur interne du serveur'
    });
  }
};

// Mettre à jour le statut de paiement
const updatePaymentStatus = async (req, res) => {
  try {
    const { paymentStatus } = req.body;
    
    const order = await Order.findByIdAndUpdate(
      req.params.id,
      { paymentStatus },
      { new: true, runValidators: true }
    );

    if (!order) {
      return res.status(404).json({
        success: false,
        message: 'Commande non trouvée'
      });
    }

    res.status(200).json({
      success: true,
      message: 'Statut de paiement mis à jour avec succès',
      data: { order }
    });
  } catch (error) {
    console.error('Erreur de mise à jour du statut de paiement:', error);
    res.status(500).json({
      success: false,
      message: 'Erreur interne du serveur'
    });
  }
};

// Ajouter un numéro de suivi
const addTrackingNumber = async (req, res) => {
  try {
    const { trackingNumber } = req.body;
    
    const order = await Order.findByIdAndUpdate(
      req.params.id,
      { trackingNumber },
      { new: true, runValidators: true }
    );

    if (!order) {
      return res.status(404).json({
        success: false,
        message: 'Commande non trouvée'
      });
    }

    res.status(200).json({
      success: true,
      message: 'Numéro de suivi ajouté avec succès',
      data: { order }
    });
  } catch (error) {
    console.error('Erreur d\'ajout du numéro de suivi:', error);
    res.status(500).json({
      success: false,
      message: 'Erreur interne du serveur'
    });
  }
};

// Obtenir les statistiques des commandes
const getOrderStats = async (req, res) => {
  try {
    const today = new Date();
    const startOfDay = new Date(today.getFullYear(), today.getMonth(), today.getDate());
    const startOfMonth = new Date(today.getFullYear(), today.getMonth(), 1);
    const startOfYear = new Date(today.getFullYear(), 0, 1);

    const [
      totalOrders,
      pendingOrders,
      processingOrders,
      shippedOrders,
      deliveredOrders,
      cancelledOrders,
      todayOrders,
      monthOrders,
      yearOrders,
      totalRevenue,
      todayRevenue,
      monthRevenue,
      yearRevenue
    ] = await Promise.all([
      Order.countDocuments(),
      Order.countDocuments({ status: 'pending' }),
      Order.countDocuments({ status: 'processing' }),
      Order.countDocuments({ status: 'shipped' }),
      Order.countDocuments({ status: 'delivered' }),
      Order.countDocuments({ status: 'cancelled' }),
      Order.countDocuments({ createdAt: { $gte: startOfDay } }),
      Order.countDocuments({ createdAt: { $gte: startOfMonth } }),
      Order.countDocuments({ createdAt: { $gte: startOfYear } }),
      Order.aggregate([
        { $match: { status: { $ne: 'cancelled' } } },
        { $group: { _id: null, total: { $sum: '$total' } } }
      ]),
      Order.aggregate([
        { $match: { createdAt: { $gte: startOfDay }, status: { $ne: 'cancelled' } } },
        { $group: { _id: null, total: { $sum: '$total' } } }
      ]),
      Order.aggregate([
        { $match: { createdAt: { $gte: startOfMonth }, status: { $ne: 'cancelled' } } },
        { $group: { _id: null, total: { $sum: '$total' } } }
      ]),
      Order.aggregate([
        { $match: { createdAt: { $gte: startOfYear }, status: { $ne: 'cancelled' } } },
        { $group: { _id: null, total: { $sum: '$total' } } }
      ])
    ]);

    res.status(200).json({
      success: true,
      data: {
        orders: {
          total: totalOrders,
          pending: pendingOrders,
          processing: processingOrders,
          shipped: shippedOrders,
          delivered: deliveredOrders,
          cancelled: cancelledOrders,
          today: todayOrders,
          month: monthOrders,
          year: yearOrders
        },
        revenue: {
          total: totalRevenue[0]?.total || 0,
          today: todayRevenue[0]?.total || 0,
          month: monthRevenue[0]?.total || 0,
          year: yearRevenue[0]?.total || 0
        }
      }
    });
  } catch (error) {
    console.error('Erreur de récupération des statistiques:', error);
    res.status(500).json({
      success: false,
      message: 'Erreur interne du serveur'
    });
  }
};

// Obtenir les commandes récentes
const getRecentOrders = async (req, res) => {
  try {
    const { limit = 5 } = req.query;

    const orders = await Order.find()
      .sort({ createdAt: -1 })
      .limit(parseInt(limit))
      .populate('items.product', 'name mainImage')
      .select('orderNumber customer total status createdAt');

    res.status(200).json({
      success: true,
      data: { orders }
    });
  } catch (error) {
    console.error('Erreur de récupération des commandes récentes:', error);
    res.status(500).json({
      success: false,
      message: 'Erreur interne du serveur'
    });
  }
};

// Exporter les commandes (pour CSV/Excel)
const exportOrders = async (req, res) => {
  try {
    const { startDate, endDate, status } = req.query;
    
    const filters = {};
    
    if (startDate && endDate) {
      filters.createdAt = {
        $gte: new Date(startDate),
        $lte: new Date(endDate)
      };
    }
    
    if (status) {
      filters.status = status;
    }

    const orders = await Order.find(filters)
      .populate('items.product', 'name')
      .select('-__v')
      .sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      data: { orders }
    });
  } catch (error) {
    console.error('Erreur d\'export des commandes:', error);
    res.status(500).json({
      success: false,
      message: 'Erreur interne du serveur'
    });
  }
};

module.exports = {
  getAllOrders,
  getOrderById,
  updateOrderStatus,
  updatePaymentStatus,
  addTrackingNumber,
  getOrderStats,
  getRecentOrders,
  exportOrders
};