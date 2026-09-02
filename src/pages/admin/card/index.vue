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
            <h1 class="text-2xl font-bold tracking-tight text-gray-950 sm:text-3xl mt-4">Card Management</h1>
            <p class="mt-1 text-sm text-gray-500">Manage card plans, view details, and edit card configurations.</p>
          </div>
          <button
            @click="openCreatePlanModal"
            class="inline-flex items-center gap-2 rounded-xl bg-blue-600 px-5 py-2.5 text-sm font-semibold text-white shadow-lg shadow-blue-600/20 transition hover:bg-blue-700"
          >
            <svg class="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <path d="M12 5v14M5 12h14" stroke="currentColor" stroke-linecap="round"/>
            </svg>
            Create New Plan
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
              <p class="text-sm text-gray-500">Total Plans</p>
              <p class="text-2xl font-bold text-gray-900">{{ store.getCardPlans.length }}</p>
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
              <p class="text-sm text-gray-500">Gold Cards</p>
              <p class="text-2xl font-bold text-gray-900">{{ goldPlansCount }}</p>
            </div>
            <div class="rounded-xl bg-yellow-50 p-3 text-yellow-600">
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
              <p class="text-sm text-gray-500">Black Cards</p>
              <p class="text-2xl font-bold text-gray-900">{{ blackPlansCount }}</p>
            </div>
            <div class="rounded-xl bg-gray-900/5 p-3 text-gray-900">
              <svg class="h-6 w-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <path d="M12 2L2 7l10 5 10-5-10-5z" stroke="currentColor"/>
                <path d="M2 17l10 5 10-5" stroke="currentColor"/>
                <path d="M2 12l10 5 10-5" stroke="currentColor"/>
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
      </div>

      <!-- Card Plans Grid -->
      <div class="grid gap-6 md:grid-cols-2">
        <!-- Gold Card Plan -->
        <div v-if="goldPlan" class="rounded-2xl border-2 border-yellow-200 bg-gradient-to-br from-yellow-50/50 to-white p-6 shadow-lg shadow-yellow-500/10">
          <div class="flex items-start justify-between mb-4">
            <div class="flex items-center gap-4">
              <div class="flex h-16 w-16 items-center justify-center rounded-full bg-gradient-to-br from-yellow-400 to-yellow-600 text-white shadow-lg shadow-yellow-500/30">
                <span class="text-2xl font-bold">G</span>
              </div>
              <div>
                <h2 class="text-2xl font-bold text-gray-900">{{ goldPlan.displayName }}</h2>
                <p class="text-sm text-yellow-600 font-medium">Premium benefits</p>
              </div>
            </div>
            <span class="inline-flex items-center rounded-full bg-green-100 px-3 py-1 text-xs font-medium text-green-700">
              ● Active
            </span>
          </div>

          <div class="space-y-3 mb-6">
            <div class="flex items-center justify-between border-b border-yellow-100 pb-2">
              <span class="text-sm text-gray-600">Activation Fee</span>
              <span class="text-xl font-bold text-gray-900">${{ goldPlan.fee.toLocaleString() }}</span>
            </div>
            <div class="space-y-2">
              <p class="text-sm font-medium text-gray-700">Benefits:</p>
              <div v-for="benefit in goldPlan.benefits" :key="benefit" class="flex items-center gap-2 text-sm text-gray-600">
                <svg class="h-4 w-4 text-yellow-500" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                  <polyline points="20 6 9 17 4 12" stroke="currentColor"/>
                </svg>
                <span>{{ benefit }}</span>
              </div>
            </div>
          </div>

          <div class="flex gap-3">
            <button
              @click="openEditPlanModal(goldPlan)"
              class="flex-1 inline-flex items-center justify-center gap-2 rounded-xl bg-yellow-500 px-4 py-2.5 text-sm font-semibold text-white shadow-lg shadow-yellow-500/20 transition hover:bg-yellow-600"
            >
              <svg class="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" stroke="currentColor"/>
                <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z" stroke="currentColor"/>
              </svg>
              Edit Plan
            </button>
            <button
              @click="viewPlanDetails(goldPlan)"
              class="flex-1 inline-flex items-center justify-center gap-2 rounded-xl border-2 border-yellow-300 px-4 py-2.5 text-sm font-semibold text-yellow-700 transition hover:bg-yellow-50"
            >
              <svg class="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" stroke="currentColor"/>
                <circle cx="12" cy="12" r="3" stroke="currentColor"/>
              </svg>
              View Details
            </button>
          </div>
        </div>

        <!-- Black Card Plan -->
        <div v-if="blackPlan" class="rounded-2xl border-2 border-gray-800 bg-gradient-to-br from-gray-900/5 to-white p-6 shadow-lg shadow-gray-900/10">
          <div class="flex items-start justify-between mb-4">
            <div class="flex items-center gap-4">
              <div class="flex h-16 w-16 items-center justify-center rounded-full bg-gradient-to-br from-gray-700 to-gray-900 text-white shadow-lg shadow-gray-900/30">
                <span class="text-2xl font-bold">B</span>
              </div>
              <div>
                <h2 class="text-2xl font-bold text-gray-900">{{ blackPlan.displayName }}</h2>
                <p class="text-sm text-gray-600 font-medium">Ultimate experience</p>
              </div>
            </div>
            <span class="inline-flex items-center rounded-full bg-green-100 px-3 py-1 text-xs font-medium text-green-700">
              ● Active
            </span>
          </div>

          <div class="space-y-3 mb-6">
            <div class="flex items-center justify-between border-b border-gray-200 pb-2">
              <span class="text-sm text-gray-600">Activation Fee</span>
              <span class="text-xl font-bold text-gray-900">${{ blackPlan.fee.toLocaleString() }}</span>
            </div>
            <div class="space-y-2">
              <p class="text-sm font-medium text-gray-700">Benefits:</p>
              <div v-for="benefit in blackPlan.benefits" :key="benefit" class="flex items-center gap-2 text-sm text-gray-600">
                <svg class="h-4 w-4 text-gray-700" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                  <polyline points="20 6 9 17 4 12" stroke="currentColor"/>
                </svg>
                <span>{{ benefit }}</span>
              </div>
            </div>
          </div>

          <div class="flex gap-3">
            <button
              @click="openEditPlanModal(blackPlan)"
              class="flex-1 inline-flex items-center justify-center gap-2 rounded-xl bg-gray-900 px-4 py-2.5 text-sm font-semibold text-white shadow-lg shadow-gray-900/20 transition hover:bg-gray-800"
            >
              <svg class="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" stroke="currentColor"/>
                <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z" stroke="currentColor"/>
              </svg>
              Edit Plan
            </button>
            <button
              @click="viewPlanDetails(blackPlan)"
              class="flex-1 inline-flex items-center justify-center gap-2 rounded-xl border-2 border-gray-300 px-4 py-2.5 text-sm font-semibold text-gray-700 transition hover:bg-gray-50"
            >
              <svg class="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" stroke="currentColor"/>
                <circle cx="12" cy="12" r="3" stroke="currentColor"/>
              </svg>
              View Details
            </button>
          </div>
        </div>
      </div>

      <!-- All Plans Section -->
      <div class="mt-8">
        <div class="flex items-center justify-between mb-4">
          <h3 class="text-lg font-semibold text-gray-900">All Card Plans</h3>
          <span class="text-sm text-gray-500">{{ store.getCardPlans.length }} plans</span>
        </div>
        <div class="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          <div
            v-for="plan in store.getCardPlans"
            :key="plan.id || plan._id"
            class="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm transition hover:shadow-md"
          >
            <div class="flex items-center justify-between mb-3">
              <div class="flex items-center gap-2">
                <div class="flex h-10 w-10 items-center justify-center rounded-full text-white" :class="plan.name === 'gold' ? 'bg-gradient-to-br from-yellow-400 to-yellow-600' : 'bg-gradient-to-br from-gray-700 to-gray-900'">
                  <span class="font-bold">{{ plan.name === 'gold' ? 'G' : 'B' }}</span>
                </div>
                <div>
                  <p class="font-semibold text-gray-900">{{ plan.displayName }}</p>
                  <p class="text-xs text-gray-500">${{ plan.fee.toLocaleString() }}</p>
                </div>
              </div>
              <span class="inline-flex h-2 w-2 rounded-full" :class="plan.isActive !== false ? 'bg-green-500' : 'bg-red-500'"></span>
            </div>
            <p class="text-xs text-gray-500 truncate">{{ plan.benefits?.join(', ') || 'No benefits listed' }}</p>
            <div class="mt-3 flex gap-2">
              <button
                @click="openEditPlanModal(plan)"
                class="flex-1 rounded-lg bg-blue-50 px-3 py-1.5 text-xs font-medium text-blue-600 hover:bg-blue-100 transition"
              >
                Edit
              </button>
              <button
                @click="viewPlanDetails(plan)"
                class="flex-1 rounded-lg bg-gray-50 px-3 py-1.5 text-xs font-medium text-gray-600 hover:bg-gray-100 transition"
              >
                View
              </button>
            </div>
          </div>
        </div>
      </div>
    </main>

    <!-- Create/Edit Plan Modal -->
    <div v-if="showPlanModal" class="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div class="bg-white rounded-3xl max-w-2xl w-full p-8 shadow-2xl max-h-[90vh] overflow-y-auto">
        <div class="flex items-center justify-between mb-6">
          <div class="flex items-center gap-3">
            <div class="flex h-12 w-12 items-center justify-center rounded-full" :class="planForm.name === 'gold' ? 'bg-yellow-500' : 'bg-gray-900'">
              <span class="text-xl font-bold text-white">{{ planForm.name === 'gold' ? 'G' : 'B' }}</span>
            </div>
            <h3 class="text-xl font-bold text-gray-900">{{ editingPlan ? 'Edit Card Plan' : 'Create New Card Plan' }}</h3>
          </div>
          <button @click="closePlanModal" class="text-gray-400 hover:text-gray-600">
            <svg class="h-6 w-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <line x1="18" y1="6" x2="6" y2="18" stroke="currentColor"/>
              <line x1="6" y1="6" x2="18" y2="18" stroke="currentColor"/>
            </svg>
          </button>
        </div>

        <form @submit.prevent="savePlan()" class="space-y-4">
          <div class="grid grid-cols-2 gap-4">
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-1.5">Plan Type</label>
              <select
                v-model="planForm.name"
                class="w-full px-4 py-3 rounded-xl border border-gray-200 bg-gray-50 focus:bg-white focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 transition outline-none"
                :disabled="!!editingPlan"
              >
                <option value="gold">Gold</option>
                <option value="black">Black</option>
              </select>
            </div>
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-1.5">Display Name</label>
              <input
                v-model="planForm.displayName"
                type="text"
                required
                class="w-full px-4 py-3 rounded-xl border border-gray-200 bg-gray-50 focus:bg-white focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 transition outline-none"
                placeholder="Gold Card"
              />
            </div>
          </div>
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-1.5">Activation Fee (USD)</label>
            <input
              v-model="planForm.fee"
              type="number"
              required
              min="0"
              class="w-full px-4 py-3 rounded-xl border border-gray-200 bg-gray-50 focus:bg-white focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 transition outline-none"
              placeholder="500"
            />
          </div>
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-1.5">Benefits (one per line)</label>
            <textarea
              v-model="planForm.benefitsText"
              rows="4"
              class="w-full px-4 py-3 rounded-xl border border-gray-200 bg-gray-50 focus:bg-white focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 transition outline-none"
              placeholder="2% cashback on all purchases&#10;Free airport lounge access&#10;Travel insurance included"
            ></textarea>
          </div>
          <div>
            <label class="flex items-center gap-2 text-sm text-gray-700">
              <input
                v-model="planForm.isActive"
                type="checkbox"
                class="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
              />
              Active
            </label>
          </div>
          <div class="flex gap-3 pt-4">
            <button
              type="button"
              @click="closePlanModal"
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
              <span>{{ editingPlan ? 'Update Plan' : 'Create Plan' }}</span>
            </button>
          </div>
        </form>
      </div>
    </div>

    <!-- View Plan Details Modal -->
    <div v-if="showViewModal" class="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div class="bg-white rounded-3xl max-w-2xl w-full p-8 shadow-2xl max-h-[90vh] overflow-y-auto">
        <div class="flex items-center justify-between mb-6">
          <div class="flex items-center gap-3">
            <div class="flex h-12 w-12 items-center justify-center rounded-full" :class="viewingPlan?.name === 'gold' ? 'bg-yellow-500' : 'bg-gray-900'">
              <span class="text-xl font-bold text-white">{{ viewingPlan?.name === 'gold' ? 'G' : 'B' }}</span>
            </div>
            <div>
              <h3 class="text-xl font-bold text-gray-900">{{ viewingPlan?.displayName }}</h3>
              <p class="text-sm text-gray-500">{{ viewingPlan?.name === 'gold' ? 'Premium benefits' : 'Ultimate experience' }}</p>
            </div>
          </div>
          <button @click="closeViewModal" class="text-gray-400 hover:text-gray-600">
            <svg class="h-6 w-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <line x1="18" y1="6" x2="6" y2="18" stroke="currentColor"/>
              <line x1="6" y1="6" x2="18" y2="18" stroke="currentColor"/>
            </svg>
          </button>
        </div>

        <div class="space-y-4">
          <div class="grid grid-cols-2 gap-4">
            <div class="bg-gray-50 rounded-xl p-4">
              <p class="text-xs text-gray-500">Plan Type</p>
              <p class="text-sm font-semibold text-gray-900 capitalize">{{ viewingPlan?.name }}</p>
            </div>
            <div class="bg-gray-50 rounded-xl p-4">
              <p class="text-xs text-gray-500">Activation Fee</p>
              <p class="text-sm font-semibold text-gray-900">${{ viewingPlan?.fee?.toLocaleString() }}</p>
            </div>
          </div>
          <div class="bg-gray-50 rounded-xl p-4">
            <p class="text-xs text-gray-500">Status</p>
            <p class="text-sm font-semibold" :class="viewingPlan?.isActive !== false ? 'text-green-600' : 'text-red-600'">
              {{ viewingPlan?.isActive !== false ? 'Active' : 'Inactive' }}
            </p>
          </div>
          <div class="bg-gray-50 rounded-xl p-4">
            <p class="text-xs text-gray-500 mb-2">Benefits</p>
            <ul class="space-y-1">
              <li v-for="benefit in viewingPlan?.benefits" :key="benefit" class="flex items-center gap-2 text-sm text-gray-700">
                <svg class="h-4 w-4" :class="viewingPlan?.name === 'gold' ? 'text-yellow-500' : 'text-gray-700'" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                  <polyline points="20 6 9 17 4 12" stroke="currentColor"/>
                </svg>
                {{ benefit }}
              </li>
            </ul>
          </div>
          <div class="bg-gray-50 rounded-xl p-4">
            <p class="text-xs text-gray-500">Created At</p>
            <p class="text-sm font-semibold text-gray-900">{{ formatDate(viewingPlan?.createdAt) }}</p>
          </div>
          <div class="flex gap-3 pt-4">
            <button
              @click="closeViewModal"
              class="flex-1 py-3 px-4 border border-gray-200 text-gray-700 font-semibold rounded-xl hover:bg-gray-50 transition"
            >
              Close
            </button>
            <button
              @click="closeViewModal(); openEditPlanModal(viewingPlan)"
              class="flex-1 py-3 px-4 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-xl shadow-lg shadow-blue-600/20 transition"
            >
              Edit Plan
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import { useStore } from '@/stores'
import { useCardPlanActions } from '@/composables/actions'
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
  getCardPlans, 
  createCardPlan, 
  updateCardPlan 
} = useCardPlanActions()

// Computed
const goldPlan = computed(() => {
  return store.getCardPlans.find(p => p.name === 'gold')
})

const blackPlan = computed(() => {
  return store.getCardPlans.find(p => p.name === 'black')
})

const goldPlansCount = computed(() => {
  return store.getCardPlans.filter(p => p.name === 'gold').length
})

const blackPlansCount = computed(() => {
  return store.getCardPlans.filter(p => p.name === 'black').length
})

const totalRevenue = computed(() => {
  // This would be calculated from completed activations
  return 0
})

// Plan Modal
const showPlanModal = ref(false)
const editingPlan = ref(null)
const planForm = ref({
  name: 'gold',
  displayName: '',
  fee: 500,
  benefitsText: '',
  isActive: true
})

// View Modal
const showViewModal = ref(false)
const viewingPlan = ref(null)

// Open create plan modal
const openCreatePlanModal = () => {
  editingPlan.value = null
  planForm.value = {
    name: 'gold',
    displayName: '',
    fee: 500,
    benefitsText: '',
    isActive: true
  }
  showPlanModal.value = true
}

// Open edit plan modal
const openEditPlanModal = (plan) => {
  editingPlan.value = plan
  planForm.value = {
    name: plan.name,
    displayName: plan.displayName,
    fee: plan.fee,
    benefitsText: plan.benefits?.join('\n') || '',
    isActive: plan.isActive !== false
  }
  showPlanModal.value = true
}

// Close plan modal
const closePlanModal = () => {
  showPlanModal.value = false
  editingPlan.value = null
}

// Save plan
const savePlan = async () => {
  const payload = {
    name: planForm.value.name,
    displayName: planForm.value.displayName,
    fee: parseInt(planForm.value.fee),
    benefits: planForm.value.benefitsText.split('\n').filter(b => b.trim()),
    isActive: planForm.value.isActive
  }

  
  let response;
  if (editingPlan.value) {
    response = await updateCardPlan(editingPlan.value.id || editingPlan.value._id, payload)
  } else {
    console.log('payload', payload)
    response = await createCardPlan(payload)
  }

  if (response.success) {
    closePlanModal()
    await getCardPlans()
    toast.success(editingPlan.value ? 'Plan updated successfully!' : 'Plan created successfully!')
  }
}

// View plan details
const viewPlanDetails = (plan) => {
  viewingPlan.value = plan
  showViewModal.value = true
}

// Close view modal
const closeViewModal = () => {
  showViewModal.value = false
  viewingPlan.value = null
}

// Format date
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

// Lifecycle
onMounted(async () => {
  await getCardPlans()
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
</style>