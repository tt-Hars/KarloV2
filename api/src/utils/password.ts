import bcrypt from 'bcrypt'

export async function encryptPassword(password: string) {
  const salt = await bcrypt.genSalt();
  const hashedPass = await bcrypt.hash(password, salt);
  return hashedPass;
}

export async function comparePass(encryptedPassword: string, actualPassword: string) {
  await bcrypt.compare(actualPassword,encryptedPassword)
}