import { useEffect, useState } from 'react';
import { LoanResponse } from '../services/loans/types';

const mapStatusToColor = {
  Approved: 'bg-green-100 text-green-800',
  Rejected: 'bg-red-100 text-red-800',
  Pending: 'bg-yellow-100 text-yellow-800'
}

const mapStatusToText = {
  Approved: 'Aprobado',
  Rejected: 'Rechazado',
  Pending: 'Pendiente'
}

interface LoanListProps {
  title?: string;
  showActions?: boolean;
  onApprove?: (loanId: string) => Promise<void>;
  onReject?: (loanId: string) => Promise<void>;
  fetchLoansFn: () => Promise<LoanResponse[]>;
}

export const LoanList = ({
  title = "Préstamos",
  showActions = false,
  onApprove,
  onReject,
  fetchLoansFn
}: LoanListProps) => {
  const [loans, setLoans] = useState<LoanResponse[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchLoans = async () => {
    try {
      setIsLoading(true);
      setError(null);
      const userLoans = await fetchLoansFn();
      setLoans(userLoans);
    } catch (err) {
      console.error(err);
      setError('Error al cargar los préstamos');
    } finally {
      setIsLoading(false);
    }
  };

  const handleApprove = async (loanId: string) => {
    if (!onApprove) return;
    try {
      await onApprove(loanId);
      await fetchLoans();
    } catch (err) {
      console.error(err);
      setError('Error al aprobar el préstamo');
    }
  };

  const handleReject = async (loanId: string) => {
    if (!onReject) return;
    try {
      await onReject(loanId);
      await fetchLoans();
    } catch (err) {
      console.error(err);
      setError('Error al rechazar el préstamo');
    }
  };

  useEffect(() => {
    fetchLoans();
  }, []);

  if (isLoading) {
    return <div className="text-center py-4">Cargando préstamos...</div>;
  }

  if (error) {
    return <div className="text-red-500 text-center py-4">{error}</div>;
  }

  if (loans.length === 0) {
    return <div className="text-center py-4">No hay préstamos disponibles</div>;
  }

  return (
    <div className="mt-8">
      <h3 className="text-xl font-semibold mb-4">{title}</h3>
      <div className="space-y-4">
        {loans.map((loan) => (
          <div key={loan.id} className="bg-white p-4 rounded-lg shadow">
            <div className="flex justify-between items-center">
              <div>
                <p className="font-semibold">Monto: ${loan.amount}</p>
                <p className="text-sm text-gray-600">Fecha: {new Date(loan.createdAt).toLocaleDateString()}</p>
              </div>
              <div className="flex items-center space-x-2">
                <span className={`px-3 py-1 rounded-full text-sm ${
                  mapStatusToColor[loan.status as keyof typeof mapStatusToColor]
                }`}>
                  {mapStatusToText[loan.status as keyof typeof mapStatusToText]}
                </span>
                {showActions && loan.status === 'Pending' && (
                  <>
                    <button
                      onClick={() => handleApprove(loan.id)}
                      className="px-3 py-1 bg-green-500 text-white rounded hover:bg-green-600 transition-colors"
                    >
                      Aprobar
                    </button>
                    <button
                      onClick={() => handleReject(loan.id)}
                      className="px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600 transition-colors"
                    >
                      Rechazar
                    </button>
                  </>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};