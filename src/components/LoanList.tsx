import { useEffect, useState } from 'react';
import { loanService } from '../services/loans/loanService';
import { LoanResponse } from '../services/loans/types';


export const LoanList = () => {
  const [loans, setLoans] = useState<LoanResponse[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchLoans = async () => {
    try {
      setIsLoading(true);
      setError(null);
      const userLoans = await loanService.getLoanByCustomerEmail();
      setLoans(userLoans);
    } catch (err) {
      console.error(err);
      setError('Error al cargar los préstamos');
    } finally {
      setIsLoading(false);
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
    return <div className="text-center py-4">No tienes préstamos solicitados</div>;
  }

  return (
    <div className="mt-8">
      <h3 className="text-xl font-semibold mb-4">Mis Préstamos</h3>
      <div className="space-y-4">
        {loans.map((loan) => (
          <div key={loan.id} className="bg-white p-4 rounded-lg shadow">
            <div className="flex justify-between items-center">
              <div>
                <p className="font-semibold">Monto: ${loan.amount}</p>
                <p className="text-sm text-gray-600">Fecha: {new Date(loan.createdAt).toLocaleDateString()}</p>
              </div>
              <span className={`px-3 py-1 rounded-full text-sm ${
                loan.status === 'approved' ? 'bg-green-100 text-green-800' :
                loan.status === 'rejected' ? 'bg-red-100 text-red-800' :
                'bg-yellow-100 text-yellow-800'
              }`}>
                {loan.status === 'approved' ? 'Aprobado' :
                 loan.status === 'rejected' ? 'Rechazado' :
                 'Pendiente'}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};