import { LoanRequestForm } from '../components/LoanRequestForm';
import { UserLoanList } from '../components/UserLoanList';
import { AdminLoanList } from '../components/AdminLoanList';
import { useAuth } from '../hooks/useAuth';
import { useState } from 'react';

const Dashboard = () => {
  const { logout, user } = useAuth();
  const [showSuccessMessage, setShowSuccessMessage] = useState(false);

  const handleLoanSuccess = () => {
    setShowSuccessMessage(true);
    setTimeout(() => setShowSuccessMessage(false), 3000);
  };

  const isAdmin = user?.role === 'Administrator';

  return (
    <div className="min-h-screen bg-gray-100">
      <nav className="bg-white shadow-sm">
        <div className="container mx-auto px-4 py-3">
          <div className="flex justify-between items-center">
            <h1 className="text-xl font-semibold text-gray-800">Panel de Usuario</h1>
            <button
              onClick={logout}
              className="flex items-center px-4 py-2 text-sm font-medium text-white bg-red-500 rounded-md hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 transition-colors"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M3 3a1 1 0 00-1 1v12a1 1 0 001 1h12a1 1 0 001-1V4a1 1 0 00-1-1H3zm10 4a1 1 0 10-2 0v4a1 1 0 102 0V7zm-4 0a1 1 0 10-2 0v4a1 1 0 102 0V7zm-4 0a1 1 0 10-2 0v4a1 1 0 102 0V7z" clipRule="evenodd" />
              </svg>
              Cerrar sesión
            </button>
          </div>
        </div>
      </nav>

      <main className="container mx-auto px-4 py-8">
        {showSuccessMessage && (
          <div className="mb-6 p-4 bg-green-100 border border-green-400 text-green-700 rounded-lg">
            <div className="flex items-center">
              <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
              </svg>
              Préstamo solicitado con éxito
            </div>
          </div>
        )}

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {!isAdmin && (
            <div>
              <LoanRequestForm onSuccess={handleLoanSuccess} />
            </div>
          )}
          <div>
            {isAdmin ? <AdminLoanList /> : <UserLoanList />}
          </div>
        </div>
      </main>
    </div>
  );
};

export default Dashboard;