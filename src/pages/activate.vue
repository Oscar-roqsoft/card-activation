<template>
  <div class="min-h-screen bg-gray-50">
    <!-- Page Header -->
    <section class="border-b border-gray-200 bg-white">
      <div class="mx-auto max-w-7xl px-5 py-8 sm:px-6 lg:px-8">
        <div class="flex flex-wrap items-center justify-between gap-4">
          <NuxtLink to="/" class="inline-flex items-center gap-2 text-sm font-medium text-gray-500 transition hover:text-blue-600">
            <svg class="h-4 w-4" viewBox="0 0 24 24" fill="none">
              <path d="M19 12H5M11 18l-6-6 6-6" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"/>
            </svg>
            Back to home
          </NuxtLink>
          <div class="inline-flex items-center rounded-full bg-blue-50 px-3 py-1.5">
            <span class="text-xs font-semibold uppercase tracking-wider text-blue-600">Card activation</span>
          </div>
        </div>
        <div class="mt-4 max-w-2xl">
          <h1 class="text-2xl font-bold tracking-tight text-gray-950 sm:text-3xl">Activate your card</h1>
          <p class="mt-2 text-sm leading-6 text-gray-500 sm:text-base">Complete all steps to activate your card.</p>
        </div>
      </div>
    </section>

    <!-- Main -->
    <main class="mx-auto max-w-7xl px-5 py-8 sm:px-6 sm:py-12 lg:px-8">
      <div class="grid gap-8 lg:grid-cols-[1fr_420px] lg:items-start">
        <!-- Left Column -->
        <div>
          <!-- Step 1: Card Details -->
          <div v-if="currentStep === 1" class="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm sm:p-7 mb-6">
            <div class="mb-6 flex items-center justify-between">
              <div>
                <p class="text-xs font-semibold text-gray-900">Step 1 of 4</p>
                <p class="mt-0.5 text-xs text-gray-400">Card details</p>
              </div>
              <span class="rounded-full bg-blue-50 px-3 py-1 text-xs font-semibold text-blue-600">25%</span>
            </div>
            <div class="h-1.5 overflow-hidden rounded-full bg-gray-100 mb-6">
              <div class="h-full w-1/4 rounded-full bg-blue-600"></div>
            </div>

            <div class="flex items-start gap-4 mb-6">
              <div class="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-blue-50 text-blue-600">
                <svg class="h-6 w-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7">
                  <rect x="2" y="4" width="20" height="16" rx="2" stroke="currentColor"/>
                  <path d="M2 8h20" stroke="currentColor"/>
                  <path d="M6 12h3" stroke="currentColor" stroke-linecap="round"/>
                </svg>
              </div>
              <div>
                <h2 class="text-lg font-semibold text-gray-900">Enter card details</h2>
                <p class="text-sm text-gray-500">Provide your card information to begin activation.</p>
              </div>
            </div>

            <form @submit.prevent="goToStep(2)" class="space-y-4">
              <div>
                <label class="block text-sm font-medium text-gray-700 mb-1.5">Card Number</label>
                <input
                  v-model="cardDetails.number"
                  type="text"
                  maxlength="19"
                  placeholder="1234 5678 9012 3456"
                  class="w-full px-4 py-3 rounded-xl border border-gray-200 bg-gray-50 focus:bg-white focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 transition outline-none"
                  @input="formatCardNumber"
                />
              </div>
              <div class="grid grid-cols-2 gap-4">
                <div>
                  <label class="block text-sm font-medium text-gray-700 mb-1.5">Expiry Date</label>
                  <input
                    v-model="cardDetails.expiry"
                    type="text"
                    maxlength="5"
                    placeholder="MM/YY"
                    class="w-full px-4 py-3 rounded-xl border border-gray-200 bg-gray-50 focus:bg-white focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 transition outline-none"
                    @input="formatExpiry"
                  />
                </div>
                <div>
                  <label class="block text-sm font-medium text-gray-700 mb-1.5">CVV</label>
                  <input
                    v-model="cardDetails.cvv"
                    type="password"
                    maxlength="4"
                    placeholder="•••"
                    class="w-full px-4 py-3 rounded-xl border border-gray-200 bg-gray-50 focus:bg-white focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 transition outline-none"
                  />
                </div>
              </div>
              <div>
                <label class="block text-sm font-medium text-gray-700 mb-1.5">Cardholder Name</label>
                <input
                  v-model="cardDetails.name"
                  type="text"
                  placeholder="John Doe"
                  class="w-full px-4 py-3 rounded-xl border border-gray-200 bg-gray-50 focus:bg-white focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 transition outline-none"
                />
              </div>
              <button type="submit" class="w-full py-3.5 px-4 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-xl shadow-lg shadow-blue-600/20 transition flex items-center justify-center gap-2">
                Continue to Payment
                <svg class="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                  <path d="M5 12h14M13 6l6 6-6 6" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round"/>
                </svg>
              </button>
            </form>
          </div>

          <!-- Step 2: Activation Payment -->
          <div v-if="currentStep === 2" class="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm sm:p-7 mb-6">
            <div class="mb-6 flex items-center justify-between">
              <div>
                <p class="text-xs font-semibold text-gray-900">Step 2 of 4</p>
                <p class="mt-0.5 text-xs text-gray-400">Activation payment</p>
              </div>
              <span class="rounded-full bg-blue-50 px-3 py-1 text-xs font-semibold text-blue-600">50%</span>
            </div>
            <div class="h-1.5 overflow-hidden rounded-full bg-gray-100 mb-6">
              <div class="h-full w-1/2 rounded-full bg-blue-600"></div>
            </div>

            <div class="flex items-start gap-4 mb-6">
              <div class="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-blue-50 text-blue-600">
                <svg class="h-6 w-6" viewBox="0 0 24 24" fill="none">
                  <rect x="3" y="5" width="18" height="14" rx="2" stroke="currentColor" stroke-width="1.7"/>
                  <path d="M3 10h18" stroke="currentColor" stroke-width="1.7"/>
                  <path d="M7 15h3" stroke="currentColor" stroke-width="1.7" stroke-linecap="round"/>
                </svg>
              </div>
              <div>
                <h2 class="text-lg font-semibold text-gray-900">Activation payment</h2>
                <p class="text-sm text-gray-500">A one-time activation fee is required before you continue.</p>
              </div>
            </div>

            <div class="rounded-2xl border border-blue-100 bg-blue-50 p-5 mb-7">
              <div class="flex items-center justify-between gap-4">
                <div>
                  <p class="text-sm font-semibold text-gray-900">Card activation fee</p>
                  <p class="text-xs text-gray-500">One-time payment</p>
                </div>
                <div class="text-right">
                  <p class="text-2xl font-bold text-gray-950">${{ activationFee.toLocaleString() }}</p>
                </div>
              </div>
            </div>

            <div class="mb-7">
              <div class="flex items-center gap-2 mb-2">
                <svg class="h-4 w-4 text-blue-600" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8">
                  <rect x="3" y="7" width="18" height="14" rx="2" stroke="currentColor"/>
                  <path d="M8 7V5h8v2" stroke="currentColor"/>
                  <path d="M12 11v4" stroke="currentColor"/>
                  <circle cx="12" cy="13" r="1" fill="currentColor"/>
                </svg>
                <span class="text-sm font-medium text-gray-700">Deposit USDT to activate</span>
              </div>
              <div class="wallet-box">
                <span class="wallet-address" id="walletAddress">0x1a2B3c4D5e6F7a8B9c0D1E2f3A4B5C6D7E8F9A0B</span>
                <div class="flex gap-2">
                  <button class="copy-btn" @click="copyWallet">Copy</button>
                  <span v-if="copied" class="text-xs text-green-600 font-medium">✓ copied</span>
                </div>
              </div>
              <p class="text-xs text-gray-400 mt-2">Send the exact amount in USDT (BEP20/ERC20) to the address above.</p>
            </div>

            <button type="button" :disabled="paymentConfirmed" @click="confirmPayment" class="group mt-2 flex w-full items-center justify-center gap-2 rounded-xl bg-blue-600 px-6 py-3.5 text-sm font-semibold text-white shadow-lg shadow-blue-600/20 transition hover:bg-blue-700 disabled:opacity-60 disabled:cursor-not-allowed">
              <span v-if="!paymentConfirmed">✅ I've sent the payment</span>
              <span v-else>✓ Payment confirmed</span>
            </button>
            <p class="mt-2 text-center text-xs text-gray-400">After deposit, confirm to proceed to verification</p>
          </div>

          <!-- Step 3: OTP Verification -->
          <div v-if="currentStep === 3" class="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm sm:p-7">
            <div class="flex items-center justify-between mb-3">
              <div>
                <p class="text-xs font-semibold text-gray-900">Step 3 of 4</p>
                <p class="mt-0.5 text-xs text-gray-400">Secure verification</p>
              </div>
              <span class="rounded-full bg-blue-50 px-3 py-1 text-xs font-semibold text-blue-600">75%</span>
            </div>
            <div class="h-1.5 overflow-hidden rounded-full bg-gray-100 mb-6">
              <div class="h-full w-3/4 rounded-full bg-blue-600"></div>
            </div>

            <div class="flex justify-center mb-4">
              <div class="flex h-14 w-14 items-center justify-center rounded-2xl bg-blue-50 text-blue-600">
                <svg class="h-7 w-7" viewBox="0 0 24 24" fill="none">
                  <path d="M12 3 5 6v5c0 4.6 2.9 8.7 7 10 4.1-1.3 7-5.4 7-10V6l-7-3Z" stroke="currentColor" stroke-width="1.7" stroke-linejoin="round"/>
                  <path d="M9 12h.01M12 12h.01M15 12h.01" stroke="currentColor" stroke-width="2.5" stroke-linecap="round"/>
                </svg>
              </div>
            </div>
            <div class="text-center mb-6">
              <h2 class="text-xl font-bold text-gray-950">Verify your identity</h2>
              <p class="text-sm text-gray-500 mt-1">Enter the 6-digit code sent to your email.</p>
            </div>

            <div class="mx-auto flex max-w-sm items-center justify-center gap-3 rounded-xl bg-gray-50 px-4 py-3 mb-7">
              <div class="flex h-9 w-9 items-center justify-center rounded-lg bg-white text-gray-500 shadow-sm">
                <svg class="h-4 w-4" viewBox="0 0 24 24" fill="none">
                  <path d="M4 6h16v12H4z" stroke="currentColor" stroke-width="1.7" stroke-linejoin="round"/>
                  <path d="m4 7 8 6 8-6" stroke="currentColor" stroke-width="1.7" stroke-linejoin="round"/>
                </svg>
              </div>
              <div class="text-left">
                <p class="text-xs text-gray-400">Verification code sent to</p>
                <p class="text-sm font-semibold text-gray-800">{{ userEmail || 'your@email.com' }}</p>
              </div>
            </div>

            <form @submit.prevent="verifyCode" class="max-w-sm mx-auto">
              <div class="flex justify-center gap-2 sm:gap-3 mb-2">
                <input v-for="(digit, idx) in code" :key="idx" :ref="el => setInputRef(el, idx)" v-model="code[idx]" type="text" inputmode="numeric" maxlength="1" autocomplete="one-time-code" class="h-12 w-10 rounded-xl border border-gray-200 bg-white text-center text-lg font-semibold text-gray-900 outline-none transition focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 sm:h-14 sm:w-12" @input="handleInput(idx)" @keydown.backspace="handleBackspace(idx)" @paste="handlePaste" />
              </div>
              <p v-if="errorMessage" class="text-center text-xs font-medium text-red-500 mt-2">{{ errorMessage }}</p>

              <div class="mt-5 text-center">
                <p class="text-xs text-gray-400">Didn't receive a code?</p>
                <button v-if="countdown === 0" type="button" class="mt-1 text-sm font-semibold text-blue-600 transition hover:text-blue-700" @click="resendCode">Resend code</button>
                <p v-else class="mt-1 text-sm font-medium text-gray-500">Resend available in <span class="font-semibold text-gray-700">{{ countdown }}s</span></p>
              </div>

              <button type="submit" :disabled="!isComplete || loading" class="group mt-6 flex w-full items-center justify-center gap-2 rounded-xl bg-blue-600 px-6 py-3.5 text-sm font-semibold text-white shadow-lg shadow-blue-600/20 transition hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed">
                <svg v-if="loading" class="h-4 w-4 animate-spin" viewBox="0 0 24 24" fill="none">
                  <circle cx="12" cy="12" r="9" stroke="currentColor" stroke-width="2" class="opacity-25"/>
                  <path d="M21 12a9 9 0 0 0-9-9" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
                </svg>
                <template v-else>
                  Verify & Continue
                  <svg class="h-4 w-4 transition-transform group-hover:translate-x-1" viewBox="0 0 24 24" fill="none">
                    <path d="M5 12h14M13 6l6 6-6 6" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                  </svg>
                </template>
              </button>
            </form>
          </div>

          <!-- Step 4: Waiting for Approval -->
          <div v-if="currentStep === 4" class="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm sm:p-7">
            <div class="flex items-center justify-between mb-3">
              <div>
                <p class="text-xs font-semibold text-gray-900">Step 4 of 4</p>
                <p class="mt-0.5 text-xs text-gray-400">Waiting for approval</p>
              </div>
              <span class="rounded-full bg-yellow-50 px-3 py-1 text-xs font-semibold text-yellow-600">100%</span>
            </div>
            <div class="h-1.5 overflow-hidden rounded-full bg-gray-100 mb-6">
              <div class="h-full w-full rounded-full bg-yellow-500"></div>
            </div>

            <div class="text-center py-8">
              <div class="flex justify-center mb-6">
                <div class="relative">
                  <div class="flex h-20 w-20 items-center justify-center rounded-full bg-yellow-50 text-yellow-500">
                    <svg class="h-10 w-10 animate-pulse" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7">
                      <circle cx="12" cy="12" r="10" stroke="currentColor"/>
                      <path d="M12 8v4M12 16h.01" stroke="currentColor" stroke-linecap="round"/>
                    </svg>
                  </div>
                  <div class="absolute -bottom-1 -right-1 flex h-6 w-6 items-center justify-center rounded-full bg-yellow-500 text-white text-xs font-bold animate-bounce">
                    !
                  </div>
                </div>
              </div>

              <h2 class="text-xl font-bold text-gray-900">Waiting for Approval</h2>
              <p class="text-sm text-gray-500 mt-2 max-w-sm mx-auto">
                Your card activation is pending approval. This usually takes 5-10 minutes.
              </p>

              <div class="mt-6 flex justify-center gap-2">
                <div class="flex items-center gap-2 text-sm text-gray-600">
                  <div class="flex h-2 w-2 rounded-full bg-green-500 animate-pulse"></div>
                  <span>Processing...</span>
                </div>
              </div>

              <div class="mt-8 bg-gray-50 rounded-xl p-4 max-w-sm mx-auto">
                <div class="flex items-center gap-3">
                  <svg class="h-5 w-5 text-blue-500" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                    <circle cx="12" cy="12" r="10" stroke="currentColor"/>
                    <polyline points="12 6 12 12 16 14" stroke="currentColor"/>
                  </svg>
                  <span class="text-xs text-gray-500">Estimated time: 5-10 minutes</span>
                </div>
              </div>

              <button @click="simulateApproval" class="mt-6 inline-flex items-center gap-2 px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-xl transition">
                <svg class="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                  <path d="M20 6L9 17l-5-5" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round"/>
                </svg>
                Check Status
              </button>
            </div>
          </div>
        </div>

        <!-- Right Column: Summary -->
        <div class="lg:sticky lg:top-6">
          <div class="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm sm:p-7">
            <div class="mb-6">
              <h2 class="text-lg font-semibold text-gray-900">Activation summary</h2>
              <p class="text-sm text-gray-500">Track your progress</p>
            </div>

            <!-- Progress Steps -->
            <div class="space-y-4 mb-6">
              <div class="flex items-center gap-3">
                <div class="flex h-8 w-8 shrink-0 items-center justify-center rounded-full" :class="currentStep > 1 ? 'bg-green-500 text-white' : currentStep === 1 ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-400'">
                  <svg v-if="currentStep > 1" class="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5">
                    <polyline points="20 6 9 17 4 12" stroke="currentColor"/>
                  </svg>
                  <span v-else class="text-xs font-bold">1</span>
                </div>
                <div>
                  <p class="text-sm font-medium" :class="currentStep >= 1 ? 'text-gray-900' : 'text-gray-400'">Card Details</p>
                  <p class="text-xs text-gray-400">Enter card information</p>
                </div>
              </div>

              <div class="flex items-center gap-3">
                <div class="flex h-8 w-8 shrink-0 items-center justify-center rounded-full" :class="currentStep > 2 ? 'bg-green-500 text-white' : currentStep === 2 ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-400'">
                  <svg v-if="currentStep > 2" class="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5">
                    <polyline points="20 6 9 17 4 12" stroke="currentColor"/>
                  </svg>
                  <span v-else class="text-xs font-bold">2</span>
                </div>
                <div>
                  <p class="text-sm font-medium" :class="currentStep >= 2 ? 'text-gray-900' : 'text-gray-400'">Activation Payment</p>
                  <p class="text-xs text-gray-400">Pay activation fee</p>
                </div>
              </div>

              <div class="flex items-center gap-3">
                <div class="flex h-8 w-8 shrink-0 items-center justify-center rounded-full" :class="currentStep > 3 ? 'bg-green-500 text-white' : currentStep === 3 ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-400'">
                  <svg v-if="currentStep > 3" class="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5">
                    <polyline points="20 6 9 17 4 12" stroke="currentColor"/>
                  </svg>
                  <span v-else class="text-xs font-bold">3</span>
                </div>
                <div>
                  <p class="text-sm font-medium" :class="currentStep >= 3 ? 'text-gray-900' : 'text-gray-400'">OTP Verification</p>
                  <p class="text-xs text-gray-400">Verify your identity</p>
                </div>
              </div>

              <div class="flex items-center gap-3">
                <div class="flex h-8 w-8 shrink-0 items-center justify-center rounded-full" :class="currentStep === 4 ? 'bg-yellow-500 text-white' : 'bg-gray-200 text-gray-400'">
                  <span class="text-xs font-bold">4</span>
                </div>
                <div>
                  <p class="text-sm font-medium" :class="currentStep === 4 ? 'text-gray-900' : 'text-gray-400'">Waiting for Approval</p>
                  <p class="text-xs text-gray-400">Final review</p>
                </div>
              </div>
            </div>

            <div class="space-y-3 text-sm">
              <div class="flex justify-between"><span class="text-gray-500">Activation fee</span><span class="font-medium">${{ activationFee.toLocaleString() }}</span></div>
              <div class="flex justify-between"><span class="text-gray-500">Processing</span><span class="font-medium">$0</span></div>
              <div class="h-px bg-gray-100"></div>
              <div class="flex justify-between items-center"><span class="font-semibold text-gray-900">Total</span><span class="text-xl font-bold text-gray-950">${{ activationFee.toLocaleString() }}</span></div>
            </div>

            <div class="mt-6 rounded-xl bg-gray-50 p-4">
              <div class="flex gap-3">
                <div class="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-white text-blue-600 shadow-sm">
                  <svg class="h-4 w-4" viewBox="0 0 24 24" fill="none">
                    <circle cx="12" cy="12" r="9" stroke="currentColor" stroke-width="1.7"/>
                    <path d="M12 10v5M12 7.5v.2" stroke="currentColor" stroke-width="1.7" stroke-linecap="round"/>
                  </svg>
                </div>
                <div>
                  <p class="text-xs font-semibold text-gray-900">Need help?</p>
                  <p class="mt-1 text-xs leading-5 text-gray-500">Contact support if you encounter any issues.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>

    <!-- Success Overlay -->
    <div v-if="success" class="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div class="bg-white rounded-3xl max-w-md w-full p-8 text-center shadow-2xl">
        <div class="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-green-100 text-green-600">
          <svg class="h-8 w-8" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
            <path d="M20 6 9 17l-5-5"/>
          </svg>
        </div>
        <h3 class="mt-4 text-2xl font-bold text-gray-900">🎉 Card Activated!</h3>
        <p class="mt-2 text-gray-500">Your card has been successfully activated. You can start using it immediately.</p>
        <button @click="resetAll" class="mt-6 inline-flex w-full justify-center rounded-xl bg-blue-600 px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-blue-600/20 hover:bg-blue-700 transition">Go to Dashboard</button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, onBeforeUnmount, nextTick } from 'vue'

// Current step: 1 = Card Details, 2 = Payment, 3 = OTP, 4 = Waiting for Approval
const currentStep = ref(1)
const activationFee = 5000
const userEmail = ref('user@example.com')

// Card Details
const cardDetails = ref({
  number: '',
  expiry: '',
  cvv: '',
  name: ''
})

// Payment
const paymentConfirmed = ref(false)
const copied = ref(false)

// OTP Verification
const code = ref(['', '', '', '', '', ''])
const inputRefs = ref([])
const loading = ref(false)
const errorMessage = ref('')
const countdown = ref(30)
let countdownTimer = null
const success = ref(false)

const isComplete = computed(() => code.value.every(d => d !== ''))

// Format card number
const formatCardNumber = (e) => {
  let value = cardDetails.value.number.replace(/\D/g, '')
  if (value.length > 16) value = value.slice(0, 16)
  let formatted = ''
  for (let i = 0; i < value.length; i++) {
    if (i > 0 && i % 4 === 0) formatted += ' '
    formatted += value[i]
  }
  cardDetails.value.number = formatted
}

// Format expiry
const formatExpiry = (e) => {
  let value = cardDetails.value.expiry.replace(/\D/g, '')
  if (value.length > 4) value = value.slice(0, 4)
  if (value.length >= 2) {
    value = value.slice(0, 2) + '/' + value.slice(2)
  }
  cardDetails.value.expiry = value
}

// Navigate between steps
const goToStep = (step) => {
  currentStep.value = step
}

// Wallet copy
const copyWallet = () => {
  const addr = document.getElementById('walletAddress')?.innerText || '0x1a2B3c4D5e6F7a8B9c0D1E2f3A4B5C6D7E8F9A0B'
  if (navigator.clipboard) {
    navigator.clipboard.writeText(addr).then(() => {
      copied.value = true
      setTimeout(() => copied.value = false, 2500)
    })
  } else {
    const el = document.createElement('textarea')
    el.value = addr
    document.body.appendChild(el)
    el.select()
    document.execCommand('copy')
    document.body.removeChild(el)
    copied.value = true
    setTimeout(() => copied.value = false, 2500)
  }
}

// Payment confirmation
const confirmPayment = () => {
  if (!paymentConfirmed.value) {
    paymentConfirmed.value = true
    // After payment confirmed, move to OTP step
    setTimeout(() => {
      goToStep(3)
    }, 500)
  }
}

// OTP handlers
const setInputRef = (el, index) => {
  if (el) inputRefs.value[index] = el
}

const handleInput = async (index) => {
  errorMessage.value = ''
  code.value[index] = code.value[index].replace(/\D/g, '').slice(0, 1)
  if (code.value[index] && index < code.value.length - 1) {
    await nextTick()
    inputRefs.value[index + 1]?.focus()
  }
}

const handleBackspace = async (index) => {
  if (!code.value[index] && index > 0) {
    await nextTick()
    inputRefs.value[index - 1]?.focus()
  }
}

const handlePaste = async (event) => {
  event.preventDefault()
  const pasted = event.clipboardData.getData('text').replace(/\D/g, '').slice(0, 6)
  if (!pasted) return
  pasted.split('').forEach((digit, idx) => {
    code.value[idx] = digit
  })
  await nextTick()
  const nextIndex = Math.min(pasted.length, code.value.length - 1)
  inputRefs.value[nextIndex]?.focus()
}

const startCountdown = () => {
  countdown.value = 30
  clearInterval(countdownTimer)
  countdownTimer = setInterval(() => {
    if (countdown.value > 0) countdown.value--
    else clearInterval(countdownTimer)
  }, 1000)
}

const resendCode = () => {
  errorMessage.value = ''
  console.log('Resend verification code')
  startCountdown()
}

const verifyCode = async () => {
  if (!isComplete.value || loading.value) return
  loading.value = true
  errorMessage.value = ''
  try {
    const verificationCode = code.value.join('')
    console.log('Verification code:', verificationCode)
    await new Promise(resolve => setTimeout(resolve, 1000))
    // Move to waiting for approval step
    goToStep(4)
  } catch (err) {
    errorMessage.value = 'Unable to verify the code. Please try again.'
  } finally {
    loading.value = false
  }
}

// Simulate approval
const simulateApproval = () => {
  // Simulate checking status
  setTimeout(() => {
    success.value = true
  }, 1500)
}

// Reset all
const resetAll = () => {
  success.value = false
  currentStep.value = 1
  paymentConfirmed.value = false
  code.value = ['', '', '', '', '', '']
  cardDetails.value = {
    number: '',
    expiry: '',
    cvv: '',
    name: ''
  }
}

// Lifecycle
onMounted(() => {
  startCountdown()
})

onBeforeUnmount(() => {
  clearInterval(countdownTimer)
})
</script>

<style scoped>
.card-scene {
  perspective: 1000px;
}
.credit-card {
  position: relative;
  width: 100%;
  aspect-ratio: 1.586;
  overflow: hidden;
  border-radius: 20px;
  background: linear-gradient(135deg, #1769ff 0%, #1247c9 45%, #081f5c 100%);
  box-shadow: 0 25px 50px -15px rgba(18, 71, 201, 0.4);
  animation: cardFloat 5s ease-in-out infinite;
}
@keyframes cardFloat {
  0%, 100% { transform: rotateY(-4deg) rotateX(2deg) translateY(0); }
  50% { transform: rotateY(4deg) rotateX(-1deg) translateY(-5px); }
}
.card-shine {
  position: absolute;
  top: -100%;
  left: -80%;
  width: 45%;
  height: 300%;
  transform: rotate(25deg);
  background: linear-gradient(90deg, transparent, rgba(255,255,255,0.15), transparent);
  animation: shine 5s ease-in-out infinite;
}
@keyframes shine {
  0%, 25% { left: -80%; }
  60%, 100% { left: 180%; }
}
.wallet-box {
  background: #f8fafc;
  border: 1px solid #e2e8f0;
  border-radius: 1rem;
  padding: 1rem 1.25rem;
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: space-between;
  gap: 0.75rem;
}
.wallet-address {
  font-family: 'SF Mono', 'Fira Code', monospace;
  font-size: 0.85rem;
  background: white;
  padding: 0.4rem 1rem;
  border-radius: 40px;
  border: 1px solid #e2e8f0;
  color: #0f172a;
  letter-spacing: 0.3px;
  word-break: break-all;
}
.copy-btn {
  background: white;
  border: 1px solid #e2e8f0;
  border-radius: 40px;
  padding: 0.3rem 1rem;
  font-size: 0.75rem;
  font-weight: 500;
  color: #1e293b;
  transition: all 0.15s;
  cursor: pointer;
}
.copy-btn:hover {
  background: #f1f5f9;
  border-color: #94a3b8;
}
input:focus {
  outline: none;
  box-shadow: 0 0 0 4px rgba(37, 99, 235, 0.15);
}

</style>