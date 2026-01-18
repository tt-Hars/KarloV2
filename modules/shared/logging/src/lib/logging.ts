import { AsyncLocalStorage } from 'async_hooks';
import { Request, Response, NextFunction } from 'express';
import { v4 as uuidv4 } from 'uuid';
import axios from 'axios';
const stringify = require('json-stringify-safe');

// 1. Correlation ID Middleware
const asyncLocalStorage = new AsyncLocalStorage<string>();

export const correlationIdMiddleware = (req: Request, res: Response, next: NextFunction) => {
  const correlationId = (req.headers['x-correlation-id'] as string) || uuidv4();

  // Attach to response headers
  res.setHeader('x-correlation-id', correlationId);

  asyncLocalStorage.run(correlationId, () => {
    next();
  });
};

export const getCorrelationId = (): string | undefined => {
  return asyncLocalStorage.getStore();
};

// 2. Logger Utility
export class Logger {
  private loggingServiceUrl: string;
  private serviceName: string;

  constructor(serviceName: string, loggingServiceUrl: string) {
    this.serviceName = serviceName;
    this.loggingServiceUrl = loggingServiceUrl;
  }

  private async sendLog(level: string, message: string, meta: Record<string, any> = {}) {
    const correlationId = getCorrelationId();
    const logEntry = {
      timestamp: new Date().toISOString(),
      service: this.serviceName,
      correlationId,
      level,
      message,
      ...meta,
    };

    // Non-blocking send
    // Use json-stringify-safe to safely serialize potential circular structures in meta
    // Then parse it back to an object because axios expects an object (it stringifies internally, but we must sanitize first)
    const sanitizedLogEntry = JSON.parse(stringify(logEntry));

    axios.post(this.loggingServiceUrl, sanitizedLogEntry).catch((err) => {
      // Intentionally simplified error log to prevent recursion or massive output
      console.error('Failed to send log to logging service:', err.message);
    });

    // Also log to console for local debugging
    console.log(`[${this.serviceName}] [${level}] ${message}`, correlationId ? `(CID: ${correlationId})` : '');
  }

  info(message: string, meta?: Record<string, any>) {
    this.sendLog('info', message, meta);
  }

  error(message: string, meta?: Record<string, any>) {
    this.sendLog('error', message, meta);
  }

  warn(message: string, meta?: Record<string, any>) {
    this.sendLog('warn', message, meta);
  }
}

// 3. Function Tracking HOF
export function withLogging<T extends (...args: any[]) => any>(
  logger: Logger,
  fnName: string,
  fn: T
): T {
  return (async (...args: any[]) => {
    const correlationId = getCorrelationId();
    // Sanitize args before logging to avoid circular deps
    try {
        const sanitizedArgs = JSON.parse(stringify(args));
        logger.info(`Starting function execution: ${fnName}`, { args: sanitizedArgs, correlationId });
    } catch (e) {
        logger.info(`Starting function execution: ${fnName}`, { args: '[Circular/Unserializable]', correlationId });
    }

    try {
      const result = await Promise.resolve(fn(...args));

      try {
          const sanitizedResult = JSON.parse(stringify(result));
          logger.info(`Function execution success: ${fnName}`, { result: sanitizedResult, correlationId });
      } catch (e) {
          logger.info(`Function execution success: ${fnName}`, { result: '[Circular/Unserializable]', correlationId });
      }

      return result;
    } catch (error: any) {
      logger.error(`Function execution failed: ${fnName}`, { error: error.message, stack: error.stack, correlationId });
      throw error;
    }
  }) as unknown as T;
}
