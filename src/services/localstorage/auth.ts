type StorageAuthToken = {
  access_token: string;
};

const storageKey = "auth";

export default {
  getToken: (): StorageAuthToken | undefined => {
    const token = localStorage.getItem(storageKey);
    if (!token) return undefined;
    return JSON.parse(token);
  },
  setToken: (token: StorageAuthToken) =>
    localStorage.setItem(storageKey, JSON.stringify(token)),
  removeToken: () => localStorage.removeItem(storageKey),
};
