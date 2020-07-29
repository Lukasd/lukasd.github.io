import "@babel/polyfill";
require("dotenv").config();
import config from "./config/config";
import app from "./config/express";

import { sequelize } from "./config/models";

(async () => {
  await sequelize.sync({ force: true }).then(async () => {
    app.listen(config.port, () => {
      console.info(`server started on port ${config.port} (${config.env})`);
    });
  });
})();
