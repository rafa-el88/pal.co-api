import swaggerJSDoc from 'swagger-jsdoc';

export const swaggerOptions = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Palco API',
      version: '1.0.0',
      description: 'API for Palco application'
    },
  },
  apis: ['./src/routes/*.js'], // Path to the API routes
};

export const swaggerSpecs = swaggerJSDoc(swaggerOptions);
