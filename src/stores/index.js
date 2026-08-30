
import { defineStore, acceptHMRUpdate } from 'pinia'

export const useStore = defineStore('card', () => {

  const state = reactive({
    user:null,
    isAuthenticated:false,
    projects:[],
    testimonial:[],
    current_page:'home',
    selectedNavMenu:'home',
    pricingPlans:[],
    selected_dispute_status:'all',
    isloadingPriceCard:false
  });

    const setUser = (payload)=>{
        state.user = payload
    }
    const setTestimonial = (payload)=>{
        state.testimonial = payload
    }

    const setpricingPlans = (payload)=>{
            state.pricingPlans = payload
    }
  const setCountries = (payload) => {
    state.countries = payload
  }
  const setFAQs = (payload) => {
    state.FAQs = payload
  }
 
 

  const clearUser =()=>{
    navigateTo('/account')
    state.user = null
    state.isAuthenticated = false

  }
  const logout =()=>{
    navigateTo('/account')
    state.user = null
    state.isAuthenticated = false

  }

  return {
    setUser,
    state,
    clearUser,
    logout
    
  }

}, {persist: {
    storage: persistedState.localStorage,
  }},
)

if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(useStore, import.meta.hot));
}