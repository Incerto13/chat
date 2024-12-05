import swaggerJSDoc from 'swagger-jsdoc';
import swaggerUi from 'swagger-ui-express';

/**
 * Set up Swagger API docs
 * @param {express.Application} app
 */
const setupSwagger = (app: any) => {
  const swaggerOptions = {
    definition: {
      openapi: '3.0.0',
      info: {
        title: 'Chat API',
        version: '1.0.0',
        description: 'API for managing chat messages',
      },
      servers: [
        {
          url: 'http://localhost:3002',
        },
      ],
    },
    // Include the path to the swagger definitions
    apis: ['./swaggerDefinitions.ts'], // Swagger will look for annotations in this file
  };

  const swaggerDocs = swaggerJSDoc(swaggerOptions);
  app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocs));
};

export default setupSwagger;
