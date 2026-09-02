// stores/index.js - Main store with all functionality
import { defineStore, acceptHMRUpdate } from 'pinia'
import { navigateTo } from '#app'

export const useStore = defineStore('card', () => {
  // ============================================
  // STATE
  // ============================================
  const state = reactive({
    // User
    user: null,
    allUsers: null,
    isAuthenticated: false,
    token: null,
    
    // Card Plans
    cardPlans: [],
    selectedPlan: null,
    selectedPlanId: null,
    
    // Card Activation
    currentActivation: null,
    activations: [],
    activationStatus: null,
    
    // Coin Wallets
    coinWallets: [],
    selectedCoin: 'USDT',
    
    // UI State
    currentPage: 'home',
    selectedNavMenu: 'home',
    isLoading: false,
    loadingCardPrice: false,
    
    // Error state
    error: null,
    errorMessage: '',
    
    // Toast/Notification
    notifications: [],
    
    // Form state
    cardDetails: {
      number: '',
      expiry: '',
      cvv: '',
      cardholderName: ''
    }
  })

  // ============================================
  // GETTERS (Computed)
  // ============================================
  const getUser = computed(() => state.user)
  const getAllUsers = computed(() => state.allUsers)
  const getToken = computed(() => state.token)
  const isAuthenticated = computed(() => state.isAuthenticated)
  const isVerified = computed(() => state.user?.isVerified || false)
  
  const getCardPlans = computed(() => state.cardPlans)
  const getSelectedPlan = computed(() => {
    if (state.selectedPlanId) {
      return state.cardPlans.find(p => p.id === state.selectedPlanId || p._id === state.selectedPlanId)
    }
    return state.selectedPlan
  })
  
  const getCurrentActivation = computed(() => state.currentActivation)
  const getActivations = computed(() => state.activations)
  
  const getCoinWallets = computed(() => state.coinWallets)
  const getSelectedCoin = computed(() => state.selectedCoin)
  const getWalletAddress = computed(() => {
    const wallet = state.coinWallets.find(w => w.coin === state.selectedCoin)
    return wallet?.address || null
  })
  
  const getCardDetails = computed(() => state.cardDetails)
  const getLoading = computed(() => state.isLoading)
  
  const getUserName = computed(() => state.user?.name || '')
  const getUserEmail = computed(() => state.user?.email || '')

  // ============================================
  // ACTIONS
  // ============================================
  
  // ----- User Actions -----
  
  // Set user data
  const setUser = (payload) => {
    state.user = payload.user || payload
    state.token = payload.token || payload.token
    state.isAuthenticated = true
    
    // Store in localStorage for persistence
    if (process.client) {
      localStorage.setItem('cardsecure_user', JSON.stringify({
        user: state.user,
        token: state.token
      }))
    }
  }

  const setAllUsers = (users) => {
    state.allUsers = users
  }
  
  // Update user data
  const updateUser = (payload) => {
    state.user = { ...state.user, ...payload }
    if (process.client) {
      const stored = localStorage.getItem('cardsecure_user')
      if (stored) {
        const data = JSON.parse(stored)
        data.user = state.user
        localStorage.setItem('cardsecure_user', JSON.stringify(data))
      }
    }
  }
  
  // Clear user data (logout)
  const clearUser = () => {
    state.user = null
    state.allUsers = null
    state.token = null
    state.isAuthenticated = false
    // state.currentActivation = null
    state.activations = []
    
    if (process.client) {
      localStorage.removeItem('cardsecure_user')
    }
    
    // Navigate to login
    navigateTo('/account')
  }
  
  const logout = () => {
    clearUser()
  }
  
  // Initialize from localStorage
  const initAuth = () => {
    if (process.client) {
      const stored = localStorage.getItem('cardsecure_user')
      if (stored) {
        try {
          const data = JSON.parse(stored)
          state.user = data.user || data
          state.token = data.token || data.token
          state.isAuthenticated = true
        } catch (e) {
          console.error('Failed to parse stored user:', e)
          localStorage.removeItem('cardsecure_user')
        }
      }
    }
  }
  
  // ----- Card Plan Actions -----
  
  const setCardPlans = (plans) => {
    state.cardPlans = plans
  }
  
  const selectPlan = (planId) => {
    state.selectedPlanId = planId
    state.selectedPlan = state.cardPlans.find(p => p.id === planId || p._id === planId)
  }
  
  const clearSelectedPlan = () => {
    state.selectedPlanId = null
    state.selectedPlan = null
  }
  
  // ----- Card Activation Actions -----
  
  const setCurrentActivation = (activation) => {
    state.currentActivation = activation
    state.activationStatus = activation?.status || null
  }
  
  const setActivations = (activations) => {
    state.activations = activations
  }
  
  const addActivation = (activation) => {
    state.activations.unshift(activation)
  }
  
  const updateActivation = (activationId, updates) => {
    const index = state.activations.findIndex(a => a.id === activationId || a._id === activationId)
    if (index !== -1) {
      state.activations[index] = { ...state.activations[index], ...updates }
    }
    if (state.currentActivation && (state.currentActivation.id === activationId || state.currentActivation._id === activationId)) {
      state.currentActivation = { ...state.currentActivation, ...updates }
      state.activationStatus = updates.status || state.currentActivation.status
    }
  }
  
  const setActivationStatus = (status) => {
    state.activationStatus = status
  }
  
  // ----- Coin Wallet Actions -----
  
  const setCoinWallets = (wallets) => {
    state.coinWallets = wallets
  }
  
  const setSelectedCoin = (coin) => {
    state.selectedCoin = coin
  }
  
  // ----- UI Actions -----
  
  const setLoading = (isLoading) => {
    state.isLoading = isLoading
  }
  
  const setLoadingCardPrice = (loading) => {
    state.loadingCardPrice = loading
  }
  
  const setCurrentPage = (page) => {
    state.currentPage = page
  }
  
  const setSelectedNavMenu = (menu) => {
    state.selectedNavMenu = menu
  }
  
  // ----- Card Details Actions -----
  
  const setCardDetails = (details) => {
    state.cardDetails = { ...state.cardDetails, ...details }
  }
  
  const clearCardDetails = () => {
    state.cardDetails = {
      number: '',
      expiry: '',
      cvv: '',
      cardholderName: ''
    }
  }
  
  // ----- Error Actions -----
  
  const setError = (error) => {
    state.error = error
    state.errorMessage = error?.message || error?.error || 'An error occurred'
  }
  
  const clearError = () => {
    state.error = null
    state.errorMessage = ''
  }
  
  // ----- Notification Actions -----
  
  const addNotification = (notification) => {
    state.notifications.push({
      id: Date.now(),
      ...notification,
      timestamp: new Date()
    })
  }
  
  const removeNotification = (id) => {
    state.notifications = state.notifications.filter(n => n.id !== id)
  }
  
  const clearNotifications = () => {
    state.notifications = []
  }
  
  // ----- Reset Actions -----
  
  const resetStore = () => {
    state.user = null
    state.allUsers = null
    state.token = null
    state.isAuthenticated = false
    state.cardPlans = []
    state.selectedPlan = null
    state.selectedPlanId = null
    state.currentActivation = null
    state.activations = []
    state.activationStatus = null
    state.coinWallets = []
    state.selectedCoin = 'USDT'
    state.isLoading = false
    state.loadingCardPrice = false
    state.error = null
    state.errorMessage = ''
    state.notifications = []
    state.cardDetails = {
      number: '',
      expiry: '',
      cvv: '',
      cardholderName: ''
    }
    
    if (process.client) {
      localStorage.removeItem('cardsecure_user')
    }
  }
  
  // ----- Helper to get wallet address for a coin -----
  
  const getWalletAddressForCoin = (coin) => {
    const wallet = state.coinWallets.find(w => w.coin === coin)
    return wallet?.address || null
  }

  // ============================================
  // RETURN
  // ============================================
  return {
    // State (expose for direct access if needed)
    state,
    
    // Getters
    getUser,
    getAllUsers,
    getToken,
    isAuthenticated,
    isVerified,
    getCardPlans,
    getSelectedPlan,
    getCurrentActivation,
    getActivations,
    getCoinWallets,
    getSelectedCoin,
    getWalletAddress,
    getCardDetails,
    getLoading,
    getUserName,
    getUserEmail,
    
    // User Actions
    setUser,
    setAllUsers,
    updateUser,
    clearUser,
    logout,
    initAuth,
    
    // Card Plan Actions
    setCardPlans,
    selectPlan,
    clearSelectedPlan,
    
    // Card Activation Actions
    setCurrentActivation,
    setActivations,
    addActivation,
    updateActivation,
    setActivationStatus,
    
    // Coin Wallet Actions
    setCoinWallets,
    setSelectedCoin,
    getWalletAddressForCoin,
    
    // UI Actions
    setLoading,
    setLoadingCardPrice,
    setCurrentPage,
    setSelectedNavMenu,
    
    // Card Details Actions
    setCardDetails,
    clearCardDetails,
    
    // Error Actions
    setError,
    clearError,
    
    // Notification Actions
    addNotification,
    removeNotification,
    clearNotifications,
    
    // Reset
    resetStore
  }

}, {
  persist: {
    storage: process.client ? localStorage : undefined,
    paths: ['user', 'token', 'isAuthenticated']
  }
})

// HMR support
if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(useStore, import.meta.hot))
}