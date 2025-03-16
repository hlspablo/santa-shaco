import AsyncStorage from '@react-native-async-storage/async-storage';
import { atom } from 'jotai';

import { formatToday2, gRS, generateRandomNumbers } from '@/utils/format';

// Define the setup data interface
export interface SetupData {
  ownerName: string;
  ownerAgency: string;
  ownerAccount: string;
  ownerCPF: string;
  ownerBank: string;
  ownerCard: string;
  balance: number;
  clientName: string;
  clientPix: string;
  clientCPF: string;
  clientBank: string;
  transferValue: number;
  lastTransactionNumber: string;
  lastTransactionTime: string;
  lastTransactionAuthCode: string;
}

// Default values for setup data
const defaultSetupData: SetupData = {
  ownerName: '',
  ownerAgency: '',
  ownerAccount: '',
  ownerCPF: '',
  ownerBank: '',
  ownerCard: '0602',
  balance: 0,
  clientName: '',
  clientPix: '',
  clientCPF: '',
  clientBank: '',
  transferValue: 0,
  lastTransactionNumber: '',
  lastTransactionTime: '',
  lastTransactionAuthCode: '',
};

// Storage key
const STORAGE_KEY = 'setup-data';

// Base atom for setup data
export const setupAtom = atom<SetupData>(defaultSetupData);

// Initialize atom with data from storage
export const initializeStore = async () => {
  try {
    const storedData = await AsyncStorage.getItem(STORAGE_KEY);
    if (storedData) {
      return JSON.parse(storedData) as SetupData;
    }
  } catch (error) {
    console.error('Failed to load data from storage:', error);
  }
  return defaultSetupData;
};

// Save data to storage whenever it changes
export const persistSetupData = async (data: SetupData) => {
  try {
    await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(data));
  } catch (error) {
    console.error('Failed to save data to storage:', error);
  }
};

// Atom for writing to setup that also persists data
export const setupWriteAtom = atom(
  null, // No read function since this is a write-only atom
  (get, set, update: Partial<SetupData>) => {
    const currentData = get(setupAtom);
    const newData = { ...currentData, ...update };
    set(setupAtom, newData);
    persistSetupData(newData);
  }
);

// Derived atoms for specific properties
export const balanceAtom = atom(
  (get) => get(setupAtom).balance,
  (get, set, newBalance: number) => {
    set(setupWriteAtom, { balance: newBalance });
  }
);

export const transferValueAtom = atom(
  (get) => get(setupAtom).transferValue,
  (get, set, value: number) => {
    set(setupWriteAtom, { transferValue: value });
  }
);

// Actions
export const withdrawAction = atom(null, (get, set) => {
  const setup = get(setupAtom);
  const authCode = `${gRS(10)}${gRS(10)}${gRS(3)}`.toUpperCase();
  const transaction = `E${generateRandomNumbers(30)}`;
  const latestTime = formatToday2();

  set(setupWriteAtom, {
    balance: setup.balance - setup.transferValue,
    lastTransactionAuthCode: authCode,
    lastTransactionNumber: transaction,
    lastTransactionTime: latestTime,
  });
});

export const setSetupDataAction = atom(null, (get, set, data: Partial<SetupData>) => {
  set(setupWriteAtom, data);
});
