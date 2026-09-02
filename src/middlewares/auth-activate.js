export default defineNuxtRouteMiddleware(() => {
    const auth = useStore()
  
    // User is NOT authenticated
    if (!auth.state.isAuthenticated) {
      return navigateTo('/account')
    }
  })