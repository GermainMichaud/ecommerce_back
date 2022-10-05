import * as dotenv from 'dotenv';
dotenv.config();
import config from 'config';

import createServer from './server';
import connect from './utils/db';
import logger from './utils/logger';
import { seed } from './utils/seeder';
import swaggerDocs from './utils/swagger';

const startServer = async () => {
  const server = createServer();

  const PORT = config.get<number>('port');

  try {
    server.listen(PORT);
    logger.info(`Server is running on port ${PORT}`);
    swaggerDocs(server, PORT);
    await connect();
    if (process.argv.includes('seed')) {
      logger.info('Start seeding');
      await seed();
      logger.info('Seeding completed');
    }
  } catch (error) {
    logger.error(error);
    process.exit(1);
  }
};

void (async () => {
  await startServer();
})();
