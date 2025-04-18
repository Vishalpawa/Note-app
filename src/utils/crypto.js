import CryptoJS from "crypto-js";

const SECRET_KEY = "mySuperSecretKey123";

export const encryptData = (data) => {
  const stringData = JSON.stringify(data);
  return CryptoJS.AES.encrypt(stringData, SECRET_KEY).toString();
};

export const decryptData = (encryptedData) => {
  const bytes = CryptoJS.AES.decrypt(encryptedData, SECRET_KEY);
  const decrypted = bytes.toString(CryptoJS.enc.Utf8);
  return JSON.parse(decrypted);
};

// Fetch all decrypted notes
export const getDecryptedNotes = () => {
  const raw = localStorage.getItem("encryptedNotes");
  if (!raw) return [];
  const encryptedNotes = JSON.parse(raw);
  return encryptedNotes.map(decryptData);
};
