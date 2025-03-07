// src/components/CategoryCard.tsx
import { Folder } from 'lucide-react';
import { Category, PasswordEntry } from '../types';

interface CategoryCardProps {
  category: Category;
  passwords: PasswordEntry[];
}

export default function CategoryCard({ category, passwords }: CategoryCardProps) {
  return (
    <div className="bg-white overflow-hidden shadow rounded-lg">
      <div className="p-5">
        <div className="flex items-center">
          <Folder className="h-6 w-6 text-blue-600" />
          <h3 className="ml-2 text-lg font-medium text-gray-900">
            {category.name}
          </h3>
        </div>
        <div className="mt-4">
          <div className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
            category.accessLevel === 'green' ? 'bg-green-100 text-green-800' :
            category.accessLevel === 'yellow' ? 'bg-yellow-100 text-yellow-800' :
            'bg-red-100 text-red-800'
          }`}>
            {category.accessLevel}
          </div>
        </div>
      </div>
      <div className="bg-gray-50 px-5 py-3">
        <div className="text-sm">
          {passwords.map((password) => (
            <div key={password.id} className="mb-2">
              <div className="font-medium text-gray-900">{password.title}</div>
              <div className="text-gray-500">{password.username}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}