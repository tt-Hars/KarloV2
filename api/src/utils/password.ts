import { randomBytes, pbkdf2Sync, timingSafeEqual } from 'crypto';

const SALT_LENGTH = 16; // in bytes
const ITERATIONS = 100000;
const KEY_LENGTH = 64; // in bytes
const DIGEST = 'sha512';

export async function encryptPassword(password: string): Promise<string> {
  const salt = randomBytes(SALT_LENGTH).toString('hex');
  const derivedKey = pbkdf2Sync(password, salt, ITERATIONS, KEY_LENGTH, DIGEST).toString('hex');
  return `${salt}:${derivedKey}`;
}

export async function matchPasswords(
  enteredPassword: string,
  actualPassword: string,
): Promise<boolean> {
  const [salt, hashedPassword] = actualPassword.split(':');
  const derivedKey = pbkdf2Sync(enteredPassword, salt, ITERATIONS, KEY_LENGTH, DIGEST).toString('hex');

  // Timing-safe comparison
  const hashedBuffer = Buffer.from(hashedPassword, 'hex');
  const derivedBuffer = Buffer.from(derivedKey, 'hex');
  const match = hashedBuffer.length === derivedBuffer.length && timingSafeEqual(hashedBuffer, derivedBuffer);

  return match;
}
