export const API_ENDPOINTS = {
  auth: {
    login: '/auth/login'
  },
  accounts: {
    base: '/accounts'
  },
  transactions: {
    deposit: '/transactions/deposit',
    withdraw: '/transactions/withdraw',
    history: (accountNumber: string) => `/transactions/history/${accountNumber}`
  }
};
