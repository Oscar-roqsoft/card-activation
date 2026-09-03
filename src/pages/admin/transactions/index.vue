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
              <h1 class="text-2xl font-bold tracking-tight text-gray-950 sm:text-3xl mt-4">Transactions</h1>
              <p class="mt-1 text-sm text-gray-500">View and manage all payment transactions, card activations, and system activities.</p>
            </div>
            <button
              @click="refreshData"
              class="inline-flex items-center gap-2 rounded-xl bg-blue-600 px-4 py-2.5 text-sm font-semibold text-white shadow-lg shadow-blue-600/20 transition hover:bg-blue-700"
            >
              <svg class="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <path d="M21 12a9 9 0 0 1-9 9m9-9a9 9 0 0 0-9-9m9 9H3m9 9a9 9 0 0 1-9-9m9 9c1.66 0 3-4.03 3-9s-1.34-9-3-9m0 18c-1.66 0-3-4.03-3-9s1.34-9 3-9" stroke="currentColor"/>
              </svg>
              Refresh
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
                <p class="text-sm text-gray-500">Total Transactions</p>
                <p class="text-2xl font-bold text-gray-900">{{ transactions.length }}</p>
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
                <p class="text-sm text-gray-500">Total Revenue</p>
                <p class="text-2xl font-bold text-gray-900">${{ totalRevenue.toLocaleString() }}</p>
              </div>
              <div class="rounded-xl bg-green-50 p-3 text-green-600">
                <svg class="h-6 w-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                  <path d="M12 2v4M12 22v-4M4 12H2M22 12h-2M19.07 4.93l-2.83 2.83M4.93 19.07l2.83-2.83" stroke="currentColor"/>
                  <circle cx="12" cy="12" r="4" stroke="currentColor"/>
                </svg>
              </div>
            </div>
          </div>
          <div class="rounded-2xl bg-white p-6 shadow-sm border border-gray-200">
            <div class="flex items-center justify-between">
              <div>
                <p class="text-sm text-gray-500">Successful Payments</p>
                <p class="text-2xl font-bold text-gray-900">{{ successfulPayments }}</p>
              </div>
              <div class="rounded-xl bg-purple-50 p-3 text-purple-600">
                <svg class="h-6 w-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                  <path d="M20 6L9 17l-5-5" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round"/>
                </svg>
              </div>
            </div>
          </div>
          <div class="rounded-2xl bg-white p-6 shadow-sm border border-gray-200">
            <div class="flex items-center justify-between">
              <div>
                <p class="text-sm text-gray-500">Pending Payments</p>
                <p class="text-2xl font-bold text-gray-900">{{ pendingPayments }}</p>
              </div>
              <div class="rounded-xl bg-yellow-50 p-3 text-yellow-600">
                <svg class="h-6 w-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                  <circle cx="12" cy="12" r="10" stroke="currentColor"/>
                  <path d="M12 8v4M12 16h.01" stroke="currentColor" stroke-linecap="round"/>
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
              placeholder="Search by user, plan, or transaction ID..."
              class="rounded-xl border border-gray-200 px-4 py-2 text-sm focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 transition outline-none w-64"
            />
            <select
              v-model="dateFilter"
              class="rounded-xl border border-gray-200 px-4 py-2 text-sm focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 transition outline-none bg-white"
            >
              <option value="all">All Time</option>
              <option value="today">Today</option>
              <option value="week">This Week</option>
              <option value="month">This Month</option>
            </select>
          </div>
        </div>
  
        <!-- Transactions Table -->
        <div class="rounded-2xl border border-gray-200 bg-white overflow-hidden shadow-sm">
          <div class="overflow-x-auto">
            <table class="w-full text-sm">
              <thead class="bg-gray-50 border-b border-gray-200">
                <tr>
                  <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Transaction</th>
                  <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">User</th>
                  <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Type</th>
                  <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Amount</th>
                  <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Coin</th>
                  <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                  <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
                  <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                </tr>
              </thead>
              <tbody class="divide-y divide-gray-200">
                <tr v-for="transaction in filteredTransactions" :key="transaction.id" class="hover:bg-gray-50 transition">
                  <td class="px-6 py-4">
                    <div>
                      <p class="font-medium text-gray-900">{{ transaction.title }}</p>
                      <p class="text-xs text-gray-500">ID: {{ transaction.id.slice(0, 8) }}</p>
                    </div>
                  </td>
                  <td class="px-6 py-4">
                    <div class="flex items-center gap-2">
                      <div class="h-8 w-8 rounded-full flex items-center justify-center text-white text-xs font-bold"
                           :style="{ background: getAvatarColor(transaction.user) }">
                        {{ getUserInitials(transaction.user) }}
                      </div>
                      <span class="text-gray-700">{{ transaction.user }}</span>
                    </div>
                  </td>
                  <td class="px-6 py-4">
                    <span class="inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium" :class="getTypeBadge(transaction.type)">
                      {{ transaction.type }}
                    </span>
                  </td>
                  <td class="px-6 py-4 font-medium" :class="transaction.amount >= 0 ? 'text-green-600' : 'text-red-600'">
                    {{ transaction.amount >= 0 ? '+' : '' }}${{ Math.abs(transaction.amount).toLocaleString() }}
                  </td>
                  <td class="px-6 py-4">
                    <span class="text-gray-600">{{ transaction.coin || 'N/A' }}</span>
                  </td>
                  <td class="px-6 py-4">
                    <span class="inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium" :class="getStatusBadge(transaction.status)">
                      {{ transaction.status }}
                    </span>
                  </td>
                  <td class="px-6 py-4 text-xs text-gray-500">
                    {{ formatDate(transaction.createdAt) }}
                  </td>
                  <td class="px-6 py-4">
                    <button
                      @click="viewTransactionDetails(transaction)"
                      class="p-1.5 rounded-lg text-blue-600 hover:bg-blue-50 transition"
                      title="View Details"
                    >
                      <svg class="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                        <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" stroke="currentColor"/>
                        <circle cx="12" cy="12" r="3" stroke="currentColor"/>
                      </svg>
                    </button>
                  </td>
                </tr>
                <tr v-if="filteredTransactions.length === 0">
                  <td colspan="8" class="px-6 py-8 text-center text-gray-500">
                    No transactions found matching your criteria.
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
  
        <!-- Pagination -->
        <div v-if="pagination" class="mt-4 flex items-center justify-between">
          <p class="text-sm text-gray-500">
            Showing {{ (pagination.page - 1) * pagination.limit + 1 }} 
            to {{ Math.min(pagination.page * pagination.limit, pagination.total) }} 
            of {{ pagination.total }} results
          </p>
          <div class="flex gap-2">
            <button
              @click="changePage(pagination.page - 1)"
              :disabled="pagination.page <= 1"
              class="px-3 py-1 rounded-lg border border-gray-200 text-sm disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50 transition"
            >
              Previous
            </button>
            <button
              @click="changePage(pagination.page + 1)"
              :disabled="pagination.page >= pagination.pages"
              class="px-3 py-1 rounded-lg border border-gray-200 text-sm disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50 transition"
            >
              Next
            </button>
          </div>
        </div>
      </main>
  
      <!-- Transaction Details Modal -->
      <div v-if="showDetailsModal" class="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
        <div class="bg-white rounded-3xl max-w-2xl w-full p-8 shadow-2xl max-h-[90vh] overflow-y-auto">
          <div class="flex items-center justify-between mb-6">
            <div>
              <h3 class="text-xl font-bold text-gray-900">Transaction Details</h3>
              <p class="text-sm text-gray-500">Transaction ID: {{ selectedTransaction?.id.slice(0, 12) }}</p>
            </div>
            <button @click="closeDetailsModal" class="text-gray-400 hover:text-gray-600">
              <svg class="h-6 w-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <line x1="18" y1="6" x2="6" y2="18" stroke="currentColor"/>
                <line x1="6" y1="6" x2="18" y2="18" stroke="currentColor"/>
              </svg>
            </button>
          </div>
  
          <div class="grid grid-cols-2 gap-4">
            <div class="bg-gray-50 rounded-xl p-4">
              <p class="text-xs text-gray-500">Transaction Type</p>
              <span class="inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium mt-1" :class="getTypeBadge(selectedTransaction?.type)">
                {{ selectedTransaction?.type }}
              </span>
            </div>
            <div class="bg-gray-50 rounded-xl p-4">
              <p class="text-xs text-gray-500">Status</p>
              <span class="inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium mt-1" :class="getStatusBadge(selectedTransaction?.status)">
                {{ selectedTransaction?.status }}
              </span>
            </div>
            <div class="bg-gray-50 rounded-xl p-4">
              <p class="text-xs text-gray-500">Amount</p>
              <p class="text-sm font-semibold" :class="selectedTransaction?.amount >= 0 ? 'text-green-600' : 'text-red-600'">
                {{ selectedTransaction?.amount >= 0 ? '+' : '' }}${{ Math.abs(selectedTransaction?.amount || 0).toLocaleString() }}
              </p>
            </div>
            <div class="bg-gray-50 rounded-xl p-4">
              <p class="text-xs text-gray-500">Coin</p>
              <p class="text-sm font-semibold text-gray-900">{{ selectedTransaction?.coin || 'N/A' }}</p>
            </div>
            <div class="bg-gray-50 rounded-xl p-4">
              <p class="text-xs text-gray-500">User</p>
              <p class="text-sm font-semibold text-gray-900">{{ selectedTransaction?.user }}</p>
            </div>
            <div class="bg-gray-50 rounded-xl p-4">
              <p class="text-xs text-gray-500">Plan</p>
              <p class="text-sm font-semibold text-gray-900">{{ selectedTransaction?.plan || 'N/A' }}</p>
            </div>
            <div class="bg-gray-50 rounded-xl p-4 col-span-2">
              <p class="text-xs text-gray-500">Description</p>
              <p class="text-sm text-gray-700">{{ selectedTransaction?.description || 'No description' }}</p>
            </div>
            <div class="bg-gray-50 rounded-xl p-4 col-span-2">
              <p class="text-xs text-gray-500">Created At</p>
              <p class="text-sm font-semibold text-gray-900">{{ formatDate(selectedTransaction?.createdAt) }}</p>
            </div>
          </div>
  
          <div class="flex gap-3 mt-6">
            <button
              @click="closeDetailsModal"
              class="flex-1 py-3 px-4 border border-gray-200 text-gray-700 font-semibold rounded-xl hover:bg-gray-50 transition"
            >
              Close
            </button>
          </div>
        </div>
      </div>
    </div>
  </template>
  
  <script setup>
  import { ref, computed, onMounted } from 'vue'
  import { useStore } from '~/stores'
  import { useCardActivationActions } from '~/composables/actions'
  import { toast } from 'vue-sonner'
  import authActivate from '@/middlewares/auth-activate'
  
  definePageMeta({
    layout: 'custom',
    middleware: authActivate
  })
  
  // Store
  const store = useStore()
  
  // Actions
  const { getAllActivations, getPaymentConfirmations } = useCardActivationActions()
  
  // State
  const transactions = ref([])
  const searchQuery = ref('')
  const activeFilter = ref('all')
  const dateFilter = ref('all')
  const pagination = ref(null)
  const currentPage = ref(1)
  const perPage = ref(20)
  
  // Modal state
  const showDetailsModal = ref(false)
  const selectedTransaction = ref(null)
  
  // Filters
  const filters = [
    { value: 'all', label: 'All' },
    { value: 'payment', label: 'Payments' },
    { value: 'activation', label: 'Activations' },
    { value: 'refund', label: 'Refunds' },
    { value: 'fee', label: 'Fees' }
  ]
  
  // Stats
  const totalRevenue = computed(() => {
    return transactions.value
      .filter(t => t.amount > 0 && t.status === 'Completed')
      .reduce((sum, t) => sum + t.amount, 0)
  })
  
  const successfulPayments = computed(() => {
    return transactions.value.filter(t => t.type === 'payment' && t.status === 'Completed').length
  })
  
  const pendingPayments = computed(() => {
    return transactions.value.filter(t => t.type === 'payment' && t.status === 'Pending').length
  })
  
  // Filtered transactions
  const filteredTransactions = computed(() => {
    let result = transactions.value
  
    // Filter by type
    if (activeFilter.value !== 'all') {
      result = result.filter(t => t.type === activeFilter.value)
    }
  
    // Filter by date
    if (dateFilter.value === 'today') {
      const today = new Date().toDateString()
      result = result.filter(t => new Date(t.createdAt).toDateString() === today)
    } else if (dateFilter.value === 'week') {
      const weekAgo = new Date()
      weekAgo.setDate(weekAgo.getDate() - 7)
      result = result.filter(t => new Date(t.createdAt) > weekAgo)
    } else if (dateFilter.value === 'month') {
      const monthAgo = new Date()
      monthAgo.setMonth(monthAgo.getMonth() - 1)
      result = result.filter(t => new Date(t.createdAt) > monthAgo)
    }
  
    // Filter by search
    if (searchQuery.value) {
      const query = searchQuery.value.toLowerCase()
      result = result.filter(t => 
        t.title?.toLowerCase().includes(query) ||
        t.user?.toLowerCase().includes(query) ||
        t.id?.toLowerCase().includes(query) ||
        t.plan?.toLowerCase().includes(query)
      )
    }
  
    // Sort by date (newest first)
    result = [...result].sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
  
    return result
  })
  
  const getFilterCount = (filter) => {
    if (filter === 'all') return transactions.value.length
    return transactions.value.filter(t => t.type === filter).length
  }
  
  // Helper functions
  const getAvatarColor = (name) => {
    const colors = [
      '#2563eb', '#7c3aed', '#db2777', '#dc2626', '#ea580c', 
      '#65a30d', '#059669', '#0284c7', '#4f46e5', '#9333ea'
    ]
    let hash = 0
    if (name) {
      for (let i = 0; i < name.length; i++) {
        hash = name.charCodeAt(i) + ((hash << 5) - hash)
      }
    }
    return colors[Math.abs(hash) % colors.length]
  }
  
  const getUserInitials = (name) => {
    if (!name) return 'U'
    const parts = name.split(' ')
    if (parts.length >= 2) {
      return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase()
    }
    return name.slice(0, 2).toUpperCase()
  }
  
  const formatDate = (date) => {
    if (!date) return 'N/A'
    return new Date(date).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    })
  }
  
  const getTypeBadge = (type) => {
    const badgeMap = {
      'payment': 'bg-green-100 text-green-800',
      'activation': 'bg-purple-100 text-purple-800',
      'refund': 'bg-red-100 text-red-800',
      'fee': 'bg-yellow-100 text-yellow-800'
    }
    return badgeMap[type] || 'bg-gray-100 text-gray-800'
  }
  
  const getStatusBadge = (status) => {
    const badgeMap = {
      'Completed': 'bg-green-100 text-green-800',
      'Pending': 'bg-yellow-100 text-yellow-800',
      'Failed': 'bg-red-100 text-red-800',
      'Approved': 'bg-blue-100 text-blue-800',
      'Rejected': 'bg-red-100 text-red-800'
    }
    return badgeMap[status] || 'bg-gray-100 text-gray-800'
  }
  
  // View transaction details
  const viewTransactionDetails = (transaction) => {
    selectedTransaction.value = transaction
    showDetailsModal.value = true
  }
  
  // Close details modal
  const closeDetailsModal = () => {
    showDetailsModal.value = false
    selectedTransaction.value = null
  }
  
  // Change page
  const changePage = (page) => {
    if (page < 1 || page > pagination.value?.pages) return
    currentPage.value = page
    loadTransactions(page)
  }
  
  // Refresh data
  const refreshData = async () => {
    await loadTransactions(currentPage.value)
    toast.success('Transactions refreshed!')
  }
  
  // Load transactions
  const loadTransactions = async (page = 1) => {
    try {
      store.state.isLoading = true
  
      // Get activations data
      const response = await getAllActivations({
        page,
        limit: perPage.value
      })
  
      if (response.success) {
        // Transform activations into transactions
        const activations = response.data.activations || []
        const transformed = activations.map(act => ({
          id: act.id || act._id,
          title: `${act.plan?.displayName || 'Card'} Activation`,
          description: `Card activation for ${act.user?.name || 'User'}`,
          user: act.user?.name || 'Unknown User',
          type: 'activation',
          amount: act.payment?.amount || 0,
          coin: act.payment?.coin || 'USDT',
          status: formatStatus(act.status),
          plan: act.plan?.displayName || 'N/A',
          createdAt: act.createdAt
        }))
  
        transactions.value = transformed
        pagination.value = response.data.pagination
  
        // Also load payment confirmations
        const paymentResponse = await getPaymentConfirmations({
          page: 1,
          limit: 100
        })
  
        if (paymentResponse.success) {
          const payments = paymentResponse.data.payments || []
          const paymentTransactions = payments.map(p => ({
            id: p.id || p._id,
            title: `Payment Confirmation`,
            description: `Payment of $${p.payment?.amount || 0} ${p.payment?.coin || 'USDT'} for ${p.plan?.displayName || 'Card'}`,
            user: p.user?.name || 'Unknown User',
            type: 'payment',
            amount: p.payment?.amount || 0,
            coin: p.payment?.coin || 'USDT',
            status: p.payment?.confirmed ? 'Completed' : 'Pending',
            plan: p.plan?.displayName || 'N/A',
            createdAt: p.createdAt
          }))
          transactions.value = [...transformed, ...paymentTransactions]
        }
      }
    } catch (error) {
      console.error('Load transactions error:', error)
      toast.error('Failed to load transactions')
    } finally {
      store.state.isLoading = false
    }
  }
  
  const formatStatus = (status) => {
    const statusMap = {
      'pending': 'Pending',
      'payment_confirmed': 'Completed',
      'otp_verified': 'Approved',
      'approved': 'Approved',
      'rejected': 'Rejected',
      'completed': 'Completed'
    }
    return statusMap[status] || status || 'Unknown'
  }
  
  // Lifecycle
  onMounted(async () => {
    await loadTransactions(1)
  })
  </script>
  
  <style scoped>
  .transition {
    transition: all 0.2s ease;
  }
  
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
  
  tbody tr {
    transition: background-color 0.15s ease;
  }
  </style>