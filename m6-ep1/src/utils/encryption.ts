import CryptoJS from "crypto-js";

const SECRET_KEY = "safeapp_secret_key"; // Cambiar a un valor seguro y único

// Define a type or interface for your data
interface DataType {  // Replace with the actual structure of your data
  [key: string]: any; // Or more specific properties if known
}

// @ts-ignore
export const encryptData = (data: DataType) => {
  return CryptoJS.AES.encrypt(JSON.stringify(data), SECRET_KEY).toString();
};

// @ts-ignore
export const decryptData = (encryptedData: string | CryptoJS.lib.CipherParams) => {
  try {
    const bytes = CryptoJS.AES.decrypt(encryptedData, SECRET_KEY);
    return JSON.parse(bytes.toString(CryptoJS.enc.Utf8));
  } catch (error) {
    console.error("Error al desencriptar los datos", error);
    return null;
  }
};
