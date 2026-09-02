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
            <h1 class="text-2xl font-bold tracking-tight text-gray-950 sm:text-3xl mt-4">User Management</h1>
            <p class="mt-1 text-sm text-gray-500">View and manage all registered users.</p>
          </div>
          <button
            @click="refreshUsers"
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
              <p class="text-sm text-gray-500">Total Users</p>
              <p class="text-2xl font-bold text-gray-900">{{ users.length }}</p>
            </div>
            <div class="rounded-xl bg-blue-50 p-3 text-blue-600">
              <svg class="h-6 w-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" stroke="currentColor"/>
                <circle cx="9" cy="7" r="4" stroke="currentColor"/>
                <path d="M23 21v-2a4 4 0 0 0-3-3.87" stroke="currentColor"/>
                <path d="M16 3.13a4 4 0 0 1 0 7.75" stroke="currentColor"/>
              </svg>
            </div>
          </div>
        </div>
        <div class="rounded-2xl bg-white p-6 shadow-sm border border-gray-200">
          <div class="flex items-center justify-between">
            <div>
              <p class="text-sm text-gray-500">Verified Users</p>
              <p class="text-2xl font-bold text-gray-900">{{ verifiedUsersCount }}</p>
            </div>
            <div class="rounded-xl bg-green-50 p-3 text-green-600">
              <svg class="h-6 w-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" stroke="currentColor"/>
                <polyline points="22 4 12 14.01 9 11.01" stroke="currentColor"/>
              </svg>
            </div>
          </div>
        </div>
        <div class="rounded-2xl bg-white p-6 shadow-sm border border-gray-200">
          <div class="flex items-center justify-between">
            <div>
              <p class="text-sm text-gray-500">Unverified Users</p>
              <p class="text-2xl font-bold text-gray-900">{{ unverifiedUsersCount }}</p>
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
              <p class="text-sm text-gray-500">Admins</p>
              <p class="text-2xl font-bold text-gray-900">{{ adminUsersCount }}</p>
            </div>
            <div class="rounded-xl bg-purple-50 p-3 text-purple-600">
              <svg class="h-6 w-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" stroke="currentColor"/>
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
            placeholder="Search by name or email..."
            class="rounded-xl border border-gray-200 px-4 py-2 text-sm focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 transition outline-none w-64"
          />
        </div>
      </div>

      <!-- Users Table -->
      <div class="rounded-2xl border border-gray-200 bg-white overflow-hidden shadow-sm">
        <div class="overflow-x-auto">
          <table class="w-full text-sm">
            <thead class="bg-gray-50 border-b border-gray-200">
              <tr>
                <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">User</th>
                <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Email</th>
                <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Country</th>
                <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Wallet</th>
                <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Role</th>
                <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Joined</th>
                <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody class="divide-y divide-gray-200">
              <tr v-for="user in filteredUsers" :key="user.id || user._id" class="hover:bg-gray-50 transition">
                <td class="px-6 py-4">
                  <div class="flex items-center gap-3">
                    <div class="h-10 w-10 rounded-full flex items-center justify-center text-white font-bold text-sm" 
                         :style="{ background: getAvatarColor(user.name || user.email) }">
                      {{ getUserInitials(user.name || user.email) }}
                    </div>
                    <div>
                      <p class="font-medium text-gray-900">{{ user.name || 'N/A' }}</p>
                      <p class="text-xs text-gray-500">ID: {{ (user.id || user._id).slice(0, 8) }}</p>
                    </div>
                  </div>
                </td>
                <td class="px-6 py-4 text-gray-600">{{ user.email }}</td>
                <td class="px-6 py-4 text-gray-600">{{ user.country || 'N/A' }}</td>
                <td class="px-6 py-4">
                  <span v-if="user.walletAddress" class="text-xs font-mono text-gray-500 truncate block max-w-[120px]">
                    {{ user.walletAddress.slice(0, 6) }}...{{ user.walletAddress.slice(-4) }}
                  </span>
                  <span v-else class="text-xs text-gray-400">No wallet</span>
                </td>
                <td class="px-6 py-4">
                  <span class="inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium" 
                        :class="user.isVerified ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'">
                    {{ user.isVerified ? 'Verified' : 'Unverified' }}
                  </span>
                </td>
                <td class="px-6 py-4">
                  <span class="inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium"
                        :class="user.role === 'admin' ? 'bg-purple-100 text-purple-800' : 'bg-blue-100 text-blue-800'">
                    {{ user.role || 'user' }}
                  </span>
                </td>
                <td class="px-6 py-4 text-xs text-gray-500">
                  {{ formatDate(user.createdAt) }}
                </td>
                <td class="px-6 py-4">
                  <div class="flex gap-2">
                    <button
                      @click="viewUserDetails(user)"
                      class="p-1.5 rounded-lg text-blue-600 hover:bg-blue-50 transition"
                      title="View Details"
                    >
                      <svg class="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                        <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" stroke="currentColor"/>
                        <circle cx="12" cy="12" r="3" stroke="currentColor"/>
                      </svg>
                    </button>
                    <!-- <button
                      @click="toggleUserStatus(user)"
                      class="p-1.5 rounded-lg transition"
                      :class="user.isVerified ? 'text-yellow-600 hover:bg-yellow-50' : 'text-green-600 hover:bg-green-50'"
                      :title="user.isVerified ? 'Unverify User' : 'Verify User'"
                    >
                      <svg class="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                        <path v-if="user.isVerified" d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" stroke="currentColor"/>
                        <path v-else d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" stroke="currentColor" opacity="0.3"/>
                        <path v-if="user.isVerified" d="M9 12l2 2 4-4" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round"/>
                      </svg>
                    </button> -->
                    <!-- <button
                      @click="viewUserActivations(user)"
                      class="p-1.5 rounded-lg text-purple-600 hover:bg-purple-50 transition"
                      title="View Activations"
                    >
                      <svg class="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                        <rect x="2" y="4" width="20" height="16" rx="2" stroke="currentColor"/>
                        <path d="M2 8h20" stroke="currentColor"/>
                        <path d="M6 12h3" stroke="currentColor" stroke-linecap="round"/>
                      </svg>
                    </button> -->
                    
                  </div>
                </td>
              </tr>
              <tr v-if="filteredUsers.length === 0">
                <td colspan="8" class="px-6 py-8 text-center text-gray-500">
                  No users found matching your criteria.
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </main>

    <!-- User Details Modal -->
    <div v-if="showUserModal" class="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div class="bg-white rounded-3xl max-w-2xl w-full p-8 shadow-2xl max-h-[90vh] overflow-y-auto">
        <div class="flex items-center justify-between mb-6">
          <div class="flex items-center gap-4">
            <div class="h-16 w-16 rounded-full flex items-center justify-center text-white font-bold text-xl" 
                 :style="{ background: getAvatarColor(selectedUser?.name || selectedUser?.email) }">
              {{ getUserInitials(selectedUser?.name || selectedUser?.email) }}
            </div>
            <div>
              <h3 class="text-xl font-bold text-gray-900">{{ selectedUser?.name || 'N/A' }}</h3>
              <p class="text-sm text-gray-500">{{ selectedUser?.email }}</p>
            </div>
          </div>
          <button @click="closeUserModal" class="text-gray-400 hover:text-gray-600">
            <svg class="h-6 w-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <line x1="18" y1="6" x2="6" y2="18" stroke="currentColor"/>
              <line x1="6" y1="6" x2="18" y2="18" stroke="currentColor"/>
            </svg>
          </button>
        </div>

        <div class="grid grid-cols-2 gap-4">
          <div class="bg-gray-50 rounded-xl p-4">
            <p class="text-xs text-gray-500">User ID</p>
            <p class="text-sm font-semibold text-gray-900">{{ selectedUser?.id || selectedUser?._id }}</p>
          </div>
          <div class="bg-gray-50 rounded-xl p-4">
            <p class="text-xs text-gray-500">Role</p>
            <p class="text-sm font-semibold text-gray-900 capitalize">{{ selectedUser?.role || 'User' }}</p>
          </div>
          <div class="bg-gray-50 rounded-xl p-4">
            <p class="text-xs text-gray-500">Country</p>
            <p class="text-sm font-semibold text-gray-900">{{ selectedUser?.country || 'N/A' }}</p>
          </div>
          <div class="bg-gray-50 rounded-xl p-4">
            <p class="text-xs text-gray-500">Status</p>
            <p class="text-sm font-semibold" :class="selectedUser?.isVerified ? 'text-green-600' : 'text-yellow-600'">
              {{ selectedUser?.isVerified ? 'Verified' : 'Unverified' }}
            </p>
          </div>
          <div class="bg-gray-50 rounded-xl p-4 col-span-2">
            <p class="text-xs text-gray-500">Wallet Address</p>
            <p class="text-sm font-mono text-gray-900 break-all">{{ selectedUser?.walletAddress || 'Not set' }}</p>
          </div>
          <div class="bg-gray-50 rounded-xl p-4 col-span-2">
            <p class="text-xs text-gray-500">Joined</p>
            <p class="text-sm font-semibold text-gray-900">{{ formatDate(selectedUser?.createdAt) }}</p>
          </div>
          <div class="bg-gray-50 rounded-xl p-4 col-span-2">
            <p class="text-xs text-gray-500">Balances</p>
            <div class="flex gap-4 mt-1">
              <span class="text-sm font-semibold text-gray-900">BTC: {{ selectedUser?.balances?.BTC || 0 }}</span>
              <span class="text-sm font-semibold text-gray-900">ETH: {{ selectedUser?.balances?.ETH || 0 }}</span>
              <span class="text-sm font-semibold text-gray-900">USDT: {{ selectedUser?.balances?.USDT || 0 }}</span>
            </div>
          </div>
        </div>

        <div class="flex gap-3 mt-6">
          <button
            @click="closeUserModal"
            class="flex-1 py-3 px-4 border border-gray-200 text-gray-700 font-semibold rounded-xl hover:bg-gray-50 transition"
          >
            Close
          </button>
          <button
            @click="closeUserModal(); viewUserActivations(selectedUser)"
            class="flex-1 py-3 px-4 bg-purple-600 hover:bg-purple-700 text-white font-semibold rounded-xl shadow-lg shadow-purple-600/20 transition"
          >
            View Card Activations
          </button>
        </div>
      </div>
    </div>

    <!-- User Activations Modal -->
    <div v-if="showActivationsModal" class="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div class="bg-white rounded-3xl max-w-3xl w-full p-8 shadow-2xl max-h-[90vh] overflow-y-auto">
        <div class="flex items-center justify-between mb-6">
          <div>
            <h3 class="text-xl font-bold text-gray-900">Card Activations</h3>
            <p class="text-sm text-gray-500">{{ activationsUser?.name || 'User' }}'s card activations</p>
          </div>
          <button @click="closeActivationsModal" class="text-gray-400 hover:text-gray-600">
            <svg class="h-6 w-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <line x1="18" y1="6" x2="6" y2="18" stroke="currentColor"/>
              <line x1="6" y1="6" x2="18" y2="18" stroke="currentColor"/>
            </svg>
          </button>
        </div>

        <div v-if="activations.length === 0" class="text-center py-8">
          <p class="text-gray-500">No card activations found for this user.</p>
        </div>

        <div v-else class="space-y-4">
          <div v-for="activation in activations" :key="activation.id || activation._id" 
               class="border border-gray-200 rounded-xl p-4 hover:bg-gray-50 transition">
            <div class="flex items-center justify-between">
              <div>
                <p class="font-semibold text-gray-900">{{ activation.plan?.displayName || 'Card Plan' }}</p>
                <p class="text-sm text-gray-500">Amount: ${{ activation.payment?.amount?.toLocaleString() || 0 }}</p>
              </div>
              <span class="inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium" 
                    :class="getStatusBadge(activation.status)">
                {{ formatStatus(activation.status) }}
              </span>
            </div>
            <div class="mt-2 flex flex-wrap gap-4 text-xs text-gray-500">
              <span>Coin: {{ activation.payment?.coin || 'N/A' }}</span>
              <span>Created: {{ formatDate(activation.createdAt) }}</span>
              <span v-if="activation.completedAt">Completed: {{ formatDate(activation.completedAt) }}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import { useStore } from '@/stores'
import { getAllUsers } from '@/composables/requests/auth'
import { toast } from 'vue-sonner'
import authActivate from '@/middlewares/auth-activate'

definePageMeta({
  layout: 'custom',
  middleware: authActivate
})

// Store
const store = useStore()

// State
const users = ref([])
const searchQuery = ref('')
const activeFilter = ref('all')

// Filters
const filters = [
  { value: 'all', label: 'All Users' },
  { value: 'verified', label: 'Verified' },
  { value: 'unverified', label: 'Unverified' },
  { value: 'admin', label: 'Admins' },
  { value: 'has_wallet', label: 'Has Wallet' }
]

// User Modal
const showUserModal = ref(false)
const selectedUser = ref(null)

// Activations Modal
const showActivationsModal = ref(false)
const activationsUser = ref(null)
const activations = ref([])

// Computed
const verifiedUsersCount = computed(() => {
  return users.value.filter(u => u.isVerified).length
})

const unverifiedUsersCount = computed(() => {
  return users.value.filter(u => !u.isVerified).length
})

const adminUsersCount = computed(() => {
  return users.value.filter(u => u.role === 'admin').length
})

const totalActivations = computed(() => {
  // This would come from your activation data
  return 0
})

const filteredUsers = computed(() => {
  let result = users.value

  // Filter by status/role
  if (activeFilter.value === 'verified') {
    result = result.filter(u => u.isVerified)
  } else if (activeFilter.value === 'unverified') {
    result = result.filter(u => !u.isVerified)
  } else if (activeFilter.value === 'admin') {
    result = result.filter(u => u.role === 'admin')
  } else if (activeFilter.value === 'has_wallet') {
    result = result.filter(u => u.walletAddress)
  }

  // Filter by search
  if (searchQuery.value) {
    const query = searchQuery.value.toLowerCase()
    result = result.filter(u => 
      u.name?.toLowerCase().includes(query) ||
      u.email?.toLowerCase().includes(query) ||
      u.country?.toLowerCase().includes(query)
    )
  }

  return result
})

const getFilterCount = (filter) => {
  if (filter === 'all') return users.value.length
  if (filter === 'verified') return verifiedUsersCount.value
  if (filter === 'unverified') return unverifiedUsersCount.value
  if (filter === 'admin') return adminUsersCount.value
  if (filter === 'has_wallet') return users.value.filter(u => u.walletAddress).length
  return 0
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

const getStatusBadge = (status) => {
  const badgeMap = {
    'pending': 'bg-gray-100 text-gray-800',
    'payment_confirmed': 'bg-blue-100 text-blue-800',
    'otp_verified': 'bg-indigo-100 text-indigo-800',
    'approved': 'bg-green-100 text-green-800',
    'rejected': 'bg-red-100 text-red-800',
    'completed': 'bg-purple-100 text-purple-800'
  }
  return badgeMap[status] || 'bg-gray-100 text-gray-800'
}

// View user details
const viewUserDetails = (user) => {
  selectedUser.value = user
  showUserModal.value = true
}

// Close user modal
const closeUserModal = () => {
  showUserModal.value = false
  selectedUser.value = null
}

// View user activations
const viewUserActivations = async (user) => {
  activationsUser.value = user
  // Fetch activations for this user
  // For now, use mock data
  activations.value = [
    {
      id: '1',
      plan: { displayName: 'Gold Card' },
      payment: { amount: 500, coin: 'USDT' },
      status: 'completed',
      createdAt: new Date('2024-01-15'),
      completedAt: new Date('2024-01-15')
    },
    {
      id: '2',
      plan: { displayName: 'Black Card' },
      payment: { amount: 1000, coin: 'BTC' },
      status: 'approved',
      createdAt: new Date('2024-02-20')
    }
  ]
  showActivationsModal.value = true
}

// Close activations modal
const closeActivationsModal = () => {
  showActivationsModal.value = false
  activationsUser.value = null
  activations.value = []
}

// Toggle user verification
const toggleUserStatus = async (user) => {
  try {
    // This would call your API to toggle verification
    const newStatus = !user.isVerified
    // Update local state
    user.isVerified = newStatus
    toast.success(`User ${newStatus ? 'verified' : 'unverified'} successfully!`)
    // In a real app, you would call an API here
  } catch (error) {
    toast.error('Failed to update user status')
  }
}

// Refresh users
const refreshUsers = async () => {
  await loadUsers()
  toast.success('Users refreshed!')
}

// Load users from API
const loadUsers = async () => {
  try {
    store.state.isLoading = true
    
    const response = await getAllUsers()
    
    if (response.success) {
      users.value = response.data.users || []
      store.setAllUsers(response.data.users)
      toast.success(`Loaded ${users.value.length} users`)
    } else {
      toast.error(response.error || 'Failed to load users')
    }
  } catch (error) {
    console.error('Load users error:', error)
    toast.error('Network error. Please try again.')
  } finally {
    store.state.isLoading = false
  }
}

// Lifecycle
onMounted(async () => {
  await loadUsers()
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

/* Table row hover effect */
tbody tr {
  transition: background-color 0.15s ease;
}
</style>