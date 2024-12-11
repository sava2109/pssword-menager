import { create } from 'zustand';
import { Role } from '../types';

interface RoleState {
  roles: Role[];
  addRole: (role: Omit<Role, 'id'>) => void;
  removeRole: (id: string) => void;
}

export const useRoleStore = create<RoleState>((set) => ({
  roles: [
    { id: '1', name: 'Ruby', color: '#FF0000' },
    { id: '2', name: 'Sapphire', color: '#0000FF' },
    { id: '3', name: 'Emerald', color: '#00FF00' },
    { id: '4', name: 'Topaz', color: '#FFD700' },
    { id: '5', name: 'Amethyst', color: '#9966CC' },
    { id: '6', name: 'Diamond', color: '#B9F2FF' },
    { id: '7', name: 'Pearl', color: '#FDEEF4' },
    { id: '8', name: 'Onyx', color: '#353839' },
    { id: '9', name: 'Jade', color: '#00A36C' },
    { id: '10', name: 'Amber', color: '#FFBF00' },
  ],
  addRole: (role) => {
    set((state) => ({
      roles: [...state.roles, { ...role, id: crypto.randomUUID() }],
    }));
  },
  removeRole: (id) => {
    set((state) => ({
      roles: state.roles.filter((role) => role.id !== id),
    }));
  },
}));