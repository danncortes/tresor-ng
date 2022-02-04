import * as CryptoJS from 'crypto-js';

export const cryptData = (data: any, pass: string) => {
  return CryptoJS.AES.encrypt(data, `${pass}`).toString();
};

export const decryptData = (cryptedData: string, pass: string) => {
  const bytes = CryptoJS.AES.decrypt(cryptedData, `${pass}`);
  return bytes.toString(CryptoJS.enc.Utf8);
};

export const cryptDataObj = (data: any, pass: string) => {
  return CryptoJS.AES.encrypt(JSON.stringify(data), `${pass}`).toString();
};

export const decryptDataObj = (cryptedData: string, pass: string): any => {
  const bytes = CryptoJS.AES.decrypt(cryptedData, `${pass}`);
  return JSON.parse(bytes.toString(CryptoJS.enc.Utf8));
};
