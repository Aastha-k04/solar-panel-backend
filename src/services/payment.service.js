import stripe, { stripeCurrency } from '../config/stripe.js';
import Payment from '../models/Payment.js';
import Order from '../models/Order.js';
import { PAYMENT_STATUS } from '../constants/paymentStatus.js';
import { ORDER_STATUS } from '../constants/orderStatus.js';

/**
 * Payment Service
 * Handles business logic for payments
 */

class PaymentService {
  /**
   * Create Stripe payment intent
   * @param {string} userId
   * @param {string} orderId
   * @returns {Promise<Object>}
   */
  async createPaymentIntent(userId, orderId) {
    // Find order and validate
    const order = await Order.findById(orderId).populate('user');

    if (!order) {
      const error = new Error('Order not found');
      error.statusCode = 404;
      throw error;
    }

    // Verify order belongs to user
    if (order.user._id.toString() !== userId) {
      const error = new Error('You do not have permission to pay for this order');
      error.statusCode = 403;
      throw error;
    }

    // Check order status
    if (order.status !== ORDER_STATUS.PENDING) {
      const error = new Error(`Cannot create payment for order with status: ${order.status}`);
      error.statusCode = 400;
      throw error;
    }

    // Check if payment already exists for this order
    const existingPayment = await Payment.findOne({
      order: orderId,
      status: { $in: [PAYMENT_STATUS.CREATED, PAYMENT_STATUS.SUCCESS] },
    });

    if (existingPayment) {
      const error = new Error('Payment already exists for this order');
      error.statusCode = 400;
      throw error;
    }

    // Create Stripe payment intent
    const paymentIntent = await stripe.paymentIntents.create({
      amount: Math.round(order.totalAmount * 100), // Convert to smallest currency unit (paise for INR)
      currency: stripeCurrency.toLowerCase(),
      metadata: {
        orderId: order._id.toString(),
        userId: userId,
      },
      description: `Payment for Order #${order._id}`,
    });

    // Save payment record in database
    const payment = await Payment.create({
      user: userId,
      order: orderId,
      amount: order.totalAmount,
      currency: stripeCurrency,
      paymentIntentId: paymentIntent.id,
      status: PAYMENT_STATUS.CREATED,
    });

    return {
      paymentId: payment._id,
      clientSecret: paymentIntent.client_secret,
      amount: order.totalAmount,
      currency: stripeCurrency,
    };
  }

  /**
   * Confirm payment and update order status
   * @param {string} userId
   * @param {string} orderId
   * @param {string} paymentIntentId
   * @returns {Promise<Object>}
   */
  async confirmPayment(userId, orderId, paymentIntentId) {
    // Find payment
    const payment = await Payment.findOne({
      paymentIntentId,
      order: orderId,
      user: userId,
    });

    if (!payment) {
      const error = new Error('Payment not found');
      error.statusCode = 404;
      throw error;
    }

    // Check if already confirmed
    if (payment.status === PAYMENT_STATUS.SUCCESS) {
      const error = new Error('Payment already confirmed');
      error.statusCode = 400;
      throw error;
    }

    // Retrieve payment intent from Stripe to verify status
    const paymentIntent = await stripe.paymentIntents.retrieve(paymentIntentId);

    if (paymentIntent.status !== 'succeeded') {
      // Update payment status to FAILED if payment didn't succeed
      payment.status = PAYMENT_STATUS.FAILED;
      await payment.save();

      const error = new Error(`Payment failed. Stripe status: ${paymentIntent.status}`);
      error.statusCode = 400;
      throw error;
    }

    // Update payment status to SUCCESS
    payment.status = PAYMENT_STATUS.SUCCESS;
    await payment.save();

    // Update order status to PAID
    const order = await Order.findById(orderId);
    order.status = ORDER_STATUS.PAID;
    await order.save();

    // Populate payment details
    await payment.populate('order');
    await payment.populate('user', 'email firstName lastName');

    return payment;
  }

  /**
   * Get all payments for a specific user
   * @param {string} userId
   * @returns {Promise<Array>}
   */
  async getUserPayments(userId) {
    const payments = await Payment.find({ user: userId })
      .populate('order')
      .sort({ createdAt: -1 });

    return payments;
  }

  /**
   * Get all payments (Admin only)
   * @returns {Promise<Array>}
   */
  async getAllPayments() {
    const payments = await Payment.find()
      .populate('order')
      .populate('user', 'email firstName lastName role')
      .sort({ createdAt: -1 });

    return payments;
  }

  /**
   * Get single payment by ID
   * @param {string} paymentId
   * @returns {Promise<Object>}
   */
  async getPaymentById(paymentId) {
    const payment = await Payment.findById(paymentId)
      .populate('order')
      .populate('user', 'email firstName lastName role');

    if (!payment) {
      const error = new Error('Payment not found');
      error.statusCode = 404;
      throw error;
    }

    return payment;
  }
}

// Export singleton instance
const paymentService = new PaymentService();
export default paymentService;