import reviewService from '../services/review.service.js';

/**
 * Review Controller
 * Handles HTTP requests for reviews
 */

class ReviewController {
  /**
   * Add a review
   * @route POST /api/v1/reviews
   * @access Customer only
   */
  async addReview(req, res, next) {
    try {
      const customerId = req.user.userId;
      const { orderId, rating, comment } = req.body;

      const review = await reviewService.addReview(customerId, orderId, rating, comment);

      res.status(201).json({
        success: true,
        message: 'Review added successfully',
        data: {
          review,
        },
      });
    } catch (error) {
      next(error);
    }
  }

  /**
   * Get logged-in customer's reviews
   * @route GET /api/v1/reviews/my
   * @access Customer only
   */
  async getMyReviews(req, res, next) {
    try {
      const customerId = req.user.userId;

      const reviews = await reviewService.getCustomerReviews(customerId);

      res.status(200).json({
        success: true,
        message: 'Reviews retrieved successfully',
        count: reviews.length,
        data: {
          reviews,
        },
      });
    } catch (error) {
      next(error);
    }
  }

  /**
   * Get all reviews (Admin only)
   * @route GET /api/v1/reviews
   * @access Admin only
   */
  async getAllReviews(req, res, next) {
    try {
      const reviews = await reviewService.getAllReviews();

      res.status(200).json({
        success: true,
        message: 'All reviews retrieved successfully',
        count: reviews.length,
        data: {
          reviews,
        },
      });
    } catch (error) {
      next(error);
    }
  }
}

// Export singleton instance
const reviewController = new ReviewController();
export default reviewController;