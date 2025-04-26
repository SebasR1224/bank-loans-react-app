import React, { useState } from 'react';
import { loanService } from '../services/loans/loanService';
import { useAuth } from '../hooks/useAuth';

interface LoanRequestFormProps {
  onSuccess?: () => void;
}

export const LoanRequestForm: React.FC<LoanRequestFormProps> = ({ onSuccess }) => {
  const [amount, setAmount] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const { user } = useAuth();

  if (!user) {
    return null;
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setIsLoading(true);

    try {
      const amountNumber = parseFloat(amount);
      if (isNaN(amountNumber) || amountNumber <= 0) {
        throw new Error('Por favor, ingresa un monto válido');
      }

      await loanService.requestLoan({
        amount: amountNumber,
        customerName: user.name,
        email: user.email
      });
      setAmount('');
      onSuccess?.();
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Error al solicitar el préstamo');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="max-w-md mx-auto mt-8 p-6 bg-white rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-6 text-center">Solicitar Préstamo</h2>

      {error && (
        <div className="mb-4 p-3 bg-red-100 text-red-700 rounded-lg">
          {error}
        </div>
      )}

      <form onSubmit={handleSubmit}>
        <div className="mb-6">
          <label htmlFor="amount" className="block text-gray-700 text-sm font-bold mb-2">
            Monto del Préstamo
          </label>
          <div className="relative">
            <span className="absolute left-3 top-2 text-gray-500">$</span>
            <input
              type="number"
              id="amount"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              className="w-full pl-8 pr-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="0.00"
              step="0.01"
              min="0"
              required
              disabled={isLoading}
            />
          </div>
        </div>

        <button
          type="submit"
          className="w-full bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600 transition-colors disabled:bg-blue-300"
          disabled={isLoading}
        >
          {isLoading ? 'Enviando solicitud...' : 'Solicitar Préstamo'}
        </button>
      </form>
    </div>
  );
};