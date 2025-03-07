export interface User {
  id: string;
  username: string;
  role: 'admin' | 'user';
  accessLevels: string[];
}

export interface Role {
  id: string;
  name: string;
  color: string;
}
export interface PasswordEntry {
  id: string; // Dodajte ovo
  title: string; // Dodajte ovo
  link: string;
  username: string;
  password: string;
  accessLevels: string[];
  blockId: string; // Dodajte ovo
}
export interface PasswordEntry {
  id: string; // Dodajte ovo
  title: string; // Dodajte ovo
  link: string;
  username: string;
  password: string;
  accessLevels: string[];
  blockId: string; // Dodajte ovo
}

export interface PasswordBlock {
  id: string;
  title: string;
  entries: PasswordEntry[];
  createdAt: string;
  updatedAt: string;
  createdBy: string;
  accessLevels: string[]; // Dodajte ovo
}

export interface Category {
  id: string;
  name: string;
  accessLevel: 'green' | 'yellow' | 'red'; // Dodajte ovo
}