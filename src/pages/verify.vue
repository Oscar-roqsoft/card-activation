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
            <p class="mt-2 text-sm leading-6 text-gray-500 sm:text-base">Complete the activation payment &amp; verification in one place.</p>
          </div>
        </div>
      </section>
  
      <!-- Main -->
      <main class="mx-auto max-w-7xl px-5 py-8 sm:px-6 sm:py-12 lg:px-8">
        <div class="grid gap-8 lg:grid-cols-[1fr_420px] lg:items-start">
          <!-- Left Column: Payment + Verification -->
          <div>
            <!-- Step 1: Activation fee -->
            <div class="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm sm:p-7 mb-6">
              <div class="mb-6 flex items-center justify-between">
                <div>
                  <p class="text-xs font-semibold text-gray-900">Step 1 of 3</p>
                  <p class="mt-0.5 text-xs text-gray-400">Activation fee</p>
                </div>
                <span class="rounded-full bg-blue-50 px-3 py-1 text-xs font-semibold text-blue-600">33%</span>
              </div>
              <div class="h-1.5 overflow-hidden rounded-full bg-gray-100 mb-6">
                <div class="h-full w-1/3 rounded-full bg-blue-600"></div>
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
                    <p class="text-2xl font-bold text-gray-950">₦{{ activationFee.toLocaleString() }}</p>
                  </div>
                </div>
              </div>
  
              <!-- Wallet address (USDT deposit) -->
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
                <p class="text-xs text-gray-400 mt-2">Send the exact amount in USDT (BEP20/ERC20) to the address above. Payment will be verified automatically.</p>
              </div>
  
              <button type="button" :disabled="paymentConfirmed" @click="confirmPayment" class="group mt-2 flex w-full items-center justify-center gap-2 rounded-xl bg-blue-600 px-6 py-3.5 text-sm font-semibold text-white shadow-lg shadow-blue-600/20 transition hover:bg-blue-700 disabled:opacity-60 disabled:cursor-not-allowed">
                <span v-if="!paymentConfirmed">✅ I've sent the payment</span>
                <span v-else>✓ Payment confirmed</span>
                <svg v-if="!paymentConfirmed" class="h-4 w-4 transition-transform group-hover:translate-x-1" viewBox="0 0 24 24" fill="none">
                  <path d="M5 12h14M13 6l6 6-6 6" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                </svg>
              </button>
              <p class="mt-2 text-center text-xs text-gray-400">After deposit, confirm to proceed to secure verification</p>
            </div>
  
            <!-- Step 2: Secure verification -->
            <div class="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm sm:p-7">
              <div class="flex items-center justify-between mb-3">
                <div>
                  <p class="text-xs font-semibold text-gray-900">Step 2 of 3</p>
                  <p class="mt-0.5 text-xs text-gray-400">Secure verification</p>
                </div>
                <span class="rounded-full bg-blue-50 px-3 py-1 text-xs font-semibold text-blue-600">66%</span>
              </div>
              <div class="h-1.5 overflow-hidden rounded-full bg-gray-100 mb-6">
                <div class="h-full w-2/3 rounded-full bg-blue-600"></div>
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
                <h2 class="text-xl font-bold text-gray-950">Verify your information</h2>
                <p class="text-sm text-gray-500 mt-1">Enter the 6-digit code sent to your registered contact.</p>
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
                  <p class="text-sm font-semibold text-gray-800">your registered contact</p>
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
                    Complete Activation
                    <svg class="h-4 w-4 transition-transform group-hover:translate-x-1" viewBox="0 0 24 24" fill="none">
                      <path d="M5 12h14M13 6l6 6-6 6" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                    </svg>
                  </template>
                </button>
              </form>
  
              <div class="flex items-center justify-center gap-2 mt-6 text-xs text-gray-400">
                <svg class="h-4 w-4 text-green-500" viewBox="0 0 24 24" fill="none">
                  <path d="M12 3 5 6v5c0 4.6 2.9 8.7 7 10 4.1-1.3 7-5.4 7-10V6l-7-3Z" stroke="currentColor" stroke-width="1.7"/>
                  <path d="m9 12 2 2 4-4" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round"/>
                </svg>
                <span>Secure verification • end-to-end encrypted</span>
              </div>
            </div>
          </div>
  
          <!-- Right Column: Summary -->
          <div class="lg:sticky lg:top-6">
            <div class="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm sm:p-7">
              <div class="mb-6">
                <h2 class="text-lg font-semibold text-gray-900">Activation summary</h2>
                <p class="text-sm text-gray-500">Review before completing</p>
              </div>
  
              <div class="card-scene mb-7">
                <div class="credit-card">
                  <div class="card-shine"></div>
                  <div class="relative z-10 flex h-full flex-col justify-between p-5">
                    <div class="flex items-start justify-between">
                      <div class="h-9 w-12 rounded-md border border-yellow-700/30 bg-gradient-to-br from-yellow-100 via-yellow-400 to-yellow-600"></div>
                      <svg class="h-6 w-6 text-white/80" viewBox="0 0 24 24" fill="none">
                        <path d="M4 9.5C6.2 7.4 8.5 6.3 12 6.3s5.8 1.1 8 3.2" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/>
                        <path d="M7 13c1.4-1.2 2.9-1.8 5-1.8s3.6.6 5 1.8" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/>
                        <circle cx="12" cy="16.5" r="1.2" fill="currentColor"/>
                      </svg>
                    </div>
                    <div>
                      <p class="text-[8px] uppercase tracking-widest text-white/40">Card</p>
                      <p class="mt-1 text-sm tracking-[0.16em] text-white">•••• •••• •••• ••••</p>
                    </div>
                    <div class="flex items-end justify-between">
                      <div>
                        <p class="text-[7px] uppercase tracking-widest text-white/40">Cardholder</p>
                        <p class="mt-1 text-[10px] uppercase text-white/80">CARD MEMBER</p>
                      </div>
                      <div>
                        <p class="text-[7px] uppercase tracking-widest text-white/40">Status</p>
                        <p class="mt-1 text-[10px] text-yellow-200">PENDING</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
  
              <div class="space-y-3 text-sm">
                <div class="flex justify-between"><span class="text-gray-500">Activation fee</span><span class="font-medium">₦{{ activationFee.toLocaleString() }}</span></div>
                <div class="flex justify-between"><span class="text-gray-500">Processing</span><span class="font-medium">₦0</span></div>
                <div class="h-px bg-gray-100"></div>
                <div class="flex justify-between items-center"><span class="font-semibold text-gray-900">Total</span><span class="text-xl font-bold text-gray-950">₦{{ activationFee.toLocaleString() }}</span></div>
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
                    <p class="text-xs font-semibold text-gray-900">Before you continue</p>
                    <p class="mt-1 text-xs leading-5 text-gray-500">Confirm the deposit address and verification code. Both steps are required.</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
  
      <!-- Success Overlay -->
      <div v-if="success" class="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center z-50 p-4">
        <div class="bg-white rounded-3xl max-w-md w-full p-8 text-center shadow-2xl animate-[fadeIn_0.3s_ease]">
          <div class="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-green-100 text-green-600">
            <svg class="h-8 w-8" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
              <path d="M20 6 9 17l-5-5"/>
            </svg>
          </div>
          <h3 class="mt-4 text-2xl font-bold text-gray-900">🎉 Activation successful!</h3>
          <p class="mt-2 text-gray-500">Your card is now active. You can start using it immediately.</p>
          <button @click="success = false" class="mt-6 inline-flex w-full justify-center rounded-xl bg-blue-600 px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-blue-600/20 hover:bg-blue-700 transition">Go to dashboard</button>
        </div>
      </div>
    </div>
  </template>
  
  <script setup>
  import { ref, computed, onMounted, onBeforeUnmount, nextTick } from 'vue'
  
  // State
  const activationFee = 5000
  const paymentConfirmed = ref(false)
  const copied = ref(false)
  
  // Verification code
  const code = ref(['', '', '', '', '', ''])
  const inputRefs = ref([])
  const loading = ref(false)
  const errorMessage = ref('')
  const countdown = ref(30)
  let countdownTimer = null
  const success = ref(false)
  
  const isComplete = computed(() => code.value.every(d => d !== ''))
  
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
      console.log('Payment confirmed (simulated)')
    }
  }
  
  // Verification code handlers
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
    console.log('Resend verification code (simulated)')
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
      success.value = true
    } catch (err) {
      errorMessage.value = 'Unable to verify the code. Please try again.'
    } finally {
      loading.value = false
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