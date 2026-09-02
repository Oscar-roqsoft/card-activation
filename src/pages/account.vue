<template>
    <div class="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-4">
      <div class="w-full max-w-md">
        <!-- Card container -->
        <div class="bg-white rounded-3xl shadow-2xl p-8 sm:p-10 transition-all duration-300">
          <!-- Logo / Brand -->
          <div class="text-center mb-4">
            <div class="inline-flex items-center justify-center ">
              <div
              class="flex w-[180px]  items-center justify-center rounded-xl"
            >
              <img src="/card-logo.png" alt="">
            </div>
            </div>
            <h1 class="text-2xl font-bold text-gray-900">Welcome back</h1>
            <p class="text-sm text-gray-500 mt-1">Sign in to your account or create a new one</p>
          </div>
  
          <!-- Toggle tabs -->
          <div class="relative flex bg-gray-100 rounded-xl p-1 mb-8">
            <button
              @click="switchToLogin"
              class="flex-1 py-2.5 text-sm font-semibold rounded-lg transition-all duration-200"
              :class="showLogin ? 'bg-white text-gray-900 shadow-sm' : 'text-gray-500 hover:text-gray-700'"
            >
              Sign In
            </button>
            <button
              @click="switchToSignup"
              class="flex-1 py-2.5 text-sm font-semibold rounded-lg transition-all duration-200"
              :class="!showLogin ? 'bg-white text-gray-900 shadow-sm' : 'text-gray-500 hover:text-gray-700'"
            >
              Create Account
            </button>
          </div>
  
          <!-- Login Form -->
          <form v-if="showLogin" @submit.prevent="handleLogin" class="space-y-5" novalidate>
            <!-- Email -->
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-1.5">Email address</label>
              <input
                v-model="loginForm.email"
                type="email"
                @blur="validateLoginField('email')"
                @input="clearLoginError('email')"
                class="w-full px-4 py-3 rounded-xl border transition outline-none"
                :class="[
                  loginErrors.email ? 'border-red-500 bg-red-50 focus:border-red-500 focus:ring-red-500/10' : 'border-gray-200 bg-gray-50 focus:bg-white focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10'
                ]"
                placeholder="you@example.com"
              />
              <p v-if="loginErrors.email" class="mt-1.5 text-xs text-red-600 flex items-center gap-1">
                <svg class="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                  <circle cx="12" cy="12" r="10" stroke="currentColor"/>
                  <path d="M12 8v4M12 16h.01" stroke="currentColor" stroke-linecap="round"/>
                </svg>
                {{ loginErrors.email }}
              </p>
            </div>
  
            <!-- Password -->
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-1.5">Password</label>
              <div class="relative">
                <input
                  v-model="loginForm.password"
                  :type="showLoginPassword ? 'text' : 'password'"
                  @blur="validateLoginField('password')"
                  @input="clearLoginError('password')"
                  class="w-full px-4 py-3 rounded-xl border transition outline-none pr-12"
                  :class="[
                    loginErrors.password ? 'border-red-500 bg-red-50 focus:border-red-500 focus:ring-red-500/10' : 'border-gray-200 bg-gray-50 focus:bg-white focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10'
                  ]"
                  placeholder="••••••••"
                />
                <button
                  type="button"
                  @click="showLoginPassword = !showLoginPassword"
                  class="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                >
                  <svg v-if="!showLoginPassword" class="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                    <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/>
                    <circle cx="12" cy="12" r="3"/>
                  </svg>
                  <svg v-else class="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                    <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24"/>
                    <path d="M1 1l22 22" stroke-linecap="round"/>
                  </svg>
                </button>
              </div>
              <p v-if="loginErrors.password" class="mt-1.5 text-xs text-red-600 flex items-center gap-1">
                <svg class="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                  <circle cx="12" cy="12" r="10" stroke="currentColor"/>
                  <path d="M12 8v4M12 16h.01" stroke="currentColor" stroke-linecap="round"/>
                </svg>
                {{ loginErrors.password }}
              </p>
            </div>
  
            <!-- Remember me & Forgot password -->
            <div class="flex items-center justify-between text-sm">
              <label class="flex items-center gap-2 text-gray-600 cursor-pointer">
                <input
                  type="checkbox"
                  v-model="loginForm.remember"
                  class="w-4 h-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500 focus:ring-2"
                />
                Remember me
              </label>
              <button type="button" @click="openForgotPassword" class="text-blue-600 hover:text-blue-700 font-medium">
                Forgot password?
              </button>
            </div>
  
            <!-- General error -->
            <p v-if="loginGeneralError" class="text-xs text-red-600 bg-red-50 p-3 rounded-xl border border-red-200 flex items-center gap-2">
              <svg class="w-4 h-4 shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <circle cx="12" cy="12" r="10" stroke="currentColor"/>
                <path d="M12 8v4M12 16h.01" stroke="currentColor" stroke-linecap="round"/>
              </svg>
              {{ loginGeneralError }}
            </p>
  
            <button
              type="submit"
              :disabled="loginLoading"
              class="w-full py-3.5 px-4 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-xl shadow-lg shadow-blue-600/20 transition disabled:opacity-60 disabled:cursor-not-allowed flex items-center justify-center gap-2"
            >
              <LoadingSpinner v-if="loginLoading" size="sm" color="white" />
              <span>{{ loginLoading ? 'Signing in...' : 'Sign In' }}</span>
            </button>
  
            <p class="text-center text-xs text-gray-400 mt-4">
              By continuing, you agree to our Terms of Service and Privacy Policy.
            </p>
          </form>
  
          <!-- Sign Up Form -->
          <form v-else @submit.prevent="handleSignUp" class="space-y-4" novalidate>
            <!-- Full Name -->
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-1.5">Full name</label>
              <input
                v-model="signUpForm.name"
                type="text"
                @blur="validateSignupField('name')"
                @input="clearSignupError('name')"
                class="w-full px-4 py-3 rounded-xl border transition outline-none"
                :class="[
                  signUpErrors.name ? 'border-red-500 bg-red-50 focus:border-red-500 focus:ring-red-500/10' : 'border-gray-200 bg-gray-50 focus:bg-white focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10'
                ]"
                placeholder="John Doe"
              />
              <p v-if="signUpErrors.name" class="mt-1.5 text-xs text-red-600 flex items-center gap-1">
                <svg class="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                  <circle cx="12" cy="12" r="10" stroke="currentColor"/>
                  <path d="M12 8v4M12 16h.01" stroke="currentColor" stroke-linecap="round"/>
                </svg>
                {{ signUpErrors.name }}
              </p>
            </div>
  
            <!-- Email -->
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-1.5">Email address</label>
              <input
                v-model="signUpForm.email"
                type="email"
                @blur="validateSignupField('email')"
                @input="clearSignupError('email')"
                class="w-full px-4 py-3 rounded-xl border transition outline-none"
                :class="[
                  signUpErrors.email ? 'border-red-500 bg-red-50 focus:border-red-500 focus:ring-red-500/10' : 'border-gray-200 bg-gray-50 focus:bg-white focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10'
                ]"
                placeholder="you@example.com"
              />
              <p v-if="signUpErrors.email" class="mt-1.5 text-xs text-red-600 flex items-center gap-1">
                <svg class="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                  <circle cx="12" cy="12" r="10" stroke="currentColor"/>
                  <path d="M12 8v4M12 16h.01" stroke="currentColor" stroke-linecap="round"/>
                </svg>
                {{ signUpErrors.email }}
              </p>
            </div>
  
            <!-- Password -->
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-1.5">Password</label>
              <div class="relative">
                <input
                  v-model="signUpForm.password"
                  :type="showSignupPassword ? 'text' : 'password'"
                  @blur="validateSignupField('password')"
                  @input="clearSignupError('password')"
                  class="w-full px-4 py-3 rounded-xl border transition outline-none pr-12"
                  :class="[
                    signUpErrors.password ? 'border-red-500 bg-red-50 focus:border-red-500 focus:ring-red-500/10' : 'border-gray-200 bg-gray-50 focus:bg-white focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10'
                  ]"
                  placeholder="Min 8 characters"
                />
                <button
                  type="button"
                  @click="showSignupPassword = !showSignupPassword"
                  class="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                >
                  <svg v-if="!showSignupPassword" class="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                    <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/>
                    <circle cx="12" cy="12" r="3"/>
                  </svg>
                  <svg v-else class="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                    <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24"/>
                    <path d="M1 1l22 22" stroke-linecap="round"/>
                  </svg>
                </button>
              </div>
              <div v-if="signUpErrors.password" class="mt-1.5 text-xs text-red-600 flex items-center gap-1">
                <svg class="w-3.5 h-3.5 shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                  <circle cx="12" cy="12" r="10" stroke="currentColor"/>
                  <path d="M12 8v4M12 16h.01" stroke="currentColor" stroke-linecap="round"/>
                </svg>
                {{ signUpErrors.password }}
              </div>
              <!-- Password strength indicator -->
              <div v-else-if="signUpForm.password.length > 0" class="mt-2">
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
              </div>
            </div>
  
            <!-- Confirm Password -->
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-1.5">Confirm password</label>
              <input
                v-model="signUpForm.confirmPassword"
                type="password"
                @blur="validateSignupField('confirmPassword')"
                @input="clearSignupError('confirmPassword')"
                class="w-full px-4 py-3 rounded-xl border transition outline-none"
                :class="[
                  signUpErrors.confirmPassword ? 'border-red-500 bg-red-50 focus:border-red-500 focus:ring-red-500/10' : 'border-gray-200 bg-gray-50 focus:bg-white focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10'
                ]"
                placeholder="Confirm your password"
              />
              <p v-if="signUpErrors.confirmPassword" class="mt-1.5 text-xs text-red-600 flex items-center gap-1">
                <svg class="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                  <circle cx="12" cy="12" r="10" stroke="currentColor"/>
                  <path d="M12 8v4M12 16h.01" stroke="currentColor" stroke-linecap="round"/>
                </svg>
                {{ signUpErrors.confirmPassword }}
              </p>
            </div>
  
            <!-- Country -->
            <!-- <div>
              <label class="block text-sm font-medium text-gray-700 mb-1.5">Country</label>
              <input
                v-model="signUpForm.country"
                type="text"
                @blur="validateSignupField('country')"
                @input="clearSignupError('country')"
                class="w-full px-4 py-3 rounded-xl border transition outline-none"
                :class="[
                  signUpErrors.country ? 'border-red-500 bg-red-50 focus:border-red-500 focus:ring-red-500/10' : 'border-gray-200 bg-gray-50 focus:bg-white focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10'
                ]"
                placeholder="United States"
              />
              <p v-if="signUpErrors.country" class="mt-1.5 text-xs text-red-600 flex items-center gap-1">
                <svg class="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                  <circle cx="12" cy="12" r="10" stroke="currentColor"/>
                  <path d="M12 8v4M12 16h.01" stroke="currentColor" stroke-linecap="round"/>
                </svg>
                {{ signUpErrors.country }}
              </p>
            </div> -->
  
            <!-- Terms -->
            <div class="flex items-start gap-2 text-sm">
              <input
                type="checkbox"
                v-model="signUpForm.agree"
                @change="clearSignupError('agree')"
                class="w-4 h-4 mt-0.5 rounded border-gray-300 text-blue-600 focus:ring-blue-500 focus:ring-2"
              />
              <label class="text-gray-600">
                I agree to the
                <a href="#" class="text-blue-600 hover:text-blue-700 font-medium">Terms of Service</a>
                and
                <a href="#" class="text-blue-600 hover:text-blue-700 font-medium">Privacy Policy</a>
              </label>
            </div>
            <p v-if="signUpErrors.agree" class="text-xs text-red-600 flex items-center gap-1">
              <svg class="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <circle cx="12" cy="12" r="10" stroke="currentColor"/>
                <path d="M12 8v4M12 16h.01" stroke="currentColor" stroke-linecap="round"/>
              </svg>
              {{ signUpErrors.agree }}
            </p>
  
            <!-- General error -->
            <p v-if="signUpGeneralError" class="text-xs text-red-600 bg-red-50 p-3 rounded-xl border border-red-200 flex items-center gap-2">
              <svg class="w-4 h-4 shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <circle cx="12" cy="12" r="10" stroke="currentColor"/>
                <path d="M12 8v4M12 16h.01" stroke="currentColor" stroke-linecap="round"/>
              </svg>
              {{ signUpGeneralError }}
            </p>
  
            <button
              type="submit"
              :disabled="signUpLoading"
              class="w-full py-3.5 px-4 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-xl shadow-lg shadow-blue-600/20 transition disabled:opacity-60 disabled:cursor-not-allowed flex items-center justify-center gap-2"
            >
              <LoadingSpinner v-if="signUpLoading" size="sm" color="white" />
              <span>{{ signUpLoading ? 'Creating account...' : 'Create Account' }}</span>
            </button>
  
            <p class="text-center text-xs text-gray-400 mt-3">
              Already have an account?
              <button type="button" @click="switchToLogin" class="text-blue-600 font-medium hover:underline">
                Sign in
              </button>
            </p>
          </form>
  
          <!-- Divider -->
          <!-- <div class="relative my-6">
            <div class="absolute inset-0 flex items-center">
              <div class="w-full border-t border-gray-200"></div>
            </div>
            <div class="relative flex justify-center text-xs">
              <span class="px-3 bg-white text-gray-400">Or continue with</span>
            </div>
          </div> -->
  
          <!-- Social buttons -->
          <!-- <div class="grid grid-cols-2 gap-3">
            <button class="flex items-center justify-center gap-2 py-2.5 px-4 border border-gray-200 rounded-xl hover:bg-gray-50 transition text-sm font-medium text-gray-700">
              <svg class="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12.545 10.239v3.821h5.445c-.712 2.315-2.647 3.972-5.445 3.972a6.033 6.033 0 110-12.064c1.498 0 2.866.549 3.921 1.453l2.814-2.814A9.969 9.969 0 0012.545 2C7.021 2 2.543 6.477 2.543 12s4.478 10 10.002 10c8.396 0 10.249-7.85 9.426-11.748l-9.426-.013z"/>
              </svg>
              Google
            </button>
            <button class="flex items-center justify-center gap-2 py-2.5 px-4 border border-gray-200 rounded-xl hover:bg-gray-50 transition text-sm font-medium text-gray-700">
              <svg class="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z"/>
              </svg>
              GitHub
            </button>
          </div> -->
        </div>
      </div>
  
      <!-- Forgot Password Modal -->
      <div v-if="showForgotPassword" class="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
        <div class="bg-white rounded-3xl max-w-md w-full p-8 shadow-2xl">
          <div class="text-center mb-6">
            <div class="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-blue-50 text-blue-600 mb-4">
              <svg class="w-7 h-7" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <path d="M12 3L5 6v5c0 4.6 2.9 8.7 7 10 4.1-1.3 7-5.4 7-10V6l-7-3z" stroke="currentColor" stroke-linejoin="round"/>
                <path d="M9 12h.01M12 12h.01M15 12h.01" stroke="currentColor" stroke-width="2.5" stroke-linecap="round"/>
              </svg>
            </div>
            <h3 class="text-xl font-bold text-gray-900">Reset Password</h3>
            <p class="text-sm text-gray-500 mt-1">Enter your email and we'll send you a reset link</p>
          </div>
  
          <form @submit.prevent="handleForgotPassword" class="space-y-4">
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-1.5">Email address</label>
              <input
                v-model="forgotPasswordForm.email"
                type="email"
                required
                class="w-full px-4 py-3 rounded-xl border border-gray-200 bg-gray-50 focus:bg-white focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 transition outline-none"
                placeholder="you@example.com"
              />
            </div>
            <p v-if="forgotPasswordError" class="text-xs text-red-600 flex items-center gap-1">
              <svg class="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <circle cx="12" cy="12" r="10" stroke="currentColor"/>
                <path d="M12 8v4M12 16h.01" stroke="currentColor" stroke-linecap="round"/>
              </svg>
              {{ forgotPasswordError }}
            </p>
            <div class="flex gap-3">
              <button
                type="button"
                @click="closeForgotPassword"
                class="flex-1 py-3 px-4 border border-gray-200 text-gray-700 font-semibold rounded-xl hover:bg-gray-50 transition"
              >
                Cancel
              </button>
              <button
                type="submit"
                :disabled="forgotPasswordLoading"
                class="flex-1 py-3 px-4 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-xl shadow-lg shadow-blue-600/20 transition disabled:opacity-60 flex items-center justify-center gap-2"
              >
                <LoadingSpinner v-if="forgotPasswordLoading" size="sm" color="white" />
                <span>{{ forgotPasswordLoading ? 'Sending...' : 'Send Link' }}</span>
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  </template>
  
  <script setup>
 
  import { toast } from 'vue-sonner'
  
  // Import API functions
  import { signIn, signUp, forgotPassword as forgotPasswordAPI, resendOTP } from '@/composables/requests/auth'

  definePageMeta({
    layouts: 'custom'
  })
  
  const router = useRouter()
  const pinia = useStore()
  
  // Toggle between login and signup
  const showLogin = ref(true)
  
  // Login form
  const loginForm = ref({
    email: '',
    password: '',
    remember: false
  })
  const loginErrors = ref({
    email: '',
    password: ''
  })
  const loginGeneralError = ref('')
  const loginLoading = ref(false)
  const showLoginPassword = ref(false)
  
  // Sign up form
  const signUpForm = ref({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    country: '',
    agree: false
  })
  const signUpErrors = ref({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    country: '',
    agree: ''
  })
  const signUpGeneralError = ref('')
  const signUpLoading = ref(false)
  const showSignupPassword = ref(false)
  
  // Forgot Password
  const showForgotPassword = ref(false)
  const forgotPasswordForm = ref({
    email: ''
  })
  const forgotPasswordLoading = ref(false)
  const forgotPasswordError = ref('')
  
  // Password strength
  const passwordStrength = computed(() => {
    const pw = signUpForm.value.password
    if (!pw) return 0
    let score = 0
    if (pw.length >= 8) score += 25
    if (pw.length >= 12) score += 25
    if (/[A-Z]/.test(pw) && /[a-z]/.test(pw)) score += 25
    if (/[0-9]/.test(pw) && /[^A-Za-z0-9]/.test(pw)) score += 25
    return score
  })
  
  const passwordStrengthText = computed(() => {
    const score = passwordStrength.value
    if (score === 0) return ''
    if (score <= 25) return 'Weak'
    if (score <= 50) return 'Fair'
    if (score <= 75) return 'Good'
    return 'Strong'
  })
  
  const passwordStrengthColor = computed(() => {
    const score = passwordStrength.value
    if (score === 0) return ''
    if (score <= 25) return 'text-red-500'
    if (score <= 50) return 'text-orange-500'
    if (score <= 75) return 'text-yellow-600'
    return 'text-green-600'
  })
  
  const passwordStrengthClass = computed(() => {
    const score = passwordStrength.value
    if (score === 0) return ''
    if (score <= 25) return 'bg-red-500'
    if (score <= 50) return 'bg-orange-500'
    if (score <= 75) return 'bg-yellow-500'
    return 'bg-green-500'
  })
  
  // Validation functions
  const validateLoginField = (field) => {
    loginErrors.value[field] = ''
    if (field === 'email') {
      if (!loginForm.value.email) {
        loginErrors.value.email = 'Email is required'
      } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(loginForm.value.email)) {
        loginErrors.value.email = 'Please enter a valid email address'
      }
    }
    if (field === 'password') {
      if (!loginForm.value.password) {
        loginErrors.value.password = 'Password is required'
      } else if (loginForm.value.password.length < 6) {
        loginErrors.value.password = 'Password must be at least 6 characters'
      }
    }
  }
  
  const clearLoginError = (field) => {
    loginErrors.value[field] = ''
    loginGeneralError.value = ''
  }
  
  const validateSignupField = (field) => {
    signUpErrors.value[field] = ''
    if (field === 'name') {
      if (!signUpForm.value.name.trim()) {
        signUpErrors.value.name = 'Full name is required'
      } else if (signUpForm.value.name.trim().length < 2) {
        signUpErrors.value.name = 'Name must be at least 2 characters'
      }
    }
    if (field === 'email') {
      if (!signUpForm.value.email) {
        signUpErrors.value.email = 'Email is required'
      } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(signUpForm.value.email)) {
        signUpErrors.value.email = 'Please enter a valid email address'
      }
    }
    if (field === 'password') {
      if (!signUpForm.value.password) {
        signUpErrors.value.password = 'Password is required'
      } else if (signUpForm.value.password.length < 8) {
        signUpErrors.value.password = 'Password must be at least 8 characters'
      } else if (!/[A-Z]/.test(signUpForm.value.password)) {
        signUpErrors.value.password = 'Password must contain at least one uppercase letter'
      } else if (!/[a-z]/.test(signUpForm.value.password)) {
        signUpErrors.value.password = 'Password must contain at least one lowercase letter'
      } else if (!/[0-9]/.test(signUpForm.value.password)) {
        signUpErrors.value.password = 'Password must contain at least one number'
      } else if (!/[^A-Za-z0-9]/.test(signUpForm.value.password)) {
        signUpErrors.value.password = 'Password must contain at least one special character'
      }
    }
    if (field === 'confirmPassword') {
      if (!signUpForm.value.confirmPassword) {
        signUpErrors.value.confirmPassword = 'Please confirm your password'
      } else if (signUpForm.value.confirmPassword !== signUpForm.value.password) {
        signUpErrors.value.confirmPassword = 'Passwords do not match'
      }
    }
    // if (field === 'country') {
    //   if (!signUpForm.value.country.trim()) {
    //     signUpErrors.value.country = 'Country is required'
    //   }
    // }
  }
  
  const clearSignupError = (field) => {
    signUpErrors.value[field] = ''
    signUpGeneralError.value = ''
  }
  
  // Switch handlers
  const switchToLogin = () => {
    showLogin.value = true
    loginGeneralError.value = ''
    signUpGeneralError.value = ''
  }
  
  const switchToSignup = () => {
    showLogin.value = false
    loginGeneralError.value = ''
    signUpGeneralError.value = ''
  }
  
  // Forgot Password handlers
  const openForgotPassword = () => {
    forgotPasswordForm.value.email = loginForm.value.email || ''
    forgotPasswordError.value = ''
    showForgotPassword.value = true
  }
  
  const closeForgotPassword = () => {
    showForgotPassword.value = false
    forgotPasswordForm.value.email = ''
    forgotPasswordError.value = ''
  }
  
  const handleForgotPassword = async () => {
    if (!forgotPasswordForm.value.email) {
      forgotPasswordError.value = 'Email is required'
      return
    }
  
    forgotPasswordLoading.value = true
    forgotPasswordError.value = ''
  
    try {
      const response = await forgotPasswordAPI({
        email: forgotPasswordForm.value.email.trim().toLowerCase()
      })
  
      if (response.success) {
        toast.success('Password reset link sent to your email')
        closeForgotPassword()
      } else {
        forgotPasswordError.value = response.error || 'Failed to send reset link'
        toast.error(forgotPasswordError.value)
      }
    } catch (error) {
      console.error('Forgot password error:', error)
      forgotPasswordError.value = 'Network error. Please try again.'
      toast.error(forgotPasswordError.value)
    } finally {
      forgotPasswordLoading.value = false
    }
  }
  
  // Login handler
  const handleLogin = async () => {
    validateLoginField('email')
    validateLoginField('password')
  
    if (loginErrors.value.email || loginErrors.value.password) {
      return
    }
  
    loginLoading.value = true
    loginGeneralError.value = ''
  
    try {
      const payload = {
        email: loginForm.value.email.trim().toLowerCase(),
        password: loginForm.value.password
      }
  
      const response = await signIn(payload)
  
      if (response.success) {
        if (response.data?.user?.isVerified) {
          // Store user data
          if (response.data) {
            pinia.setUser(response.data)
          }
  
          // Set token expiration
          const expiresAt = Date.now() + (7 * 24 * 60 * 60 * 1000) // 7 days
          localStorage.setItem('tokenExpiresAt', expiresAt.toString())
          pinia.state.isAuthenticated = true
  
          toast.success(response.message || 'Login successful!')
          if(response.data?.user.role === 'admin'){
            router.push('/admin')
          }else{
            router.push('/')
          }
        } else {
          // User not verified - redirect to verify page
          router.push({
            path: '/verify-otp',
            query: { email: payload.email }
          })
        }
      } else {
        loginGeneralError.value = response.message || 'Login failed. Please try again.'
        toast.error(loginGeneralError.value)
      }
    } catch (error) {
      console.error('Login error:', error)
      loginGeneralError.value = 'Network error. Please try again.'
      toast.error(loginGeneralError.value)
    } finally {
      loginLoading.value = false
    }
  }
  
  // Sign up handler
  const handleSignUp = async () => {
    // Validate all fields
    validateSignupField('name')
    validateSignupField('email')
    validateSignupField('password')
    validateSignupField('confirmPassword')
    // validateSignupField('country')
  
    if (!signUpForm.value.agree) {
      signUpErrors.value.agree = 'You must agree to the Terms and Privacy Policy'
    }
  
    if (Object.values(signUpErrors.value).some(error => error)) {
      return
    }
  
    signUpLoading.value = true
    signUpGeneralError.value = ''
  
    try {
      const payload = {
        name: signUpForm.value.name.trim(),
        email: signUpForm.value.email.trim().toLowerCase(),
        password: signUpForm.value.password,
      }
  
      const response = await signUp(payload)
  
      if (response.success) {
        toast.success(response.message || 'Account created successfully!')
  
        // Store user data if returned
        if (response.data) {
          pinia.setUser(response.data)
        }
  
        // Redirect to OTP verification
        router.push({
          path: '/verify-otp',
          query: { email: payload.email }
        })
  
        // Clear form
        signUpForm.value = {
          name: '',
          email: '',
          password: '',
          confirmPassword: '',
          country: '',
          agree: false
        }
        signUpErrors.value = {
          name: '',
          email: '',
          password: '',
          confirmPassword: '',
          country: '',
          agree: ''
        }
      } else {
        signUpGeneralError.value = response.error || 'Unable to create account. Please try again.'
        toast.error(signUpGeneralError.value)
      }
    } catch (error) {
      console.error('Sign up error:', error)
      signUpGeneralError.value = 'Network error. Please try again.'
      // toast.error(signUpGeneralError.value)
    } finally {
      signUpLoading.value = false
    }
  }
  
  // Check if already logged in
  onMounted(() => {
    if (pinia.isAuthenticated && pinia.user) {
      router.push('/dashboard')
    }
  })
  </script>
  
  <style scoped>
  input {
    transition: all 0.15s ease;
  }
  button {
    transition: all 0.15s ease;
  }
  </style>