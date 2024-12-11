import React from 'react';
import useAuthStore from './store/authStore';
import LoginForm from './components/LoginForm';
import Dashboard from './components/Dashboard';

function App() {
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated);

  return (
    <div className="min-h-screen bg-gray-100">
      {isAuthenticated ? <Dashboard /> : <LoginForm />}
    </div>
  );
}

export default App;