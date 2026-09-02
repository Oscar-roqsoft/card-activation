<template>
    <section
      class="relative overflow-hidden bg-white"
    >
      <!-- Background decoration -->
      <div
        class="pointer-events-none absolute -left-40 top-20 h-96 w-96 rounded-full bg-blue-100/60 blur-3xl"
      />
  
      <div
        class="pointer-events-none absolute -right-40 top-0 h-[500px] w-[500px] rounded-full bg-indigo-100/50 blur-3xl"
      />
  
      <div
        class="relative mx-auto max-w-7xl px-5 pb-20 pt-14 sm:px-6 sm:pb-24 sm:pt-20 lg:px-8 lg:pb-28 lg:pt-24"
      >
        <div
          class="grid items-center gap-14 lg:grid-cols-2 lg:gap-20"
        >
  
          <!-- LEFT -->
          <div class="max-w-xl">
  
            <!-- Small badge -->
            <div
              class="mb-6 inline-flex items-center gap-2 rounded-full border border-blue-100 bg-blue-50 px-3.5 py-2"
            >
              <span
                class="flex h-5 w-5 items-center justify-center rounded-full bg-blue-600"
              >
                <svg
                  class="h-3 w-3 text-white"
                  viewBox="0 0 24 24"
                  fill="none"
                >
                  <path
                    d="m5 12 4 4L19 6"
                    stroke="currentColor"
                    stroke-width="2.5"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                </svg>
              </span>
  
              <span
                class="text-xs font-semibold text-blue-700 sm:text-sm"
              >
                Secure card activation
              </span>
            </div>
  
            <!-- Heading -->
            <h1
              class="text-4xl font-bold leading-[1.08] tracking-tight text-gray-950 sm:text-5xl lg:text-6xl"
            >
              Activate your card.
              <span class="text-blue-600">
                Start using it.
              </span>
            </h1>
  
            <!-- Description -->
            <p
              class="mt-6 max-w-lg text-base leading-7 text-gray-500 sm:text-lg"
            >
              Activate your card quickly and securely in just a few simple
              steps. Your card will be ready to use once activation is complete.
            </p>
  
            <!-- CTA -->
            <div class="mt-8 flex flex-col gap-3 sm:flex-row">
  
              <NuxtLink
                @click="checkisLoggedIn()"
                class="group inline-flex items-center justify-center gap-2 rounded-xl bg-blue-600 px-6 py-3.5 text-sm font-semibold text-white shadow-xl shadow-blue-600/20 transition duration-200 hover:-translate-y-0.5 hover:bg-blue-700 hover:shadow-blue-600/30"
              >
                Activate My Card
  
                <svg
                  class="h-4 w-4 transition-transform duration-200 group-hover:translate-x-1"
                  viewBox="0 0 24 24"
                  fill="none"
                >
                  <path
                    d="M5 12h14M13 6l6 6-6 6"
                    stroke="currentColor"
                    stroke-width="2"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                </svg>
              </NuxtLink>
  
              <a
                href="/howItWorks"
                class="inline-flex items-center justify-center gap-2 rounded-xl border border-gray-200 bg-white px-6 py-3.5 text-sm font-semibold text-gray-700 transition hover:border-gray-300 hover:bg-gray-50"
              >
                How It Works
              </a>
  
            </div>
  
            <!-- Trust indicators -->
            <div
              class="mt-9 flex flex-wrap items-center gap-x-6 gap-y-3 text-xs text-gray-500"
            >
  
              <div class="flex items-center gap-2">
                <svg
                  class="h-4 w-4 text-green-500"
                  viewBox="0 0 24 24"
                  fill="none"
                >
                  <path
                    d="M12 3 5 6v5c0 4.6 2.9 8.7 7 10 4.1-1.3 7-5.4 7-10V6l-7-3Z"
                    stroke="currentColor"
                    stroke-width="1.7"
                  />
                  <path
                    d="m9 12 2 2 4-4"
                    stroke="currentColor"
                    stroke-width="1.7"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                </svg>
  
                <span>Secure & encrypted</span>
              </div>
  
              <div class="flex items-center gap-2">
                <svg
                  class="h-4 w-4 text-green-500"
                  viewBox="0 0 24 24"
                  fill="none"
                >
                  <circle
                    cx="12"
                    cy="12"
                    r="9"
                    stroke="currentColor"
                    stroke-width="1.7"
                  />
                  <path
                    d="M12 7v5l3 2"
                    stroke="currentColor"
                    stroke-width="1.7"
                    stroke-linecap="round"
                  />
                </svg>
  
                <span>Quick activation</span>
              </div>
  
            </div>
  
          </div>
  
          <!-- RIGHT -->
          <div
            class="relative flex min-h-[390px] items-center justify-center lg:min-h-[500px]"
          >
  
            <!-- Background circle -->
            <div
              class="absolute h-[280px] w-[280px] rounded-full bg-blue-50 sm:h-[390px] sm:w-[390px] lg:h-[460px] lg:w-[460px]"
            />
  
            <div
              class="absolute h-[220px] w-[220px] rounded-full border border-blue-100 sm:h-[320px] sm:w-[320px] lg:h-[380px] lg:w-[380px]"
            />
  
            <!-- Card -->
            <div class="card-scene relative z-10">
  
              <div class="credit-card">
  
                <!-- Shine -->
                <div class="card-shine" />
  
                <div class="relative z-10 flex h-full flex-col justify-between p-6">
  
                  <!-- Top -->
                  <div class="flex items-start justify-between">
  
                    <!-- Chip -->
                    <div
                      class="chip h-10 w-14 rounded-lg border border-yellow-700/30 bg-gradient-to-br from-yellow-100 via-yellow-400 to-yellow-600"
                    >
                      <div class="chip-line line-one" />
                      <div class="chip-line line-two" />
                      <div class="chip-line line-three" />
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
  
                  <!-- Number -->
                  <div>
                    <p
                      class="mb-2 text-[9px] uppercase tracking-[0.25em] text-white/50"
                    >
                      Card number
                    </p>
  
                    <p
                      class="text-lg font-medium tracking-[0.18em] text-white sm:text-xl"
                    >
                      4829&nbsp; 7612&nbsp; 3491&nbsp; 8274
                    </p>
                  </div>
  
                  <!-- Bottom -->
                  <div class="flex items-end justify-between">
  
                    <div>
                      <p
                        class="text-[8px] uppercase tracking-[0.2em] text-white/40"
                      >
                        Cardholder
                      </p>
  
                      <p
                        class="mt-1 text-xs font-medium uppercase tracking-wider text-white/90"
                      >
                        CARD MEMBER
                      </p>
                    </div>
  
                    <div>
                      <p
                        class="text-[8px] uppercase tracking-[0.2em] text-white/40"
                      >
                        Expires
                      </p>
  
                      <p class="mt-1 text-xs text-white/90">
                        12/29
                      </p>
                    </div>
  
                    <!-- Card logo -->
                    <div class="text-right">
                      <div class="flex items-center">
                        <span
                          class="h-6 w-6 rounded-full bg-red-500/80"
                        />
                        <span
                          class="-ml-2 h-6 w-6 rounded-full bg-yellow-400/80"
                        />
                      </div>
                    </div>
  
                  </div>
  
                </div>
              </div>
  
            </div>
  
            <!-- Floating secure badge -->
            <div
              class="floating-badge absolute left-0 top-16 z-20 flex items-center gap-3 rounded-2xl border border-gray-100 bg-white px-4 py-3 shadow-xl shadow-gray-200/50 sm:left-5 lg:left-0"
            >
              <div
                class="flex h-9 w-9 items-center justify-center rounded-xl bg-green-50 text-green-600"
              >
                <svg
                  class="h-5 w-5"
                  viewBox="0 0 24 24"
                  fill="none"
                >
                  <path
                    d="M12 3 5 6v5c0 4.6 2.9 8.7 7 10 4.1-1.3 7-5.4 7-10V6l-7-3Z"
                    stroke="currentColor"
                    stroke-width="1.7"
                  />
                  <path
                    d="m9 12 2 2 4-4"
                    stroke="currentColor"
                    stroke-width="1.7"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                </svg>
              </div>
  
              <div>
                <p class="text-xs font-semibold text-gray-900">
                  Secure
                </p>
                <p class="text-[10px] text-gray-400">
                  Protected activation
                </p>
              </div>
            </div>
  
            <!-- Floating activation badge -->
            <div
              class="floating-badge-delayed absolute bottom-16 right-0 z-20 flex items-center gap-3 rounded-2xl border border-gray-100 bg-white px-4 py-3 shadow-xl shadow-gray-200/50 sm:right-5 lg:right-0"
            >
              <div
                class="flex h-9 w-9 items-center justify-center rounded-xl bg-blue-50 text-blue-600"
              >
                <svg
                  class="h-5 w-5"
                  viewBox="0 0 24 24"
                  fill="none"
                >
                  <path
                    d="M5 12h14M13 6l6 6-6 6"
                    stroke="currentColor"
                    stroke-width="1.8"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                </svg>
              </div>
  
              <div>
                <p class="text-xs font-semibold text-gray-900">
                  Easy activation
                </p>
                <p class="text-[10px] text-gray-400">
                  Just a few simple steps
                </p>
              </div>
            </div>
  
          </div>
  
        </div>
      </div>
    </section>
  </template>
  
  <style scoped>
  .card-scene {
    perspective: 1200px;
  }
  
  .credit-card {
    position: relative;
    width: 330px;
    height: 205px;
    overflow: hidden;
    border-radius: 22px;
    background: linear-gradient(
      135deg,
      #1769ff 0%,
      #1247c9 45%,
      #081f5c 100%
    );
    box-shadow:
      0 35px 70px -20px rgba(18, 71, 201, 0.45);
    transform-style: preserve-3d;
    animation: cardFloat 5s ease-in-out infinite;
  }
  
  @media (min-width: 640px) {
    .credit-card {
      width: 390px;
      height: 245px;
      border-radius: 26px;
    }
  }
  
  @media (max-width: 400px) {
    .credit-card {
      width: 290px;
      height: 180px;
    }
  }
  
  @keyframes cardFloat {
    0%,
    100% {
      transform: rotateY(-8deg) rotateX(3deg) translateY(0);
    }
  
    50% {
      transform: rotateY(8deg) rotateX(-2deg) translateY(-12px);
    }
  }
  
  /* Card shine */
  .card-shine {
    position: absolute;
    top: -100%;
    left: -80%;
    width: 45%;
    height: 300%;
    transform: rotate(25deg);
    background: linear-gradient(
      90deg,
      transparent,
      rgba(255, 255, 255, 0.16),
      transparent
    );
    animation: shine 5s ease-in-out infinite;
  }
  
  @keyframes shine {
    0%,
    25% {
      left: -80%;
    }
  
    60%,
    100% {
      left: 180%;
    }
  }
  
  /* Chip */
  .chip {
    position: relative;
    overflow: hidden;
  }
  
  .chip-line {
    position: absolute;
    background: rgba(120, 80, 0, 0.3);
  }
  
  .line-one {
    left: 0;
    right: 0;
    top: 50%;
    height: 1px;
  }
  
  .line-two {
    left: 50%;
    top: 0;
    bottom: 0;
    width: 1px;
  }
  
  .line-three {
    left: 20%;
    top: 0;
    bottom: 0;
    width: 1px;
  }
  
  /* Floating badges */
  .floating-badge {
    animation: badgeFloat 4s ease-in-out infinite;
  }
  
  .floating-badge-delayed {
    animation: badgeFloat 4s ease-in-out 1.5s infinite;
  }
  
  @keyframes badgeFloat {
    0%,
    100% {
      transform: translateY(0);
    }
  
    50% {
      transform: translateY(-8px);
    }
  }
  </style>