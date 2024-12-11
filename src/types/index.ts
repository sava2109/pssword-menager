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
  link: string;
  username: string;
  password: string;
  accessLevels: string[];
}

export interface PasswordBlock {
  id: string;
  title: string;
  entries: PasswordEntry[];
  createdAt: string;
  updatedAt: string;
  createdBy: string;
}