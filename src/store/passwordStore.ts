import { create } from 'zustand';
import { PasswordBlock, PasswordEntry } from '../types';
import { encryptData } from '../utils/encryption';

interface PasswordState {
  blocks: PasswordBlock[];
  categories: { id: string; name: string }[]; // Dodajte ovo
  addPassword: (password: Omit<PasswordEntry, 'id'>) => void; // Dodajte ovo
  addBlock: (block: Omit<PasswordBlock, 'id' | 'createdAt' | 'updatedAt'>) => void;
  updateBlock: (id: string, block: PasswordBlock) => void;
  deleteBlock: (id: string) => void;
  updateBlockAccess: (blockId: string, userIds: string[]) => void; // Dodajte ovo
}

export const usePasswordStore = create<PasswordState>((set) => ({
  blocks: [],
  categories: [], // Dodajte ovo
  addPassword: (password) => {
    set((state) => ({
      blocks: state.blocks.map((block) => {
        if (block.id === password.blockId) {
          return {
            ...block,
            entries: [
              ...block.entries,
              {
                ...password,
                id: crypto.randomUUID(),
                password: encryptData(password.password),
              },
            ],
          };
        }
        return block;
      }),
    }));
  },
  addBlock: (block) => {
    set((state) => ({
      blocks: [
        ...state.blocks,
        {
          ...block,
          id: crypto.randomUUID(),
          entries: block.entries.map((entry) => ({
            ...entry,
            password: encryptData(entry.password),
          })),
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
        },
      ],
    }));
  },
  updateBlock: (id, updatedBlock) => {
    set((state) => ({
      blocks: state.blocks.map((block) =>
        block.id === id ? { ...updatedBlock } : block
      ),
    }));
  },
  deleteBlock: (id) => {
    set((state) => ({
      blocks: state.blocks.filter((b) => b.id !== id),
    }));
  },
  updateBlockAccess: (blockId, userIds) => {
    set((state) => ({
      blocks: state.blocks.map((block) =>
        block.id === blockId
          ? { ...block, accessLevels: userIds }
          : block
      ),
    }));
  },
}));