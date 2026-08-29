<template>
  <header
    class="fixed inset-x-0 top-0 z-50 border-b border-gray-200/80 bg-white/90 backdrop-blur-xl "
  >
    <nav class="mx-auto flex h-20 max-w-7xl items-center justify-between px-5 sm:px-6 lg:px-8">
      <!-- Logo -->
      <NuxtLink
        to="/"
        class="flex items-center gap-3"
        @click="closeMobileMenu"
      >
        <div
          class="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-600 shadow-lg shadow-blue-600/20"
        >
          <svg viewBox="0 0 24 24" fill="none" class="h-5 w-5 text-white">
            <path
              d="M3 8.5C3 7.67 3.67 7 4.5 7h15c.83 0 1.5.67 1.5 1.5v7c0 .83-.67 1.5-1.5 1.5h-15C3.67 17 3 16.33 3 15.5v-7Z"
              stroke="currentColor"
              stroke-width="1.8"
            />
            <path d="M3 10h18M7 14h3" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" />
          </svg>
        </div>
        <div class="hidden sm:block">
          <div class="text-base font-bold tracking-tight text-gray-900">CardSecure</div>
          <div class="text-[10px] font-medium uppercase tracking-[0.18em] text-gray-400">Card Services</div>
        </div>
      </NuxtLink>

      <!-- Desktop Menu -->
      <div class="hidden items-center gap-8 md:flex">
        <NuxtLink to="/" class="nav-link">Home</NuxtLink>
        <NuxtLink to="/activate" class="nav-link">Activate Card</NuxtLink>
        <NuxtLink to="/howItWorks" class="nav-link">How It Works</NuxtLink>
        <NuxtLink to="/support" class="nav-link">Support</NuxtLink>
      </div>

      <!-- Desktop Right -->
      <div class="hidden items-center gap-4 md:flex">
        <NuxtLink to="/support" class="text-sm font-medium text-gray-600 transition hover:text-gray-900">
          Need Help?
        </NuxtLink>

        <!-- Account Dropdown -->
        <div class="relative" @mouseenter="showDropdown = true" @mouseleave="showDropdown = false">
          <button
            type="button"
            class="flex items-center gap-2 rounded-xl px-4 py-2.5 text-sm font-semibold text-gray-700 transition hover:bg-gray-100"
          >
            <svg class="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8">
              <circle cx="12" cy="8" r="4" stroke="currentColor" />
              <path d="M5.5 20v-2a4 4 0 0 1 4-4h5a4 4 0 0 1 4 4v2" stroke="currentColor" stroke-linecap="round" />
            </svg>
            <span>Account</span>
            <svg class="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <path d="M6 9l6 6 6-6" stroke-linecap="round" stroke-linejoin="round" />
            </svg>
          </button>

          <!-- Dropdown -->
          <div
            v-show="showDropdown"
            class="absolute right-0 mt-2 w-56 rounded-2xl border border-gray-200 bg-white shadow-xl"
          >
            <div class="p-2">
              <div class="border-b border-gray-100 pb-2">
                <div class="px-3 py-2">
                  <p class="text-sm font-semibold text-gray-900">Guest User</p>
                  <p class="text-xs text-gray-500">guest@example.com</p>
                </div>
              </div>
              <div class="py-1">
                <button
                  @click="openModal('login')"
                  class="flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium text-gray-700 transition hover:bg-blue-50 hover:text-blue-600"
                >
                  <svg class="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                    <path d="M15 3h4a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2h-4" />
                    <path d="M10 17l5-5-5-5" />
                    <path d="M15 12H3" />
                  </svg>
                  Sign In
                </button>
                <button
                  @click="openModal('signup')"
                  class="flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium text-gray-700 transition hover:bg-blue-50 hover:text-blue-600"
                >
                  <svg class="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                    <path d="M16 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
                    <circle cx="8.5" cy="7" r="4" />
                    <path d="M20 8v6" />
                    <path d="M23 11h-6" />
                  </svg>
                  Create Account
                </button>
              </div>
              <div class="border-t border-gray-100 pt-1">
                <button
                  v-if="isLoggedIn"
                  @click="handleLogout"
                  class="flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium text-red-600 transition hover:bg-red-50"
                >
                  <svg class="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                    <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" />
                    <path d="M16 17l5-5-5-5" />
                    <path d="M21 12H9" />
                  </svg>
                  Sign Out
                </button>
              </div>
            </div>
          </div>
        </div>

        <NuxtLink
          to="/activate"
          class="rounded-xl bg-blue-600 px-5 py-2.5 text-sm font-semibold text-white shadow-lg shadow-blue-600/20 transition hover:bg-blue-700 hover:shadow-blue-600/30"
        >
          Activate Card
        </NuxtLink>
      </div>

      <!-- Mobile Menu Button -->
      <button
        type="button"
        class="flex h-11 w-11 items-center justify-center rounded-xl border border-gray-200 bg-white text-gray-700 transition hover:bg-gray-50 md:hidden"
        aria-label="Open menu"
        @click="mobileMenuOpen = true"
      >
        <svg v-if="!mobileMenuOpen" class="h-5 w-5" viewBox="0 0 24 24" fill="none">
          <path d="M4 7h16M4 12h16M4 17h16" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" />
        </svg>
      </button>
    </nav>
  </header>

  <!-- Mobile Overlay -->
  <Transition name="fade">
    <div
      v-if="mobileMenuOpen"
      class="fixed inset-0 z-[60] bg-black/40 backdrop-blur-sm md:hidden"
      @click="closeMobileMenu"
    />
  </Transition>

  <!-- Mobile Drawer -->
  <Transition name="mobile-menu">
    <aside
      v-if="mobileMenuOpen"
      class="fixed right-0 top-0 z-[70] pt-5 flex h-full w-[88%] max-w-sm flex-col bg-white shadow-2xl md:hidden"
    >
      <!-- Drawer Header -->
      <div class="flex h-20 items-center justify-between border-b border-gray-100 px-5">
        <NuxtLink to="/" class="flex items-center gap-3" @click="closeMobileMenu">
          <div class="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-600">
            <svg viewBox="0 0 24 24" fill="none" class="h-5 w-5 text-white">
              <path
                d="M3 8.5C3 7.67 3.67 7 4.5 7h15c.83 0 1.5.67 1.5 1.5v7c0 .83-.67 1.5-1.5 1.5h-15C3.67 17 3 16.33 3 15.5v-7Z"
                stroke="currentColor"
                stroke-width="1.8"
              />
              <path d="M3 10h18M7 14h3" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" />
            </svg>
          </div>
          <div>
            <div class="font-bold text-gray-900">CardSecure</div>
            <div class="text-[9px] uppercase tracking-[0.18em] text-gray-400">Card Services</div>
          </div>
        </NuxtLink>

        <button
          type="button"
          class="flex h-10 w-10 items-center justify-center rounded-xl bg-gray-100 text-gray-600 transition hover:bg-gray-200"
          aria-label="Close menu"
          @click="closeMobileMenu"
        >
          <svg class="h-5 w-5" viewBox="0 0 24 24" fill="none">
            <path d="M6 6l12 12M18 6 6 18" stroke="currentColor" stroke-width="2" stroke-linecap="round" />
          </svg>
        </button>
      </div>

      <!-- Mobile Links -->
      <div class="flex flex-1 flex-col px-5 py-7">
        <div class="mb-3 text-[11px] font-semibold uppercase tracking-[0.18em] text-gray-400">Menu</div>

        <div class="space-y-2">
          <NuxtLink to="/" class="mobile-nav-link" @click="closeMobileMenu">
            <span class="mobile-icon">
              <svg viewBox="0 0 24 24" fill="none">
                <path d="m4 10 8-6 8 6v9a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1v-9Z" stroke="currentColor" stroke-width="1.7" />
              </svg>
            </span>
            <span>Home</span>
          </NuxtLink>

          <NuxtLink to="/activate" class="mobile-nav-link" @click="closeMobileMenu">
            <span class="mobile-icon">
              <svg viewBox="0 0 24 24" fill="none">
                <rect x="3" y="6" width="18" height="12" rx="2" stroke="currentColor" stroke-width="1.7" />
                <path d="M3 10h18M7 14h3" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" />
              </svg>
            </span>
            <span>Activate Card</span>
          </NuxtLink>

          <NuxtLink to="/howItWorks" class="mobile-nav-link" @click="closeMobileMenu">
            <span class="mobile-icon">
              <svg viewBox="0 0 24 24" fill="none">
                <circle cx="12" cy="12" r="9" stroke="currentColor" stroke-width="1.7" />
                <path d="M9.5 9a2.5 2.5 0 1 1 4.1 1.9c-.9.7-1.6 1.1-1.6 2.6" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" />
                <circle cx="12" cy="16.5" r=".8" fill="currentColor" />
              </svg>
            </span>
            <span>How It Works</span>
          </NuxtLink>

          <NuxtLink to="/support" class="mobile-nav-link" @click="closeMobileMenu">
            <span class="mobile-icon">
              <svg viewBox="0 0 24 24" fill="none">
                <path
                  d="M4 5.5A2.5 2.5 0 0 1 6.5 3h11A2.5 2.5 0 0 1 20 5.5v8a2.5 2.5 0 0 1-2.5 2.5H12l-4.5 4v-4h-1A2.5 2.5 0 0 1 4 13.5v-8Z"
                  stroke="currentColor"
                  stroke-width="1.7"
                  stroke-linejoin="round"
                />
              </svg>
            </span>
            <span>Support</span>
          </NuxtLink>
        </div>

        <!-- Mobile Account Actions -->
        <div class="mt-6 border-t border-gray-100 pt-6">
          <div class="mb-3 text-[11px] font-semibold uppercase tracking-[0.18em] text-gray-400">Account</div>
          <div class="space-y-2">
            <button @click="openModal('login')" class="mobile-nav-link">
              <span class="mobile-icon">
                <svg viewBox="0 0 24 24" fill="none">
                  <path d="M15 3h4a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2h-4" stroke="currentColor" stroke-width="1.7" />
                  <path d="M10 17l5-5-5-5" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round" />
                  <path d="M15 12H3" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" />
                </svg>
              </span>
              <span>Sign In</span>
            </button>
            <button @click="openModal('signup')" class="mobile-nav-link">
              <span class="mobile-icon">
                <svg viewBox="0 0 24 24" fill="none">
                  <path d="M16 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" stroke="currentColor" stroke-width="1.7" />
                  <circle cx="8.5" cy="7" r="4" stroke="currentColor" stroke-width="1.7" />
                  <path d="M20 8v6M23 11h-6" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" />
                </svg>
              </span>
              <span>Create Account</span>
            </button>
            <button v-if="isLoggedIn" @click="handleLogout" class="mobile-nav-link text-red-600">
              <span class="mobile-icon">
                <svg viewBox="0 0 24 24" fill="none">
                  <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" stroke="currentColor" stroke-width="1.7" />
                  <path d="M16 17l5-5-5-5" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round" />
                  <path d="M21 12H9" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" />
                </svg>
              </span>
              <span>Sign Out</span>
            </button>
          </div>
        </div>

        <!-- Help Card -->
        <div class="mt-auto">
          <div class="mb-5 rounded-2xl bg-gray-50 p-4">
            <div class="flex items-start gap-3">
              <div class="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-blue-100 text-blue-600">
                <svg class="h-5 w-5" viewBox="0 0 24 24" fill="none">
                  <path d="M12 21a9 9 0 1 0 0-18 9 9 0 0 0 0 18Z" stroke="currentColor" stroke-width="1.7" />
                  <path d="M9.5 9a2.5 2.5 0 1 1 4.1 1.9c-.9.7-1.6 1.1-1.6 2.6" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" />
                  <circle cx="12" cy="16.5" r=".8" fill="currentColor" />
                </svg>
              </div>
              <div>
                <p class="text-sm font-semibold text-gray-900">Need help?</p>
                <p class="mt-1 text-xs leading-5 text-gray-500">Our support team is available to assist you.</p>
              </div>
            </div>
          </div>

          <!-- <NuxtLink
            to="/activate"
            class="flex w-full items-center justify-center rounded-xl bg-blue-600 px-5 py-3.5 text-sm font-semibold text-white shadow-lg shadow-blue-600/20 transition hover:bg-blue-700"
            @click="closeMobileMenu"
          >
            Activate My Card
          </NuxtLink> -->
        </div>
      </div>

      <!-- Drawer Footer -->
      <div class="border-t border-gray-100 px-5 py-5">
        <div class="flex items-center justify-center gap-2 text-xs text-gray-400">
          <svg class="h-4 w-4" viewBox="0 0 24 24" fill="none">
            <path d="M12 3 5 6v5c0 4.6 2.9 8.7 7 10 4.1-1.3 7-5.4 7-10V6l-7-3Z" stroke="currentColor" stroke-width="1.6" />
          </svg>
          <span>Secure & encrypted</span>
        </div>
      </div>
    </aside>
  </Transition>

  <!-- Login/Signup Modal -->
  <Teleport to="body">
    <div v-if="modalOpen" class="fixed inset-0 z-[100] flex items-center justify-center p-4">
      <!-- Backdrop -->
      <div class="absolute inset-0 bg-black/50 backdrop-blur-sm" @click="closeModal"></div>

      <!-- Modal Content -->
      <div class="relative w-full max-w-md">
        <LoginSignup
          :initial-mode="modalMode"
          @close="closeModal"
          @login-success="handleLoginSuccess"
          @signup-success="handleSignupSuccess"
        />
      </div>
    </div>
  </Teleport>
</template>

<script setup>
import { ref } from 'vue'
// Import the login/signup component
// import LoginSignu÷p from './LoginSignup.vue'

const mobileMenuOpen = ref(false)
const showDropdown = ref(false)
const modalOpen = ref(false)
const modalMode = ref('login')
const isLoggedIn = ref(false)

const closeMobileMenu = () => {
  mobileMenuOpen.value = false
}

const openModal = (mode) => {
  modalMode.value = mode
  modalOpen.value = true
  closeMobileMenu()
  showDropdown.value = false
}

const closeModal = () => {
  modalOpen.value = false
}

const handleLoginSuccess = () => {
  isLoggedIn.value = true
  closeModal()
  alert('✅ Login successful!')
}

const handleSignupSuccess = () => {
  isLoggedIn.value = true
  closeModal()
  alert('✅ Account created successfully!')
}

const handleLogout = () => {
  isLoggedIn.value = false
  showDropdown.value = false
  alert('Signed out successfully!')
}
</script>

<style scoped>
.nav-link {
  position: relative;
  font-size: 0.875rem;
  font-weight: 500;
  color: #4b5563;
  transition: color 0.2s ease;
}

.nav-link:hover {
  color: #111827;
}

.nav-link.router-link-active {
  color: #2563eb;
}

.nav-link.router-link-active::after {
  content: '';
  position: absolute;
  left: 50%;
  bottom: -28px;
  width: 5px;
  height: 5px;
  border-radius: 9999px;
  background: #2563eb;
  transform: translateX(-50%);
}

.mobile-nav-link {
  display: flex;
  align-items: center;
  gap: 14px;
  width: 100%;
  padding: 13px 14px;
  border-radius: 12px;
  font-size: 0.9rem;
  font-weight: 500;
  color: #374151;
  transition: all 0.2s ease;
}

.mobile-nav-link:hover,
.mobile-nav-link.router-link-active {
  background: #eff6ff;
  color: #2563eb;
}

.mobile-icon {
  display: flex;
  width: 22px;
  height: 22px;
  align-items: center;
  justify-content: center;
}

.mobile-icon svg {
  width: 19px;
  height: 19px;
}

/* Overlay */
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

/* Mobile drawer */
.mobile-menu-enter-active,
.mobile-menu-leave-active {
  transition: transform 0.35s cubic-bezier(0.4, 0, 0.2, 1);
}

.mobile-menu-enter-from,
.mobile-menu-leave-to {
  transform: translateX(100%);
}

/* Dropdown animations */
.dropdown-enter-active,
.dropdown-leave-active {
  transition: opacity 0.2s ease, transform 0.2s ease;
}

.dropdown-enter-from,
.dropdown-leave-to {
  opacity: 0;
  transform: translateY(-8px);
}
</style>