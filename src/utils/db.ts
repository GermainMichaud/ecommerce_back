import config from 'config';
import mongoose from 'mongoose';

import log from './logger';

const connect = async () => {
  try {
    await mongoose.connect(config.get<string>('database'));
    log.info('Connected to MongoDB');
  } catch (err) {
    log.error(err);
    log.error('Could not connect to MongoDB', err);
    process.exit(1);
  }
};

export default connect;
