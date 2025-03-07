// src/components/PasswordBlock.tsx
import { Link, Lock, User, Edit } from 'lucide-react';
import { PasswordBlock as PasswordBlockType } from '../types';
import useAuthStore from '../store/authStore';
import { decryptData } from '../utils/encryption';
import CopyButton from './CopyButton';

interface PasswordBlockProps {
  block: PasswordBlockType;
  onAssignClick: () => void;
  onEditClick: () => void;
}

export default function PasswordBlock({ block, onAssignClick, onEditClick }: PasswordBlockProps) {
  const user = useAuthStore((state) => state.user);
  
  const getVisibleEntries = () => {
    if (!user) return [];
    
    if (user.role === 'admin') {
      return block.entries;
    }
    
    return block.entries.filter(entry => 
      entry.accessLevels.some(level => user.accessLevels.includes(level))
    );
  };

  const visibleEntries = getVisibleEntries();
  
  if (visibleEntries.length === 0) return null;

  return (
    <div className="bg-white overflow-hidden shadow rounded-lg">
      <div className="p-5">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-medium text-gray-900">{block.title}</h3>
          {user?.role === 'admin' && (
            <div className="flex space-x-4">
              <button
                onClick={onEditClick}
                className="text-sm text-blue-600 hover:text-blue-800 flex items-center"
              >
                <Edit className="h-4 w-4 mr-1" />
                Edit
              </button>
              <button
                onClick={onAssignClick}
                className="text-sm text-blue-600 hover:text-blue-800"
              >
                Assign Access
              </button>
            </div>
          )}
        </div>
        
        <div className="mt-4 space-y-4">
          {visibleEntries.map((entry, index) => (
            <div key={index} className="border-t pt-4 first:border-t-0 first:pt-0">
              <div className="flex items-center justify-between mb-2">
                <div className="flex flex-wrap gap-1">
                  {entry.accessLevels.map((level) => (
                    <span key={level} className="px-2 py-1 text-xs font-medium rounded-full bg-gray-100 text-gray-800">
                      {level}
                    </span>
                  ))}
                </div>
              </div>
              
              <div className="flex items-center justify-between text-gray-600">
                <div className="flex items-center">
                  <Link className="h-4 w-4 mr-2" />
                  <a href={entry.link} target="_blank" rel="noopener noreferrer" 
                     className="text-blue-600 hover:text-blue-800">
                    {entry.link}
                  </a>
                </div>
                <CopyButton text={entry.link} label="link" />
              </div>
              
              <div className="flex items-center justify-between text-gray-600 mt-2">
                <div className="flex items-center">
                  <User className="h-4 w-4 mr-2" />
                  <span>{entry.username}</span>
                </div>
                <CopyButton text={entry.username} label="username" />
              </div>
              
              <div className="flex items-center justify-between text-gray-600 mt-2">
                <div className="flex items-center">
                  <Lock className="h-4 w-4 mr-2" />
                  <span>••••••••</span>
                </div>
                <CopyButton 
                  text={decryptData(entry.password)} 
                  label="password"
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}