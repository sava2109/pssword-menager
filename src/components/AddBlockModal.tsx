// src/components/AddBlockModal.tsx
import { useState } from 'react';
import { X, Plus, Trash2 } from 'lucide-react';
import { usePasswordStore } from '../store/passwordStore';
import { useRoleStore } from '../store/roleStore';
import useAuthStore from '../store/authStore';
import { PasswordEntry } from '../types'; // Uklonite PasswordBlock iz importa

interface AddBlockModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function AddBlockModal({ isOpen, onClose }: AddBlockModalProps) {
  const [title, setTitle] = useState('');
  const [entries, setEntries] = useState<PasswordEntry[]>([
    { id: crypto.randomUUID(), title: '', link: '', username: '', password: '', accessLevels: [], blockId: '' }
  ]);

  const { addBlock } = usePasswordStore();
  const { roles } = useRoleStore();
  const user = useAuthStore((state) => state.user);

  const handleAddEntry = () => {
    setEntries([...entries, { id: crypto.randomUUID(), title: '', link: '', username: '', password: '', accessLevels: [], blockId: '' }]);
  };

  const handleRemoveEntry = (index: number) => {
    setEntries(entries.filter((_, i) => i !== index));
  };

  const handleEntryChange = (index: number, field: keyof PasswordEntry, value: any) => {
    const newEntries = [...entries];
    newEntries[index] = { ...newEntries[index], [field]: value };
    setEntries(newEntries);
  };

  const handleAccessLevelChange = (index: number, roleId: string, checked: boolean) => {
    const newEntries = [...entries];
    const entry = newEntries[index];
    const role = roles.find(r => r.id === roleId);
    
    if (role) {
      if (checked) {
        entry.accessLevels = [...entry.accessLevels, role.name];
      } else {
        entry.accessLevels = entry.accessLevels.filter(level => level !== role.name);
      }
      setEntries(newEntries);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (user) {
      addBlock({
        title,
        entries,
        createdBy: user.id,
        accessLevels: [], // Dodajte ovo
      });
      onClose();
      setTitle('');
      setEntries([{ id: crypto.randomUUID(), title: '', link: '', username: '', password: '', accessLevels: [], blockId: '' }]);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 w-full max-w-2xl max-h-[90vh] overflow-y-auto">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold">Add New Password Block</h2>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
            <X className="h-6 w-6" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
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

          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <h3 className="text-lg font-medium">Entries</h3>
              <button
                type="button"
                onClick={handleAddEntry}
                className="flex items-center px-3 py-2 bg-green-600 text-white rounded-md hover:bg-green-700"
              >
                <Plus className="h-4 w-4 mr-1" />
                Add More
              </button>
            </div>

            {entries.map((entry, index) => (
              <div key={index} className="p-4 border rounded-lg space-y-4">
                <div className="flex justify-between items-center">
                  <h4 className="text-sm font-medium text-gray-700">Entry {index + 1}</h4>
                  {entries.length > 1 && (
                    <button
                      type="button"
                      onClick={() => handleRemoveEntry(index)}
                      className="text-red-600 hover:text-red-700"
                    >
                      <Trash2 className="h-4 w-4" />
                    </button>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700">Access Levels</label>
                  <div className="mt-2 grid grid-cols-2 gap-2">
                    {roles.map((role) => (
                      <label key={role.id} className="flex items-center space-x-2">
                        <input
                          type="checkbox"
                          checked={entry.accessLevels.includes(role.name)}
                          onChange={(e) => handleAccessLevelChange(index, role.id, e.target.checked)}
                          className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                        />
                        <span className="text-sm font-medium" style={{ color: role.color }}>
                          {role.name}
                        </span>
                      </label>
                    ))}
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700">Link</label>
                  <input
                    type="url"
                    required
                    value={entry.link}
                    onChange={(e) => handleEntryChange(index, 'link', e.target.value)}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700">Username</label>
                  <input
                    type="text"
                    required
                    value={entry.username}
                    onChange={(e) => handleEntryChange(index, 'username', e.target.value)}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700">Password</label>
                  <input
                    type="password"
                    required
                    value={entry.password}
                    onChange={(e) => handleEntryChange(index, 'password', e.target.value)}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                  />
                </div>
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
              Add Block
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}