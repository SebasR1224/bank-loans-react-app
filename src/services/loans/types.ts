export interface LoanRequest {
  amount: number;
  customerName: string;
  email: string;
}

export interface LoanResponse {
  id: string;
  amount: number;
  status: 'Pending' | 'Approved' | 'Rejected';
  createdAt: string;
  user: {
    id: string;
    name: string;
    email: string;
  };
}