<template>
    <div class="min-h-screen bg-gray-50">
      <!-- Page Header -->
      <section class="border-b border-gray-200 bg-white">
        <div class="mx-auto max-w-7xl px-5 py-8 sm:px-6 lg:px-8">
          <div class="flex flex-wrap items-center justify-between gap-4">
            <div>
              <div class="flex items-center gap-3">
                <NuxtLink to="/" class="inline-flex items-center gap-2 text-sm font-medium text-gray-500 transition hover:text-blue-600">
                  <svg class="h-4 w-4" viewBox="0 0 24 24" fill="none">
                    <path d="M19 12H5M11 18l-6-6 6-6" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"/>
                  </svg>
                  Back
                </NuxtLink>
              </div>
              <h1 class="text-2xl font-bold tracking-tight text-gray-950 sm:text-3xl mt-4">My Activity</h1>
              <p class="mt-1 text-sm text-gray-500">View your card activations, payments, and transaction history.</p>
            </div>
            <button
              @click="refreshActivities"
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
        <div class="grid gap-4 sm:grid-cols-3 mb-8">
          <div class="rounded-2xl bg-white p-6 shadow-sm border border-gray-200">
            <div class="flex items-center justify-between">
              <div>
                <p class="text-sm text-gray-500">Total Activations</p>
                <p class="text-2xl font-bold text-gray-900">{{ activations.length }}</p>
              </div>
              <div class="rounded-xl bg-purple-50 p-3 text-purple-600">
                <svg class="h-6 w-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                  <rect x="2" y="4" width="20" height="16" rx="2" stroke="currentColor"/>
                  <path d="M2 8h20" stroke="currentColor"/>
                </svg>
              </div>
            </div>
          </div>
          <div class="rounded-2xl bg-white p-6 shadow-sm border border-gray-200">
            <div class="flex items-center justify-between">
              <div>
                <p class="text-sm text-gray-500">Total Spent</p>
                <p class="text-2xl font-bold text-gray-900">${{ totalSpent.toLocaleString() }}</p>
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
                <p class="text-sm text-gray-500">Active Cards</p>
                <p class="text-2xl font-bold text-gray-900">{{ activeCardsCount }}</p>
              </div>
              <div class="rounded-xl bg-blue-50 p-3 text-blue-600">
                <svg class="h-6 w-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                  <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" stroke="currentColor"/>
                  <path d="M9 12l2 2 4-4" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round"/>
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
              placeholder="Search by plan or details..."
              class="rounded-xl border border-gray-200 px-4 py-2 text-sm focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 transition outline-none w-64"
            />
          </div>
        </div>
  
        <!-- Activities Timeline -->
        <div class="space-y-4">
          <div v-for="activity in filteredActivities" :key="activity.id" 
               class="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm hover:shadow-md transition">
            <div class="flex items-start gap-4">
              <!-- Icon -->
              <div class="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl" :class="getActivityIconBg(activity.status)">
                <span class="text-xl">{{ getActivityIcon(activity.status) }}</span>
              </div>
              
              <!-- Content -->
              <div class="flex-1 min-w-0">
                <div class="flex flex-wrap items-start justify-between gap-2">
                  <div>
                    <p class="font-semibold text-gray-900 capitalize">
                      {{ activity.plan?.displayName || 'Card Plan' }}
                      <span class="text-sm font-normal text-gray-500 ml-2">Activation</span>
                    </p>
                    <p class="text-sm text-gray-600 mt-0.5">
                      {{ getStatusDescription(activity.status) }}
                    </p>
                  </div>
                  <span class="inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium whitespace-nowrap" 
                        :class="getStatusBadge(activity.status)">
                    {{ formatStatus(activity.status) }}
                  </span>
                </div>
                
                <!-- Details -->
                <div class="mt-3 flex flex-wrap gap-4 text-xs text-gray-500">
                  <span class="flex items-center gap-1">
                    <svg class="h-3.5 w-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                      <circle cx="12" cy="12" r="10" stroke="currentColor"/>
                      <polyline points="12 6 12 12 16 14" stroke="currentColor"/>
                    </svg>
                    {{ formatDate(activity.createdAt) }}
                  </span>
                  <span class="flex items-center gap-1 font-medium text-gray-700">
                    <svg class="h-3.5 w-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                      <circle cx="12" cy="12" r="10" stroke="currentColor"/>
                      <path d="M12 6v6l4 2" stroke="currentColor"/>
                    </svg>
                    ${{ (activity.payment?.amount || 0).toLocaleString() }}
                  </span>
                  <span v-if="activity.payment?.coin" class="flex items-center gap-1">
                    <svg class="h-3.5 w-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                      <rect x="2" y="6" width="20" height="12" rx="2" stroke="currentColor"/>
                      <path d="M2 10h20" stroke="currentColor"/>
                    </svg>
                    {{ activity.payment.coin }}
                  </span>
                  <span v-if="activity.payment?.confirmed !== undefined" class="flex items-center gap-1">
                    <svg class="h-3.5 w-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                      <path v-if="activity.payment.confirmed" d="M20 6L9 17l-5-5" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round"/>
                      <path v-else d="M18 6L6 18M6 6l12 12" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round"/>
                    </svg>
                    {{ activity.payment.confirmed ? 'Payment Confirmed' : 'Payment Pending' }}
                  </span>
                  <span v-if="activity.approvedAt" class="flex items-center gap-1">
                    <svg class="h-3.5 w-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                      <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" stroke="currentColor"/>
                      <path d="M9 12l2 2 4-4" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round"/>
                    </svg>
                    Approved: {{ formatDate(activity.approvedAt) }}
                  </span>
                  <span v-if="activity.completedAt" class="flex items-center gap-1">
                    <svg class="h-3.5 w-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                      <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" stroke="currentColor"/>
                      <path d="M9 12l2 2 4-4" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round"/>
                    </svg>
                    Completed: {{ formatDate(activity.completedAt) }}
                  </span>
                </div>
              </div>
            </div>
          </div>
  
          <!-- Empty State -->
          <div v-if="filteredActivities.length === 0" class="text-center py-16">
            <div class="mx-auto h-24 w-24 rounded-full bg-gray-100 flex items-center justify-center mb-4">
              <svg class="h-12 w-12 text-gray-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
                <path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z" stroke="currentColor"/>
              </svg>
            </div>
            <h3 class="text-lg font-semibold text-gray-900">No activities found</h3>
            <p class="text-sm text-gray-500 mt-1">You haven't performed any card activations yet.</p>
            <NuxtLink
              to="/activate"
              class="mt-4 inline-flex items-center gap-2 rounded-xl bg-blue-600 px-5 py-2.5 text-sm font-semibold text-white shadow-lg shadow-blue-600/20 transition hover:bg-blue-700"
            >
              Activate Your First Card
            </NuxtLink>
          </div>
        </div>
      </main>
    </div>
  </template>
  
  <script setup>
  import { ref, computed, onMounted } from 'vue'
  import { useStore } from '~/stores'
  import { useCardActivationActions } from '~/composables/actions'
  import { toast } from 'vue-sonner'
  
  // Store
  const store = useStore()
  
  // Actions
  const { getMyActivations } = useCardActivationActions()
  
  // State
  const activations = ref([])
  const searchQuery = ref('')
  const activeFilter = ref('all')
  
  // Filters
  const filters = [
    { value: 'all', label: 'All' },
    { value: 'pending', label: 'Pending' },
    { value: 'payment_confirmed', label: 'Payment Confirmed' },
    { value: 'otp_verified', label: 'OTP Verified' },
    { value: 'approved', label: 'Approved' },
    { value: 'completed', label: 'Completed' },
    { value: 'rejected', label: 'Rejected' }
  ]
  
  // Computed
  const totalSpent = computed(() => {
    return activations.value
      .filter(a => a.payment?.confirmed === true)
      .reduce((sum, a) => sum + (a.payment?.amount || 0), 0)
  })
  
  const activeCardsCount = computed(() => {
    return activations.value
      .filter(a => a.status === 'completed' || a.status === 'approved')
      .length
  })
  
  const filteredActivities = computed(() => {
    let result = activations.value
  
    // Filter by status
    if (activeFilter.value !== 'all') {
      result = result.filter(a => a.status === activeFilter.value)
    }
  
    // Filter by search
    if (searchQuery.value) {
      const query = searchQuery.value.toLowerCase()
      result = result.filter(a => 
        a.plan?.displayName?.toLowerCase().includes(query) ||
        a.payment?.coin?.toLowerCase().includes(query) ||
        a.status?.toLowerCase().includes(query)
      )
    }
  
    return result
  })
  
  const getFilterCount = (filter) => {
    if (filter === 'all') return activations.value.length
    return activations.value.filter(a => a.status === filter).length
  }
  
  // Helper functions
  const getActivityIcon = (status) => {
    const icons = {
      'pending': '⏳',
      'payment_confirmed': '💳',
      'otp_verified': '🔐',
      'approved': '✅',
      'rejected': '❌',
      'completed': '🎉'
    }
    return icons[status] || '📋'
  }
  
  const getActivityIconBg = (status) => {
    const bgMap = {
      'pending': 'bg-yellow-50',
      'payment_confirmed': 'bg-blue-50',
      'otp_verified': 'bg-indigo-50',
      'approved': 'bg-green-50',
      'rejected': 'bg-red-50',
      'completed': 'bg-purple-50'
    }
    return bgMap[status] || 'bg-gray-50'
  }
  
  const getStatusBadge = (status) => {
    const badgeMap = {
      'pending': 'bg-yellow-100 text-yellow-800',
      'payment_confirmed': 'bg-blue-100 text-blue-800',
      'otp_verified': 'bg-indigo-100 text-indigo-800',
      'approved': 'bg-green-100 text-green-800',
      'rejected': 'bg-red-100 text-red-800',
      'completed': 'bg-purple-100 text-purple-800'
    }
    return badgeMap[status] || 'bg-gray-100 text-gray-800'
  }
  
  const formatStatus = (status) => {
    const statusMap = {
      'pending': 'Pending',
      'payment_confirmed': 'Payment Confirmed',
      'otp_verified': 'OTP Verified',
      'approved': 'Approved',
      'rejected': 'Rejected',
      'completed': 'Completed'
    }
    return statusMap[status] || status || 'Unknown'
  }
  
  const getStatusDescription = (status) => {
    const descriptions = {
      'pending': 'Waiting for payment confirmation',
      'payment_confirmed': 'Payment received, awaiting OTP verification',
      'otp_verified': 'Identity verified, pending admin approval',
      'approved': 'Card activation approved',
      'rejected': 'Card activation was rejected',
      'completed': 'Card activation completed successfully'
    }
    return descriptions[status] || 'Processing'
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
  
  // Refresh activities
  const refreshActivities = async () => {
    await loadActivations()
    toast.success('Activities refreshed!')
  }
  
  // Load activations from API
  const loadActivations = async () => {
    try {
      store.state.isLoading = true
      
      const response = await getMyActivations()
      
      if (response.success) {
        activations.value = response.data.activations || []
        // Also update store
        store.setActivations(activations.value)
      } else {
        toast.error(response.error || 'Failed to load activities')
      }
    } catch (error) {
      console.error('Load activations error:', error)
      toast.error('Network error. Please try again.')
    } finally {
      store.state.isLoading = false
    }
  }
  
  // Lifecycle
  onMounted(async () => {
    await loadActivations()
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
  
  /* Activity card hover */
  .rounded-2xl {
    transition: transform 0.2s ease, box-shadow 0.2s ease;
  }
  
  .rounded-2xl:hover {
    transform: translateY(-2px);
  }
  </style>