const swaggerJSDoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Korpor API Documentation',
      version: '1.0.0',
      description: 'API documentation for the Korpor authentication system, providing secure user management and authentication services.',
      contact: {
        name: 'API Support',
        email: 'support@korpor.com',
        url: 'https://korpor.com/support'
      },
      license: {
        name: 'MIT',
        url: 'https://opensource.org/licenses/MIT'
      }
    },
    servers: [
      { 
        url: 'http://localhost:5000',
        description: 'Development server'
      },
      {
        url: 'https://api.korpor.com',
        description: 'Production server'
      }
    ],
    components: {
      securitySchemes: {
        bearerAuth: {
          type: 'http',
          scheme: 'bearer',
          bearerFormat: 'JWT'
        }
      }
    },
    tags: [
      {
        name: 'Authentication',
        description: 'User authentication operations including registration, login, and token management'
      },
      {
        name: 'Users',
        description: 'User profile and account management'
      },
      {
        name: 'Admin',
        description: 'Administrative operations for user management'
      },
      {
        name: 'Roles',
        description: 'Role-based access control operations'
      },
      {
        name: 'Mobile App',
        description: 'Endpoints specifically for the mobile application'
      },
      {
        name: 'Backoffice',
        description: 'Endpoints specifically for the backoffice/admin panel'
      }
    ],
    externalDocs: {
      description: 'Find out more about Korpor',
      url: 'https://korpor.com/docs'
    }
  },
  apis: ['./src/routes/*.js', './src/models/*.js'],
};

const swaggerSpec = swaggerJSDoc(options);

const swaggerOptions = {
  explorer: true,
  customCss: '.swagger-ui .topbar { display: none }',
  customSiteTitle: 'Korpor API Documentation',
  customfavIcon: '/favicon.ico'
};

module.exports = (app) => {
  // Serve Swagger UI
  app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec, swaggerOptions));
  
  // Serve Swagger JSON
  app.get('/api-docs.json', (req, res) => {
    res.setHeader('Content-Type', 'application/json');
    res.send(swaggerSpec);
  });
  
  console.log('Swagger documentation initialized');
};
