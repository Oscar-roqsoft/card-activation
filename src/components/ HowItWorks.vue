<template>
    <section
      id="how-it-works"
      class="bg-white py-20 sm:py-24"
    >
      <div class="mx-auto max-w-7xl px-5 sm:px-6 lg:px-8">
  
        <!-- Section heading -->
        <div class="mx-auto max-w-2xl text-center">
  
          <div
            class="mb-4 inline-flex items-center rounded-full bg-blue-50 px-3.5 py-2"
          >
            <span
              class="text-xs font-semibold uppercase tracking-wider text-blue-600"
            >
              How it works
            </span>
          </div>
  
          <h2
            class="text-3xl font-bold tracking-tight text-gray-950 sm:text-4xl"
          >
            Activate your card in
            <span class="text-blue-600">3 simple steps</span>
          </h2>
  
          <p
            class="mx-auto mt-4 max-w-xl text-sm leading-6 text-gray-500 sm:text-base"
          >
            The activation process is simple, secure, and designed to get
            your card ready to use quickly.
          </p>
  
        </div>
  
        <!-- Steps -->
        <div class="relative mt-14">
  
          <!-- Connecting line - desktop -->
          <div
            class="absolute left-[16.66%] right-[16.66%] top-7 hidden h-px bg-gray-200 lg:block"
          >
            <div
              class="absolute left-0 top-1/2 h-px w-1/2 bg-blue-200"
            />
          </div>
  
          <div
            class="grid gap-10 lg:grid-cols-3 lg:gap-8"
          >
  
            <!-- Step 1 -->
            <div class="relative text-center">
  
              <div class="relative z-10 mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-blue-600 text-white shadow-lg shadow-blue-600/20">
                <svg
                  class="h-6 w-6"
                  viewBox="0 0 24 24"
                  fill="none"
                >
                  <rect
                    x="3"
                    y="5"
                    width="18"
                    height="14"
                    rx="2"
                    stroke="currentColor"
                    stroke-width="1.7"
                  />
  
                  <path
                    d="M3 9h18M7 14h4"
                    stroke="currentColor"
                    stroke-width="1.7"
                    stroke-linecap="round"
                  />
  
                  <circle
                    cx="17"
                    cy="14"
                    r="1.5"
                    fill="currentColor"
                  />
                </svg>
              </div>
  
              <div class="mt-6">
  
                <span
                  class="text-xs font-semibold uppercase tracking-widest text-blue-600"
                >
                  Step 01
                </span>
  
                <h3
                  class="mt-2 text-lg font-semibold text-gray-900"
                >
                  Enter your card details
                </h3>
  
                <p
                  class="mx-auto mt-2 max-w-xs text-sm leading-6 text-gray-500"
                >
                  Enter the required information from your card to begin
                  the activation process.
                </p>
  
              </div>
  
            </div>
  
            <!-- Step 2 -->
            <div class="relative text-center">
  
              <div class="relative z-10 mx-auto flex h-14 w-14 items-center justify-center rounded-2xl border border-blue-100 bg-white text-blue-600 shadow-lg shadow-gray-100">
  
                <svg
                  class="h-6 w-6"
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
                    stroke-width="1.8"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                </svg>
  
              </div>
  
              <div class="mt-6">
  
                <span
                  class="text-xs font-semibold uppercase tracking-widest text-blue-600"
                >
                  Step 02
                </span>
  
                <h3
                  class="mt-2 text-lg font-semibold text-gray-900"
                >
                  Verify your information
                </h3>
  
                <p
                  class="mx-auto mt-2 max-w-xs text-sm leading-6 text-gray-500"
                >
                  Review your information carefully and complete the
                  verification step.
                </p>
  
              </div>
  
            </div>
  
            <!-- Step 3 -->
            <div class="relative text-center">
  
              <div class="relative z-10 mx-auto flex h-14 w-14 items-center justify-center rounded-2xl border border-blue-100 bg-white text-blue-600 shadow-lg shadow-gray-100">
  
                <svg
                  class="h-6 w-6"
                  viewBox="0 0 24 24"
                  fill="none"
                >
                  <path
                    d="m5 12 4 4L19 6"
                    stroke="currentColor"
                    stroke-width="2"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                </svg>
  
              </div>
  
              <div class="mt-6">
  
                <span
                  class="text-xs font-semibold uppercase tracking-widest text-blue-600"
                >
                  Step 03
                </span>
  
                <h3
                  class="mt-2 text-lg font-semibold text-gray-900"
                >
                  Activate your card
                </h3>
  
                <p
                  class="mx-auto mt-2 max-w-xs text-sm leading-6 text-gray-500"
                >
                  Complete the activation and your card will be ready
                  to use.
                </p>
  
              </div>
  
            </div>
  
          </div>
  
        </div>
  
        <!-- Bottom CTA -->
        <div class="mt-14 text-center">
  
          <NuxtLink
            to="/activate"
            class="group inline-flex items-center gap-2 rounded-xl bg-gray-950 px-6 py-3.5 text-sm font-semibold text-white transition hover:bg-gray-800"
          >
            Start Card Activation
  
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
  
        </div>
  
      </div>
    </section>
  </template>