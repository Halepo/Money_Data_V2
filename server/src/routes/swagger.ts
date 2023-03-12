require('dotenv').config();
const swaggerJsDoc = require('swagger-jsdoc');

const serverName =
  process.env.ENVIRONMENT === 'dev'
    ? `http://localhost:${process.env.API_PORT}/api`
    : 'Production Server';

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Library API',
      version: '1.0.0',
      description: 'Backend API docs for Money data app',
      termsOfService: 'http://example.com/terms/',
      contact: {
        name: 'API Support',
        url: 'http://www.exmaple.com/support',
        email: 'support@example.com',
      },
    },
    servers: [
      {
        url: serverName,
        description: 'Money Manger Server API Docs',
      },
    ],
  },
  apis: ['**/*.ts'],
};

export const swaggerSpecs = swaggerJsDoc(options);
