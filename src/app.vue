<template>
            <NuxtLayout>

    <div class="min-h-screen bg-gray-50">
      <AppLoader
        v-if="showLoader"
        @finished="showLoader = false"
      />
      <!-- min-h-[calc(100vh-80px)] pt-20 -->
      <template v-else>
        <main class="">
          <ClientOnly>
 
            <SonnerToaster
                position="top-right"
                rich-colors
                close-button
            />
            </ClientOnly>
              <NuxtPage />
            </main>
      </template>
    </div>
  </NuxtLayout>
  </template>
  
  <script setup>
  import { ref } from 'vue'
  import { Toaster } from 'vue-sonner'
  
  const showLoader = ref(true)
  </script>