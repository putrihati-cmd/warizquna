import crypto from "node:crypto";

const ALGORITHM = "aes-256-gcm";

function getEncryptionKey(): Buffer {
  const secret = process.env.ENCRYPTION_KEY || process.env.AUTH_SECRET;
  if (!secret || secret.length < 32) {
    throw new Error("ENCRYPTION_KEY or AUTH_SECRET env var must be set and at least 32 chars long");
  }
  // Standardize key size to exactly 32 bytes (256 bits)
  return crypto.createHash("sha256").update(secret).digest();
}

export function encrypt(text: string): string {
  const iv = crypto.randomBytes(12);
  const key = getEncryptionKey();
  const cipher = crypto.createCipheriv(ALGORITHM, key, iv);
  
  let encrypted = cipher.update(text, "utf8", "hex");
  encrypted += cipher.final("hex");
  
  const authTag = cipher.getAuthTag().toString("hex");
  
  // Return packed format: IV:AuthTag:Ciphertext
  return `${iv.toString("hex")}:${authTag}:${encrypted}`;
}

export function decrypt(encryptedText: string): string {
  const parts = encryptedText.split(":");
  if (parts.length !== 3) {
    throw new Error("Invalid encrypted format");
  }
  
  const iv = Buffer.from(parts[0], "hex");
  const authTag = Buffer.from(parts[1], "hex");
  const encrypted = parts[2];
  
  const key = getEncryptionKey();
  const decipher = crypto.createDecipheriv(ALGORITHM, key, iv);
  decipher.setAuthTag(authTag);
  
  let decrypted = decipher.update(encrypted, "hex", "utf8");
  decrypted += decipher.final("utf8");
  
  return decrypted;
}

export function decryptSecret(val: string): string {
  if (!val || !val.includes(":")) {
    // Legacy plaintext secret
    return val;
  }
  try {
    return decrypt(val);
  } catch {
    // Fallback if decryption fails (e.g. key changed)
    return val;
  }
}
