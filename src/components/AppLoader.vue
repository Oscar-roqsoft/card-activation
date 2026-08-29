<template>
    <Transition name="loader">
      <div
        v-if="visible"
        class="fixed inset-0 z-[9999] flex min-h-screen items-center justify-center overflow-hidden bg-[#07111F]"
      >
        <!-- Background glow -->
        <div
          class="pointer-events-none absolute left-1/2 top-1/2 h-[500px] w-[500px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-blue-500/10 blur-[120px]"
        />
  
        <!-- Decorative circles -->
        <div
          class="absolute -left-24 -top-24 h-72 w-72 rounded-full border border-white/[0.04]"
        />
  
        <div
          class="absolute -bottom-32 -right-32 h-96 w-96 rounded-full border border-white/[0.04]"
        />
  
        <div class="relative flex w-full max-w-sm flex-col items-center px-6">
  
          <!-- Logo -->
          <div class="mb-8 flex flex-col items-center">
            <div
              class="logo-wrapper flex h-16 w-16 items-center justify-center rounded-2xl bg-white shadow-2xl shadow-blue-500/20"
            >
              <!-- Replace with your actual logo -->
              <div
                class="flex h-10 w-10 items-center justify-center rounded-xl bg-[#1264FF]"
              >
                <svg
                  viewBox="0 0 24 24"
                  fill="none"
                  class="h-6 w-6 text-white"
                >
                  <path
                    d="M3 8.5C3 7.67 3.67 7 4.5 7h15c.83 0 1.5.67 1.5 1.5v7c0 .83-.67 1.5-1.5 1.5h-15C3.67 17 3 16.33 3 15.5v-7Z"
                    stroke="currentColor"
                    stroke-width="1.8"
                  />
                  <path
                    d="M3 10h18M7 14h3"
                    stroke="currentColor"
                    stroke-width="1.8"
                    stroke-linecap="round"
                  />
                </svg>
              </div>
            </div>
  
            <h1 class="mt-5 text-xl font-semibold tracking-tight text-white">
              CardSecure
            </h1>
  
            <p class="mt-1 text-sm text-slate-400">
              Secure card activation
            </p>
          </div>
  
          <!-- Animated card -->
          <div class="card-container mb-10">
            <div class="credit-card">
  
              <!-- Card shine -->
              <div class="card-shine"></div>
  
              <div class="relative z-10 flex h-full flex-col justify-between p-5">
  
                <div class="flex items-start justify-between">
                  <div
                    class="h-8 w-11 rounded-md border border-white/30 bg-gradient-to-br from-yellow-200 via-yellow-400 to-yellow-600"
                  >
                    <div class="mt-1.5 h-px bg-yellow-700/30"></div>
                    <div class="mt-2 h-px bg-yellow-700/30"></div>
                  </div>
  
                  <svg
                    class="h-6 w-6 text-white/80"
                    viewBox="0 0 24 24"
                    fill="none"
                  >
                    <path
                      d="M4 9.5C6.2 7.4 8.5 6.3 12 6.3s5.8 1.1 8 3.2"
                      stroke="currentColor"
                      stroke-width="1.5"
                      stroke-linecap="round"
                    />
                    <path
                      d="M7 13c1.4-1.2 2.9-1.8 5-1.8s3.6.6 5 1.8"
                      stroke="currentColor"
                      stroke-width="1.5"
                      stroke-linecap="round"
                    />
                    <circle cx="12" cy="16.5" r="1.2" fill="currentColor" />
                  </svg>
                </div>
  
                <div>
                  <div class="mb-2 text-[10px] uppercase tracking-[0.25em] text-white/50">
                    Card number
                  </div>
  
                  <div class="text-sm tracking-[0.2em] text-white/90">
                    •••• &nbsp; •••• &nbsp; •••• &nbsp; ••••
                  </div>
                </div>
  
                <div class="flex items-end justify-between">
                  <div>
                    <div class="text-[8px] uppercase tracking-widest text-white/40">
                      Cardholder
                    </div>
                    <div class="mt-1 text-[10px] uppercase tracking-wider text-white/80">
                      Your Name
                    </div>
                  </div>
  
                  <div>
                    <div class="text-[8px] uppercase tracking-widest text-white/40">
                      Expires
                    </div>
                    <div class="mt-1 text-[10px] text-white/80">
                      MM/YY
                    </div>
                  </div>
                </div>
  
              </div>
            </div>
          </div>
  
          <!-- Loading -->
          <div class="flex flex-col items-center">
  
            <div class="mb-4 flex items-center gap-2">
              <span
                v-for="index in 3"
                :key="index"
                class="loading-dot"
                :style="{ animationDelay: `${(index - 1) * 0.15}s` }"
              ></span>
            </div>
  
            <p class="text-sm font-medium text-white">
              Preparing your secure experience
            </p>
  
            <p class="mt-2 text-center text-xs text-slate-500">
              Please wait a moment...
            </p>
  
          </div>
  
          <!-- Bottom security message -->
          <div class="mt-12 flex items-center gap-2 text-xs text-slate-500">
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
    </Transition>
  </template>
  
  <script setup>
  import { onMounted, ref } from 'vue'
  
  const emit = defineEmits(['finished'])
  
  const visible = ref(true)
  
  onMounted(() => {
    setTimeout(() => {
      visible.value = false
  
      setTimeout(() => {
        emit('finished')
      }, 400)
    }, 9500)
  })
</script>
  
  <style scoped>
  /* Loader transition */
  .loader-enter-active,
  .loader-leave-active {
    transition: opacity 0.4s ease;
  }
  
  .loader-enter-from,
  .loader-leave-to {
    opacity: 0;
  }
  
  /* Logo animation */
  .logo-wrapper {
    animation: logoFloat 2.5s ease-in-out infinite;
  }
  
  @keyframes logoFloat {
    0%,
    100% {
      transform: translateY(0);
    }
  
    50% {
      transform: translateY(-5px);
    }
  }
  
  /* Card */
  .card-container {
    perspective: 1000px;
  }
  
  .credit-card {
    position: relative;
    width: 280px;
    height: 170px;
    overflow: hidden;
    border-radius: 18px;
    background:
      linear-gradient(
        135deg,
        #1769ff 0%,
        #1247c9 45%,
        #081f5c 100%
      );
    box-shadow:
      0 25px 50px -15px rgba(18, 100, 255, 0.45);
    animation: cardFloat 3s ease-in-out infinite;
  }
  
  @keyframes cardFloat {
    0%,
    100% {
      transform: rotateY(-8deg) rotateX(3deg) translateY(0);
    }
  
    50% {
      transform: rotateY(8deg) rotateX(-2deg) translateY(-8px);
    }
  }
  
  /* Card shine */
  .card-shine {
    position: absolute;
    inset: -100%;
    width: 50%;
    transform: rotate(25deg);
    background: linear-gradient(
      90deg,
      transparent,
      rgba(255, 255, 255, 0.18),
      transparent
    );
    animation: shine 3s infinite;
  }
  
  @keyframes shine {
    0% {
      left: -100%;
    }
  
    50%,
    100% {
      left: 200%;
    }
  }
  
  /* Loading dots */
  .loading-dot {
    display: block;
    width: 6px;
    height: 6px;
    border-radius: 9999px;
    background: #3b82f6;
    animation: loading 1s ease-in-out infinite;
  }
  
  @keyframes loading {
    0%,
    100% {
      opacity: 0.3;
      transform: translateY(0);
    }
  
    50% {
      opacity: 1;
      transform: translateY(-4px);
    }
  }
  </style>