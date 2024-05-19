import crypto from "crypto";

const algorithm = "aes-256-cbc";
const key = crypto.randomBytes(32);
const iv = crypto.randomBytes(16);

export const encrypt = (details: BillingDetails): EncryptedData => {
  const text = JSON.stringify(details);
  const cipher = crypto.createCipheriv(algorithm, key, iv);
  let encrypted = cipher.update(text, "utf8", "hex");
  encrypted += cipher.final("hex");
  return { iv: iv.toString("hex"), encryptedData: encrypted };
};

export const decrypt = (encrypted: EncryptedData): BillingDetails => {
  const decipher = crypto.createDecipheriv(
    algorithm,
    key,
    Buffer.from(encrypted.iv, "hex")
  );
  let decrypted = decipher.update(encrypted.encryptedData, "hex", "utf8");
  decrypted += decipher.final("utf8");
  return JSON.parse(decrypted);
};
