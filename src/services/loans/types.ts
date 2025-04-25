export interface LoanRequest {
  amount: number;
  customerName: string;
  email: string;
}

export interface LoanResponse {
  id: string;
  amount: number;
  status: 'pending' | 'approved' | 'rejected';
  createdAt: string;
  user: {
    id: string;
    name: string;
    email: string;
  };
}