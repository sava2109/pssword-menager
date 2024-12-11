import { create } from 'zustand';
import { User } from '../types';

interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  login: (username: string, password: string) => Promise<void>;
  logout: () => void;
}

const users: User[] = [
  {
    id: '1',
    username: 'admin',
    role: 'admin',
    accessLevels: ['Ruby', 'Sapphire', 'Emerald', 'Topaz', 'Amethyst', 'Diamond', 'Pearl', 'Onyx', 'Jade', 'Amber'],
  },
  {
    id: '2',
    username: 'ruby',
    role: 'user',
    accessLevels: ['Ruby'],
  },
  {
    id: '3',
    username: 'sapphire',
    role: 'user',
    accessLevels: ['Sapphire'],
  },
  {
    id: '4',
    username: 'emerald',
    role: 'user',
    accessLevels: ['Emerald'],
  },
  {
    id: '5',
    username: 'topaz',
    role: 'user',
    accessLevels: ['Topaz'],
  },
  {
    id: '6',
    username: 'amethyst',
    role: 'user',
    accessLevels: ['Amethyst'],
  },
  {
    id: '7',
    username: 'diamond',
    role: 'user',
    accessLevels: ['Diamond'],
  },
  {
    id: '8',
    username: 'pearl',
    role: 'user',
    accessLevels: ['Pearl'],
  },
  {
    id: '9',
    username: 'onyx',
    role: 'user',
    accessLevels: ['Onyx'],
  },
  {
    id: '10',
    username: 'jade',
    role: 'user',
    accessLevels: ['Jade'],
  },
  {
    id: '11',
    username: 'amber',
    role: 'user',
    accessLevels: ['Amber'],
  },
];

const useAuthStore = create<AuthState>((set) => ({
  user: null,
  isAuthenticated: false,
  login: async (username: string, password: string) => {
    const user = users.find(
      (u) => u.username === username && password === username
    );
    if (user) {
      set({ user, isAuthenticated: true });
    } else {
      throw new Error('Invalid credentials');
    }
  },
  logout: () => {
    set({ user: null, isAuthenticated: false });
  },
}));

export default useAuthStore;