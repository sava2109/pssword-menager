// src/components/Dashboard.tsx
import { useState } from 'react';
import { Plus } from 'lucide-react';
import useAuthStore from '../store/authStore';
import { usePasswordStore } from '../store/passwordStore';
import Navigation from './Navigation';
import PasswordBlock from './PasswordBlock';
import AddBlockModal from './AddBlockModal';
import EditBlockModal from './EditBlockModal';
import AssignBlockModal from './AssignBlockModal';
import { PasswordBlock as PasswordBlockType } from '../types';

export default function Dashboard() {
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isAssignModalOpen, setIsAssignModalOpen] = useState(false);
  const [selectedBlock, setSelectedBlock] = useState<PasswordBlockType | null>(null);
  const user = useAuthStore((state) => state.user);
  const { blocks } = usePasswordStore();

  const handleAssignClick = (block: PasswordBlockType) => {
    setSelectedBlock(block);
    setIsAssignModalOpen(true);
  };

  const handleEditClick = (block: PasswordBlockType) => {
    setSelectedBlock(block);
    setIsEditModalOpen(true);
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <Navigation />

      <main className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        <div className="px-4 py-6 sm:px-0">
          <div className="flex justify-between items-center mb-6">
            <h1 className="text-2xl font-semibold text-gray-900">Password Blocks</h1>
            {user?.role === 'admin' && (
              <div className="flex space-x-4">
                <button 
                  onClick={() => setIsAddModalOpen(true)}
                  className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
                >
                  <Plus className="h-5 w-5 mr-2" />
                  Add Block
                </button>
              </div>
            )}
          </div>

          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {blocks.map((block) => (
              <PasswordBlock 
                key={block.id} 
                block={block}
                onAssignClick={() => handleAssignClick(block)}
                onEditClick={() => handleEditClick(block)}
              />
            ))}
          </div>
        </div>
      </main>

      <AddBlockModal 
        isOpen={isAddModalOpen}
        onClose={() => setIsAddModalOpen(false)}
      />
      
      <EditBlockModal
        isOpen={isEditModalOpen}
        onClose={() => {
          setIsEditModalOpen(false);
          setSelectedBlock(null);
        }}
        block={selectedBlock}
      />
      
      <AssignBlockModal
        isOpen={isAssignModalOpen}
        onClose={() => {
          setIsAssignModalOpen(false);
          setSelectedBlock(null);
        }}
        blockId={selectedBlock?.id || null}
      />
    </div>
  );
}