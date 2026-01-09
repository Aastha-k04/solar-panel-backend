import swaggerJsdoc from 'swagger-jsdoc';

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Solar Panel Installation System API',
      version: '1.0.0',
      description: `
        ## RESTful API for Solar Panel Installation Management System
        
        This API enables comprehensive management of solar panel installations including:
        - Customer registration and order management
        - Solar panel product catalog with filtering
        - Shopping cart and payment processing (Stripe integration)
        - Technician assignment and installation tracking
        - Review and rating system
        - Admin dashboard and analytics
        
        ### User Roles
        - **ADMIN**: Full system access and management
        - **CUSTOMER**: Browse, purchase, and track installations
        - **TECHNICIAN**: Manage assigned installations and update status
        
        ### Base URL
        \`http://localhost:${process.env.PORT || 5000}\`
      `,
      contact: {
        name: 'API Support',
        email: 'support@solarpanel.com',
      },
      license: {
        name: 'MIT',
        url: 'https://opensource.org/licenses/MIT',
      },
    },
    servers: [
      {
        url: `http://localhost:${process.env.PORT || 5000}`,
        description: 'Development server',
      },
      {
        url: 'https://api.solarpanel.com',
        description: 'Production server (placeholder)',
      },
    ],
    tags: [
      {
        name: 'Health',
        description: 'Health check and system status endpoints',
      },
      {
        name: 'Auth',
        description: 'Authentication and authorization endpoints (coming soon)',
      },
      {
        name: 'Users',
        description: 'User management endpoints (coming soon)',
      },
      {
        name: 'Solar Panels',
        description: 'Solar panel product management (coming soon)',
      },
      {
        name: 'Orders',
        description: 'Order and cart management (coming soon)',
      },
      {
        name: 'Payments',
        description: 'Payment processing endpoints (coming soon)',
      },
      {
        name: 'Installations',
        description: 'Installation tracking and management (coming soon)',
      },
    ],
    components: {
      securitySchemes: {
        BearerAuth: {
          type: 'http',
          scheme: 'bearer',
          bearerFormat: 'JWT',
          description: 'Enter your JWT token in the format: Bearer <token>',
        },
      },
      schemas: {
        // ═══════════════════════════════════════════════════════
        // USER SCHEMAS
        // ═══════════════════════════════════════════════════════
        User: {
          type: 'object',
          properties: {
            _id: {
              type: 'string',
              example: '507f1f77bcf86cd799439011',
            },
            email: {
              type: 'string',
              format: 'email',
              example: 'john.doe@example.com',
            },
            role: {
              type: 'string',
              enum: ['ADMIN', 'CUSTOMER', 'TECHNICIAN'],
              example: 'CUSTOMER',
            },
            isActive: {
              type: 'boolean',
              example: true,
            },
            firstName: {
              type: 'string',
              example: 'John',
            },
            lastName: {
              type: 'string',
              example: 'Doe',
            },
            fullName: {
              type: 'string',
              example: 'John Doe',
            },
            phoneNumber: {
              type: 'string',
              example: '+1234567890',
            },
            profileImage: {
              type: 'string',
              nullable: true,
              example: 'https://example.com/profile.jpg',
            },
            lastLogin: {
              type: 'string',
              format: 'date-time',
              nullable: true,
            },
            createdAt: {
              type: 'string',
              format: 'date-time',
            },
            updatedAt: {
              type: 'string',
              format: 'date-time',
            },
          },
        },
        UserRole: {
          type: 'string',
          enum: ['ADMIN', 'CUSTOMER', 'TECHNICIAN'],
          description: 'User role in the system',
        },
        // ═══════════════════════════════════════════════════════
        // GENERAL SCHEMAS
        // ═══════════════════════════════════════════════════════
        Error: {
          type: 'object',
          properties: {
            success: {
              type: 'boolean',
              example: false,
            },
            message: {
              type: 'string',
              example: 'Error message',
            },
          },
        },
        HealthCheck: {
          type: 'object',
          properties: {
            success: {
              type: 'boolean',
              example: true,
            },
            message: {
              type: 'string',
              example: 'Server is running smoothly',
            },
            data: {
              type: 'object',
              properties: {
                service: {
                  type: 'string',
                  example: 'Solar Panel Installation System',
                },
                environment: {
                  type: 'string',
                  example: 'development',
                },
                timestamp: {
                  type: 'string',
                  format: 'date-time',
                },
                uptime: {
                  type: 'number',
                  example: 123.456,
                },
                database: {
                  type: 'object',
                  properties: {
                    status: {
                      type: 'string',
                      example: 'connected',
                    },
                    name: {
                      type: 'string',
                      example: 'solar_panel_db',
                    },
                    host: {
                      type: 'string',
                      example: 'localhost',
                    },
                    port: {
                      type: 'number',
                      example: 27017,
                    },
                  },
                },
              },
            },
          },
        },
      },
    },
    security: [
      {
        BearerAuth: [],
      },
    ],
  },
  apis: ['./src/app.js'], // Path to the API docs
};

const swaggerSpec = swaggerJsdoc(options);

export default swaggerSpec;