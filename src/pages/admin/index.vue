<template>
    <div class="min-h-screen bg-gray-50">
      <!-- Admin Header -->
      <header class="border-b border-gray-200 bg-white sticky top-0 z-40">
        <div class="mx-auto max-w-7xl px-5 py-4 sm:px-6 lg:px-8">
          <div class="flex items-center justify-between">
            <!-- Logo -->
            <div class="flex items-center gap-3">
              <NuxtLink to="/admin" class="flex items-center gap-2">
                <div class="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-600 shadow-lg shadow-blue-600/20">
                  <svg class="h-5 w-5 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                    <rect x="2" y="4" width="20" height="16" rx="2" stroke="currentColor"/>
                    <path d="M2 8h20" stroke="currentColor"/>
                    <path d="M6 12h3" stroke="currentColor" stroke-linecap="round"/>
                  </svg>
                </div>
                <span class="text-lg font-bold text-gray-900 hidden sm:inline">CardSecure Admin</span>
              </NuxtLink>
            </div>
  
            <!-- Admin Info -->
            <div class="flex items-center gap-4">
              <span class="text-sm text-gray-500 hidden sm:inline">Admin</span>
              <div class="flex h-9 w-9 items-center justify-center rounded-full bg-blue-100 text-blue-600 font-semibold">
                {{ getUserInitials(store?.getUserName || 'Admin') }}
              </div>
              <button
                @click="handleLogout"
                class="rounded-lg p-2 text-gray-400 hover:bg-gray-100 hover:text-red-600 transition"
                title="Logout"
              >
                <svg class="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                  <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" stroke="currentColor"/>
                  <path d="M16 17l5-5-5-5" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round"/>
                  <path d="M21 12H9" stroke="currentColor" stroke-linecap="round"/>
                </svg>
              </button>
            </div>
          </div>
        </div>
      </header>
  
      <!-- Page Header -->
      <section class="border-b border-gray-200 bg-white">
        <div class="mx-auto max-w-7xl px-5 py-8 sm:px-6 lg:px-8">
          <div class="flex flex-wrap items-center justify-between gap-4">
            <div>
              <h1 class="text-2xl font-bold tracking-tight text-gray-950 sm:text-3xl">Admin Dashboard</h1>
              <p class="mt-1 text-sm text-gray-500">Manage your card activation platform from one central location.</p>
            </div>
            <div class="flex items-center gap-3">
              <span class="text-sm text-gray-500">Welcome back,</span>
              <span class="text-sm font-semibold text-gray-900">{{ store.getUserName || 'Admin' }}</span>
            </div>
          </div>
        </div>
      </section>
  
      <!-- Main Content -->
      <main class="mx-auto max-w-7xl px-5 py-8 sm:px-6 sm:py-12 lg:px-8">
        <!-- Stats Cards -->
        <!-- <div class="grid gap-4 sm:grid-cols-2 lg:grid-cols-4 mb-8">
          <div class="rounded-2xl bg-white p-6 shadow-sm border border-gray-200">
            <div class="flex items-center justify-between">
              <div>
                <p class="text-sm text-gray-500">Total Users</p>
                <p class="text-2xl font-bold text-gray-900">{{ stats.totalUsers }}</p>
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
                <p class="text-sm text-gray-500">Card Plans</p>
                <p class="text-2xl font-bold text-gray-900">{{ stats.totalPlans }}</p>
              </div>
              <div class="rounded-xl bg-green-50 p-3 text-green-600">
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
                <p class="text-sm text-gray-500">Active Activations</p>
                <p class="text-2xl font-bold text-gray-900">{{ stats.activeActivations }}</p>
              </div>
              <div class="rounded-xl bg-purple-50 p-3 text-purple-600">
                <svg class="h-6 w-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                  <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" stroke="currentColor"/>
                  <path d="M12 8v4M12 16h.01" stroke="currentColor" stroke-linecap="round"/>
                </svg>
              </div>
            </div>
          </div>
          <div class="rounded-2xl bg-white p-6 shadow-sm border border-gray-200">
            <div class="flex items-center justify-between">
              <div>
                <p class="text-sm text-gray-500">Total Revenue</p>
                <p class="text-2xl font-bold text-gray-900">${{ stats.totalRevenue.toLocaleString() }}</p>
              </div>
              <div class="rounded-xl bg-yellow-50 p-3 text-yellow-600">
                <svg class="h-6 w-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                  <path d="M12 2v4M12 22v-4M4 12H2M22 12h-2M19.07 4.93l-2.83 2.83M4.93 19.07l2.83-2.83" stroke="currentColor"/>
                  <circle cx="12" cy="12" r="4" stroke="currentColor"/>
                </svg>
              </div>
            </div>
          </div>
        </div> -->
  
        <!-- Admin Navigation Grid -->
        <div class="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          <!-- Manage Users -->
          <NuxtLink
            to="/admin/user"
            class="group rounded-2xl border border-gray-200 bg-white p-6 shadow-sm transition hover:shadow-lg hover:border-blue-200 hover:bg-blue-50/30"
          >
            <div class="flex items-start gap-4">
              <div class="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-blue-50 text-blue-600 group-hover:bg-blue-100 transition">
                <svg class="h-7 w-7" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                  <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" stroke="currentColor"/>
                  <circle cx="9" cy="7" r="4" stroke="currentColor"/>
                  <path d="M23 21v-2a4 4 0 0 0-3-3.87" stroke="currentColor"/>
                  <path d="M16 3.13a4 4 0 0 1 0 7.75" stroke="currentColor"/>
                </svg>
              </div>
              <div class="flex-1">
                <h3 class="text-lg font-semibold text-gray-900 group-hover:text-blue-600 transition">Manage Users</h3>
                <p class="text-sm text-gray-500 mt-1">View, verify, and manage all registered users.</p>
                <div class="mt-3 flex items-center gap-2 text-sm text-blue-600 font-medium">
                  <span>Go to Users</span>
                  <svg class="h-4 w-4 transition-transform group-hover:translate-x-1" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                    <path d="M5 12h14M13 6l6 6-6 6" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round"/>
                  </svg>
                </div>
              </div>
            </div>
          </NuxtLink>
  
          <!-- Manage Card Plans -->
          <NuxtLink
            to="/admin/card"
            class="group rounded-2xl border border-gray-200 bg-white p-6 shadow-sm transition hover:shadow-lg hover:border-yellow-200 hover:bg-yellow-50/30"
          >
            <div class="flex items-start gap-4">
              <div class="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-yellow-50 text-yellow-600 group-hover:bg-yellow-100 transition">
                <svg class="h-7 w-7" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                  <rect x="2" y="4" width="20" height="16" rx="2" stroke="currentColor"/>
                  <path d="M2 8h20" stroke="currentColor"/>
                  <path d="M6 12h3" stroke="currentColor" stroke-linecap="round"/>
                </svg>
              </div>
              <div class="flex-1">
                <h3 class="text-lg font-semibold text-gray-900 group-hover:text-yellow-600 transition">Manage Card Plans</h3>
                <p class="text-sm text-gray-500 mt-1">Create, edit, and manage Gold & Black card plans.</p>
                <div class="mt-3 flex items-center gap-2 text-sm text-yellow-600 font-medium">
                  <span>Go to Plans</span>
                  <svg class="h-4 w-4 transition-transform group-hover:translate-x-1" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                    <path d="M5 12h14M13 6l6 6-6 6" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round"/>
                  </svg>
                </div>
              </div>
            </div>
          </NuxtLink>
  
          <!-- Manage Card Activations -->
          <NuxtLink
            to="/admin/activations"
            class="group rounded-2xl border border-gray-200 bg-white p-6 shadow-sm transition hover:shadow-lg hover:border-purple-200 hover:bg-purple-50/30"
          >
            <div class="flex items-start gap-4">
              <div class="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-purple-50 text-purple-600 group-hover:bg-purple-100 transition">
                <svg class="h-7 w-7" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                  <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" stroke="currentColor"/>
                  <path d="M9 12l2 2 4-4" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round"/>
                </svg>
              </div>
              <div class="flex-1">
                <h3 class="text-lg font-semibold text-gray-900 group-hover:text-purple-600 transition">Manage Card Activations</h3>
                <p class="text-sm text-gray-500 mt-1">Review, approve, and manage all card activation requests.</p>
                <div class="mt-3 flex items-center gap-2 text-sm text-purple-600 font-medium">
                  <span>Go to Activations</span>
                  <svg class="h-4 w-4 transition-transform group-hover:translate-x-1" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                    <path d="M5 12h14M13 6l6 6-6 6" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round"/>
                  </svg>
                </div>
              </div>
            </div>
          </NuxtLink>
  
          <!-- Manage Card Wallets -->
          <NuxtLink
            to="/admin/wallet"
            class="group rounded-2xl border border-gray-200 bg-white p-6 shadow-sm transition hover:shadow-lg hover:border-green-200 hover:bg-green-50/30"
          >
            <div class="flex items-start gap-4">
              <div class="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-green-50 text-green-600 group-hover:bg-green-100 transition">
                <svg class="h-7 w-7" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                  <rect x="2" y="6" width="20" height="12" rx="2" stroke="currentColor"/>
                  <path d="M2 10h20" stroke="currentColor"/>
                  <path d="M16 14h.01" stroke="currentColor" stroke-linecap="round"/>
                </svg>
              </div>
              <div class="flex-1">
                <h3 class="text-lg font-semibold text-gray-900 group-hover:text-green-600 transition">Manage Card Wallets</h3>
                <p class="text-sm text-gray-500 mt-1">Add, edit, and manage cryptocurrency deposit wallets.</p>
                <div class="mt-3 flex items-center gap-2 text-sm text-green-600 font-medium">
                  <span>Go to Wallets</span>
                  <svg class="h-4 w-4 transition-transform group-hover:translate-x-1" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                    <path d="M5 12h14M13 6l6 6-6 6" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round"/>
                  </svg>
                </div>
              </div>
            </div>
          </NuxtLink>
  
          <!-- Manage Card Transactions -->
          <NuxtLink
            to="/admin/transactions"
            class="group rounded-2xl border border-gray-200 bg-white p-6 shadow-sm transition hover:shadow-lg hover:border-orange-200 hover:bg-orange-50/30"
          >
            <div class="flex items-start gap-4">
              <div class="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-orange-50 text-orange-600 group-hover:bg-orange-100 transition">
                <svg class="h-7 w-7" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                  <circle cx="12" cy="12" r="10" stroke="currentColor"/>
                  <polyline points="12 6 12 12 16 14" stroke="currentColor"/>
                </svg>
              </div>
              <div class="flex-1">
                <h3 class="text-lg font-semibold text-gray-900 group-hover:text-orange-600 transition">Manage Card Transactions</h3>
                <p class="text-sm text-gray-500 mt-1">View and monitor all card transaction activities.</p>
                <div class="mt-3 flex items-center gap-2 text-sm text-orange-600 font-medium">
                  <span>Go to Transactions</span>
                  <svg class="h-4 w-4 transition-transform group-hover:translate-x-1" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                    <path d="M5 12h14M13 6l6 6-6 6" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round"/>
                  </svg>
                </div>
              </div>
            </div>
          </NuxtLink>
  
          <!-- Quick Actions -->
          <div class="rounded-2xl border border-gray-200 bg-gradient-to-br from-blue-600 to-blue-700 p-6 shadow-lg shadow-blue-600/20">
            <div class="flex items-start gap-4">
              <div class="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-white/20 text-white">
                <svg class="h-7 w-7" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                  <path d="M12 5v14M5 12h14" stroke="currentColor" stroke-linecap="round"/>
                </svg>
              </div>
              <div class="flex-1 text-white">
                <h3 class="text-lg font-semibold">Quick Actions</h3>
                <p class="text-sm text-blue-100 mt-1">Create new card plan or manage users.</p>
                <div class="mt-3 flex flex-wrap gap-2">
                  <NuxtLink
                    to="/admin/card"
                    class="inline-flex items-center gap-1 rounded-lg bg-white/20 px-3 py-1.5 text-sm font-medium text-white hover:bg-white/30 transition"
                  >
                    <svg class="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                      <path d="M12 5v14M5 12h14" stroke="currentColor" stroke-linecap="round"/>
                    </svg>
                    New Plan
                  </NuxtLink>
                  <NuxtLink
                    to="/admin/user"
                    class="inline-flex items-center gap-1 rounded-lg bg-white/20 px-3 py-1.5 text-sm font-medium text-white hover:bg-white/30 transition"
                  >
                    <svg class="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                      <path d="M16 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" stroke="currentColor"/>
                      <circle cx="8.5" cy="7" r="4" stroke="currentColor"/>
                    </svg>
                    Manage Users
                  </NuxtLink>
                </div>
              </div>
            </div>
          </div>
        </div>
  
        <!-- Recent Activity Section -->
        <!-- <div class="mt-8 rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">
          <div class="flex items-center justify-between mb-4">
            <h3 class="text-lg font-semibold text-gray-900">Recent Activity</h3>
            <button class="text-sm text-blue-600 hover:text-blue-700 font-medium">View All</button>
          </div>
          <div class="space-y-3">
            <div v-for="activity in recentActivities" :key="activity.id" class="flex items-center gap-4 p-3 rounded-xl hover:bg-gray-50 transition">
              <div class="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg" :class="activity.bgColor">
                <span class="text-lg">{{ activity.icon }}</span>
              </div>
              <div class="flex-1">
                <p class="text-sm font-medium text-gray-900">{{ activity.title }}</p>
                <p class="text-xs text-gray-500">{{ activity.description }}</p>
              </div>
              <span class="text-xs text-gray-400">{{ activity.time }}</span>
            </div>
          </div>
        </div> -->
      </main>
    </div>
  </template>
  
  <script setup>
  import { ref, computed, onMounted } from 'vue'
  import { useStore } from '@/stores'
//   import { useAuth } from '@/composables/useAuth'

import authActivate from '@/middlewares/auth-activate'

definePageMeta({
  layout: 'custom',
  middleware: authActivate
})
  
  const store = useStore()
//   const { logout } = useAuth()
  
  // Stats
  const stats = ref({
    totalUsers: 156,
    totalPlans: 4,
    activeActivations: 23,
    totalRevenue: 12500
  })
  
  // Recent Activities
  const recentActivities = ref([
    {
      id: 1,
      icon: '👤',
      bgColor: 'bg-blue-50',
      title: 'New user registered',
      description: 'John Doe created an account',
      time: '2 min ago'
    },
    {
      id: 2,
      icon: '💳',
      bgColor: 'bg-yellow-50',
      title: 'Card activated',
      description: 'Gold Card activated by Jane Smith',
      time: '15 min ago'
    },
    {
      id: 3,
      icon: '💰',
      bgColor: 'bg-green-50',
      title: 'Payment received',
      description: '$500 USDT deposit for card activation',
      time: '1 hour ago'
    },
    {
      id: 4,
      icon: '📋',
      bgColor: 'bg-purple-50',
      title: 'Activation request',
      description: 'New Black Card activation pending approval',
      time: '3 hours ago'
    }
  ])
  
  // Get user initials
  const getUserInitials = (name) => {
    if (!name) return 'A'
    const parts = name.split(' ')
    if (parts.length >= 2) {
      return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase()
    }
    return name.slice(0, 2).toUpperCase()
  }
  
  // Handle logout
  const handleLogout = () => {
    // logout()
    store.clearUser()
  }
  
  // Load stats on mount
  onMounted(() => {
    // Fetch stats from API
    // This is where you would load real data
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
  
  /* Navigation card hover effect */
  .group {
    transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  }
  
  .group:hover {
    transform: translateY(-2px);
  }
  </style>