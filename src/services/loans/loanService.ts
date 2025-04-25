import { fetchService } from '../api/fetchService';
import { authService } from '../auth/authService';
import { LoanRequest, LoanResponse } from './types';

class LoanService {
  async requestLoan(request: LoanRequest): Promise<LoanResponse> {
    const response = await fetchService.post<LoanResponse, LoanRequest>('/Loan', request);
    return response.data;
  }

  async getLoans(): Promise<LoanResponse[]> {
    const response = await fetchService.get<LoanResponse[]>('/Loan');
    return response.data;
  }

  async getLoanByCustomerEmail(): Promise<LoanResponse[]> {
    const user = authService.getCurrentUser();
    const response = await fetchService.get<LoanResponse[]>(`/Loan/customer/${user?.email}`);
    return response.data;
  }
}

export const loanService = new LoanService();