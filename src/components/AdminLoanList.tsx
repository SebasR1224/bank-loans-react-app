import { loanService } from '../services/loans/loanService';
import { LoanList } from './LoanList';

export const AdminLoanList = () => {
  const handleApprove = async (loanId: string) => {
    await loanService.approveLoan(loanId);
  };

  const handleReject = async (loanId: string) => {
    await loanService.rejectLoan(loanId);
  };

  return (
    <LoanList
      title="Gestión de Préstamos"
      showActions={true}
      fetchLoansFn={loanService.getLoans}
      onApprove={handleApprove}
      onReject={handleReject}
    />
  );
};