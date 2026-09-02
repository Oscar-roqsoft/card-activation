<template>
    <section class="bg-white px-5 py-16 sm:px-6 sm:py-20 lg:px-8">
      <div class="mx-auto max-w-7xl">
  
        <div
          class="relative overflow-hidden rounded-3xl bg-gray-950 px-6 py-12 sm:px-10 sm:py-14 lg:px-16"
        >
  
          <!-- Background glow -->
          <div
            class="pointer-events-none absolute -right-20 -top-32 h-80 w-80 rounded-full bg-blue-600/20 blur-3xl"
          />
  
          <div
            class="pointer-events-none absolute -bottom-32 -left-20 h-72 w-72 rounded-full bg-indigo-600/10 blur-3xl"
          />
  
          <!-- Decorative circles -->
          <div
            class="pointer-events-none absolute right-10 top-10 h-32 w-32 rounded-full border border-white/[0.06]"
          />
  
          <div
            class="pointer-events-none absolute right-20 top-20 h-16 w-16 rounded-full border border-white/[0.05]"
          />
  
          <div
            class="relative z-10 flex flex-col items-center text-center lg:flex-row lg:items-center lg:justify-between lg:text-left"
          >
  
            <!-- Text -->
            <div class="max-w-xl">
  
              <div
                class="mb-4 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3.5 py-2"
              >
                <span
                  class="h-1.5 w-1.5 rounded-full bg-green-400"
                />
  
                <span
                  class="text-xs font-medium text-gray-300"
                >
                  Ready when you are
                </span>
              </div>
  
              <h2
                class="text-3xl font-bold tracking-tight text-white sm:text-4xl"
              >
                Your card is ready.
                <span class="text-blue-400">
                  Let's activate it.
                </span>
              </h2>
  
              <p
                class="mt-4 max-w-lg text-sm leading-6 text-gray-400 sm:text-base"
              >
                Complete your card activation securely and start using
                your card with confidence.
              </p>
  
            </div>
  
            <!-- CTA -->
            <div class="mt-8 shrink-0 lg:ml-12 lg:mt-0">
  
              <NuxtLink
                @click="checkisLoggedIn()"
                class="group inline-flex items-center justify-center gap-3 rounded-xl bg-white px-6 py-3.5 text-sm font-semibold text-gray-950 shadow-xl transition duration-200 hover:-translate-y-0.5 hover:bg-gray-100"
              >
                Activate My Card
  
                <span
                  class="flex h-6 w-6 items-center justify-center rounded-full bg-blue-600 text-white transition-transform duration-200 group-hover:translate-x-1"
                >
                  <svg
                    class="h-3.5 w-3.5"
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
                </span>
              </NuxtLink>
  
              <div
                class="mt-4 flex items-center justify-center gap-2 text-xs text-gray-500 lg:justify-end"
              >
                <svg
                  class="h-3.5 w-3.5 text-green-400"
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
  
                <span>
                  Secure activation
                </span>
              </div>
  
            </div>
  
          </div>
  
        </div>
  
      </div>
    </section>
  </template>