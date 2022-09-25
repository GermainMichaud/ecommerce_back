import config from 'config';
import * as dotenv from 'dotenv';

import createServer from './server';
import logger from './utils/logger';
import swaggerDocs from './utils/swagger';

dotenv.config();

const startServer = () => {
  const server = createServer();

  const PORT = config.get<number>('port');

  try {
    server.listen(PORT, () => {
      logger.info(`Server is running on port ${PORT}`);
      swaggerDocs(server, PORT);
    });
  } catch (error) {
    logger.error(error);
    process.exit(1);
  }
};

startServer();
