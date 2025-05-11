export const WALLETS_API = {
  walletsList: 'wallets/list',
  wallet: (id: string) => `wallets/${id}`,
  deleteWallet: (id: string) => `wallets/${id}`,
  createWallet: 'wallets/create',
  topUpWallet: 'transactions/create',
  transferToWallet: 'transactions/between-wallets/create',
};
