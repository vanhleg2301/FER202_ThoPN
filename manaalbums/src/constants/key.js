import CryptoJS from "crypto-js";

export const secretKey = "your_secret_key";

export const encrypt = (code) => {
  return CryptoJS.AES.encrypt(code, secretKey).toString();
};

export const decrypt = (ciphertext) => {
  try {
    // Ensure ciphertext is a non-empty string
    if (!ciphertext || typeof ciphertext !== 'string') {
      throw new Error("Invalid ciphertext");
    }

    const bytes = CryptoJS.AES.decrypt(ciphertext, secretKey);
    const originalText = bytes.toString(CryptoJS.enc.Utf8);

    // Check if decryption was successful
    if (!originalText) {
      throw new Error("Failed to decrypt password");
    }

    return originalText;
  } catch (error) {
    console.error("Decryption error:", error);
    return null; // Return null or handle the error as needed
  }
};
