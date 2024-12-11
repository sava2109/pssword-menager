import { create } from 'zustand';
import { PasswordBlock } from '../types';
import { encryptData } from '../utils/encryption';

interface PasswordState {
  blocks: PasswordBlock[];
  addBlock: (block: Omit<PasswordBlock, 'id' | 'createdAt' | 'updatedAt'>) => void;
  updateBlock: (id: string, block: PasswordBlock) => void;
  deleteBlock: (id: string) => void;
}

export const usePasswordStore = create<PasswordState>((set) => ({
  blocks: [],
  addBlock: (block) => {
    set((state) => ({
      blocks: [
        ...state.blocks,
        {
          ...block,
          id: crypto.randomUUID(),
          entries: block.entries.map(entry => ({
            ...entry,
            password: encryptData(entry.password)
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
}));