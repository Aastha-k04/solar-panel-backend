import Review from '../models/Review.js';
import Order from '../models/Order.js';
import Installation from '../models/Installation.js';
import { ORDER_STATUS } from '../constants/orderStatus.js';
import { INSTALLATION_STATUS } from '../constants/installationStatus.js';

/**
 * Review Service
 * Handles business logic for reviews and ratings
 */

class ReviewService {
  /**
   * Add a review for an order
   * @param {string} customerId
   * @param {string} orderId
   * @param {number} rating
   * @param {string} comment
   * @returns {Promise<Object>}
   */
  async addReview(customerId, orderId, rating, comment) {
    // Check if order exists
    const order = await Order.findById(orderId);

    if (!order) {
      const error = new Error('Order not found');
      error.statusCode = 404;
      throw error;
    }

    // Verify order belongs to customer
    if (order.user.toString() !== customerId) {
      const error = new Error('You can only review your own orders');
      error.statusCode = 403;
      throw error;
    }

    // Check if order is PAID
    if (order.status !== ORDER_STATUS.PAID) {
      const error = new Error(`Cannot review order with status: ${order.status}. Order must be PAID.`);
      error.statusCode = 400;
      throw error;
    }

    // Check if installation exists and is COMPLETED
    const installation = await Installation.findOne({ order: orderId });

    if (!installation) {
      const error = new Error('Installation not found for this order');
      error.statusCode = 404;
      throw error;
    }

    if (installation.status !== INSTALLATION_STATUS.COMPLETED) {
      const error = new Error(
        `Cannot review installation with status: ${installation.status}. Installation must be COMPLETED.`
      );
      error.statusCode = 400;
      throw error;
    }

    // Check if review already exists
    const existingReview = await Review.findOne({ order: orderId });

    if (existingReview) {
      const error = new Error('Review already exists for this order');
      error.statusCode = 400;
      throw error;
    }

    // Create review
    const review = await Review.create({
      order: orderId,
      customer: customerId,
      technician: installation.technician,
      rating,
      comment: comment || '',
    });

    // Populate details
    await review.populate('order');
    await review.populate('customer', 'email firstName lastName');
    await review.populate('technician', 'email firstName lastName');

    return review;
  }

  /**
   * Get all reviews for a specific customer
   * @param {string} customerId
   * @returns {Promise<Array>}
   */
  async getCustomerReviews(customerId) {
    const reviews = await Review.find({ customer: customerId })
      .populate('order')
      .populate('technician', 'email firstName lastName')
      .sort({ createdAt: -1 });

    return reviews;
  }

  /**
   * Get all reviews (Admin only)
   * @returns {Promise<Array>}
   */
  async getAllReviews() {
    const reviews = await Review.find()
      .populate('order')
      .populate('customer', 'email firstName lastName')
      .populate('technician', 'email firstName lastName')
      .sort({ createdAt: -1 });

    return reviews;
  }

  /**
   * Get single review by ID
   * @param {string} reviewId
   * @returns {Promise<Object>}
   */
  async getReviewById(reviewId) {
    const review = await Review.findById(reviewId)
      .populate('order')
      .populate('customer', 'email firstName lastName')
      .populate('technician', 'email firstName lastName');

    if (!review) {
      const error = new Error('Review not found');
      error.statusCode = 404;
      throw error;
    }

    return review;
  }
}

// Export singleton instance
const reviewService = new ReviewService();
export default reviewService;