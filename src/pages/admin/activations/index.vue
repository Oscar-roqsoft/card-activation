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
              <h1 class="text-2xl font-bold tracking-tight text-gray-950 sm:text-3xl mt-4">Card Activations</h1>
              <p class="mt-1 text-sm text-gray-500">Review, approve, and manage all card activation requests.</p>
            </div>
            <div class="flex gap-2">
              <button
                @click="loadActivations"
                class="inline-flex items-center gap-2 rounded-xl bg-blue-600 px-4 py-2.5 text-sm font-semibold text-white shadow-lg shadow-blue-600/20 transition hover:bg-blue-700"
              >
                <svg class="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                  <path d="M21 12a9 9 0 0 1-9 9m9-9a9 9 0 0 0-9-9m9 9H3m9 9a9 9 0 0 1-9-9m9 9c1.66 0 3-4.03 3-9s-1.34-9-3-9m0 18c-1.66 0-3-4.03-3-9s1.34-9 3-9" stroke="currentColor"/>
                </svg>
                Refresh
              </button>
            </div>
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
                <p class="text-sm text-gray-500">Total Activations</p>
                <p class="text-2xl font-bold text-gray-900">{{ store.getAllActivations?.length || 0 }}</p>
              </div>
              <div class="rounded-xl bg-blue-50 p-3 text-blue-600">
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
                <p class="text-sm text-gray-500">Pending Approval</p>
                <p class="text-2xl font-bold text-gray-900">{{ pendingCount }}</p>
              </div>
              <div class="rounded-xl bg-yellow-50 p-3 text-yellow-600">
                <svg class="h-6 w-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                  <circle cx="12" cy="12" r="10" stroke="currentColor"/>
                  <path d="M12 8v4M12 16h.01" stroke="currentColor" stroke-linecap="round"/>
                </svg>
              </div>
            </div>
          </div>
          <div class="rounded-2xl bg-white p-6 shadow-sm border border-gray-200">
            <div class="flex items-center justify-between">
              <div>
                <p class="text-sm text-gray-500">Approved</p>
                <p class="text-2xl font-bold text-gray-900">{{ approvedCount }}</p>
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
                <p class="text-sm text-gray-500">Rejected</p>
                <p class="text-2xl font-bold text-gray-900">{{ rejectedCount }}</p>
              </div>
              <div class="rounded-xl bg-red-50 p-3 text-red-600">
                <svg class="h-6 w-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                  <line x1="18" y1="6" x2="6" y2="18" stroke="currentColor"/>
                  <line x1="6" y1="6" x2="18" y2="18" stroke="currentColor"/>
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
              placeholder="Search by user or plan..."
              class="rounded-xl border border-gray-200 px-4 py-2 text-sm focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 transition outline-none w-64"
            />
          </div>
        </div>
  
        <!-- Activations Table -->
        <div class="rounded-2xl border border-gray-200 bg-white overflow-hidden shadow-sm">
          <div class="overflow-x-auto">
            <table class="w-full text-sm">
              <thead class="bg-gray-50 border-b border-gray-200">
                <tr>
                  <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">User</th>
                  <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Plan</th>
                  <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Amount</th>
                  <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Coin</th>
                  <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                  <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
                  <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                </tr>
              </thead>
              <tbody class="divide-y divide-gray-200">
                <tr v-for="activation in filteredActivations" :key="activation.id || activation._id" class="hover:bg-gray-50 transition">
                  <td class="px-6 py-4">
                    <div class="flex items-center gap-2">
                      <div class="h-8 w-8 rounded-full flex items-center justify-center text-white text-xs font-bold"
                           :style="{ background: getAvatarColor(activation.user?.name || activation.user?.email) }">
                        {{ getUserInitials(activation.user?.name || activation.user?.email) }}
                      </div>
                      <div>
                        <p class="font-medium text-gray-900">{{ activation.user?.name || 'Unknown User' }}</p>
                        <p class="text-xs text-gray-500">{{ activation.user?.email || 'No email' }}</p>
                      </div>
                    </div>
                  </td>
                  <td class="px-6 py-4">
                    <span class="font-medium text-gray-900">{{ activation.plan?.displayName || 'N/A' }}</span>
                  </td>
                  <td class="px-6 py-4 font-medium text-gray-900">
                    ${{ (activation.payment?.amount || 0).toLocaleString() }}
                  </td>
                  <td class="px-6 py-4">
                    <span class="text-xs text-gray-500">{{ activation.payment?.coin || 'N/A' }}</span>
                  </td>
                  <td class="px-6 py-4">
                    <span class="inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium" :class="getStatusBadge(activation.status)">
                      {{ formatStatus(activation.status) }}
                    </span>
                  </td>
                  <td class="px-6 py-4 text-xs text-gray-500">
                    {{ formatDate(activation.createdAt) }}
                  </td>
                  <td class="px-6 py-4">
                    <div class="flex gap-2">
                      <button
                        @click="viewActivationDetails(activation)"
                        class="p-1.5 rounded-lg text-blue-600 hover:bg-blue-50 transition"
                        title="View Details"
                      >
                        <svg class="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                          <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" stroke="currentColor"/>
                          <circle cx="12" cy="12" r="3" stroke="currentColor"/>
                        </svg>
                      </button>
                      <button
                        v-if="activation.status === 'otp_verified'"
                        @click="openApproveModal(activation)"
                        class="p-1.5 rounded-lg text-green-600 hover:bg-green-50 transition"
                        title="Approve"
                      >
                        <svg class="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                          <path d="M20 6L9 17l-5-5" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round"/>
                        </svg>
                      </button>
                      <button
                        v-if="activation.status === 'otp_verified' || activation.status === 'payment_confirmed' || activation.status === 'pending'"
                        @click="openRejectModal(activation)"
                        class="p-1.5 rounded-lg text-red-600 hover:bg-red-50 transition"
                        title="Reject"
                      >
                        <svg class="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                          <line x1="18" y1="6" x2="6" y2="18" stroke="currentColor"/>
                          <line x1="6" y1="6" x2="18" y2="18" stroke="currentColor"/>
                        </svg>
                      </button>
                      <button
                        v-if="activation.status === 'approved'"
                        @click="completeActivation(activation.id || activation._id)"
                        class="p-1.5 rounded-lg text-purple-600 hover:bg-purple-50 transition"
                        title="Complete"
                      >
                        <svg class="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                          <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" stroke="currentColor"/>
                          <path d="M9 12l2 2 4-4" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round"/>
                        </svg>
                      </button>
                    </div>
                  </td>
                </tr>
                <tr v-if="filteredActivations.length === 0">
                  <td colspan="7" class="px-6 py-8 text-center text-gray-500">
                    No activations found matching your criteria.
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
  
        <!-- Pagination -->
        <div v-if="store.getAllActivationsPagination" class="mt-4 flex items-center justify-between">
          <p class="text-sm text-gray-500">
            Showing {{ (store.getAllActivationsPagination.page - 1) * store.getAllActivationsPagination.limit + 1 }} 
            to {{ Math.min(store.getAllActivationsPagination.page * store.getAllActivationsPagination.limit, store.getAllActivationsPagination.total) }} 
            of {{ store.getAllActivationsPagination.total }} results
          </p>
          <div class="flex gap-2">
            <button
              @click="changePage(store.getAllActivationsPagination.page - 1)"
              :disabled="store.getAllActivationsPagination.page <= 1"
              class="px-3 py-1 rounded-lg border border-gray-200 text-sm disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50 transition"
            >
              Previous
            </button>
            <button
              @click="changePage(store.getAllActivationsPagination.page + 1)"
              :disabled="store.getAllActivationsPagination.page >= store.getAllActivationsPagination.pages"
              class="px-3 py-1 rounded-lg border border-gray-200 text-sm disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50 transition"
            >
              Next
            </button>
          </div>
        </div>
      </main>
  
      <!-- Approve Modal -->
      <div v-if="showApproveModal" class="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
        <div class="bg-white rounded-3xl max-w-md w-full p-8 shadow-2xl">
          <div class="flex items-center gap-3 mb-6">
            <div class="flex h-12 w-12 items-center justify-center rounded-full bg-green-100 text-green-600">
              <svg class="h-6 w-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <path d="M20 6L9 17l-5-5" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round"/>
              </svg>
            </div>
            <h3 class="text-xl font-bold text-gray-900">Approve Activation</h3>
          </div>
          
          <div class="bg-gray-50 rounded-xl p-4 mb-6">
            <div class="flex items-center justify-between mb-2">
              <span class="text-sm text-gray-500">User</span>
              <span class="text-sm font-semibold text-gray-900">{{ approveTarget?.user?.name || 'N/A' }}</span>
            </div>
            <div class="flex items-center justify-between mb-2">
              <span class="text-sm text-gray-500">Plan</span>
              <span class="text-sm font-semibold text-gray-900">{{ approveTarget?.plan?.displayName || 'N/A' }}</span>
            </div>
            <div class="flex items-center justify-between">
              <span class="text-sm text-gray-500">Amount</span>
              <span class="text-sm font-semibold text-gray-900">${{ (approveTarget?.payment?.amount || 0).toLocaleString() }}</span>
            </div>
          </div>
  
          <p class="text-sm text-gray-600 mb-6">
            Are you sure you want to approve this card activation? This action cannot be undone.
          </p>
  
          <div class="flex gap-3">
            <button
              type="button"
              @click="closeApproveModal"
              class="flex-1 py-3 px-4 border border-gray-200 text-gray-700 font-semibold rounded-xl hover:bg-gray-50 transition"
            >
              Cancel
            </button>
            <button
              @click="handleApprove"
              :disabled="store.state.isLoading"
              class="flex-1 py-3 px-4 bg-green-600 hover:bg-green-700 text-white font-semibold rounded-xl shadow-lg shadow-green-600/20 transition disabled:opacity-50 flex items-center justify-center gap-2"
            >
              <LoadingSpinner v-if="store.state.isLoading" size="sm" color="white" />
              <span>Approve</span>
            </button>
          </div>
        </div>
      </div>
  
      <!-- Reject Modal -->
      <div v-if="showRejectModal" class="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
        <div class="bg-white rounded-3xl max-w-md w-full p-8 shadow-2xl">
          <div class="flex items-center gap-3 mb-6">
            <div class="flex h-12 w-12 items-center justify-center rounded-full bg-red-100 text-red-600">
              <svg class="h-6 w-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <circle cx="12" cy="12" r="10" stroke="currentColor"/>
                <line x1="12" y1="8" x2="12" y2="12" stroke="currentColor"/>
                <line x1="12" y1="16" x2="12.01" y2="16" stroke="currentColor"/>
              </svg>
            </div>
            <h3 class="text-xl font-bold text-gray-900">Reject Activation</h3>
          </div>
  
          <div class="bg-gray-50 rounded-xl p-4 mb-4">
            <div class="flex items-center justify-between mb-2">
              <span class="text-sm text-gray-500">User</span>
              <span class="text-sm font-semibold text-gray-900">{{ rejectTarget?.user?.name || 'N/A' }}</span>
            </div>
            <div class="flex items-center justify-between">
              <span class="text-sm text-gray-500">Plan</span>
              <span class="text-sm font-semibold text-gray-900">{{ rejectTarget?.plan?.displayName || 'N/A' }}</span>
            </div>
          </div>
  
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-1.5">Reason for rejection</label>
            <textarea
              v-model="rejectReason"
              rows="3"
              class="w-full px-4 py-3 rounded-xl border border-gray-200 bg-gray-50 focus:bg-white focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 transition outline-none"
              placeholder="Please provide a reason for rejecting this activation..."
            ></textarea>
          </div>
  
          <div class="flex gap-3 mt-6">
            <button
              type="button"
              @click="closeRejectModal"
              class="flex-1 py-3 px-4 border border-gray-200 text-gray-700 font-semibold rounded-xl hover:bg-gray-50 transition"
            >
              Cancel
            </button>
            <button
              @click="handleReject"
              :disabled="store.state.isLoading"
              class="flex-1 py-3 px-4 bg-red-600 hover:bg-red-700 text-white font-semibold rounded-xl shadow-lg shadow-red-600/20 transition disabled:opacity-50 flex items-center justify-center gap-2"
            >
              <LoadingSpinner v-if="store.state.isLoading" size="sm" color="white" />
              <span>Reject</span>
            </button>
          </div>
        </div>
      </div>
  
      <!-- View Details Modal -->
      <div v-if="showDetailsModal" class="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
        <div class="bg-white rounded-3xl max-w-2xl w-full p-8 shadow-2xl max-h-[90vh] overflow-y-auto">
          <div class="flex items-center justify-between mb-6">
            <div>
              <h3 class="text-xl font-bold text-gray-900">Activation Details</h3>
              <p class="text-sm text-gray-500">{{ viewTarget?.user?.name || 'User' }}'s card activation</p>
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
              <p class="text-xs text-gray-500">User</p>
              <p class="text-sm font-semibold text-gray-900">{{ viewTarget?.user?.name || 'N/A' }}</p>
              <p class="text-xs text-gray-500">{{ viewTarget?.user?.email || 'No email' }}</p>
            </div>
            <div class="bg-gray-50 rounded-xl p-4">
              <p class="text-xs text-gray-500">Plan</p>
              <p class="text-sm font-semibold text-gray-900">{{ viewTarget?.plan?.displayName || 'N/A' }}</p>
            </div>
            <div class="bg-gray-50 rounded-xl p-4">
              <p class="text-xs text-gray-500">Amount</p>
              <p class="text-sm font-semibold text-gray-900">${{ (viewTarget?.payment?.amount || 0).toLocaleString() }}</p>
            </div>
            <div class="bg-gray-50 rounded-xl p-4">
              <p class="text-xs text-gray-500">Coin</p>
              <p class="text-sm font-semibold text-gray-900">{{ viewTarget?.payment?.coin || 'N/A' }}</p>
            </div>
            <div class="bg-gray-50 rounded-xl p-4 col-span-2">
              <p class="text-xs text-gray-500">Wallet Address</p>
              <p class="text-sm font-mono text-gray-900 break-all">{{ viewTarget?.payment?.walletAddress || 'N/A' }}</p>
            </div>
            <div class="bg-gray-50 rounded-xl p-4">
              <p class="text-xs text-gray-500">Status</p>
              <span class="inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium" :class="getStatusBadge(viewTarget?.status)">
                {{ formatStatus(viewTarget?.status) }}
              </span>
            </div>
            <div class="bg-gray-50 rounded-xl p-4">
              <p class="text-xs text-gray-500">Cardholder</p>
              <p class="text-sm font-semibold text-gray-900">{{ viewTarget?.cardDetails?.cardholderName || 'N/A' }}</p>
            </div>
            <div class="bg-gray-50 rounded-xl p-4 col-span-2">
              <p class="text-xs text-gray-500">Created At</p>
              <p class="text-sm font-semibold text-gray-900">{{ formatDate(viewTarget?.createdAt) }}</p>
            </div>
            <div v-if="viewTarget?.approvedAt" class="bg-gray-50 rounded-xl p-4 col-span-2">
              <p class="text-xs text-gray-500">Approved At</p>
              <p class="text-sm font-semibold text-gray-900">{{ formatDate(viewTarget?.approvedAt) }}</p>
            </div>
            <div v-if="viewTarget?.rejectedAt" class="bg-gray-50 rounded-xl p-4 col-span-2">
              <p class="text-xs text-gray-500">Rejected At</p>
              <p class="text-sm font-semibold text-gray-900">{{ formatDate(viewTarget?.rejectedAt) }}</p>
              <p class="text-xs text-gray-500 mt-1">Reason: {{ viewTarget?.rejectionReason || 'No reason provided' }}</p>
            </div>
          </div>
  
          <div class="flex gap-3 mt-6">
            <button
              @click="closeDetailsModal"
              class="flex-1 py-3 px-4 border border-gray-200 text-gray-700 font-semibold rounded-xl hover:bg-gray-50 transition"
            >
              Close
            </button>
            <button
              v-if="viewTarget?.status === 'otp_verified'"
              @click="closeDetailsModal(); openApproveModal(viewTarget)"
              class="flex-1 py-3 px-4 bg-green-600 hover:bg-green-700 text-white font-semibold rounded-xl shadow-lg shadow-green-600/20 transition"
            >
              Approve
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
  const { 
    getAllActivations,
    approveActivation, 
    rejectActivation, 
    completeActivation: completeActivationAction,
    getActivationDetails
  } = useCardActivationActions()
  
  // State
  const searchQuery = ref('')
  const activeFilter = ref('all')
  const currentPage = ref(1)
  const perPage = ref(20)
  
  // Filters
  const filters = [
    { value: 'all', label: 'All' },
    { value: 'otp_verified', label: 'Pending Approval' },
    { value: 'approved', label: 'Approved' },
    { value: 'rejected', label: 'Rejected' },
    { value: 'completed', label: 'Completed' }
  ]
  
  // Computed
  const pendingCount = computed(() => {
    return store.getAllActivations?.filter(a => a.status === 'otp_verified').length || 0
  })
  
  const approvedCount = computed(() => {
    return store.getAllActivations?.filter(a => a.status === 'approved' || a.status === 'completed').length || 0
  })
  
  const rejectedCount = computed(() => {
    return store.getAllActivations?.filter(a => a.status === 'rejected').length || 0
  })
  
  const filteredActivations = computed(() => {
    let result = store.getAllActivations || []
  
    // Filter by status
    if (activeFilter.value !== 'all') {
      result = result.filter(a => a.status === activeFilter.value)
    }
  
    // Filter by search
    if (searchQuery.value) {
      const query = searchQuery.value.toLowerCase()
      result = result.filter(a => 
        a.user?.name?.toLowerCase().includes(query) ||
        a.user?.email?.toLowerCase().includes(query) ||
        a.plan?.displayName?.toLowerCase().includes(query)
      )
    }
  
    return result
  })
  
  const getFilterCount = (filter) => {
    if (filter === 'all') return store.getAllActivations?.length || 0
    if (filter === 'otp_verified') return pendingCount.value
    if (filter === 'approved') return approvedCount.value
    if (filter === 'rejected') return rejectedCount.value
    if (filter === 'completed') return store.getAllActivations?.filter(a => a.status === 'completed').length || 0
    return 0
  }
  
  // Approve Modal
  const showApproveModal = ref(false)
  const approveTarget = ref(null)
  
  // Reject Modal
  const showRejectModal = ref(false)
  const rejectTarget = ref(null)
  const rejectReason = ref('')
  
  // Details Modal
  const showDetailsModal = ref(false)
  const viewTarget = ref(null)
  
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
  
  const formatStatus = (status) => {
    const statusMap = {
      'pending': 'Pending',
      'payment_confirmed': 'Payment Confirmed',
      'otp_verified': 'Pending Approval',
      'approved': 'Approved',
      'rejected': 'Rejected',
      'completed': 'Completed'
    }
    return statusMap[status] || status || 'Unknown'
  }
  
  const getStatusBadge = (status) => {
    const badgeMap = {
      'pending': 'bg-gray-100 text-gray-800',
      'payment_confirmed': 'bg-blue-100 text-blue-800',
      'otp_verified': 'bg-yellow-100 text-yellow-800',
      'approved': 'bg-green-100 text-green-800',
      'rejected': 'bg-red-100 text-red-800',
      'completed': 'bg-purple-100 text-purple-800'
    }
    return badgeMap[status] || 'bg-gray-100 text-gray-800'
  }
  
  // View activation details
  const viewActivationDetails = async (activation) => {
    if (activation.cardDetails) {
      viewTarget.value = activation
    } else {
      const response = await getActivationDetails(activation.id || activation._id)
      if (response.success) {
        viewTarget.value = response.data.activation
      } else {
        viewTarget.value = activation
      }
    }
    showDetailsModal.value = true
  }
  
  // Close details modal
  const closeDetailsModal = () => {
    showDetailsModal.value = false
    viewTarget.value = null
  }
  
  // Open approve modal
  const openApproveModal = (activation) => {
    approveTarget.value = activation
    showApproveModal.value = true
  }
  
  // Close approve modal
  const closeApproveModal = () => {
    showApproveModal.value = false
    approveTarget.value = null
  }
  
  // Handle approve
  const handleApprove = async () => {
    if (!approveTarget.value) return
  
    const response = await approveActivation(approveTarget.value.id || approveTarget.value._id)
    
    if (response.success) {
      closeApproveModal()
      await loadActivations()
      toast.success('Card activation approved successfully!')
    }
  }
  
  // Open reject modal
  const openRejectModal = (activation) => {
    rejectTarget.value = activation
    rejectReason.value = ''
    showRejectModal.value = true
  }
  
  // Close reject modal
  const closeRejectModal = () => {
    showRejectModal.value = false
    rejectTarget.value = null
    rejectReason.value = ''
  }
  
  // Handle reject
  const handleReject = async () => {
    if (!rejectTarget.value) return
  
    const payload = { reason: rejectReason.value || 'No reason provided' }
    const response = await rejectActivation(rejectTarget.value.id || rejectTarget.value._id, payload)
    
    if (response.success) {
      closeRejectModal()
      await loadActivations()
      toast.warning('Card activation rejected')
    }
  }
  
  // Complete activation
  const completeActivation = async (activationId) => {
    if (!confirm('Mark this activation as completed?')) return
  
    const response = await completeActivationAction(activationId)
    if (response.success) {
      await loadActivations()
      toast.success('Activation completed!')
    }
  }
  
  // Change page
  const changePage = (page) => {
    if (page < 1 || page > store.getAllActivationsPagination?.pages) return
    currentPage.value = page
    loadActivations(page)
  }
  
  // Load activations
  const loadActivations = async (page = 1) => {
    const params = {
      page,
      limit: perPage.value
    }
    
    if (activeFilter.value !== 'all') {
      params.status = activeFilter.value
    }
  
    const response = await getAllActivations(params)
    if (response.success) {
      store.setAllActivations(
        response.data.activations || [],
        response.data.pagination
      )
    }
  }
  
  // Lifecycle
  onMounted(async () => {
    await loadActivations()
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