<template>
    <div class="min-h-screen bg-gray-50">
      <AppLoader
        v-if="showLoader"
        @finished="showLoader = false"
      />
  
      <template v-else>
        <AppNavbar />
  
        <main class="min-h-[calc(100vh-80px)] pt-20">
          <ClientOnly>
 
            <SonnerToaster
                position="top-right"
                rich-colors
                close-button
            />
            </ClientOnly>
          <NuxtPage />
        </main>
  
        <AppFooter />
      </template>
    </div>
  </template>
  
  <script setup>
  import { ref } from 'vue'
  
  const showLoader = ref(true)
  </script>