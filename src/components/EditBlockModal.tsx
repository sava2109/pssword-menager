// src/components/EditBlockModal.tsx
import React, { useState } from 'react';
import { X } from 'lucide-react';
import { usePasswordStore } from '../store/passwordStore';
import { PasswordBlock, PasswordEntry } from '../types';

interface EditBlockModalProps {
  isOpen: boolean;
  onClose: () => void;
  block: PasswordBlock | null;
}

export default function EditBlockModal({ isOpen, onClose, block }: EditBlockModalProps) {
  const [title, setTitle] = useState(block?.title || '');
  const [entries, setEntries] = useState<PasswordEntry[]>(block?.entries || []);
  const { updateBlock } = usePasswordStore();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (block) {
      updateBlock(block.id, {
        ...block,
        title,
        entries,
      });
      onClose();
    }
  };

  if (!isOpen || !block) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 w-full max-w-md">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold">Edit Block</h2>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
            <X className="h-6 w-6" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">Title</label>
            <input
              type="text"
              required
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Entries</label>
            {entries.map((entry, index) => (
              <div key={entry.id} className="space-y-2">
                <input
                  type="text"
                  placeholder="Link"
                  value={entry.link}
                  onChange={(e) => {
                    const newEntries = [...entries];
                    newEntries[index].link = e.target.value;
                    setEntries(newEntries);
                  }}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                />
                <input
                  type="text"
                  placeholder="Username"
                  value={entry.username}
                  onChange={(e) => {
                    const newEntries = [...entries];
                    newEntries[index].username = e.target.value;
                    setEntries(newEntries);
                  }}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                />
                <input
                  type="password"
                  placeholder="Password"
                  value={entry.password}
                  onChange={(e) => {
                    const newEntries = [...entries];
                    newEntries[index].password = e.target.value;
                    setEntries(newEntries);
                  }}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                />
              </div>
            ))}
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
              Save Changes
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}