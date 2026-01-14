import mongoose from 'mongoose';

/**
 * Review Request Validators
 */

export const validateAddReview = (req, res, next) => {
  const { orderId, rating, comment } = req.body;
  const errors = [];

  // Order ID validation
  if (!orderId) {
    errors.push('Order ID is required');
  } else if (!mongoose.Types.ObjectId.isValid(orderId)) {
    errors.push('Invalid order ID format');
  }

  // Rating validation
  if (rating === undefined || rating === null) {
    errors.push('Rating is required');
  } else if (!Number.isInteger(rating)) {
    errors.push('Rating must be an integer');
  } else if (rating < 1 || rating > 5) {
    errors.push('Rating must be between 1 and 5');
  }

  // Comment validation (optional)
  if (comment !== undefined && typeof comment !== 'string') {
    errors.push('Comment must be a string');
  }

  if (comment && comment.length > 500) {
    errors.push('Comment cannot exceed 500 characters');
  }

  if (errors.length > 0) {
    return res.status(400).json({
      success: false,
      message: 'Validation failed',
      errors,
    });
  }

  next();
};