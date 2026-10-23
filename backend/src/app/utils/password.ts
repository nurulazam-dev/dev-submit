import {
  createHash,
  randomBytes,
  randomInt,
  scrypt,
  timingSafeEqual,
} from "crypto";

const derive = (password: string, salt: Buffer) =>
  new Promise<Buffer>((resolve, reject) => {
    scrypt(password, salt, 64, (err, key) =>
      err ? reject(err) : resolve(key),
    );
  });

const hashPassword = async (password: string) => {
  const salt = randomBytes(16);
  const key = await derive(password, salt);
  return `${salt.toString("hex")}:${key.toString("hex")}`;
};

const comparePassword = async (password: string, stored: string) => {
  const [saltHex, keyHex] = stored.split(":");
  if (!saltHex || !keyHex) return false;

  const key = await derive(password, Buffer.from(saltHex, "hex"));
  const storedKey = Buffer.from(keyHex, "hex");

  return key.length === storedKey.length && timingSafeEqual(key, storedKey);
};

const generateOtp = () => randomInt(100000, 1000000).toString();

const hashOtp = (otp: string) => createHash("sha256").update(otp).digest("hex");

const verifyOtp = (otp: string, storedHash: string) => {
  const a = Buffer.from(hashOtp(otp), "hex");
  const b = Buffer.from(storedHash, "hex");
  return a.length === b.length && timingSafeEqual(a, b);
};

const isTokenStale = (iat: number | undefined, changedAt?: Date | null) => {
  if (!changedAt) return false;
  return (iat ?? 0) < Math.floor(changedAt.getTime() / 1000);
};

export const passwordUtils = {
  hashPassword,
  comparePassword,
  generateOtp,
  hashOtp,
  verifyOtp,
  isTokenStale,
};
