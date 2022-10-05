import * as dotenv from 'dotenv';
dotenv.config();
import config from 'config';

import createServer from './server';
import { connect, disconnect } from './utils/db';
import logger from './utils/logger';
import swaggerDocs from './utils/swagger';

const startServer = async () => {
  const server = createServer();

  const PORT = config.get<number>('port');

  try {
    server.listen(PORT);
    logger.info(`Server is running on port ${PORT}`);
    swaggerDocs(server, PORT);
    await connect();
  } catch (error) {
    await disconnect();
    logger.error(error);
    process.exit(1);
  }
};

void (async () => {
  await startServer();
})();
