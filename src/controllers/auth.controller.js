import authService from '../services/auth.service.js';

/**
 * Authentication Controller
 * Handles HTTP requests for authentication
 */

class AuthController {
  /**
   * Register a new user
   * @route POST /api/v1/auth/register
   */
  async register(req, res, next) {
    try {
      const { email, password, role, firstName, lastName, phoneNumber } = req.body;

      const result = await authService.register({
        email,
        password,
        role,
        firstName,
        lastName,
        phoneNumber,
      });

      res.status(201).json({
        success: true,
        message: 'User registered successfully',
        data: {
          user: result.user,
          accessToken: result.accessToken,
          refreshToken: result.refreshToken,
        },
      });
    } catch (error) {
      next(error);
    }
  }

  /**
   * Login user
   * @route POST /api/v1/auth/login
   */
  async login(req, res, next) {
    try {
      const { email, password } = req.body;

      const result = await authService.login(email, password);

      res.status(200).json({
        success: true,
        message: 'Login successful',
        data: {
          user: result.user,
          accessToken: result.accessToken,
          refreshToken: result.refreshToken,
        },
      });
    } catch (error) {
      next(error);
    }
  }

  /**
   * Get current authenticated user
   * @route GET /api/v1/auth/me
   * @access Protected
   */
  async getMe(req, res, next) {
    try {
      // User is attached to req by auth middleware
      const user = await authService.getUserById(req.user.userId);

      res.status(200).json({
        success: true,
        message: 'User retrieved successfully',
        data: {
          user,
        },
      });
    } catch (error) {
      next(error);
    }
  }
}

// Export singleton instance
const authController = new AuthController();
export default authController;