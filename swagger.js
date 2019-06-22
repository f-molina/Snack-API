var swaggerJSDoc = require('swagger-jsdoc');
var swaggerUi = require('swagger-ui-express');

// swagger definition
var swaggerDefinition = {
    swagger: "2.0",
    info: {
      title: 'Snack API',
      version: '1.0.0',
      description: 'Rest API',
    },
    host: 'localhost:3000',
    basePath: '/api/v1',
  };

  var options = {

    swaggerDefinition: swaggerDefinition,

    apis: ['./**/routes/*.js','products.js'],
    };

  var swaggerSpec = swaggerJSDoc(options);

  module.exports = (app) => {
    app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));
  }