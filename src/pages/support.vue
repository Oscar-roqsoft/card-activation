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
  
            <div
              class="mb-5 inline-flex items-center gap-2 rounded-full bg-blue-50 px-4 py-2"
            >
              <span class="h-1.5 w-1.5 rounded-full bg-blue-600" />
  
              <span
                class="text-xs font-semibold uppercase tracking-wider text-blue-600"
              >
                Support
              </span>
            </div>
  
            <h1
              class="text-4xl font-bold tracking-tight text-gray-950 sm:text-5xl"
            >
              How can we
              <span class="text-blue-600">
                help?
              </span>
            </h1>
  
            <p
              class="mx-auto mt-5 max-w-2xl text-sm leading-7 text-gray-500 sm:text-base"
            >
              Have a question about your card activation? Find an answer
              below or send us a message and our support team will help.
            </p>
  
          </div>
  
        </div>
      </section>
  
      <!-- Support options -->
      <section class="bg-white py-14 sm:py-20">
        <div class="mx-auto max-w-7xl px-5 sm:px-6 lg:px-8">
  
          <div class="grid gap-5 md:grid-cols-3">
  
            <!-- FAQ -->
            <NuxtLink
              to="/#faq"
              class="group rounded-2xl border border-gray-200 bg-white p-6 transition duration-200 hover:-translate-y-1 hover:border-blue-200 hover:shadow-lg hover:shadow-gray-200/40"
            >
              <div
                class="flex h-11 w-11 items-center justify-center rounded-xl bg-blue-50 text-blue-600"
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
                    d="M9.5 9a2.5 2.5 0 1 1 4.1 1.9c-.9.7-1.6 1.1-1.6 2.1"
                    stroke="currentColor"
                    stroke-width="1.7"
                    stroke-linecap="round"
                  />
  
                  <path
                    d="M12 16.5v.1"
                    stroke="currentColor"
                    stroke-width="2"
                    stroke-linecap="round"
                  />
                </svg>
              </div>
  
              <h2 class="mt-5 text-base font-semibold text-gray-900">
                Frequently asked questions
              </h2>
  
              <p class="mt-2 text-sm leading-6 text-gray-500">
                Find quick answers to common card activation questions.
              </p>
  
              <span
                class="mt-5 inline-flex items-center gap-1.5 text-sm font-semibold text-blue-600"
              >
                View FAQ
  
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
              </span>
            </NuxtLink>
  
            <!-- How it works -->
            <NuxtLink
              to="/howItWorks"
              class="group rounded-2xl border border-gray-200 bg-white p-6 transition duration-200 hover:-translate-y-1 hover:border-blue-200 hover:shadow-lg hover:shadow-gray-200/40"
            >
              <div
                class="flex h-11 w-11 items-center justify-center rounded-xl bg-indigo-50 text-indigo-600"
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
                    d="M9 12h6M12 9v6"
                    stroke="currentColor"
                    stroke-width="1.7"
                    stroke-linecap="round"
                  />
                </svg>
              </div>
  
              <h2 class="mt-5 text-base font-semibold text-gray-900">
                How it works
              </h2>
  
              <p class="mt-2 text-sm leading-6 text-gray-500">
                Learn more about the card activation process step by step.
              </p>
  
              <span
                class="mt-5 inline-flex items-center gap-1.5 text-sm font-semibold text-blue-600"
              >
                Learn more
  
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
              </span>
            </NuxtLink>
  
            <!-- Activation -->
            <NuxtLink
              @click="checkisLoggedIn()"
              class="group rounded-2xl border border-gray-200 bg-white p-6 transition duration-200 hover:-translate-y-1 hover:border-blue-200 hover:shadow-lg hover:shadow-gray-200/40"
            >
              <div
                class="flex h-11 w-11 items-center justify-center rounded-xl bg-green-50 text-green-600"
              >
                <svg
                  class="h-5 w-5"
                  viewBox="0 0 24 24"
                  fill="none"
                >
                  <rect
                    x="3"
                    y="6"
                    width="18"
                    height="12"
                    rx="2"
                    stroke="currentColor"
                    stroke-width="1.7"
                  />
  
                  <path
                    d="M3 10h18M7 14h3"
                    stroke="currentColor"
                    stroke-width="1.7"
                    stroke-linecap="round"
                  />
                </svg>
              </div>
  
              <h2 class="mt-5 text-base font-semibold text-gray-900">
                Activate your card
              </h2>
  
              <p class="mt-2 text-sm leading-6 text-gray-500">
                Ready to activate? Start the activation process here.
              </p>
  
              <span
                class="mt-5 inline-flex items-center gap-1.5 text-sm font-semibold text-blue-600"
              >
                Activate card
  
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
              </span>
            </NuxtLink>
  
          </div>
  
        </div>
      </section>
  
      <!-- Contact section -->
      <section class="bg-gray-50 py-16 sm:py-20">
        <div class="mx-auto max-w-6xl px-5 sm:px-6 lg:px-8">
  
          <div class="grid gap-10 lg:grid-cols-[0.8fr_1.2fr] lg:gap-16">
  
            <!-- Contact information -->
            <div>
  
              <div
                class="mb-4 inline-flex items-center rounded-full bg-blue-50 px-3.5 py-2"
              >
                <span
                  class="text-xs font-semibold uppercase tracking-wider text-blue-600"
                >
                  Contact us
                </span>
              </div>
  
              <h2
                class="text-3xl font-bold tracking-tight text-gray-950 sm:text-4xl"
              >
                We're here to help.
              </h2>
  
              <p
                class="mt-4 text-sm leading-7 text-gray-500 sm:text-base"
              >
                If you couldn't find what you're looking for, send us a
                message. Our support team will review your request.
              </p>
  
              <!-- Contact methods -->
              <div class="mt-8 space-y-5">
  
                <div class="flex gap-4">
  
                  <div
                    class="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-white text-blue-600 shadow-sm"
                  >
                    <svg
                      class="h-5 w-5"
                      viewBox="0 0 24 24"
                      fill="none"
                    >
                      <path
                        d="M4 6h16v12H4z"
                        stroke="currentColor"
                        stroke-width="1.7"
                        stroke-linejoin="round"
                      />
  
                      <path
                        d="m4 7 8 6 8-6"
                        stroke="currentColor"
                        stroke-width="1.7"
                        stroke-linejoin="round"
                      />
                    </svg>
                  </div>
  
                  <div>
                    <p class="text-sm font-semibold text-gray-900">
                      Email support
                    </p>
  
                    <p class="mt-1 text-sm text-gray-500">
                      support@example.com
                    </p>
                  </div>
  
                </div>
  
                <div class="flex gap-4">
  
                  <div
                    class="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-white text-green-600 shadow-sm"
                  >
                    <svg
                      class="h-5 w-5"
                      viewBox="0 0 24 24"
                      fill="none"
                    >
                      <path
                        d="M21 16.5v2a1.5 1.5 0 0 1-1.7 1.5 16.5 16.5 0 0 1-7.2-2.6 16.2 16.2 0 0 1-5-5A16.5 16.5 0 0 1 4.5 10 1.5 1.5 0 0 1 6 8.3h2a1.5 1.5 0 0 1 1.5 1.3c.1.7.3 1.3.5 1.9a1.5 1.5 0 0 1-.3 1.6l-.8.8a12 12 0 0 0 5 5l.8-.8a1.5 1.5 0 0 1 1.6-.3c.6.2 1.2.4 1.9.5a1.5 1.5 0 0 1 1.3 1.5Z"
                        stroke="currentColor"
                        stroke-width="1.5"
                        stroke-linejoin="round"
                      />
                    </svg>
                  </div>
  
                  <div>
                    <p class="text-sm font-semibold text-gray-900">
                      Support hours
                    </p>
  
                    <p class="mt-1 text-sm text-gray-500">
                      Monday – Friday, 9:00 AM – 5:00 PM
                    </p>
                  </div>
  
                </div>
  
              </div>
  
              <!-- Security note -->
              <div
                class="mt-8 flex gap-3 rounded-2xl border border-gray-200 bg-white p-4"
              >
  
                <svg
                  class="mt-0.5 h-5 w-5 shrink-0 text-green-600"
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
  
                <p class="text-xs leading-5 text-gray-500">
                  Never share your full card number, PIN, password, or
                  security code through a support message.
                </p>
  
              </div>
  
            </div>
  
            <!-- Form -->
            <div
              class="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm sm:p-7"
            >
  
              <div class="mb-7">
  
                <h3 class="text-lg font-semibold text-gray-900">
                  Send us a message
                </h3>
  
                <p class="mt-1 text-sm text-gray-500">
                  Tell us how we can help.
                </p>
  
              </div>
  
              <form
                class="space-y-5"
                @submit.prevent="submitForm"
              >
  
                <!-- Name -->
                <div>
  
                  <label
                    for="name"
                    class="mb-2 block text-sm font-medium text-gray-700"
                  >
                    Name
                  </label>
  
                  <input
                    id="name"
                    v-model="form.name"
                    type="text"
                    placeholder="Your name"
                    class="w-full rounded-xl border border-gray-200 bg-white px-4 py-3.5 text-sm text-gray-900 outline-none transition placeholder:text-gray-300 focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10"
                  />
  
                </div>
  
                <!-- Email -->
                <div>
  
                  <label
                    for="email"
                    class="mb-2 block text-sm font-medium text-gray-700"
                  >
                    Email address
                  </label>
  
                  <input
                    id="email"
                    v-model="form.email"
                    type="email"
                    placeholder="you@example.com"
                    class="w-full rounded-xl border border-gray-200 bg-white px-4 py-3.5 text-sm text-gray-900 outline-none transition placeholder:text-gray-300 focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10"
                  />
  
                </div>
  
                <!-- Subject -->
                <div>
  
                  <label
                    for="subject"
                    class="mb-2 block text-sm font-medium text-gray-700"
                  >
                    Subject
                  </label>
  
                  <select
                    id="subject"
                    v-model="form.subject"
                    class="w-full rounded-xl border border-gray-200 bg-white px-4 py-3.5 text-sm text-gray-900 outline-none transition focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10"
                  >
                    <option value="">
                      Select a topic
                    </option>
  
                    <option value="activation">
                      Card activation
                    </option>
  
                    <option value="verification">
                      Verification
                    </option>
  
                    <option value="failed">
                      Activation failed
                    </option>
  
                    <option value="other">
                      Other
                    </option>
                  </select>
  
                </div>
  
                <!-- Message -->
                <div>
  
                  <label
                    for="message"
                    class="mb-2 block text-sm font-medium text-gray-700"
                  >
                    Message
                  </label>
  
                  <textarea
                    id="message"
                    v-model="form.message"
                    rows="5"
                    placeholder="Tell us what you need help with..."
                    class="w-full resize-none rounded-xl border border-gray-200 bg-white px-4 py-3.5 text-sm text-gray-900 outline-none transition placeholder:text-gray-300 focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10"
                  />
  
                </div>
  
                <!-- Submit -->
                <button
                  type="submit"
                  :disabled="loading"
                  class="flex w-full items-center justify-center gap-2 rounded-xl bg-blue-600 px-6 py-3.5 text-sm font-semibold text-white shadow-lg shadow-blue-600/20 transition hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-50"
                >
  
                  <svg
                    v-if="loading"
                    class="h-4 w-4 animate-spin"
                    viewBox="0 0 24 24"
                    fill="none"
                  >
                    <circle
                      cx="12"
                      cy="12"
                      r="9"
                      stroke="currentColor"
                      stroke-width="2"
                      class="opacity-25"
                    />
  
                    <path
                      d="M21 12a9 9 0 0 0-9-9"
                      stroke="currentColor"
                      stroke-width="2"
                      stroke-linecap="round"
                    />
                  </svg>
  
                  <span>
                    {{ loading ? 'Sending...' : 'Send message' }}
                  </span>
  
                </button>
  
              </form>
  
              <!-- Success -->
              <div
                v-if="success"
                class="mt-5 flex gap-3 rounded-xl bg-green-50 p-4"
              >
  
                <svg
                  class="mt-0.5 h-5 w-5 shrink-0 text-green-600"
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
  
                <p class="text-sm text-green-700">
                  Your message has been received. We'll get back to you
                  as soon as possible.
                </p>
  
              </div>
  
            </div>
  
          </div>
  
        </div>
      </section>
  
      <!-- Bottom CTA -->
      <section class="bg-white px-5 py-16 sm:px-6 lg:px-8">
        <div
          class="mx-auto max-w-4xl rounded-3xl bg-gray-950 px-6 py-12 text-center sm:px-10"
        >
  
          <h2
            class="text-2xl font-bold text-white sm:text-3xl"
          >
            Ready to activate your card?
          </h2>
  
          <p
            class="mx-auto mt-3 max-w-lg text-sm leading-6 text-gray-400"
          >
            If everything is ready, you can start the activation
            process now.
          </p>
  
          <NuxtLink
            @click="checkisLoggedIn()"
            class="mt-7 inline-flex items-center gap-2 rounded-xl bg-white px-6 py-3.5 text-sm font-semibold text-gray-950 transition hover:bg-gray-100"
          >
            Activate My Card
  
            <svg
              class="h-4 w-4"
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
      </section>
  
    </div>
  </template>
  
  <script setup>
  import { reactive, ref } from 'vue'
  
  const loading = ref(false)
  const success = ref(false)
  
  const form = reactive({
    name: '',
    email: '',
    subject: '',
    message: ''
  })
  
  const submitForm = async () => {
    if (loading.value) return
  
    success.value = false
    loading.value = true
  
    try {
      // Backend/API will be connected later.
      console.log('Support request:', form)
  
      await new Promise((resolve) => {
        setTimeout(resolve, 1000)
      })
  
      success.value = true
  
      form.name = ''
      form.email = ''
      form.subject = ''
      form.message = ''
    } finally {
      loading.value = false
    }
  }
  </script>