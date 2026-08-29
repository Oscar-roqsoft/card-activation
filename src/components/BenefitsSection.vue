<template>
    <section class="bg-gray-50 py-20 sm:py-24">
      <div class="mx-auto max-w-7xl px-5 sm:px-6 lg:px-8">
  
        <div class="grid items-center gap-12 lg:grid-cols-2 lg:gap-20">
  
          <!-- Left content -->
          <div class="max-w-xl">
  
            <div
              class="mb-4 inline-flex items-center rounded-full bg-blue-50 px-3.5 py-2"
            >
              <span
                class="text-xs font-semibold uppercase tracking-wider text-blue-600"
              >
                Why activate online?
              </span>
            </div>
  
            <h2
              class="text-3xl font-bold tracking-tight text-gray-950 sm:text-4xl"
            >
              A simple way to get your card
              <span class="text-blue-600">ready to use.</span>
            </h2>
  
            <p
              class="mt-5 text-sm leading-7 text-gray-500 sm:text-base"
            >
              Complete your card activation from wherever you are without
              unnecessary steps or complicated processes.
            </p>
  
            <!-- Benefits -->
            <div class="mt-8 space-y-5">
  
              <!-- Benefit 1 -->
              <div class="flex gap-4">
  
                <div
                  class="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-white text-blue-600 shadow-sm ring-1 ring-gray-100"
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
                  <h3 class="text-sm font-semibold text-gray-900">
                    Secure activation
                  </h3>
  
                  <p class="mt-1 text-sm leading-6 text-gray-500">
                    Your activation details are handled through a secure
                    verification process.
                  </p>
                </div>
  
              </div>
  
              <!-- Benefit 2 -->
              <div class="flex gap-4">
  
                <div
                  class="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-white text-blue-600 shadow-sm ring-1 ring-gray-100"
                >
                  <svg
                    class="h-5 w-5"
                    viewBox="0 0 24 24"
                    fill="none"
                  >
                    <path
                      d="M13 2 4 14h7l-1 8 9-12h-7l1-8Z"
                      stroke="currentColor"
                      stroke-width="1.7"
                      stroke-linejoin="round"
                    />
                  </svg>
                </div>
  
                <div>
                  <h3 class="text-sm font-semibold text-gray-900">
                    Fast and convenient
                  </h3>
  
                  <p class="mt-1 text-sm leading-6 text-gray-500">
                    Activate your card quickly without having to visit a
                    physical location.
                  </p>
                </div>
  
              </div>
  
              <!-- Benefit 3 -->
              <div class="flex gap-4">
  
                <div
                  class="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-white text-blue-600 shadow-sm ring-1 ring-gray-100"
                >
                  <svg
                    class="h-5 w-5"
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
                </div>
  
                <div>
                  <h3 class="text-sm font-semibold text-gray-900">
                    Available when you need it
                  </h3>
  
                  <p class="mt-1 text-sm leading-6 text-gray-500">
                    Start the activation process from your phone, tablet,
                    or computer.
                  </p>
                </div>
  
              </div>
  
            </div>
  
          </div>
  
          <!-- Right visual -->
          <div class="relative">
  
            <!-- Background -->
            <div
              class="absolute inset-0 rounded-[2rem] bg-blue-100/60 blur-2xl"
            />
  
            <div
              class="relative overflow-hidden rounded-[2rem] border border-gray-200 bg-white p-6 shadow-xl shadow-gray-200/50 sm:p-8"
            >
  
              <!-- Top -->
              <div class="flex items-center justify-between">
  
                <div>
                  <p
                    class="text-xs font-semibold uppercase tracking-wider text-gray-400"
                  >
                    Activation status
                  </p>
  
                  <p class="mt-1 text-lg font-bold text-gray-900">
                    Almost there
                  </p>
                </div>
  
                <div
                  class="flex h-10 w-10 items-center justify-center rounded-full bg-blue-50 text-blue-600"
                >
                  <svg
                    class="h-5 w-5"
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
  
              </div>
  
              <!-- Progress -->
              <div class="mt-8">
  
                <div class="mb-3 flex items-center justify-between">
  
                  <span class="text-xs font-medium text-gray-500">
                    Activation progress
                  </span>
  
                  <span class="text-xs font-semibold text-blue-600">
                    66%
                  </span>
  
                </div>
  
                <div class="h-2 overflow-hidden rounded-full bg-gray-100">
                  <div
                    class="h-full w-2/3 rounded-full bg-blue-600"
                  />
                </div>
  
              </div>
  
              <!-- Steps -->
              <div class="mt-8 space-y-4">
  
                <!-- Completed -->
                <div class="flex items-center gap-3">
  
                  <div
                    class="flex h-8 w-8 items-center justify-center rounded-full bg-green-50 text-green-600"
                  >
                    <svg
                      class="h-4 w-4"
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
  
                  <div class="flex-1">
                    <p class="text-sm font-medium text-gray-900">
                      Card details
                    </p>
                    <p class="text-xs text-gray-400">
                      Information received
                    </p>
                  </div>
  
                  <span class="text-xs font-medium text-green-600">
                    Done
                  </span>
  
                </div>
  
                <!-- Current -->
                <div class="flex items-center gap-3">
  
                  <div
                    class="flex h-8 w-8 items-center justify-center rounded-full bg-blue-600 text-white"
                  >
                    <span class="text-xs font-bold">
                      2
                    </span>
                  </div>
  
                  <div class="flex-1">
                    <p class="text-sm font-medium text-gray-900">
                      Verification
                    </p>
                    <p class="text-xs text-gray-400">
                      Confirm your information
                    </p>
                  </div>
  
                  <span class="text-xs font-medium text-blue-600">
                    In progress
                  </span>
  
                </div>
  
                <!-- Pending -->
                <div class="flex items-center gap-3">
  
                  <div
                    class="flex h-8 w-8 items-center justify-center rounded-full bg-gray-100 text-gray-400"
                  >
                    <span class="text-xs font-bold">
                      3
                    </span>
                  </div>
  
                  <div class="flex-1">
                    <p class="text-sm font-medium text-gray-400">
                      Activation
                    </p>
                    <p class="text-xs text-gray-300">
                      Complete activation
                    </p>
                  </div>
  
                  <span class="text-xs font-medium text-gray-400">
                    Pending
                  </span>
  
                </div>
  
              </div>
  
              <!-- Bottom security -->
              <div
                class="mt-8 flex items-center gap-3 rounded-xl bg-gray-50 px-4 py-3"
              >
  
                <svg
                  class="h-4 w-4 shrink-0 text-green-500"
                  viewBox="0 0 24 24"
                  fill="none"
                >
                  <path
                    d="M12 3 5 6v5c0 4.6 2.9 8.7 7 10 4.1-1.3 7-5.4 7-10V6l-7-3Z"
                    stroke="currentColor"
                    stroke-width="1.7"
                  />
                </svg>
  
                <p class="text-xs leading-5 text-gray-500">
                  Your activation process is protected with secure
                  verification.
                </p>
  
              </div>
  
            </div>
  
          </div>
  
        </div>
  
      </div>
    </section>
  </template>