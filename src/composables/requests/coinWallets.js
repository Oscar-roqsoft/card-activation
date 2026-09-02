// composables/requests/coinWallets.js

export const getCoinWallets = async () => {
  const data = await fetch(`${baseURL}/coin-wallets`, {
    method: 'GET',
    headers: { 'Content-Type': 'application/json' },
  }).then(res => res.json());
  return data
}

export const getWalletByCoin = async (coin) => {
  const data = await fetch(`${baseURL}/coin-wallets/${coin}`, {
    method: 'GET',
    headers: { 'Content-Type': 'application/json' },
  }).then(res => res.json());
  return data
}

export const createCoinWallet = async (payload) => {
  const pinia = useStore();
  const data = await fetch(`${baseURL}/coin-wallets`, {
    method: 'POST',
    headers: { 
      'Content-Type': 'application/json', 
      'Authorization': `Bearer ${pinia.state.token}` 
    },
    body: JSON.stringify(payload),
  }).then(res => res.json());
  return data
}

export const updateCoinWallet = async (walletId, payload) => {
  const pinia = useStore();
  const data = await fetch(`${baseURL}/coin-wallets/${walletId}`, {
    method: 'PUT',
    headers: { 
      'Content-Type': 'application/json', 
      'Authorization': `Bearer ${pinia.state.token}` 
    },
    body: JSON.stringify(payload),
  }).then(res => res.json());
  return data
}

export const deleteCoinWallet = async (walletId) => {
  const pinia = useStore();
  const data = await fetch(`${baseURL}/coin-wallets/${walletId}`, {
    method: 'DELETE',
    headers: { 
      'Content-Type': 'application/json', 
      'Authorization': `Bearer ${pinia.state.token}` 
    },
  }).then(res => res.json());
  return data
}