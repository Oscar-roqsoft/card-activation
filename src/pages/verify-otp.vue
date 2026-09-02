<template>
    <div class="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-4">
      <div class="w-full max-w-md">
        <!-- Card container -->
        <div class="bg-white rounded-3xl shadow-2xl p-8 sm:p-10 transition-all duration-300">
          <!-- Logo / Brand -->
          <div class="text-center mb-8">
            <div class="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-blue-600 text-white shadow-lg shadow-blue-600/25 mb-4">
              <svg class="w-8 h-8" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <path d="M12 2L2 7l10 5 10-5-10-5z"/>
                <path d="M2 17l10 5 10-5"/>
                <path d="M2 12l10 5 10-5"/>
              </svg>
            </div>
            <h1 class="text-2xl font-bold text-gray-900">Verify Your Email</h1>
            <p class="text-sm text-gray-500 mt-1">Enter the 6-digit code sent to your email</p>
          </div>
  
          <!-- Email Display -->
          <div class="flex items-center justify-center gap-2 text-sm text-gray-600 bg-gray-50 rounded-xl px-4 py-3 mb-6">
            <svg class="w-4 h-4 text-gray-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/>
              <polyline points="22,6 12,13 2,6" stroke="currentColor"/>
            </svg>
            <span class="font-medium">{{ email || 'your@email.com' }}</span>
            <button
              type="button"
              @click="goBack"
              class="text-blue-600 hover:text-blue-700 font-medium text-xs hover:underline"
            >
              Change
            </button>
          </div>
  
          <!-- OTP Input Form -->
          <form @submit.prevent="handleVerify" class="space-y-6">
            <!-- Single password input field -->
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-1.5">Verification Code</label>
              <div class="relative">
                <input
                  ref="otpInput"
                  v-model="otp"
                  :type="showOTP ? 'text' : 'password'"
                  maxlength="6"
                  inputmode="numeric"
                  pattern="[0-9]*"
                  autocomplete="one-time-code"
                  class="w-full px-4 py-4 rounded-xl border transition outline-none text-center text-2xl font-mono tracking-[0.25em] pr-12"
                  :class="[
                    otpError ? 'border-red-500 bg-red-50 focus:border-red-500 focus:ring-red-500/10' : 'border-gray-200 bg-gray-50 focus:bg-white focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10'
                  ]"
                  placeholder="••••••"
                  @input="handleOtpInput"
                  @keydown="handleOtpKeydown"
                />
                <button
                  type="button"
                  @click="showOTP = !showOTP"
                  class="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                >
                  <svg v-if="!showOTP" class="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                    <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/>
                    <circle cx="12" cy="12" r="3"/>
                  </svg>
                  <svg v-else class="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                    <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24"/>
                    <path d="M1 1l22 22" stroke-linecap="round"/>
                  </svg>
                </button>
              </div>
              <div class="mt-2 flex items-center justify-between">
                <p v-if="otpError" class="text-xs text-red-600 flex items-center gap-1">
                  <svg class="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                    <circle cx="12" cy="12" r="10" stroke="currentColor"/>
                    <path d="M12 8v4M12 16h.01" stroke="currentColor" stroke-linecap="round"/>
                  </svg>
                  {{ otpError }}
                </p>
                <span v-else class="text-xs text-gray-400">{{ otp.length }}/6 digits entered</span>
              </div>
            </div>
  
            <!-- Visual OTP Dots -->
            <div class="flex justify-center gap-3 py-2">
              <div
                v-for="i in 6"
                :key="i"
                class="w-10 h-12 rounded-xl border-2 flex items-center justify-center text-xl font-bold transition-all duration-200"
                :class="[
                  otp.length >= i ? 'border-blue-500 bg-blue-50 text-blue-600' : 'border-gray-200 bg-gray-50 text-gray-300',
                  otpError && 'border-red-500 bg-red-50 text-red-600'
                ]"
              >
                {{ otp[i - 1] || '•' }}
              </div>
            </div>
  
            <!-- Loading & Error States -->
            <p v-if="generalError" class="text-xs text-red-600 bg-red-50 p-3 rounded-xl border border-red-200 flex items-center gap-2">
              <svg class="w-4 h-4 shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <circle cx="12" cy="12" r="10" stroke="currentColor"/>
                <path d="M12 8v4M12 16h.01" stroke="currentColor" stroke-linecap="round"/>
              </svg>
              {{ generalError }}
            </p>
  
            <!-- Submit Button -->
            <button
              type="submit"
              :disabled="otp.length !== 6 || loading"
              class="w-full py-3.5 px-4 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-xl shadow-lg shadow-blue-600/20 transition disabled:opacity-60 disabled:cursor-not-allowed flex items-center justify-center gap-2"
            >
              <LoadingSpinner v-if="loading" size="sm" color="white" />
              <span>{{ loading ? 'Verifying...' : 'Verify Account' }}</span>
            </button>
          </form>
  
          <!-- Resend Section -->
          <div class="mt-6 text-center">
            <p class="text-xs text-gray-400">
              Didn't receive a code?
            </p>
            <div class="mt-2 flex items-center justify-center gap-3">
              <button
                v-if="canResend"
                type="button"
                @click="handleResend"
                :disabled="resendLoading"
                class="text-sm font-semibold text-blue-600 hover:text-blue-700 transition disabled:opacity-50 flex items-center gap-2"
              >
                <LoadingSpinner v-if="resendLoading" size="sm" />
                <span>{{ resendLoading ? 'Sending...' : 'Resend Code' }}</span>
              </button>
              <span v-else class="text-sm text-gray-400">
                Resend available in <span class="font-semibold text-gray-600">{{ countdown }}s</span>
              </span>
            </div>
          </div>
  
          <!-- Back to Login -->
          <div class="mt-6 text-center">
            <button
              type="button"
              @click="goToLogin"
              class="text-sm text-gray-500 hover:text-gray-700 transition flex items-center justify-center gap-1"
            >
              <svg class="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <path d="M19 12H5M12 19l-7-7 7-7" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round"/>
              </svg>
              Back to Sign In
            </button>
          </div>
  
          <!-- Divider -->
          <div class="relative my-6">
            <div class="absolute inset-0 flex items-center">
              <div class="w-full border-t border-gray-200"></div>
            </div>
            <div class="relative flex justify-center text-xs">
              <span class="px-3 bg-white text-gray-400">Secure verification</span>
            </div>
          </div>
  
          <!-- Trust Badges -->
          <div class="flex items-center justify-center gap-4 text-xs text-gray-400">
            <div class="flex items-center gap-1">
              <svg class="w-4 h-4 text-green-500" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
                <polyline points="9 12 11 14 15 10" stroke="currentColor"/>
              </svg>
              <span>256-bit encrypted</span>
            </div>
            <div class="flex items-center gap-1">
              <svg class="w-4 h-4 text-green-500" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <circle cx="12" cy="12" r="10"/>
                <polyline points="12 6 12 12 16 14"/>
              </svg>
              <span>Expires in 10 min</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </template>
  
  <script setup>
  import { ref, onMounted, onBeforeUnmount, computed } from 'vue'
  import { useRouter, useRoute } from 'vue-router'
  import { toast } from 'vue-sonner'
  import { verifyOTP, changePassword as forgotPasswordAPI, resendOTP } from '@/composables/requests/auth'

  const router = useRouter()
  const route = useRoute()
  
  // Get email from query params
  const email = ref(route.query.email || '')
  
  // OTP state
  const otp = ref('')
  const showOTP = ref(false)
  const otpError = ref('')
  const generalError = ref('')
  const loading = ref(false)
  const resendLoading = ref(false)
  
  // Countdown state
  const countdown = ref(0)
  const canResend = ref(true)
  let countdownTimer = null
  
  // Input ref
  const otpInput = ref(null)
  
  // Auto-focus input on mount
  onMounted(() => {
    otpInput.value?.focus()
  })
  
  // Handle OTP input
  const handleOtpInput = (event) => {
    // Remove non-numeric characters
    otp.value = otp.value.replace(/\D/g, '').slice(0, 6)
    otpError.value = ''
    generalError.value = ''
  }
  
  // Handle keydown for paste and enter
  const handleOtpKeydown = (event) => {
    // Auto-submit on Enter
    if (event.key === 'Enter' && otp.value.length === 6) {
      handleVerify()
    }
  }
  
  // Handle OTP verification
  const handleVerify = async () => {
    if (otp.value.length !== 6) {
      otpError.value = 'Please enter all 6 digits'
      return
    }
  
    loading.value = true
    otpError.value = ''
    generalError.value = ''
  
    try {
      const response = await verifyOTP({
        email: email.value,
        otp: otp.value
      })
  
      if (response.success) {
        toast.success(response.message || 'Email verified successfully!')
        
        // Store user data if returned
        if (response.data) {
          const pinia = useStore()
          pinia.setUser(response.data)
          pinia.state.isAuthenticated = true
          localStorage.setItem('tokenExpiresAt', Date.now() + (7 * 24 * 60 * 60 * 1000).toString())
        }
  
        // Redirect to dashboard
        if(response.data?.user.role === 'admin'){
            router.push('/admin')
          }else{
            router.push('/')
          }

      } else {
        generalError.value = response.error || 'Verification failed. Please try again.'
        toast.error(generalError.value)
      }
    } catch (error) {
      console.error('Verification error:', error)
      generalError.value = 'Network error. Please try again.'
      toast.error(generalError.value)
    } finally {
      loading.value = false
    }
  }
  
  // Handle resend OTP
  const handleResend = async () => {
    if (!canResend.value || resendLoading.value) return
  
    resendLoading.value = true
    otpError.value = ''
    generalError.value = ''
  
    try {
      const response = await resendOTP({
        email: email.value
      })
  
      if (response.success) {
        toast.success('New verification code sent to your email')
        startCountdown(60)
        otp.value = ''
        otpInput.value?.focus()
      } else {
        generalError.value = response.error || 'Failed to resend code'
        toast.error(generalError.value)
      }
    } catch (error) {
      console.error('Resend error:', error)
      generalError.value = 'Network error. Please try again.'
    //   toast.error(generalError.value)
    } finally {
      resendLoading.value = false
    }
  }
  
  // Countdown timer
  const startCountdown = (seconds = 60) => {
    canResend.value = false
    countdown.value = seconds
  
    if (countdownTimer) {
      clearInterval(countdownTimer)
    }
  
    countdownTimer = setInterval(() => {
      countdown.value--
      if (countdown.value <= 0) {
        clearInterval(countdownTimer)
        countdownTimer = null
        canResend.value = true
      }
    }, 1000)
  }
  
  // Navigation helpers
  const goBack = () => {
    router.push('/login')
  }
  
  const goToLogin = () => {
    router.push('/login')
  }
  
  // Clean up timer
  onBeforeUnmount(() => {
    if (countdownTimer) {
      clearInterval(countdownTimer)
      countdownTimer = null
    }
  })
  
  // Check for existing timer on mount
  onMounted(() => {
    // If no email in query, redirect to login
    if (!email.value) {
      router.push('/account')
    }
  })
  </script>
  
  <style scoped>
  input {
    transition: all 0.15s ease;
    letter-spacing: 0.25em;
  }
  button {
    transition: all 0.15s ease;
  }
  
  /* Custom placeholder style */
  input::placeholder {
    letter-spacing: 0.5em;
    color: #9ca3af;
  }
  
  /* Disable number input arrows */
  input[type="number"]::-webkit-inner-spin-button,
  input[type="number"]::-webkit-outer-spin-button {
    -webkit-appearance: none;
    margin: 0;
  }
  
  input[type="number"] {
    -moz-appearance: textfield;
  }
  
  /* Focus ring */
  input:focus {
    outline: none;
    box-shadow: 0 0 0 4px rgba(37, 99, 235, 0.15);
  }
  </style>