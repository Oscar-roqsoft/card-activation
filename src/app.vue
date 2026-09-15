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


  const route = useRouter()
  const pinia = useStore()
  const path = ref(route.currentRoute.value.path)

  const showLoader = ref(true)

  
  onMounted(() => {
  const loginTime = Number(localStorage.getItem("tokenExpiresAt"));

  if (!loginTime) return;

  const maxSession = 15 * 60; // 15 minutes

  const isDashboardRoute = path.value.startsWith("/activate");

  if (isDashboardRoute && Date.now() - loginTime >= maxSession) {
    localStorage.removeItem("tokenExpiresAt");
    pinia.logout();
    navigateTo("/login");
  }

 
});
  </script>