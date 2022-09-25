import logger from './logger';
import { expect, test, vi } from './test-tools';

test('logger', () => {
  const spy = vi.spyOn(logger, 'info').mockImplementation((msg) => msg);
  logger.info('test log');
  expect(spy).toBeCalledTimes(1);
  expect(spy).toBeCalledWith('test log');
});
