import React, { useState } from 'react';
import { X } from 'lucide-react';
import { usePasswordStore } from '../store/passwordStore';

interface AssignBlockModalProps {
  isOpen: boolean;
  onClose: () => void;
  blockId: string | null;
}

export default function AssignBlockModal({ isOpen, onClose, blockId }: AssignBlockModalProps) {
  const [userIds, setUserIds] = useState('');
  const updateBlockAccess = usePasswordStore((state) => state.updateBlockAccess);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (blockId) {
      updateBlockAccess(blockId, userIds.split(',').map(id => id.trim()));
      onClose();
      setUserIds('');
    }
  };

  if (!isOpen || !blockId) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 w-full max-w-md">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold">Assign Block Access</h2>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
            <X className="h-6 w-6" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">
              User IDs (comma-separated)
            </label>
            <input
              type="text"
              value={userIds}
              onChange={(e) => setUserIds(e.target.value)}
              placeholder="e.g., user1, user2, user3"
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            />
            <p className="mt-1 text-sm text-gray-500">
              Enter the IDs of users who should have access to this block
            </p>
          </div>

          <div className="flex justify-end space-x-3 mt-6">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-blue-600 text-white rounded-md text-sm font-medium hover:bg-blue-700"
            >
              Assign Access
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}