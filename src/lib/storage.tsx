import { EncryptStorage } from 'encrypt-storage';

export let encryptStorage: EncryptStorage;

export const setupEncryptStorage = (secretkey: string) => {
  if (!encryptStorage) {
    encryptStorage = new EncryptStorage(secretkey);
  }

  return encryptStorage;
};

export const setEncryptStorage = (key: string, value: any) => {
  encryptStorage.setItem(key, value);
};

export const setMultiEncryptStorage = (param: [string, any][]) => {
  encryptStorage.setMultipleItems(param);
};

export const getEncryptStorage = (key: string) => encryptStorage.getItem(key);

export const getMultiEncryptStorage = (keys: string[]) =>
  encryptStorage.getMultipleItems(keys);

export const removeEncryptStorage = (key: string) =>
  encryptStorage.removeItem(key);

export const removeMultiEncryptStorage = (keys: string[]) =>
  encryptStorage.removeMultipleItems(keys);

export const clearEncryptStorage = () => encryptStorage.clear();

/** LocalStorage */
export const setLocaleStorage = (key: string, value: any) => {
  localStorage.setItem(key, value);
};

export const setMultiLocaleStorage = (param: [string, any][]) => {
  param?.map(([key, value]) => localStorage.setItem(key, value));
};

export const getLocaleStorage = (key: string) => localStorage.getItem(key);

export const getMultiLocaleStorage = (keys: string[]) =>
  keys?.map((key) => localStorage.getItem(key));

export const removeLocalStorage = (key: string) => localStorage.removeItem(key);

export const removeMultiLocaleStorage = (keys: string[]) =>
  keys?.map((key) => localStorage.removeItem(key));

export const clearLocaleStorage = () => localStorage.clear();

export const clearAllStorage = () => {
  const appLang = localStorage.getItem('appLang');

  encryptStorage.clear();
  localStorage.clear();

  localStorage.setItem('appLang', appLang ?? '');
};
