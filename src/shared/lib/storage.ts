export interface KeyValueStorage {
  getItem: (name: string) => string | null;
  setItem: (name: string, value: string) => void;
  removeItem: (name: string) => void;
}

const memory = new Map<string, string>();
let available: boolean | null = null;

const isLocalStorageAvailable = (): boolean => {
  if (available !== null) {
    return available;
  }

  try {
    if (typeof window === 'undefined') {
      available = false;
      return available;
    }

    const probe = '__pexeso_storage_probe__';
    window.localStorage.setItem(probe, probe);
    window.localStorage.removeItem(probe);
    available = true;
  } catch {
    available = false;
  }

  return available;
};

export const safeStorage: KeyValueStorage = {
  getItem: (name) => {
    if (isLocalStorageAvailable()) {
      try {
        return window.localStorage.getItem(name);
      } catch {
        return memory.get(name) ?? null;
      }
    }

    return memory.get(name) ?? null;
  },
  setItem: (name, value) => {
    if (isLocalStorageAvailable()) {
      try {
        window.localStorage.setItem(name, value);
        return;
      } catch {
        memory.set(name, value);
        return;
      }
    }

    memory.set(name, value);
  },
  removeItem: (name) => {
    if (isLocalStorageAvailable()) {
      try {
        window.localStorage.removeItem(name);
        return;
      } catch {
        memory.delete(name);
        return;
      }
    }

    memory.delete(name);
  },
};
