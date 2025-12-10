const app = require('./app');
const { app: appConfig } = require('./config/config');
const PORT = appConfig.port || 4000;
app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
