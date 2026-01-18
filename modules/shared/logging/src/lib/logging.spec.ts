import { Logger, withLogging, correlationIdMiddleware, getCorrelationId } from './logging';
import axios from 'axios';
import { Request, Response, NextFunction } from 'express';

jest.mock('axios');
const mockedAxios = axios as jest.Mocked<typeof axios>;

describe('Logging Library', () => {
  const LOGGING_URL = 'http://localhost:3337/logs';
  let logger: Logger;

  beforeEach(() => {
    // Mock axios.post to return a Promise so .catch() works
    mockedAxios.post.mockResolvedValue({ data: {} });
    logger = new Logger('test-service', LOGGING_URL);
    jest.clearAllMocks();
  });

  describe('Logger', () => {
    it('should send info logs to the logging service', () => {
      logger.info('Test message');
      expect(mockedAxios.post).toHaveBeenCalledWith(LOGGING_URL, expect.objectContaining({
        service: 'test-service',
        level: 'info',
        message: 'Test message'
      }));
    });

    it('should send error logs to the logging service', () => {
      logger.error('Error message');
      expect(mockedAxios.post).toHaveBeenCalledWith(LOGGING_URL, expect.objectContaining({
        service: 'test-service',
        level: 'error',
        message: 'Error message'
      }));
    });
  });

  describe('withLogging HOF', () => {
    it('should log start and success of a function', async () => {
      const mockFn = jest.fn().mockResolvedValue('success');
      const wrappedFn = withLogging(logger, 'mockFn', mockFn);

      const result = await wrappedFn('arg1');

      expect(result).toBe('success');
      expect(mockFn).toHaveBeenCalledWith('arg1');
      // 1 call for start, 1 for success
      expect(mockedAxios.post).toHaveBeenCalledTimes(2);
    });

    it('should log failure of a function', async () => {
      const error = new Error('fail');
      const mockFn = jest.fn().mockRejectedValue(error);
      const wrappedFn = withLogging(logger, 'mockFn', mockFn);

      await expect(wrappedFn()).rejects.toThrow('fail');

      // 1 call for start, 1 for failure
      expect(mockedAxios.post).toHaveBeenCalledTimes(2);
      expect(mockedAxios.post).toHaveBeenCalledWith(LOGGING_URL, expect.objectContaining({
        level: 'error',
        message: expect.stringContaining('Function execution failed: mockFn')
      }));
    });
  });
});
