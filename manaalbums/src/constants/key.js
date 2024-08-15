import CryptoJS from "crypto-js";

export const secretKey = "your_secret_key";

export const encryptPassword = (password) => {
  return CryptoJS.AES.encrypt(password, secretKey).toString();
};

export const decryptPassword = (ciphertext) => {
  const bytes = CryptoJS.AES.decrypt(ciphertext, secretKey);
  return bytes.toString(CryptoJS.enc.Utf8);
};
