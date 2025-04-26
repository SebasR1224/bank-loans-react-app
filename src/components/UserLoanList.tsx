import { loanService } from '../services/loans/loanService';
import { LoanList } from './LoanList';

export const UserLoanList = () => {
  return (
    <LoanList
      title="Mis Préstamos"
      showActions={false}
      fetchLoansFn={loanService.getLoanByCustomerEmail}
    />
  );
};