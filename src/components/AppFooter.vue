<template>
    <footer class="border-t border-gray-200 bg-white">
      <div class="mx-auto max-w-7xl px-5 py-8 sm:px-6 lg:px-8">
  
        <div
          class="flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between"
        >
  
          <!-- Logo -->
          <NuxtLink
            to="/"
            class="flex items-center "
          >
          <div
          class="flex w-[100px]  items-center justify-center rounded-xl"
        >
          <img src="/logo.png" alt="">
        </div>
          </NuxtLink>
  
          <!-- Links -->
          <div class="flex flex-wrap items-center gap-x-6 gap-y-2">
  
            <NuxtLink
              @click="checkisLoggedIn()"
              class="footer-link"
            >
              Activate Card
            </NuxtLink>
  
            <NuxtLink
              to="/support"
              class="footer-link"
            >
              Support
            </NuxtLink>
  
            <NuxtLink
              to="/"
              class="footer-link"
            >
              Privacy
            </NuxtLink>
  
            <NuxtLink
              to="/"
              class="footer-link"
            >
              Terms
            </NuxtLink>
  
          </div>
  
        </div>
  
        <!-- Bottom -->
        <div
          class="mt-7 flex flex-col gap-3 border-t border-gray-100 pt-5 sm:flex-row sm:items-center sm:justify-between"
        >
  
          <p class="text-xs text-gray-400">
            © {{ new Date().getFullYear() }} CardSecure. All rights reserved.
          </p>
  
          <div class="flex items-center gap-2 text-xs text-gray-400">
            <svg
              class="h-3.5 w-3.5"
              viewBox="0 0 24 24"
              fill="none"
            >
              <path
                d="M12 3 5 6v5c0 4.6 2.9 8.7 7 10 4.1-1.3 7-5.4 7-10V6l-7-3Z"
                stroke="currentColor"
                stroke-width="1.6"
              />
              <path
                d="m9 12 2 2 4-4"
                stroke="currentColor"
                stroke-width="1.6"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
            </svg>
  
            <span>Secure & encrypted</span>
          </div>
  
        </div>
  
      </div>
    </footer>
  </template>
  
  <style scoped>
  .footer-link {
    font-size: 0.75rem;
    font-weight: 500;
    color: #6b7280;
    transition: color 0.2s ease;
  }
  
  .footer-link:hover {
    color: #2563eb;
  }
  </style>