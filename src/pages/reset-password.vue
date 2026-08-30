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
            <h1 class="text-2xl font-bold text-gray-900">Reset Password</h1>
            <p class="text-sm text-gray-500 mt-1">Create a new secure password for your account</p>
          </div>
  
          <!-- Success Message (shown after reset) -->
          <div v-if="resetSuccess" class="bg-green-50 border border-green-200 rounded-xl p-4 mb-6">
            <div class="flex items-center gap-3">
              <div class="flex-shrink-0 w-10 h-10 rounded-full bg-green-100 flex items-center justify-center">
                <svg class="w-6 h-6 text-green-600" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                  <path d="M20 6L9 17l-5-5" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round"/>
                </svg>
              </div>
              <div>
                <p class="text-sm font-semibold text-green-800">Password Reset Successful!</p>
                <p class="text-xs text-green-600">Your password has been updated. You can now sign in.</p>
              </div>
            </div>
            <button
              @click="goToLogin"
              class="mt-3 w-full py-2.5 bg-green-600 hover:bg-green-700 text-white font-semibold rounded-lg transition"
            >
              Go to Sign In
            </button>
          </div>
  
          <!-- Reset Form -->
          <form v-else @submit.prevent="handleResetPassword" class="space-y-5">
            <!-- Token validation error -->
            <div v-if="tokenError" class="bg-red-50 border border-red-200 rounded-xl p-4">
              <div class="flex items-center gap-3">
                <svg class="w-5 h-5 text-red-500 shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                  <circle cx="12" cy="12" r="10" stroke="currentColor"/>
                  <path d="M12 8v4M12 16h.01" stroke="currentColor" stroke-linecap="round"/>
                </svg>
                <p class="text-sm text-red-600">{{ tokenError }}</p>
              </div>
              <button
                @click="goToForgotPassword"
                class="mt-2 text-sm text-blue-600 hover:text-blue-700 font-medium"
              >
                Request a new reset link
              </button>
            </div>
  
            <!-- New Password -->
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-1.5">New Password</label>
              <div class="relative">
                <input
                  v-model="form.newPassword"
                  :type="showPassword ? 'text' : 'password'"
                  @blur="validateField('newPassword')"
                  @input="clearError('newPassword')"
                  class="w-full px-4 py-3 rounded-xl border transition outline-none pr-12"
                  :class="[
                    errors.newPassword ? 'border-red-500 bg-red-50 focus:border-red-500 focus:ring-red-500/10' : 'border-gray-200 bg-gray-50 focus:bg-white focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10'
                  ]"
                  placeholder="Min 8 characters"
                />
                <button
                  type="button"
                  @click="showPassword = !showPassword"
                  class="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                >
                  <svg v-if="!showPassword" class="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                    <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/>
                    <circle cx="12" cy="12" r="3"/>
                  </svg>
                  <svg v-else class="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                    <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24"/>
                    <path d="M1 1l22 22" stroke-linecap="round"/>
                  </svg>
                </button>
              </div>
              <p v-if="errors.newPassword" class="mt-1.5 text-xs text-red-600 flex items-center gap-1">
                <svg class="w-3.5 h-3.5 shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                  <circle cx="12" cy="12" r="10" stroke="currentColor"/>
                  <path d="M12 8v4M12 16h.01" stroke="currentColor" stroke-linecap="round"/>
                </svg>
                {{ errors.newPassword }}
              </p>
  
              <!-- Password strength indicator -->
              <div v-if="form.newPassword.length > 0 && !errors.newPassword" class="mt-2">
                <div class="flex items-center gap-2">
                  <div class="flex-1 h-1.5 rounded-full bg-gray-200 overflow-hidden">
                    <div
                      class="h-full transition-all duration-300 rounded-full"
                      :class="passwordStrengthClass"
                      :style="{ width: passwordStrength + '%' }"
                    ></div>
                  </div>
                  <span class="text-xs font-medium" :class="passwordStrengthColor">
                    {{ passwordStrengthText }}
                  </span>
                </div>
                <ul class="mt-2 space-y-1 text-xs">
                  <li class="flex items-center gap-1.5" :class="hasMinLength ? 'text-green-600' : 'text-gray-400'">
                    <svg class="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5">
                      <polyline v-if="hasMinLength" points="20 6 9 17 4 12" stroke="currentColor"/>
                      <circle v-else cx="12" cy="12" r="10" stroke="currentColor"/>
                    </svg>
                    At least 8 characters
                  </li>
                  <li class="flex items-center gap-1.5" :class="hasUppercase ? 'text-green-600' : 'text-gray-400'">
                    <svg class="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5">
                      <polyline v-if="hasUppercase" points="20 6 9 17 4 12" stroke="currentColor"/>
                      <circle v-else cx="12" cy="12" r="10" stroke="currentColor"/>
                    </svg>
                    One uppercase letter
                  </li>
                  <li class="flex items-center gap-1.5" :class="hasLowercase ? 'text-green-600' : 'text-gray-400'">
                    <svg class="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5">
                      <polyline v-if="hasLowercase" points="20 6 9 17 4 12" stroke="currentColor"/>
                      <circle v-else cx="12" cy="12" r="10" stroke="currentColor"/>
                    </svg>
                    One lowercase letter
                  </li>
                  <li class="flex items-center gap-1.5" :class="hasNumber ? 'text-green-600' : 'text-gray-400'">
                    <svg class="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5">
                      <polyline v-if="hasNumber" points="20 6 9 17 4 12" stroke="currentColor"/>
                      <circle v-else cx="12" cy="12" r="10" stroke="currentColor"/>
                    </svg>
                    One number
                  </li>
                  <li class="flex items-center gap-1.5" :class="hasSpecial ? 'text-green-600' : 'text-gray-400'">
                    <svg class="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5">
                      <polyline v-if="hasSpecial" points="20 6 9 17 4 12" stroke="currentColor"/>
                      <circle v-else cx="12" cy="12" r="10" stroke="currentColor"/>
                    </svg>
                    One special character
                  </li>
                </ul>
              </div>
            </div>
  
            <!-- Confirm Password -->
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-1.5">Confirm Password</label>
              <div class="relative">
                <input
                  v-model="form.confirmPassword"
                  :type="showConfirmPassword ? 'text' : 'password'"
                  @blur="validateField('confirmPassword')"
                  @input="clearError('confirmPassword')"
                  class="w-full px-4 py-3 rounded-xl border transition outline-none pr-12"
                  :class="[
                    errors.confirmPassword ? 'border-red-500 bg-red-50 focus:border-red-500 focus:ring-red-500/10' : 'border-gray-200 bg-gray-50 focus:bg-white focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10'
                  ]"
                  placeholder="Confirm your new password"
                />
                <button
                  type="button"
                  @click="showConfirmPassword = !showConfirmPassword"
                  class="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                >
                  <svg v-if="!showConfirmPassword" class="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                    <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/>
                    <circle cx="12" cy="12" r="3"/>
                  </svg>
                  <svg v-else class="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                    <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24"/>
                    <path d="M1 1l22 22" stroke-linecap="round"/>
                  </svg>
                </button>
              </div>
              <p v-if="errors.confirmPassword" class="mt-1.5 text-xs text-red-600 flex items-center gap-1">
                <svg class="w-3.5 h-3.5 shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                  <circle cx="12" cy="12" r="10" stroke="currentColor"/>
                  <path d="M12 8v4M12 16h.01" stroke="currentColor" stroke-linecap="round"/>
                </svg>
                {{ errors.confirmPassword }}
              </p>
            </div>
  
            <!-- General error -->
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
              :disabled="loading || !isFormValid"
              class="w-full py-3.5 px-4 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-xl shadow-lg shadow-blue-600/20 transition disabled:opacity-60 disabled:cursor-not-allowed flex items-center justify-center gap-2"
            >
              <LoadingSpinner v-if="loading" size="sm" color="white" />
              <span>{{ loading ? 'Resetting Password...' : 'Reset Password' }}</span>
            </button>
          </form>
  
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
              <span class="px-3 bg-white text-gray-400">Secure password reset</span>
            </div>
          </div>
  
          <!-- Security Badges -->
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
              <span>Secure connection</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </template>
  
  <script setup>
  import { ref, computed, onMounted } from 'vue'
  import { useRouter, useRoute } from 'vue-router'
  import { toast } from 'vue-sonner'
   import {  resetPassword, changePassword as forgotPasswordAPI, resendOTP } from '@/composables/requests/auth'
  
  const router = useRouter()
  const route = useRoute()
  
  // Get token from query params
  const token = ref(route.query.token || '')
  
  // Form state
  const form = ref({
    newPassword: '',
    confirmPassword: ''
  })
  
  const errors = ref({
    newPassword: '',
    confirmPassword: ''
  })
  
  const generalError = ref('')
  const loading = ref(false)
  const resetSuccess = ref(false)
  const tokenError = ref('')
  
  // Password visibility
  const showPassword = ref(false)
  const showConfirmPassword = ref(false)
  
  // Password strength checks
  const hasMinLength = computed(() => form.value.newPassword.length >= 8)
  const hasUppercase = computed(() => /[A-Z]/.test(form.value.newPassword))
  const hasLowercase = computed(() => /[a-z]/.test(form.value.newPassword))
  const hasNumber = computed(() => /[0-9]/.test(form.value.newPassword))
  const hasSpecial = computed(() => /[^A-Za-z0-9]/.test(form.value.newPassword))
  
  // Password strength score
  const passwordStrength = computed(() => {
    const pw = form.value.newPassword
    if (!pw) return 0
    let score = 0
    if (hasMinLength.value) score += 20
    if (hasUppercase.value) score += 20
    if (hasLowercase.value) score += 20
    if (hasNumber.value) score += 20
    if (hasSpecial.value) score += 20
    return score
  })
  
  const passwordStrengthText = computed(() => {
    const score = passwordStrength.value
    if (score === 0) return ''
    if (score <= 20) return 'Very Weak'
    if (score <= 40) return 'Weak'
    if (score <= 60) return 'Fair'
    if (score <= 80) return 'Good'
    return 'Strong'
  })
  
  const passwordStrengthColor = computed(() => {
    const score = passwordStrength.value
    if (score === 0) return ''
    if (score <= 20) return 'text-red-500'
    if (score <= 40) return 'text-orange-500'
    if (score <= 60) return 'text-yellow-600'
    if (score <= 80) return 'text-blue-500'
    return 'text-green-600'
  })
  
  const passwordStrengthClass = computed(() => {
    const score = passwordStrength.value
    if (score === 0) return ''
    if (score <= 20) return 'bg-red-500'
    if (score <= 40) return 'bg-orange-500'
    if (score <= 60) return 'bg-yellow-500'
    if (score <= 80) return 'bg-blue-500'
    return 'bg-green-500'
  })
  
  // Form validation
  const isFormValid = computed(() => {
    return (
      form.value.newPassword.length >= 8 &&
      form.value.confirmPassword.length >= 8 &&
      form.value.newPassword === form.value.confirmPassword &&
      !errors.value.newPassword &&
      !errors.value.confirmPassword
    )
  })
  
  // Validate individual fields
  const validateField = (field) => {
    if (field === 'newPassword') {
      if (!form.value.newPassword) {
        errors.value.newPassword = 'Password is required'
      } else if (form.value.newPassword.length < 8) {
        errors.value.newPassword = 'Password must be at least 8 characters'
      } else if (!hasUppercase.value) {
        errors.value.newPassword = 'Password must contain at least one uppercase letter'
      } else if (!hasLowercase.value) {
        errors.value.newPassword = 'Password must contain at least one lowercase letter'
      } else if (!hasNumber.value) {
        errors.value.newPassword = 'Password must contain at least one number'
      } else if (!hasSpecial.value) {
        errors.value.newPassword = 'Password must contain at least one special character'
      } else {
        errors.value.newPassword = ''
      }
    }
  
    if (field === 'confirmPassword') {
      if (!form.value.confirmPassword) {
        errors.value.confirmPassword = 'Please confirm your password'
      } else if (form.value.confirmPassword !== form.value.newPassword) {
        errors.value.confirmPassword = 'Passwords do not match'
      } else {
        errors.value.confirmPassword = ''
      }
    }
  }
  
  // Clear error on input
  const clearError = (field) => {
    errors.value[field] = ''
    generalError.value = ''
  }
  
  // Validate token on mount
  onMounted(() => {
    if (!token.value) {
      tokenError.value = 'Invalid or missing reset token. Please request a new password reset link.'
    }
  })
  
  // Handle password reset
  const handleResetPassword = async () => {
    // Validate all fields
    validateField('newPassword')
    validateField('confirmPassword')
  
    if (errors.value.newPassword || errors.value.confirmPassword) {
      return
    }
  
    if (!token.value) {
      tokenError.value = 'Invalid reset token. Please request a new password reset link.'
      return
    }
  
    loading.value = true
    generalError.value = ''
  
    try {
      const response = await resetPassword({
        token: token.value,
        newPassword: form.value.newPassword
      })
  
      if (response.success) {
        resetSuccess.value = true
        toast.success(response.message || 'Password reset successfully!')
        
        // Clear form
        form.value = {
          newPassword: '',
          confirmPassword: ''
        }
      } else {
        generalError.value = response.error || 'Failed to reset password. Please try again.'
        toast.error(generalError.value)
      }
    } catch (error) {
      console.error('Reset password error:', error)
      generalError.value = 'Network error. Please try again.'
      toast.error(generalError.value)
    } finally {
      loading.value = false
    }
  }
  
  // Navigation helpers
  const goToLogin = () => {
    router.push('/account')
  }
  
  const goToForgotPassword = () => {
    // router.push('/forgot-password')
  }
  </script>
  
  <style scoped>
  input {
    transition: all 0.15s ease;
  }
  button {
    transition: all 0.15s ease;
  }
  
  /* Focus ring */
  input:focus {
    outline: none;
    box-shadow: 0 0 0 4px rgba(37, 99, 235, 0.15);
  }
  
  /* Custom checkbox styling */
  input[type="checkbox"] {
    cursor: pointer;
  }
  </style>