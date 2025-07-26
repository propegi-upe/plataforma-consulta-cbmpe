/* eslint-disable @typescript-eslint/no-explicit-any */

import { userData } from '@/types/user';

interface LocalStorageData {
  userData: userData | null;
}

const LOCAL_STORAGE = 'local_persist';

const INITIAL_VALUE: LocalStorageData = {
  userData: null,
};

class LocalDataModel {
  constructor() {
    if (typeof localStorage !== 'undefined' && localStorage.getItem(LOCAL_STORAGE) === null) {
      localStorage.setItem(LOCAL_STORAGE, JSON.stringify(INITIAL_VALUE));
    }
  }

  private get data() {
    if (typeof localStorage !== 'undefined') {
      const _data = localStorage.getItem(LOCAL_STORAGE);
      return _data ? JSON.parse(_data) : { ...INITIAL_VALUE };
    } else {
      return { ...INITIAL_VALUE }; // Return default value if localStorage is empty
    }
  }

  private set data(value: LocalStorageData) {
    if (typeof localStorage !== 'undefined') {
      localStorage.setItem(LOCAL_STORAGE, JSON.stringify(value));
    }
  }

  public get user() {
    return this.data?.userData;
  }

  public set user(value: any | null) {
    const _data = this.data || { ...INITIAL_VALUE };
    _data.userData = value;
    this.data = _data;
  }

  public clear() {
    const _data = { ...INITIAL_VALUE };
    this.data = _data;
  }
}

export const localData = new LocalDataModel();
