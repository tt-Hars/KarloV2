import { AsyncLocalStorage } from 'async_hooks';
import { Request, Response, NextFunction } from 'express';
import { v4 as uuidv4 } from 'uuid';
import axios from 'axios';

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
    axios.post(this.loggingServiceUrl, logEntry).catch((err) => {
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
export function withLogging<T extends (...args: any[]) => Promise<any>>(
  logger: Logger,
  fnName: string,
  fn: T
): T {
  return (async (...args: any[]) => {
    const correlationId = getCorrelationId();
    logger.info(`Starting function execution: ${fnName}`, { args, correlationId });

    try {
      const result = await fn(...args);
      logger.info(`Function execution success: ${fnName}`, { result, correlationId });
      return result;
    } catch (error: any) {
      logger.error(`Function execution failed: ${fnName}`, { error: error.message, stack: error.stack, correlationId });
      throw error;
    }
  }) as T;
}
