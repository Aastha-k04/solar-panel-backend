/**
 * Authentication Request Validators
 * Input validation for auth endpoints
 */

export const validateRegister = (req, res, next) => {
  const { email, password, role, firstName, lastName } = req.body;
  const errors = [];

  // Email validation
  if (!email) {
    errors.push('Email is required');
  } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    errors.push('Invalid email format');
  }

  // Password validation
  if (!password) {
    errors.push('Password is required');
  } else if (password.length < 6) {
    errors.push('Password must be at least 6 characters long');
  }

  // Role validation (optional, defaults to CUSTOMER)
  if (role && !['ADMIN', 'CUSTOMER', 'TECHNICIAN'].includes(role)) {
    errors.push('Invalid role. Must be ADMIN, CUSTOMER, or TECHNICIAN');
  }

  // First name validation (optional)
  if (firstName && firstName.length > 50) {
    errors.push('First name cannot exceed 50 characters');
  }

  // Last name validation (optional)
  if (lastName && lastName.length > 50) {
    errors.push('Last name cannot exceed 50 characters');
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

export const validateLogin = (req, res, next) => {
  const { email, password } = req.body;
  const errors = [];

  if (!email) {
    errors.push('Email is required');
  }

  if (!password) {
    errors.push('Password is required');
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

export const validateUpdateProfile = (req, res, next) => {
  const { firstName, lastName, phoneNumber } = req.body;
  const errors = [];

  // First name validation (optional)
  if (firstName && firstName.length > 50) {
    errors.push('First name cannot exceed 50 characters');
  }

  // Last name validation (optional)
  if (lastName && lastName.length > 50) {
    errors.push('Last name cannot exceed 50 characters');
  }

  // Phone number validation (optional but if provided must be valid)
  // Simple regex for demonstration, or rely on model validation
  if (phoneNumber && !/^[\d\+\-\s\(\)]{8,20}$/.test(phoneNumber)) {
    errors.push('Invalid phone number format');
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