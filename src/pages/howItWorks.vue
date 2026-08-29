<template>
    <div class="min-h-screen bg-white">
  
      <!-- Hero -->
      <section class="relative overflow-hidden bg-gray-50">
        <div
          class="pointer-events-none absolute -right-40 -top-40 h-96 w-96 rounded-full bg-blue-100/60 blur-3xl"
        />
  
        <div
          class="pointer-events-none absolute -left-40 bottom-0 h-80 w-80 rounded-full bg-indigo-100/40 blur-3xl"
        />
  
        <div
          class="relative mx-auto max-w-7xl px-5 py-16 sm:px-6 sm:py-20 lg:px-8 lg:py-24"
        >
  
          <div class="mx-auto max-w-3xl text-center">
  
            <!-- Badge -->
            <div
              class="mb-5 inline-flex items-center rounded-full bg-blue-50 px-4 py-2"
            >
              <span
                class="text-xs font-semibold uppercase tracking-wider text-blue-600"
              >
                How it works
              </span>
            </div>
  
            <!-- Heading -->
            <h1
              class="text-4xl font-bold tracking-tight text-gray-950 sm:text-5xl lg:text-6xl"
            >
              Activate your card
              <span class="text-blue-600">
                in a few simple steps.
              </span>
            </h1>
  
            <p
              class="mx-auto mt-6 max-w-2xl text-base leading-7 text-gray-500 sm:text-lg"
            >
              Our card activation process is designed to be simple,
              straightforward, and easy to complete from your phone or
              computer.
            </p>
  
            <!-- CTA -->
            <div class="mt-8">
              <NuxtLink
                to="/activate"
                class="group inline-flex items-center gap-2 rounded-xl bg-blue-600 px-6 py-3.5 text-sm font-semibold text-white shadow-lg shadow-blue-600/20 transition hover:-translate-y-0.5 hover:bg-blue-700"
              >
                Activate My Card
  
                <svg
                  class="h-4 w-4 transition-transform group-hover:translate-x-1"
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
  
        </div>
      </section>
  
      <!-- Steps -->
      <section class="bg-white py-20 sm:py-24">
        <div class="mx-auto max-w-7xl px-5 sm:px-6 lg:px-8">
  
          <div class="mx-auto max-w-2xl text-center">
  
            <p
              class="text-xs font-semibold uppercase tracking-widest text-blue-600"
            >
              The process
            </p>
  
            <h2
              class="mt-3 text-3xl font-bold tracking-tight text-gray-950 sm:text-4xl"
            >
              Three steps to get started
            </h2>
  
            <p
              class="mt-4 text-sm leading-6 text-gray-500 sm:text-base"
            >
              Follow the steps below to complete your card activation.
            </p>
  
          </div>
  
          <div class="relative mt-14">
  
            <!-- Desktop connector -->
            <div
              class="absolute left-[16.66%] right-[16.66%] top-8 hidden h-px bg-gray-200 lg:block"
            />
  
            <div class="grid gap-10 lg:grid-cols-3 lg:gap-8">
  
              <!-- Step 1 -->
              <div class="relative text-center">
  
                <div
                  class="relative z-10 mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-blue-600 text-white shadow-xl shadow-blue-600/20"
                >
                  <span class="text-lg font-bold">
                    01
                  </span>
                </div>
  
                <div class="mt-6">
  
                  <h3 class="text-xl font-semibold text-gray-900">
                    Enter your details
                  </h3>
  
                  <p
                    class="mx-auto mt-3 max-w-sm text-sm leading-6 text-gray-500"
                  >
                    Start by entering the information requested on the
                    activation form.
                  </p>
  
                </div>
  
              </div>
  
              <!-- Step 2 -->
              <div class="relative text-center">
  
                <div
                  class="relative z-10 mx-auto flex h-16 w-16 items-center justify-center rounded-2xl border border-blue-100 bg-white text-blue-600 shadow-lg"
                >
                  <span class="text-lg font-bold">
                    02
                  </span>
                </div>
  
                <div class="mt-6">
  
                  <h3 class="text-xl font-semibold text-gray-900">
                    Verify your information
                  </h3>
  
                  <p
                    class="mx-auto mt-3 max-w-sm text-sm leading-6 text-gray-500"
                  >
                    Complete the required verification step to confirm
                    your information.
                  </p>
  
                </div>
  
              </div>
  
              <!-- Step 3 -->
              <div class="relative text-center">
  
                <div
                  class="relative z-10 mx-auto flex h-16 w-16 items-center justify-center rounded-2xl border border-blue-100 bg-white text-blue-600 shadow-lg"
                >
                  <span class="text-lg font-bold">
                    03
                  </span>
                </div>
  
                <div class="mt-6">
  
                  <h3 class="text-xl font-semibold text-gray-900">
                    Card activated
                  </h3>
  
                  <p
                    class="mx-auto mt-3 max-w-sm text-sm leading-6 text-gray-500"
                  >
                    Once verification is complete, your card activation
                    can be finalized.
                  </p>
  
                </div>
  
              </div>
  
            </div>
  
          </div>
  
        </div>
      </section>
  
      <!-- Detailed section -->
      <section class="bg-gray-50 py-20 sm:py-24">
        <div class="mx-auto max-w-7xl px-5 sm:px-6 lg:px-8">
  
          <div class="grid items-center gap-12 lg:grid-cols-2 lg:gap-20">
  
            <!-- Visual -->
            <div class="order-2 lg:order-1">
  
              <div
                class="relative overflow-hidden rounded-3xl border border-gray-200 bg-white p-6 shadow-xl shadow-gray-200/50 sm:p-8"
              >
  
                <!-- Fake activation interface -->
                <div
                  class="rounded-2xl border border-gray-100 bg-gray-50 p-5"
                >
  
                  <div class="flex items-center justify-between">
  
                    <div>
                      <p class="text-xs text-gray-400">
                        Activation
                      </p>
  
                      <p class="mt-1 text-sm font-semibold text-gray-900">
                        Card activation
                      </p>
                    </div>
  
                    <div
                      class="flex h-9 w-9 items-center justify-center rounded-full bg-green-50 text-green-600"
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
  
                  </div>
  
                  <!-- Progress -->
                  <div class="mt-7">
  
                    <div class="mb-2 flex justify-between">
  
                      <span class="text-xs text-gray-400">
                        Progress
                      </span>
  
                      <span class="text-xs font-semibold text-blue-600">
                        100%
                      </span>
  
                    </div>
  
                    <div class="h-2 rounded-full bg-gray-200">
                      <div
                        class="h-full w-full rounded-full bg-blue-600"
                      />
                    </div>
  
                  </div>
  
                  <!-- Completed items -->
                  <div class="mt-7 space-y-3">
  
                    <div
                      class="flex items-center gap-3 rounded-xl bg-white p-3"
                    >
  
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
  
                      <div>
                        <p class="text-xs font-semibold text-gray-900">
                          Card details
                        </p>
  
                        <p class="text-[11px] text-gray-400">
                          Completed
                        </p>
                      </div>
  
                    </div>
  
                    <div
                      class="flex items-center gap-3 rounded-xl bg-white p-3"
                    >
  
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
  
                      <div>
                        <p class="text-xs font-semibold text-gray-900">
                          Verification
                        </p>
  
                        <p class="text-[11px] text-gray-400">
                          Completed
                        </p>
                      </div>
  
                    </div>
  
                    <div
                      class="flex items-center gap-3 rounded-xl bg-blue-50 p-3"
                    >
  
                      <div
                        class="flex h-8 w-8 items-center justify-center rounded-full bg-blue-600 text-white"
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
  
                      <div>
                        <p class="text-xs font-semibold text-blue-900">
                          Activation
                        </p>
  
                        <p class="text-[11px] text-blue-500">
                          Ready
                        </p>
                      </div>
  
                    </div>
  
                  </div>
  
                </div>
  
              </div>
  
            </div>
  
            <!-- Content -->
            <div class="order-1 lg:order-2">
  
              <div
                class="mb-4 inline-flex items-center rounded-full bg-blue-50 px-3.5 py-2"
              >
                <span
                  class="text-xs font-semibold uppercase tracking-wider text-blue-600"
                >
                  Simple & straightforward
                </span>
              </div>
  
              <h2
                class="text-3xl font-bold tracking-tight text-gray-950 sm:text-4xl"
              >
                Everything you need,
                <span class="text-blue-600">
                  right in one place.
                </span>
              </h2>
  
              <p
                class="mt-5 text-sm leading-7 text-gray-500 sm:text-base"
              >
                We've designed the activation experience to remove
                unnecessary complexity. Just follow the instructions,
                verify your information, and complete the process.
              </p>
  
              <!-- Points -->
              <div class="mt-8 space-y-5">
  
                <div class="flex gap-4">
  
                  <div
                    class="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-green-50 text-green-600"
                  >
                    <svg
                      class="h-3.5 w-3.5"
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
  
                  <div>
                    <h3 class="text-sm font-semibold text-gray-900">
                      Clear instructions
                    </h3>
  
                    <p class="mt-1 text-sm leading-6 text-gray-500">
                      Each step tells you exactly what information is
                      required.
                    </p>
                  </div>
  
                </div>
  
                <div class="flex gap-4">
  
                  <div
                    class="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-green-50 text-green-600"
                  >
                    <svg
                      class="h-3.5 w-3.5"
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
  
                  <div>
                    <h3 class="text-sm font-semibold text-gray-900">
                      Secure verification
                    </h3>
  
                    <p class="mt-1 text-sm leading-6 text-gray-500">
                      Verification helps confirm your information before
                      activation is completed.
                    </p>
                  </div>
  
                </div>
  
                <div class="flex gap-4">
  
                  <div
                    class="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-green-50 text-green-600"
                  >
                    <svg
                      class="h-3.5 w-3.5"
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
  
                  <div>
                    <h3 class="text-sm font-semibold text-gray-900">
                      Convenient access
                    </h3>
  
                    <p class="mt-1 text-sm leading-6 text-gray-500">
                      Complete the process from your phone, tablet, or
                      computer.
                    </p>
                  </div>
  
                </div>
  
              </div>
  
            </div>
  
          </div>
  
        </div>
      </section>
  
      <!-- Security -->
      <section class="bg-white py-20 sm:py-24">
        <div class="mx-auto max-w-4xl px-5 text-center sm:px-6 lg:px-8">
  
          <div
            class="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-green-50 text-green-600"
          >
            <svg
              class="h-7 w-7"
              viewBox="0 0 24 24"
              fill="none"
            >
              <path
                d="M12 3 5 6v5c0 4.6 2.9 8.7 7 10 4.1-1.3 7-5.4 7-10V6l-7-3Z"
                stroke="currentColor"
                stroke-width="1.7"
                stroke-linejoin="round"
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
  
          <h2
            class="mt-6 text-2xl font-bold tracking-tight text-gray-950 sm:text-3xl"
          >
            Designed with security in mind
          </h2>
  
          <p
            class="mx-auto mt-4 max-w-2xl text-sm leading-6 text-gray-500 sm:text-base"
          >
            Your activation journey includes verification steps designed
            to help protect your card and account information.
          </p>
  
          <div
            class="mt-8 flex flex-wrap justify-center gap-3"
          >
  
            <div
              class="rounded-full border border-gray-200 bg-gray-50 px-4 py-2 text-xs font-medium text-gray-600"
            >
              Secure verification
            </div>
  
            <div
              class="rounded-full border border-gray-200 bg-gray-50 px-4 py-2 text-xs font-medium text-gray-600"
            >
              Protected connection
            </div>
  
            <div
              class="rounded-full border border-gray-200 bg-gray-50 px-4 py-2 text-xs font-medium text-gray-600"
            >
              Simple activation
            </div>
  
          </div>
  
        </div>
      </section>
  
      <!-- CTA -->
      <section class="bg-gray-50 px-5 py-16 sm:px-6 sm:py-20 lg:px-8">
        <div class="mx-auto max-w-4xl text-center">
  
          <h2
            class="text-3xl font-bold tracking-tight text-gray-950 sm:text-4xl"
          >
            Ready to activate your card?
          </h2>
  
          <p
            class="mx-auto mt-4 max-w-xl text-sm leading-6 text-gray-500 sm:text-base"
          >
            Start the activation process now and follow the simple steps
            to get your card ready.
          </p>
  
          <div class="mt-7">
  
            <NuxtLink
              to="/activate"
              class="group inline-flex items-center gap-2 rounded-xl bg-blue-600 px-6 py-3.5 text-sm font-semibold text-white shadow-lg shadow-blue-600/20 transition hover:-translate-y-0.5 hover:bg-blue-700"
            >
              Activate My Card
  
              <svg
                class="h-4 w-4 transition-transform group-hover:translate-x-1"
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
  
    </div>
  </template>