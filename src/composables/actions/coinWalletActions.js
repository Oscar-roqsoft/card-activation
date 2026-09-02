// composables/actions/coinWalletActions.js
import { useStore } from '@/stores'
import {
  getCoinWallets as getCoinWalletsRequest,
  getWalletByCoin as getWalletByCoinRequest,
  createCoinWallet as createCoinWalletRequest,
  updateCoinWallet as updateCoinWalletRequest,
  deleteCoinWallet as deleteCoinWalletRequest
} from '@/composables/requests/coinWallets'

export const useCoinWalletActions = () => {
  const store = useStore()

  // Get all coin wallets
  const getCoinWallets = async () => {
    store.setLoading(true)
    store.clearError()
    
    try {
      const response = await getCoinWalletsRequest()
      
      if (response.success) {
        store.setCoinWallets(response.data.wallets)
        return response
      } else {
        store.setError(response)
        return response
      }
    } catch (error) {
      store.setError(error)
      return { success: false, error: 'Network error. Please try again.' }
    } finally {
      store.setLoading(false)
    }
  }

  // Get wallet by coin
  const getWalletByCoin = async (coin) => {
    store.setLoading(true)
    store.clearError()
    
    try {
      const response = await getWalletByCoinRequest(coin)
      
      if (response.success) {
        return response
      } else {
        store.setError(response)
        return response
      }
    } catch (error) {
      store.setError(error)
      return { success: false, error: 'Network error. Please try again.' }
    } finally {
      store.setLoading(false)
    }
  }

  // Get wallet address for a specific coin
  const getWalletAddress = async (coin) => {
    const response = await getWalletByCoin(coin)
    if (response.success) {
      return response.data.wallet.address
    }
    return null
  }

  // Create coin wallet (admin)
  const createCoinWallet = async (payload) => {
    store.setLoading(true)
    store.clearError()
    
    try {
      const response = await createCoinWalletRequest(payload)
      
      if (response.success) {
        store.addNotification({
          type: 'success',
          message: response.message || 'Wallet created successfully!'
        })
        // Refresh wallets
        await getCoinWallets()
        return response
      } else {
        store.setError(response)
        store.addNotification({
          type: 'error',
          message: response.error || 'Failed to create wallet'
        })
        return response
      }
    } catch (error) {
      store.setError(error)
      store.addNotification({
        type: 'error',
        message: 'Network error. Please try again.'
      })
      return { success: false, error: 'Network error. Please try again.' }
    } finally {
      store.setLoading(false)
    }
  }

  // Update coin wallet (admin)
  const updateCoinWallet = async (walletId, payload) => {
    store.setLoading(true)
    store.clearError()
    
    try {
      const response = await updateCoinWalletRequest(walletId, payload)
      
      if (response.success) {
        store.addNotification({
          type: 'success',
          message: response.message || 'Wallet updated successfully!'
        })
        // Refresh wallets
        await getCoinWallets()
        return response
      } else {
        store.setError(response)
        store.addNotification({
          type: 'error',
          message: response.error || 'Failed to update wallet'
        })
        return response
      }
    } catch (error) {
      store.setError(error)
      store.addNotification({
        type: 'error',
        message: 'Network error. Please try again.'
      })
      return { success: false, error: 'Network error. Please try again.' }
    } finally {
      store.setLoading(false)
    }
  }

  // Delete coin wallet (admin)
  const deleteCoinWallet = async (walletId) => {
    store.setLoading(true)
    store.clearError()
    
    try {
      const response = await deleteCoinWalletRequest(walletId)
      
      if (response.success) {
        store.addNotification({
          type: 'success',
          message: response.message || 'Wallet deleted successfully!'
        })
        // Refresh wallets
        await getCoinWallets()
        return response
      } else {
        store.setError(response)
        store.addNotification({
          type: 'error',
          message: response.error || 'Failed to delete wallet'
        })
        return response
      }
    } catch (error) {
      store.setError(error)
      store.addNotification({
        type: 'error',
        message: 'Network error. Please try again.'
      })
      return { success: false, error: 'Network error. Please try again.' }
    } finally {
      store.setLoading(false)
    }
  }

  // Select a coin
  const selectCoin = (coin) => {
    store.setSelectedCoin(coin)
  }

  return {
    getCoinWallets,
    getWalletByCoin,
    getWalletAddress,
    createCoinWallet,
    updateCoinWallet,
    deleteCoinWallet,
    selectCoin
  }
}