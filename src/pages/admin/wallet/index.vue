<template>
    <div class="min-h-screen bg-gray-50">
      <!-- Page Header -->
      <section class="border-b border-gray-200 bg-white">
        <div class="mx-auto max-w-7xl px-5 py-8 sm:px-6 lg:px-8">
          <div class="flex flex-wrap items-center justify-between gap-4">
            <div>
              <div class="flex items-center gap-3">
                <NuxtLink to="/admin" class="inline-flex items-center gap-2 text-sm font-medium text-gray-500 transition hover:text-blue-600">
                  <svg class="h-4 w-4" viewBox="0 0 24 24" fill="none">
                    <path d="M19 12H5M11 18l-6-6 6-6" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"/>
                  </svg>
                  Back to Dashboard
                </NuxtLink>
              </div>
              <h1 class="text-2xl font-bold tracking-tight text-gray-950 sm:text-3xl mt-4">Wallet Management</h1>
              <p class="mt-1 text-sm text-gray-500">Manage cryptocurrency deposit wallets for card activation payments.</p>
            </div>
            <button
              @click="openCreateWalletModal"
              class="inline-flex items-center gap-2 rounded-xl bg-blue-600 px-5 py-2.5 text-sm font-semibold text-white shadow-lg shadow-blue-600/20 transition hover:bg-blue-700"
            >
              <svg class="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <path d="M12 5v14M5 12h14" stroke="currentColor" stroke-linecap="round"/>
              </svg>
              Add New Wallet
            </button>
          </div>
        </div>
      </section>
  
      <!-- Main Content -->
      <main class="mx-auto max-w-7xl px-5 py-8 sm:px-6 sm:py-12 lg:px-8">
        <!-- Loading Overlay -->
        <div v-if="store.state.isLoading" class="fixed inset-0 bg-black/20 backdrop-blur-sm flex items-center justify-center z-50">
          <LoadingSpinner size="lg" color="blue" label="Loading..." />
        </div>
  
        <!-- Stats Cards -->
        <div class="grid gap-4 sm:grid-cols-4 mb-8">
          <div class="rounded-2xl bg-white p-6 shadow-sm border border-gray-200">
            <div class="flex items-center justify-between">
              <div>
                <p class="text-sm text-gray-500">Total Wallets</p>
                <p class="text-2xl font-bold text-gray-900">{{ coinWallets.length }}</p>
              </div>
              <div class="rounded-xl bg-blue-50 p-3 text-blue-600">
                <svg class="h-6 w-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                  <rect x="2" y="6" width="20" height="12" rx="2" stroke="currentColor"/>
                  <path d="M2 10h20" stroke="currentColor"/>
                </svg>
              </div>
            </div>
          </div>
          <div class="rounded-2xl bg-white p-6 shadow-sm border border-gray-200">
            <div class="flex items-center justify-between">
              <div>
                <p class="text-sm text-gray-500">Active Wallets</p>
                <p class="text-2xl font-bold text-gray-900">{{ activeWalletsCount }}</p>
              </div>
              <div class="rounded-xl bg-green-50 p-3 text-green-600">
                <svg class="h-6 w-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                  <path d="M20 6L9 17l-5-5" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round"/>
                </svg>
              </div>
            </div>
          </div>
          <div class="rounded-2xl bg-white p-6 shadow-sm border border-gray-200">
            <div class="flex items-center justify-between">
              <div>
                <p class="text-sm text-gray-500">Supported Coins</p>
                <p class="text-2xl font-bold text-gray-900">{{ uniqueCoinsCount }}</p>
              </div>
              <div class="rounded-xl bg-purple-50 p-3 text-purple-600">
                <svg class="h-6 w-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                  <circle cx="12" cy="12" r="10" stroke="currentColor"/>
                  <path d="M12 6v6l4 2" stroke="currentColor"/>
                </svg>
              </div>
            </div>
          </div>
          <div class="rounded-2xl bg-white p-6 shadow-sm border border-gray-200">
            <div class="flex items-center justify-between">
              <div>
                <p class="text-sm text-gray-500">Inactive Wallets</p>
                <p class="text-2xl font-bold text-gray-900">{{ inactiveWalletsCount }}</p>
              </div>
              <div class="rounded-xl bg-red-50 p-3 text-red-600">
                <svg class="h-6 w-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                  <circle cx="12" cy="12" r="10" stroke="currentColor"/>
                  <line x1="12" y1="8" x2="12" y2="12" stroke="currentColor"/>
                  <line x1="12" y1="16" x2="12.01" y2="16" stroke="currentColor"/>
                </svg>
              </div>
            </div>
          </div>
        </div>
  
        <!-- Filters -->
        <div class="flex flex-wrap gap-4 items-center justify-between mb-6">
          <div class="flex flex-wrap gap-2">
            <button
              v-for="filter in filters"
              :key="filter.value"
              @click="activeFilter = filter.value"
              class="px-4 py-2 rounded-xl text-sm font-medium transition"
              :class="[
                activeFilter === filter.value
                  ? 'bg-blue-600 text-white shadow-lg shadow-blue-600/20'
                  : 'bg-white text-gray-600 border border-gray-200 hover:bg-gray-50'
              ]"
            >
              {{ filter.label }}
              <span class="ml-1 text-xs" :class="activeFilter === filter.value ? 'text-blue-200' : 'text-gray-400'">
                ({{ getFilterCount(filter.value) }})
              </span>
            </button>
          </div>
          <div class="flex items-center gap-2">
            <input
              v-model="searchQuery"
              type="text"
              placeholder="Search by coin or address..."
              class="rounded-xl border border-gray-200 px-4 py-2 text-sm focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 transition outline-none w-64"
            />
          </div>
        </div>
  
        <!-- Wallets Grid -->
        <div class="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          <div
            v-for="wallet in filteredWallets"
            :key="wallet.id || wallet._id"
            class="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm transition hover:shadow-md"
            :class="wallet.isActive !== false ? 'border-l-4 border-l-green-500' : 'border-l-4 border-l-red-500 opacity-60'"
          >
            <div class="flex items-start justify-between mb-4">
              <div class="flex items-center gap-3">
                <div class="flex h-14 w-14 items-center justify-center rounded-2xl text-3xl" :style="{ background: getCoinColor(wallet.coin) + '20' }">
                  {{ getCoinIcon(wallet.coin) }}
                </div>
                <div>
                  <h3 class="text-lg font-bold text-gray-900">{{ wallet.coin }}</h3>
                  <p class="text-xs text-gray-500">{{ wallet.network || 'Network' }}</p>
                </div>
              </div>
              <div class="flex items-center gap-2">
                <span class="inline-flex h-2.5 w-2.5 rounded-full" :class="wallet.isActive !== false ? 'bg-green-500' : 'bg-red-500'"></span>
                <span class="text-xs font-medium" :class="wallet.isActive !== false ? 'text-green-600' : 'text-red-600'">
                  {{ wallet.isActive !== false ? 'Active' : 'Inactive' }}
                </span>
              </div>
            </div>
  
            <div class="space-y-3 mb-4">
              <div>
                <p class="text-xs text-gray-400 mb-1">Wallet Address</p>
                <div class="flex items-center gap-2 bg-gray-50 rounded-xl p-3">
                  <p class="text-xs font-mono text-gray-700 truncate flex-1">{{ wallet.address }}</p>
                  <button
                    @click="copyAddress(wallet.address)"
                    class="p-1.5 rounded-lg hover:bg-white transition text-gray-400 hover:text-blue-600"
                  >
                    <svg class="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                      <rect x="9" y="9" width="13" height="13" rx="2" stroke="currentColor"/>
                      <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1" stroke="currentColor"/>
                    </svg>
                  </button>
                </div>
              </div>
              <div v-if="wallet.label" class="flex items-center gap-2">
                <svg class="h-4 w-4 text-gray-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                  <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" stroke="currentColor"/>
                </svg>
                <span class="text-xs text-gray-500">{{ wallet.label }}</span>
              </div>
            </div>
  
            <div class="flex gap-2 pt-4 border-t border-gray-100">
              <button
                @click="openEditWalletModal(wallet)"
                class="flex-1 inline-flex items-center justify-center gap-2 rounded-xl bg-blue-50 px-4 py-2.5 text-sm font-medium text-blue-600 transition hover:bg-blue-100"
              >
                <svg class="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                  <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" stroke="currentColor"/>
                  <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z" stroke="currentColor"/>
                </svg>
                Edit
              </button>
              <button
                @click="toggleWalletStatus(wallet)"
                class="flex-1 inline-flex items-center justify-center gap-2 rounded-xl px-4 py-2.5 text-sm font-medium transition"
                :class="wallet.isActive !== false ? 'bg-yellow-50 text-yellow-600 hover:bg-yellow-100' : 'bg-green-50 text-green-600 hover:bg-green-100'"
              >
                <svg class="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                  <path v-if="wallet.isActive !== false" d="M18 10a2 2 0 0 1-2 2h-1a2 2 0 0 1-2-2v-1a2 2 0 0 1 2-2h1a2 2 0 0 1 2 2v1z" stroke="currentColor"/>
                  <path v-else d="M6 10a2 2 0 0 1 2-2h1a2 2 0 0 1 2 2v1a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2v-1z" stroke="currentColor"/>
                  <line x1="22" y1="2" x2="2" y2="22" stroke="currentColor" v-if="wallet.isActive !== false"/>
                  <line x1="2" y1="2" x2="22" y2="22" stroke="currentColor" v-else/>
                </svg>
                {{ wallet.isActive !== false ? 'Deactivate' : 'Activate' }}
              </button>
              <button
                @click="deleteWallet(wallet)"
                class="p-2.5 rounded-xl text-gray-400 hover:bg-red-50 hover:text-red-600 transition"
              >
                <svg class="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                  <path d="M3 6h18M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" stroke="currentColor"/>
                  <line x1="10" y1="11" x2="10" y2="17" stroke="currentColor"/>
                  <line x1="14" y1="11" x2="14" y2="17" stroke="currentColor"/>
                </svg>
              </button>
            </div>
          </div>
        </div>
  
        <!-- Empty State -->
        <div v-if="filteredWallets.length === 0 && !store.state.isLoading" class="text-center py-16">
          <div class="mx-auto h-24 w-24 rounded-full bg-gray-100 flex items-center justify-center mb-4">
            <svg class="h-12 w-12 text-gray-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
              <rect x="2" y="6" width="20" height="12" rx="2" stroke="currentColor"/>
              <path d="M2 10h20" stroke="currentColor"/>
            </svg>
          </div>
          <h3 class="text-lg font-semibold text-gray-900">No wallets found</h3>
          <p class="text-sm text-gray-500 mt-1">Add your first cryptocurrency wallet to start accepting deposits.</p>
          <button
            @click="openCreateWalletModal"
            class="mt-4 inline-flex items-center gap-2 rounded-xl bg-blue-600 px-5 py-2.5 text-sm font-semibold text-white shadow-lg shadow-blue-600/20 transition hover:bg-blue-700"
          >
            <svg class="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <path d="M12 5v14M5 12h14" stroke="currentColor" stroke-linecap="round"/>
            </svg>
            Add Wallet
          </button>
        </div>
      </main>
  
      <!-- Create/Edit Wallet Modal -->
      <div v-if="showWalletModal" class="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
        <div class="bg-white rounded-3xl max-w-lg w-full p-8 shadow-2xl max-h-[90vh] overflow-y-auto">
          <div class="flex items-center justify-between mb-6">
            <div class="flex items-center gap-3">
              <div class="flex h-12 w-12 items-center justify-center rounded-2xl bg-blue-50 text-blue-600">
                <svg class="h-6 w-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                  <rect x="2" y="6" width="20" height="12" rx="2" stroke="currentColor"/>
                  <path d="M2 10h20" stroke="currentColor"/>
                </svg>
              </div>
              <h3 class="text-xl font-bold text-gray-900">{{ editingWallet ? 'Edit Wallet' : 'Add New Wallet' }}</h3>
            </div>
            <button @click="closeWalletModal" class="text-gray-400 hover:text-gray-600">
              <svg class="h-6 w-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <line x1="18" y1="6" x2="6" y2="18" stroke="currentColor"/>
                <line x1="6" y1="6" x2="18" y2="18" stroke="currentColor"/>
              </svg>
            </button>
          </div>
  
          <form @submit.prevent="saveWallet" class="space-y-4">
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-1.5">Cryptocurrency</label>
              <div class="relative">
                <select
                  v-model="walletForm.coin"
                  class="w-full px-4 py-3 rounded-xl border border-gray-200 bg-gray-50 focus:bg-white focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 transition outline-none appearance-none"
                  :disabled="!!editingWallet"
                >
                  <option value="USDT">🟢 USDT</option>
                  <option value="BTC">₿ BTC</option>
                  <option value="ETH">⟠ ETH</option>
                  <option value="XRP">✕ XRP</option>
                  <option value="SOL">◎ SOL</option>
                  <option value="ADA">₳ ADA</option>
                  <option value="TRX">TRX</option>
                  <option value="LTC">Ł LTC</option>
                </select>
                <div class="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none">
                  <svg class="h-5 w-5 text-gray-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                    <path d="M6 9l6 6 6-6" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round"/>
                  </svg>
                </div>
              </div>
            </div>
  
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-1.5">Network</label>
              <input
                v-model="walletForm.network"
                type="text"
                required
                class="w-full px-4 py-3 rounded-xl border border-gray-200 bg-gray-50 focus:bg-white focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 transition outline-none"
                placeholder="e.g., BEP20, ERC20, BTC"
              />
            </div>
  
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-1.5">Wallet Address</label>
              <input
                v-model="walletForm.address"
                type="text"
                required
                class="w-full px-4 py-3 rounded-xl border border-gray-200 bg-gray-50 focus:bg-white focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 transition outline-none font-mono text-sm"
                placeholder="0x..."
              />
            </div>
  
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-1.5">Label (Optional)</label>
              <input
                v-model="walletForm.label"
                type="text"
                class="w-full px-4 py-3 rounded-xl border border-gray-200 bg-gray-50 focus:bg-white focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 transition outline-none"
                placeholder="e.g., Main USDT Wallet"
              />
            </div>
  
            <div>
              <label class="flex items-center gap-2 text-sm text-gray-700">
                <input
                  v-model="walletForm.isActive"
                  type="checkbox"
                  class="rounded border-gray-300 text-blue-600 focus:ring-blue-500 h-4 w-4"
                />
                Active (wallet will be available for deposits)
              </label>
            </div>
  
            <div class="flex gap-3 pt-4">
              <button
                type="button"
                @click="closeWalletModal"
                class="flex-1 py-3 px-4 border border-gray-200 text-gray-700 font-semibold rounded-xl hover:bg-gray-50 transition"
              >
                Cancel
              </button>
              <button
                type="submit"
                :disabled="store.state.isLoading"
                class="flex-1 py-3 px-4 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-xl shadow-lg shadow-blue-600/20 transition disabled:opacity-50 flex items-center justify-center gap-2"
              >
                <LoadingSpinner v-if="store.state.isLoading" size="sm" color="white" />
                <span>{{ editingWallet ? 'Update Wallet' : 'Add Wallet' }}</span>
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  </template>
  
  <script setup>
  import { ref, computed, onMounted } from 'vue'
  import { useStore } from '@/stores'
  import { useCoinWalletActions } from '@/composables/actions'
  import { toast } from 'vue-sonner'

  definePageMeta({
  layout: 'custom'
})
  
  // Store
  const store = useStore()
  
  // Actions
  const { 
    getCoinWallets, 
    createCoinWallet, 
    updateCoinWallet, 
    deleteCoinWallet: deleteCoinWalletAction 
  } = useCoinWalletActions()
  
  // State
  const coinWallets = ref([])
  const searchQuery = ref('')
  const activeFilter = ref('all')
  
  // Filters
  const filters = [
    { value: 'all', label: 'All Wallets' },
    { value: 'active', label: 'Active' },
    { value: 'inactive', label: 'Inactive' }
  ]
  
  // Computed
  const activeWalletsCount = computed(() => {
    return coinWallets.value.filter(w => w.isActive !== false).length
  })
  
  const inactiveWalletsCount = computed(() => {
    return coinWallets.value.filter(w => w.isActive === false).length
  })
  
  const uniqueCoinsCount = computed(() => {
    return new Set(coinWallets.value.map(w => w.coin)).size
  })
  
  const filteredWallets = computed(() => {
    let wallets = coinWallets.value
  
    // Filter by status
    if (activeFilter.value === 'active') {
      wallets = wallets.filter(w => w.isActive !== false)
    } else if (activeFilter.value === 'inactive') {
      wallets = wallets.filter(w => w.isActive === false)
    }
  
    // Filter by search
    if (searchQuery.value) {
      const query = searchQuery.value.toLowerCase()
      wallets = wallets.filter(w => 
        w.coin?.toLowerCase().includes(query) ||
        w.address?.toLowerCase().includes(query) ||
        w.label?.toLowerCase().includes(query) ||
        w.network?.toLowerCase().includes(query)
      )
    }
  
    return wallets
  })
  
  const getFilterCount = (filter) => {
    if (filter === 'all') return coinWallets.value.length
    if (filter === 'active') return activeWalletsCount.value
    if (filter === 'inactive') return inactiveWalletsCount.value
    return 0
  }
  
  // Wallet Modal
  const showWalletModal = ref(false)
  const editingWallet = ref(null)
  const walletForm = ref({
    coin: 'USDT',
    network: '',
    address: '',
    label: '',
    isActive: true
  })
  
  // Coin helpers
  const getCoinIcon = (coin) => {
    const icons = {
      USDT: '🟢',
      BTC: '₿',
      ETH: '⟠',
      XRP: '✕',
      SOL: '◎',
      ADA: '₳',
      TRX: 'TRX',
      LTC: 'Ł'
    }
    return icons[coin] || '🪙'
  }
  
  const getCoinColor = (coin) => {
    const colors = {
      USDT: '#26A17B',
      BTC: '#F7931A',
      ETH: '#627EEA',
      XRP: '#00AAE4',
      SOL: '#9945FF',
      ADA: '#0033AD',
      TRX: '#EF0027',
      LTC: '#345D9D'
    }
    return colors[coin] || '#6B7280'
  }
  
  // Copy address
  const copyAddress = async (address) => {
    try {
      await navigator.clipboard.writeText(address)
      toast.success('Address copied to clipboard!')
    } catch (error) {
      // Fallback
      const el = document.createElement('textarea')
      el.value = address
      document.body.appendChild(el)
      el.select()
      document.execCommand('copy')
      document.body.removeChild(el)
      toast.success('Address copied to clipboard!')
    }
  }
  
  // Open create wallet modal
  const openCreateWalletModal = () => {
    editingWallet.value = null
    walletForm.value = {
      coin: 'USDT',
      network: '',
      address: '',
      label: '',
      isActive: true
    }
    showWalletModal.value = true
  }
  
  // Open edit wallet modal
  const openEditWalletModal = (wallet) => {
    editingWallet.value = wallet
    walletForm.value = {
      coin: wallet.coin,
      network: wallet.network || '',
      address: wallet.address,
      label: wallet.label || '',
      isActive: wallet.isActive !== false
    }
    showWalletModal.value = true
  }
  
  // Close wallet modal
  const closeWalletModal = () => {
    showWalletModal.value = false
    editingWallet.value = null
  }
  
  // Save wallet
  const saveWallet = async () => {
    const payload = {
      coin: walletForm.value.coin,
      network: walletForm.value.network,
      address: walletForm.value.address,
      label: walletForm.value.label || null,
      isActive: walletForm.value.isActive
    }
  
    let response
    if (editingWallet.value) {
      response = await updateCoinWallet(editingWallet.value.id || editingWallet.value._id, payload)
    } else {
      response = await createCoinWallet(payload)
    }
  
    if (response.success) {
      closeWalletModal()
      await loadWallets()
      toast.success(editingWallet.value ? 'Wallet updated successfully!' : 'Wallet added successfully!')
    }
  }
  
  // Toggle wallet status
  const toggleWalletStatus = async (wallet) => {
    const newStatus = wallet.isActive !== false ? false : true
    const response = await updateCoinWallet(wallet.id || wallet._id, {
      ...wallet,
      isActive: newStatus
    })
  
    if (response.success) {
      await loadWallets()
      toast.success(`Wallet ${newStatus ? 'activated' : 'deactivated'} successfully!`)
    }
  }
  
  // Delete wallet
  const deleteWallet = async (wallet) => {
    if (!confirm(`Are you sure you want to delete the ${wallet.coin} wallet?`)) return
  
    const response = await deleteCoinWalletAction(wallet.id || wallet._id)
    if (response.success) {
      await loadWallets()
      toast.success('Wallet deleted successfully!')
    }
  }
  
  // Load wallets
  const loadWallets = async () => {
    const response = await getCoinWallets()
    if (response.success) {
      coinWallets.value = response.data.wallets || []
    }
  }
  
  // Lifecycle
  onMounted(async () => {
    await loadWallets()
  })
  </script>
  
  <style scoped>
  /* Smooth transitions */
  .transition {
    transition: all 0.2s ease;
  }
  
  /* Custom scrollbar */
  ::-webkit-scrollbar {
    width: 6px;
  }
  ::-webkit-scrollbar-track {
    background: #f1f1f1;
    border-radius: 10px;
  }
  ::-webkit-scrollbar-thumb {
    background: #c1c1c1;
    border-radius: 10px;
  }
  ::-webkit-scrollbar-thumb:hover {
    background: #a8a8a8;
  }
  
  /* Wallet card hover effect */
  .rounded-2xl {
    transition: transform 0.2s ease, box-shadow 0.2s ease;
  }
  
  .rounded-2xl:hover {
    transform: translateY(-2px);
  }
  </style>