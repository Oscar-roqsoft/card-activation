<template>
    <section class="bg-gray-50 py-20 sm:py-24" id="faq">
      <div class="mx-auto max-w-3xl px-5 sm:px-6 lg:px-8">
  
        <!-- Heading -->
        <div class="text-center">
  
          <div
            class="mb-4 inline-flex items-center rounded-full bg-blue-50 px-3.5 py-2"
          >
            <span
              class="text-xs font-semibold uppercase tracking-wider text-blue-600"
            >
              FAQ
            </span>
          </div>
  
          <h2
            class="text-3xl font-bold tracking-tight text-gray-950 sm:text-4xl"
          >
            Frequently asked questions
          </h2>
  
          <p
            class="mx-auto mt-4 max-w-xl text-sm leading-6 text-gray-500 sm:text-base"
          >
            Everything you need to know about activating your card.
          </p>
  
        </div>
  
        <!-- FAQ -->
        <div class="mt-10 space-y-3">
  
          <div
            v-for="(faq, index) in faqs"
            :key="index"
            class="overflow-hidden rounded-2xl border border-gray-200 bg-white transition-shadow duration-200"
            :class="{
              'shadow-sm': activeIndex === index
            }"
          >
  
            <!-- Question -->
            <button
              type="button"
              class="flex w-full items-center justify-between gap-5 px-5 py-5 text-left sm:px-6"
              @click="toggleFaq(index)"
            >
  
              <span
                class="text-sm font-semibold text-gray-900 sm:text-base"
              >
                {{ faq.question }}
              </span>
  
              <span
                class="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-gray-100 text-gray-500 transition duration-200"
                :class="{
                  'rotate-180 bg-blue-50 text-blue-600':
                    activeIndex === index
                }"
              >
                <svg
                  class="h-4 w-4"
                  viewBox="0 0 24 24"
                  fill="none"
                >
                  <path
                    d="m6 9 6 6 6-6"
                    stroke="currentColor"
                    stroke-width="2"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                </svg>
              </span>
  
            </button>
  
            <!-- Answer -->
            <Transition name="faq">
  
              <div
                v-if="activeIndex === index"
                class="px-5 pb-5 sm:px-6"
              >
                <div class="border-t border-gray-100 pt-4">
  
                  <p
                    class="text-sm leading-6 text-gray-500"
                  >
                    {{ faq.answer }}
                  </p>
  
                </div>
              </div>
  
            </Transition>
  
          </div>
  
        </div>
  
        <!-- Support -->
        <div class="mt-10 text-center">
  
          <p class="text-sm text-gray-500">
            Still have questions?
          </p>
  
          <NuxtLink
            to="/support"
            class="mt-2 inline-flex items-center gap-1.5 text-sm font-semibold text-blue-600 transition hover:text-blue-700"
          >
            Contact support
  
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
  
      </div>
    </section>
  </template>
  
  <script setup>
  import { ref } from 'vue'
  
  const activeIndex = ref(null)
  
  const faqs = [
    {
      question: 'What do I need to activate my card?',
      answer:
        'You will need your card and the required information requested during the activation process. Make sure the details you provide match the information associated with your card.'
    },
    {
      question: 'How long does card activation take?',
      answer:
        'The activation process is designed to be quick. Once your information has been successfully verified, your card can be activated.'
    },
    {
      question: 'Is my information secure?',
      answer:
        'Security is an important part of the activation process. Your information should be handled through secure channels and only used for the required verification and activation steps.'
    },
    {
      question: 'What if my card activation fails?',
      answer:
        'If activation is unsuccessful, carefully review the information you entered and try again. If you continue to experience problems, contact support for assistance.'
    }
  ]
  
  const toggleFaq = (index) => {
    activeIndex.value =
      activeIndex.value === index ? null : index
  }
  </script>
  
  <style scoped>
  .faq-enter-active,
  .faq-leave-active {
    transition:
      opacity 0.2s ease,
      transform 0.2s ease;
  }
  
  .faq-enter-from,
  .faq-leave-to {
    opacity: 0;
    transform: translateY(-5px);
  }
  </style>