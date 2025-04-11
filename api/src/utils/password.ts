import bcrypt from 'bcrypt';

export async function encryptPassword(password: string) {
  const salt = await bcrypt.genSalt(10);
  const hashedPass = await bcrypt.hash(password, salt);
  return hashedPass;
}

export async function matchPasswords(
  enteredPassword: string,
  actualPassword: string,
) {
  const passwordMatched = await bcrypt.compare(enteredPassword, actualPassword);
  console.log(passwordMatched);
  return passwordMatched;
}
