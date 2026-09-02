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
          <p class="mt-2 text-sm leading-6 text-gray-500 sm:text-base">Choose your card plan and complete all steps to activate.</p>
        </div>
      </div>
    </section>

    <!-- Loading Overlay -->
    <div v-if="store.state.isLoading" class="fixed inset-0 bg-black/20 backdrop-blur-sm flex items-center justify-center z-50">
      <LoadingSpinner size="lg" color="blue" label="Loading..." />
    </div>

    <!-- Main -->
    <main class="mx-auto max-w-7xl px-5 py-8 sm:px-6 sm:py-12 lg:px-8">
      <div class="grid gap-8 lg:grid-cols-[1fr_420px] lg:items-start">
        <!-- Left Column -->
        <div>
          <!-- Step 0: Card Plan Selection -->
          <div v-if="currentStep === 0" class="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm sm:p-7 mb-6">
            <div class="mb-6 flex items-center justify-between">
              <div>
                <p class="text-xs font-semibold text-gray-900">Choose Your Plan</p>
                <p class="mt-0.5 text-xs text-gray-400">Select a card type</p>
              </div>
              <span class="rounded-full bg-blue-50 px-3 py-1 text-xs font-semibold text-blue-600">0%</span>
            </div>
            <div class="h-1.5 overflow-hidden rounded-full bg-gray-100 mb-6">
              <div class="h-full w-0 rounded-full bg-blue-600"></div>
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
                <h2 class="text-lg font-semibold text-gray-900">Select your card</h2>
                <p class="text-sm text-gray-500">Choose between our Gold or Black card plans.</p>
              </div>
            </div>

            <!-- Loading State for Plans -->
            <div v-if="store.state.loadingCardPrice" class="flex justify-center py-8">
              <LoadingSpinner size="md" color="blue" label="Loading plans..." />
            </div>

            <!-- Card Plans -->
            <div v-else class="grid gap-4 md:grid-cols-2">
              <div
                v-for="plan in store.getCardPlans"
                :key="plan.id || plan._id"
                @click="selectPlan(plan.id || plan._id)"
                class="relative rounded-2xl border-2 p-6 cursor-pointer transition-all duration-300 hover:shadow-lg"
                :class="[
                  selectedPlanId === (plan.id || plan._id)
                    ? plan.name === 'gold' 
                      ? 'border-yellow-500 bg-yellow-50 shadow-lg shadow-yellow-500/20'
                      : 'border-gray-900 bg-gray-900/5 shadow-lg shadow-gray-900/20'
                    : 'border-gray-200 hover:border-gray-300 hover:bg-gray-50/30'
                ]"
              >
                <div class="absolute top-3 right-3">
                  <div v-if="selectedPlanId === (plan.id || plan._id)" class="flex h-6 w-6 items-center justify-center rounded-full" :class="plan.name === 'gold' ? 'bg-yellow-500' : 'bg-gray-900'">
                    <svg class="h-4 w-4 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3">
                      <polyline points="20 6 9 17 4 12" stroke="currentColor"/>
                    </svg>
                  </div>
                </div>

                <div class="flex items-center gap-3 mb-3">
                  <div class="flex h-12 w-12 shrink-0 items-center justify-center rounded-full text-white shadow-lg" :class="plan.name === 'gold' ? 'bg-gradient-to-br from-yellow-400 to-yellow-600' : 'bg-gradient-to-br from-gray-700 to-gray-900'">
                    <span class="text-xl font-bold">{{ plan.name === 'gold' ? 'G' : 'B' }}</span>
                  </div>
                  <div>
                    <h3 class="text-lg font-bold text-gray-900">{{ plan.displayName }}</h3>
                    <p class="text-xs text-gray-500">{{ plan.name === 'gold' ? 'Premium benefits' : 'Ultimate experience' }}</p>
                  </div>
                </div>

                <div class="space-y-2 text-sm">
                  <div v-for="benefit in plan.benefits" :key="benefit" class="flex items-center gap-2 text-gray-600">
                    <svg class="h-4 w-4" :class="plan.name === 'gold' ? 'text-yellow-500' : 'text-gray-700'" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                      <polyline points="20 6 9 17 4 12" stroke="currentColor"/>
                    </svg>
                    <span>{{ benefit }}</span>
                  </div>
                </div>

                <div class="mt-4 pt-4 border-t border-gray-200">
                  <p class="text-2xl font-bold text-gray-900">${{ plan.fee.toLocaleString() }}</p>
                  <p class="text-xs text-gray-400">One-time activation fee</p>
                </div>
              </div>
            </div>

            <button
              @click="handleContinueToCardDetails"
              :disabled="!selectedPlanId || store.state.isLoading"
              class="mt-6 w-full py-3.5 px-4 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-xl shadow-lg shadow-blue-600/20 transition disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
            >
              <LoadingSpinner v-if="store.state.isLoading" size="sm" color="white" />
              <span v-else>Continue with {{ selectedPlan ? selectedPlan.displayName : '...' }} Card</span>
              <svg v-if="!store.state.isLoading" class="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <path d="M5 12h14M13 6l6 6-6 6" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round"/>
              </svg>
            </button>
          </div>

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

            <form @submit.prevent="handleInitiateActivation" class="space-y-4">
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

              <!-- Error Display -->
              <div v-if="store.errorMessage" class="text-sm text-red-600 bg-red-50 p-3 rounded-xl border border-red-200">
                {{ store.errorMessage }}
              </div>

              <button type="submit" :disabled="store.state.isLoading" class="w-full py-3.5 px-4 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-xl shadow-lg shadow-blue-600/20 transition disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2">
                <LoadingSpinner v-if="store.state.isLoading" size="sm" color="white" />
                <span v-else>Continue to Payment</span>
                <svg v-if="!store.state.isLoading" class="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
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
                  <p class="text-sm font-semibold text-gray-900">{{ selectedPlan?.displayName || 'Card' }} activation fee</p>
                  <p class="text-xs text-gray-500">One-time payment</p>
                </div>
                <div class="text-right">
                  <p class="text-2xl font-bold text-gray-950">${{ selectedPlanFee.toLocaleString() }}</p>
                </div>
              </div>
            </div>

            <!-- Multi-Coin Wallet Address -->
            <div class="mb-7">
              <div class="flex items-center gap-2 mb-3">
                <svg class="h-4 w-4 text-blue-600" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8">
                  <rect x="3" y="7" width="18" height="14" rx="2" stroke="currentColor"/>
                  <path d="M8 7V5h8v2" stroke="currentColor"/>
                  <path d="M12 11v4" stroke="currentColor"/>
                  <circle cx="12" cy="13" r="1" fill="currentColor"/>
                </svg>
                <span class="text-sm font-medium text-gray-700">Select cryptocurrency &amp; deposit</span>
              </div>

              <!-- Coin Selection -->
              <div class="flex flex-wrap gap-2 mb-4">
                <button
                  v-for="coin in coinWallets"
                  :key="coin.coin"
                  @click="selectCoin(coin.coin)"
                  class="flex items-center gap-2 px-4 py-2 rounded-xl border-2 transition-all duration-200 text-sm font-medium"
                  :class="[
                    selectedCoin === coin.coin
                      ? 'border-blue-500 bg-blue-50 text-blue-700 shadow-sm shadow-blue-500/20'
                      : 'border-gray-200 bg-white text-gray-600 hover:border-gray-300 hover:bg-gray-50'
                  ]"
                >
                  <span class="text-base">{{ getCoinIcon(coin.coin) }}</span>
                  <span>{{ coin.coin }}</span>
                  <span class="text-xs text-gray-400">{{ coin.network }}</span>
                </button>
              </div>

              <!-- Loading state for wallets -->
              <div v-if="store.state.isLoading && coinWallets.length === 0" class="flex justify-center py-4">
                <LoadingSpinner size="sm" color="blue" />
              </div>

              <!-- Wallet Address Display -->
              <div v-else class="wallet-box">
                <div class="flex items-center gap-2 min-w-0 flex-1">
                  <span class="text-lg">{{ getCoinIcon(selectedCoin) }}</span>
                  <span class="wallet-address" id="walletAddress">{{ getWalletAddressForCoin(selectedCoin) }}</span>
                </div>
                <div class="flex gap-2 flex-shrink-0">
                  <button class="copy-btn" @click="copyWallet">Copy</button>
                  <span v-if="copied" class="text-xs text-green-600 font-medium">✓ copied</span>
                </div>
              </div>

              <div class="mt-3 flex items-center gap-2 text-xs text-gray-400">
                <svg class="h-3.5 w-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                  <circle cx="12" cy="12" r="10" stroke="currentColor"/>
                  <polyline points="12 6 12 12 16 14" stroke="currentColor"/>
                </svg>
                <span>Send the exact amount in {{ selectedCoin }} to the address above. Network: {{ getCoinNetwork(selectedCoin) }}</span>
              </div>

              <div class="mt-2 text-xs text-gray-400 flex items-center gap-1">
                <span>≈ ${{ selectedPlanFee.toLocaleString() }} USD</span>
                <span class="text-gray-300">|</span>
                <span>Min. deposit: 0.001 {{ selectedCoin }}</span>
              </div>
            </div>

            <!-- Error Display -->
            <div v-if="store.errorMessage" class="text-sm text-red-600 bg-red-50 p-3 rounded-xl border border-red-200 mb-4">
              {{ store.errorMessage }}
            </div>

            <button type="button" :disabled="paymentConfirmed || store.state.isLoading" @click="handleConfirmPayment" class="group mt-2 flex w-full items-center justify-center gap-2 rounded-xl bg-blue-600 px-6 py-3.5 text-sm font-semibold text-white shadow-lg shadow-blue-600/20 transition hover:bg-blue-700 disabled:opacity-60 disabled:cursor-not-allowed">
              <LoadingSpinner v-if="store.state.isLoading" size="sm" color="white" />
              <span v-else-if="!paymentConfirmed">✅ I've sent the payment</span>
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
                <p class="text-sm font-semibold text-gray-800">{{ store.getUserEmail || 'your@email.com' }}</p>
              </div>
            </div>

            <form @submit.prevent="handleVerifyOTP" class="max-w-sm mx-auto">
              <div class="flex justify-center gap-2 sm:gap-3 mb-2">
                <input v-for="(digit, idx) in code" :key="idx" :ref="el => setInputRef(el, idx)" v-model="code[idx]" type="text" inputmode="numeric" maxlength="1" autocomplete="one-time-code" class="h-12 w-10 rounded-xl border border-gray-200 bg-white text-center text-lg font-semibold text-gray-900 outline-none transition focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 sm:h-14 sm:w-12" @input="handleInput(idx)" @keydown.backspace="handleBackspace(idx)" @paste="handlePaste" />
              </div>
              <p v-if="errorMessage" class="text-center text-xs font-medium text-red-500 mt-2">{{ errorMessage }}</p>
              <p v-if="store.errorMessage" class="text-center text-xs font-medium text-red-500 mt-2">{{ store.errorMessage }}</p>

              <div class="mt-5 text-center">
                <p class="text-xs text-gray-400">Didn't receive a code?</p>
                <button v-if="countdown === 0" type="button" class="mt-1 text-sm font-semibold text-blue-600 transition hover:text-blue-700" @click="handleResendOTP">Resend code</button>
                <p v-else class="mt-1 text-sm font-medium text-gray-500">Resend available in <span class="font-semibold text-gray-700">{{ countdown }}s</span></p>
              </div>

              <button type="submit" :disabled="!isComplete || loading || store.state.isLoading" class="group mt-6 flex w-full items-center justify-center gap-2 rounded-xl bg-blue-600 px-6 py-3.5 text-sm font-semibold text-white shadow-lg shadow-blue-600/20 transition hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed">
                <LoadingSpinner v-if="loading || store.state.isLoading" size="sm" color="white" />
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
                Your {{ selectedPlan?.displayName || 'Card' }} activation is pending approval. This usually takes 5-10 minutes.
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

              <button @click="handleCheckStatus" :disabled="store.state.isLoading" class="mt-6 inline-flex items-center gap-2 px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-xl transition disabled:opacity-50">
                <LoadingSpinner v-if="store.state.isLoading" size="sm" color="white" />
                <span v-else>Check Status</span>
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
                <div class="flex h-8 w-8 shrink-0 items-center justify-center rounded-full" :class="currentStep > 0 ? 'bg-green-500 text-white' : currentStep === 0 ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-400'">
                  <svg v-if="currentStep > 0" class="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5">
                    <polyline points="20 6 9 17 4 12" stroke="currentColor"/>
                  </svg>
                  <span v-else class="text-xs font-bold">1</span>
                </div>
                <div>
                  <p class="text-sm font-medium" :class="currentStep >= 0 ? 'text-gray-900' : 'text-gray-400'">Select Card Plan</p>
                  <p class="text-xs text-gray-400">Choose Gold or Black</p>
                </div>
              </div>

              <div class="flex items-center gap-3">
                <div class="flex h-8 w-8 shrink-0 items-center justify-center rounded-full" :class="currentStep > 1 ? 'bg-green-500 text-white' : currentStep === 1 ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-400'">
                  <svg v-if="currentStep > 1" class="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5">
                    <polyline points="20 6 9 17 4 12" stroke="currentColor"/>
                  </svg>
                  <span v-else class="text-xs font-bold">2</span>
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
                  <span v-else class="text-xs font-bold">3</span>
                </div>
                <div>
                  <p class="text-sm font-medium" :class="currentStep >= 2 ? 'text-gray-900' : 'text-gray-400'">Activation Payment</p>
                  <p class="text-xs text-gray-400">Pay with crypto</p>
                </div>
              </div>

              <div class="flex items-center gap-3">
                <div class="flex h-8 w-8 shrink-0 items-center justify-center rounded-full" :class="currentStep > 3 ? 'bg-green-500 text-white' : currentStep === 3 ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-400'">
                  <svg v-if="currentStep > 3" class="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5">
                    <polyline points="20 6 9 17 4 12" stroke="currentColor"/>
                  </svg>
                  <span v-else class="text-xs font-bold">4</span>
                </div>
                <div>
                  <p class="text-sm font-medium" :class="currentStep >= 3 ? 'text-gray-900' : 'text-gray-400'">OTP Verification</p>
                  <p class="text-xs text-gray-400">Verify your identity</p>
                </div>
              </div>

              <div class="flex items-center gap-3">
                <div class="flex h-8 w-8 shrink-0 items-center justify-center rounded-full" :class="currentStep === 4 ? 'bg-yellow-500 text-white' : 'bg-gray-200 text-gray-400'">
                  <span class="text-xs font-bold">5</span>
                </div>
                <div>
                  <p class="text-sm font-medium" :class="currentStep === 4 ? 'text-gray-900' : 'text-gray-400'">Waiting for Approval</p>
                  <p class="text-xs text-gray-400">Final review</p>
                </div>
              </div>
            </div>

            <div class="space-y-3 text-sm">
              <div class="flex justify-between">
                <span class="text-gray-500">{{ selectedPlan?.displayName || '--' }} Card</span>
                <span class="font-medium text-gray-900">${{ selectedPlanFee.toLocaleString() }}</span>
              </div>
              <div class="flex justify-between">
                <span class="text-gray-500">Payment via</span>
                <span class="font-medium text-gray-900">{{ selectedCoin }}</span>
              </div>
              <div class="flex justify-between"><span class="text-gray-500">Processing</span><span class="font-medium">$0</span></div>
              <div class="h-px bg-gray-100"></div>
              <div class="flex justify-between items-center"><span class="font-semibold text-gray-900">Total</span><span class="text-xl font-bold text-gray-950">${{ selectedPlanFee.toLocaleString() }}</span></div>
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
        <p class="mt-2 text-gray-500">Your {{ selectedPlan?.displayName || 'Card' }} has been successfully activated.</p>
        <button @click="resetAll" class="mt-6 inline-flex w-full justify-center rounded-xl bg-blue-600 px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-blue-600/20 hover:bg-blue-700 transition">Go to Dashboard</button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, onBeforeUnmount, nextTick } from 'vue'
import { useStore } from '@/stores'
import { useCardPlanActions, useCardActivationActions, useCoinWalletActions } from '@/composables/actions'
import authActivate from '@/middlewares/auth-activate'

definePageMeta({
  middleware: authActivate
})

// Store
const store = useStore()

// Actions
const { getCardPlans, selectPlan: selectPlanAction, getSelectedPlan } = useCardPlanActions()
const { 
  initiateActivation, 
  confirmPayment, 
  verifyOTP, 
  resendOTP, 
  completeActivation,
  getActivationDetails 
} = useCardActivationActions()
const { getCoinWallets, getWalletAddress: getWalletAddressAction, selectCoin: selectCoinAction } = useCoinWalletActions()

// Current step
const currentStep = ref(0)
const selectedPlanId = ref('')
const selectedPlan = computed(() => store.getSelectedPlan)

// Plan fees
const selectedPlanFee = computed(() => {
  return selectedPlan.value?.fee || 0
})

// Coin wallets
const coinWallets = ref([])
const selectedCoin = ref('USDT')
const copied = ref(false)

// Card Details
const cardDetails = ref({
  number: '',
  expiry: '',
  cvv: '',
  name: ''
})

// Payment
const paymentConfirmed = ref(false)

// OTP Verification
const code = ref(['', '', '', '', '', ''])
const inputRefs = ref([])
const loading = ref(false)
const errorMessage = ref('')
const countdown = ref(30)
let countdownTimer = null
const success = ref(false)

const isComplete = computed(() => code.value.every(d => d !== ''))

// Get wallet address for selected coin
const getWalletAddressForCoin = (coinSymbol) => {
  const wallet = coinWallets.value.find(w => w.coin === coinSymbol)
  return wallet?.address || ''
}

// Get coin icon
const getCoinIcon = (coinSymbol) => {
  const icons = {
    USDT: '🟢',
    BTC: '₿',
    ETH: '⟠',
    XRP: '✕',
    SOL: '◎',
    ADA: '₳'
  }
  return icons[coinSymbol] || '🟢'
}

// Get coin network
const getCoinNetwork = (coinSymbol) => {
  const wallet = coinWallets.value.find(w => w.coin === coinSymbol)
  return wallet?.network || 'BEP20/ERC20'
}

// Select plan
const selectPlan = (planId) => {
  selectPlanAction(planId)
  selectedPlanId.value = planId
}

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
  const addr = document.getElementById('walletAddress')?.innerText || getWalletAddressForCoin(selectedCoin.value)
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

// Select coin
const selectCoin = (coin) => {
  selectedCoin.value = coin
  selectCoinAction(coin)
}

// ============================================
// HANDLERS
// ============================================

// Continue to card details
const handleContinueToCardDetails = () => {
  if (selectedPlanId.value) {
    goToStep(1)
  }
}

// Initiate activation
const handleInitiateActivation = async () => {
  if (!selectedPlanId.value) return

  const payload = {
    planId: selectedPlanId.value,
    cardDetails: {
      number: cardDetails.value.number.replace(/\s/g, ''),
      expiry: cardDetails.value.expiry,
      cvv: cardDetails.value.cvv,
      cardholderName: cardDetails.value.name
    },
    coin: selectedCoin.value
  }

  const response = await initiateActivation(payload)
  
  if (response.success) {
    goToStep(2)
  }
}

// Confirm payment
const handleConfirmPayment = async () => {
  const activation = store.getCurrentActivation
  if (!activation) return

  const response = await confirmPayment(activation.id || activation._id)
  
  if (response.success) {
    paymentConfirmed.value = true
    setTimeout(() => {
      goToStep(3)
    }, 500)
  }
}

// Verify OTP
const handleVerifyOTP = async () => {
  if (!isComplete.value || loading.value || store.state.isLoading) return
  
  const activation = store.getCurrentActivation
  if (!activation) return

  loading.value = true
  errorMessage.value = ''
  store.clearError()

  const payload = {
    activationId: activation.id || activation._id,
    otp: code.value.join('')
  }

  const response = await verifyOTP(payload)
  
  loading.value = false

  if (response.success) {
    goToStep(4)
  } else {
    errorMessage.value = response.error || 'Unable to verify the code. Please try again.'
  }
}

// Resend OTP
const handleResendOTP = async () => {
  const activation = store.getCurrentActivation
  if (!activation) return

  const response = await resendOTP({
    activationId: activation.id || activation._id
  })

  if (response.success) {
    startCountdown()
    errorMessage.value = ''
    toast.success('OTP resent successfully!')
  }
}

// Check status (approval)
const handleCheckStatus = async () => {
  const activation = store.getCurrentActivation
  if (!activation) return

  const response = await getActivationDetails(activation.id || activation._id)
  
  if (response.success) {
    const status = response.data.activation.status
    if (status === 'approved') {
      // Complete activation
      const completeResponse = await completeActivation(activation.id || activation._id)
      if (completeResponse.success) {
        success.value = true
      }
    } else if (status === 'rejected') {
      toast.error('Activation was rejected. Please contact support.')
    } else {
      toast.info('Still processing. Please wait a few more minutes.')
    }
  }
}

// Countdown
const startCountdown = () => {
  countdown.value = 30
  clearInterval(countdownTimer)
  countdownTimer = setInterval(() => {
    if (countdown.value > 0) countdown.value--
    else clearInterval(countdownTimer)
  }, 1000)
}

// OTP input handlers
const setInputRef = (el, index) => {
  if (el) inputRefs.value[index] = el
}

const handleInput = async (index) => {
  errorMessage.value = ''
  store.clearError()
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

// Reset all
const resetAll = () => {
  success.value = false
  currentStep.value = 0
  selectedPlanId.value = ''
  paymentConfirmed.value = false
  code.value = ['', '', '', '', '', '']
  cardDetails.value = {
    number: '',
    expiry: '',
    cvv: '',
    name: ''
  }
  selectedCoin.value = 'USDT'
  store.clearError()
}

// Lifecycle
onMounted(async () => {
  // Load card plans
  await getCardPlans()
  
  // Load coin wallets
  const walletsResponse = await getCoinWallets()
  if (walletsResponse.success) {
    coinWallets.value = walletsResponse.data.wallets
    if (coinWallets.value.length > 0) {
      selectedCoin.value = coinWallets.value[0].coin
    }
  }
  
  startCountdown()

  if(store.state.currentActivation.status === 'pending') {
    goToStep(2)
  }else if(store.state.currentActivation.status === 'payment_confirmed') {
    goToStep(3)
  }else if(store.state.currentActivation.status === 'otp_verified') {
    goToStep(4)
  }else if(store.state.currentActivation.status === 'rejected') {
    toast.error('Activation was rejected. Please contact support.')
  }else if(store.state.currentActivation.status === 'approved') {
    goToStep(5)
  }
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