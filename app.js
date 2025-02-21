const express = require('express');
const app = express();
const port = process.env.PORT || 3000;
const waitingListAccountRoutes = require('./src/routes/waitingListAccountModule');
const swaggerUi = require('swagger-ui-express');
const swaggerSpec = require('./swagger/swaggerConfig');

app.use(express.json());

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));
app.use('/', waitingListAccountRoutes);

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
