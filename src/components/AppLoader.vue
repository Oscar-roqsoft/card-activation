<template>
  <Transition name="loader">
    <div
      v-if="visible"
      class="fixed inset-0 z-[9999] flex min-h-screen items-center justify-center overflow-hidden bg-[#fff]"
    >
      <!-- Background ambient glow -->
      <div
        class="pointer-events-none absolute left-1/2 top-1/2 h-[600px] w-[600px]
        -translate-x-1/2 -translate-y-1/2 rounded-full
        bg-[#1769FF]/10 blur-[140px]"
      />

      <!-- Top-left blue glow -->
      <div
        class="pointer-events-none absolute -left-32 -top-32 h-80 w-80
        rounded-full bg-[#1769FF]/10 blur-[100px]"
      />

      <!-- Bottom-right blue glow -->
      <div
        class="pointer-events-none absolute -bottom-40 -right-40 h-96 w-96
        rounded-full bg-[#1247C9]/15 blur-[110px]"
      />

      <!-- Decorative circles -->
      <div
        class="absolute -left-24 -top-24 h-72 w-72 rounded-full
        border border-[#1769FF]/10"
      />

      <div
        class="absolute -bottom-32 -right-32 h-96 w-96 rounded-full
        border border-[#1769FF]/10"
      />

      <div class="relative flex w-full max-w-sm flex-col items-center px-6">

        <!-- ================================= -->
        <!-- LOGO -->
        <!-- ================================= -->
        <div class="logo-wrapper mb-8 flex flex-col items-center">

          <!-- Logo container -->
          <div
            class="relative flex items-center justify-center"
          >
            <!-- Logo glow -->
            <div
              class="absolute inset-0 rounded-2xl
              bg-[#1769FF]/20 blur-2xl "
            />

            <div
              class="relative flex w-[170px] items-center justify-center
              rounded-2xl"
            >
              <img
                src="/logo.png"
                alt="CardSecure"
                class="relative z-10 w-full object-contain"
              />
            </div>
          </div>

          <!-- Tagline -->
          <p
            class="mt-3 text-[11px] font-medium uppercase
            tracking-[0.2em] text-[#8EA8D9]"
          >
            Secure card activation
          </p>
        </div>

        <!-- ================================= -->
        <!-- CARD -->
        <!-- ================================= -->
        <div class="card-container mb-10">

          <div class="credit-card">

            <!-- Animated shine -->
            <div class="card-shine"></div>

            <!-- Subtle card glow -->
            <div class="card-glow"></div>

            <div
              class="relative z-10 flex h-full flex-col
              justify-between p-5"
            >

              <!-- Top -->
              <div class="flex items-start justify-between">

                <!-- EMV CHIP -->
                <div
                  class="chip h-8 w-11 rounded-md
                  border border-yellow-200/40
                  bg-gradient-to-br
                  from-yellow-200
                  via-yellow-400
                  to-yellow-600"
                >
                  <div class="mt-1.5 h-px bg-yellow-700/30"></div>
                  <div class="mt-2 h-px bg-yellow-700/30"></div>
                </div>

                <!-- Contactless -->
                <svg
                  class="h-7 w-7 text-white/80"
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

                  <circle
                    cx="12"
                    cy="16.5"
                    r="1.2"
                    fill="currentColor"
                  />
                </svg>
              </div>

              <!-- Card number -->
              <div>
                <div
                  class="mb-2 text-[9px] uppercase
                  tracking-[0.25em] text-white/40"
                >
                  Card number
                </div>

                <div
                  class="text-sm tracking-[0.2em]
                  text-white/90"
                >
                  •••• &nbsp; •••• &nbsp; •••• &nbsp; ••••
                </div>
              </div>

              <!-- Bottom -->
              <div class="flex items-end justify-between">

                <!-- Cardholder -->
                <div>
                  <div
                    class="text-[8px] uppercase
                    tracking-widest text-white/40"
                  >
                    Cardholder
                  </div>

                  <div
                    class="mt-1 text-[10px] uppercase
                    tracking-wider text-white/80"
                  >
                    Your Name
                  </div>
                </div>

                <!-- Expiry -->
                <div>
                  <div
                    class="text-[8px] uppercase
                    tracking-widest text-white/40"
                  >
                    Expires
                  </div>

                  <div
                    class="mt-1 text-[10px]
                    text-white/80"
                  >
                    MM/YY
                  </div>
                </div>

                <!-- Security shield -->
                <div
                  class="security-shield"
                >
                  <svg
                    class="h-5 w-5"
                    viewBox="0 0 24 24"
                    fill="none"
                  >
                    <path
                      d="M12 3 5 6v5c0 4.6 2.9 8.7 7 10
                      4.1-1.3 7-5.4 7-10V6l-7-3Z"
                      stroke="currentColor"
                      stroke-width="1.5"
                    />

                    <path
                      d="m9 12 2 2 4-4"
                      stroke="currentColor"
                      stroke-width="1.5"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                    />
                  </svg>
                </div>

              </div>

            </div>
          </div>
        </div>

        <!-- ================================= -->
        <!-- LOADING -->
        <!-- ================================= -->
        <div class="flex flex-col items-center">

          <!-- Animated dots -->
          <div class="mb-5 flex items-center gap-2">

            <span
              v-for="index in 3"
              :key="index"
              class="loading-dot"
              :style="{
                animationDelay: `${(index - 1) * 0.18}s`
              }"
            ></span>

          </div>

          <!-- Main text -->
          <p
            class="text-center text-sm font-semibold
            tracking-wide text-black"
          >
            Preparing your secure experience
          </p>

          <!-- Secondary text -->
          <p
            class="mt-2 text-center text-xs
            text-[#7186A8]"
          >
            Please wait a moment...
          </p>
        </div>

        <!-- ================================= -->
        <!-- SECURITY MESSAGE -->
        <!-- ================================= -->
        <div
          class="mt-12 flex items-center gap-3
          text-xs text-[#7186A8]"
        >

          <div
            class="flex h-7 w-7 items-center justify-center
            rounded-full border border-[#1769FF]/20
            bg-[#1769FF]/5"
          >
            <svg
              class="h-4 w-4 text-[#4C91FF]"
              viewBox="0 0 24 24"
              fill="none"
            >
              <path
                d="M12 3 5 6v5c0 4.6 2.9 8.7 7 10
                4.1-1.3 7-5.4 7-10V6l-7-3Z"
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
          </div>

          <span>
            Secure & encrypted
          </span>

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
  }, 1500)
})
</script>

<style scoped>

/* =========================================
   LOADER TRANSITION
========================================= */

.loader-enter-active,
.loader-leave-active {
  transition: opacity 0.4s ease;
}

.loader-enter-from,
.loader-leave-to {
  opacity: 0;
}


/* =========================================
   LOGO
========================================= */

.logo-wrapper {
  animation: logoFloat 3s ease-in-out infinite;
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


/* =========================================
   CARD CONTAINER
========================================= */

.card-container {
  perspective: 1000px;
}


/* =========================================
   CREDIT CARD
========================================= */

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
      #1247c9 42%,
      #0b2d78 72%,
      #071a43 100%
    );

  border: 1px solid rgba(82, 150, 255, 0.35);

  box-shadow:
    0 25px 50px -15px rgba(23, 105, 255, 0.45),
    0 0 35px rgba(23, 105, 255, 0.12);

  animation: cardFloat 4s ease-in-out infinite;
}


/* =========================================
   CARD FLOAT
========================================= */

@keyframes cardFloat {
  0%,
  100% {
    transform:
      rotateY(-8deg)
      rotateX(3deg)
      translateY(0);
  }

  50% {
    transform:
      rotateY(8deg)
      rotateX(-2deg)
      translateY(-8px);
  }
}


/* =========================================
   CARD GLOW
========================================= */

.card-glow {
  position: absolute;

  width: 160px;
  height: 160px;

  top: -70px;
  right: -50px;

  border-radius: 9999px;

  background: #4c91ff;

  opacity: 0.15;

  filter: blur(45px);
}


/* =========================================
   CARD SHINE
========================================= */

.card-shine {
  position: absolute;

  top: -100%;
  left: -100%;

  width: 50%;
  height: 300%;

  transform: rotate(25deg);

  background: linear-gradient(
    90deg,
    transparent,
    rgba(255, 255, 255, 0.2),
    transparent
  );

  animation: shine 3.5s ease-in-out infinite;
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


/* =========================================
   CHIP
========================================= */

.chip {
  position: relative;

  overflow: hidden;

  box-shadow:
    inset 0 1px 2px rgba(255, 255, 255, 0.4),
    0 2px 5px rgba(0, 0, 0, 0.2);
}


/* =========================================
   SECURITY SHIELD
========================================= */

.security-shield {
  position: absolute;

  right: 15px;
  bottom: 18px;

  display: flex;

  align-items: center;
  justify-content: center;

  width: 35px;
  height: 35px;

  border-radius: 10px;

  color: #ffffff;

  background: rgba(23, 105, 255, 0.25);

  border: 1px solid rgba(140, 190, 255, 0.35);

  backdrop-filter: blur(8px);

  box-shadow:
    0 0 15px rgba(23, 105, 255, 0.25);
}


/* =========================================
   LOADING DOTS
========================================= */

.loading-dot {
  display: block;

  width: 7px;
  height: 7px;

  border-radius: 9999px;

  background: #3b82f6;

  box-shadow:
    0 0 8px rgba(59, 130, 246, 0.8),
    0 0 16px rgba(59, 130, 246, 0.35);

  animation: loading 1.1s ease-in-out infinite;
}

@keyframes loading {
  0%,
  100% {
    opacity: 0.3;
    transform: translateY(0) scale(0.85);
  }

  50% {
    opacity: 1;
    transform: translateY(-5px) scale(1.15);
  }
}

</style>