
// import { defineStore } from 'pinia'

// import { createPinia } from 'pinia'
// import  piniaPluginPersistedstate from 'pinia-plugin-persistedstate'





// export const useStore = defineStore('BelugarStore', () => {
//     const state = {
//       selectedNavMenu:'home',
//       pricingPlans:[],


//     }

//     const setpricingPlans = (payload)=>{
//       state.pricingPlans = payload
//     }

//     return { state,setpricingPlans }
//   }, 
//   {persist: {
//     storage: piniaPluginPersistedstate.localStorage,
//   }},
// )


// if (import.meta.hot) {
//   import.meta.hot.accept(acceptHMRUpdate(useStore, import.meta.hot))
// }


import { defineStore } from 'pinia'

export const useStore = defineStore('Agency', () => {

  const state = reactive({
    projects:[],
    testimonial:[],
    current_page:'home',
    selectedNavMenu:'home',
    pricingPlans:[],
    selected_dispute_status:'all',
    isloadingPriceCard:false
  });

    const setProjects = (payload)=>{
        state.projects = payload
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
    state.pricingPlans = []
    state.isloadingPriceCard = false

  }

  return {
    setpricingPlans,
    state,
    clearUser
    
  }

}, {persist: {
    storage: persistedState.localStorage,
  }},
)

if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(useStore, import.meta.hot));
}