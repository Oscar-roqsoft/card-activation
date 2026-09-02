// composables/actions/cardPlanActions.js
import { useStore } from '@/stores'
import {
  getCardPlans as getCardPlansRequest,
  getCardPlan as getCardPlanRequest,
  createCardPlan as createCardPlanRequest,
  updateCardPlan as updateCardPlanRequest,
  deleteCardPlan as deleteCardPlanRequest
} from '@/composables/requests/cardPlans'

export const useCardPlanActions = () => {
  const store = useStore()

  // Get all card plans
  const getCardPlans = async () => {
    store.setLoading(true)
    store.clearError()
    
    try {
      const response = await getCardPlansRequest()
      
      if (response.success) {
        store.setCardPlans(response.data.plans)
        return response
      } else {
        store.setError(response)
        return response
      }
    } catch (error) {
      store.setError(error)
      return { success: false, error: 'Network error. Please try again.' }
    } finally {
      store.setLoading(false)
    }
  }

  // Get single card plan
  const getCardPlan = async (planId) => {
    store.setLoading(true)
    store.clearError()
    
    try {
      const response = await getCardPlanRequest(planId)
      
      if (response.success) {
        return response
      } else {
        store.setError(response)
        return response
      }
    } catch (error) {
      store.setError(error)
      return { success: false, error: 'Network error. Please try again.' }
    } finally {
      store.setLoading(false)
    }
  }

  // Create card plan (admin)
  const createCardPlan = async (payload) => {
    store.setLoading(true)
    store.clearError()
    store.setLoadingCardPrice(true)

    
    try {
      const response = await createCardPlanRequest(payload)
      
      console.log('payload',response)
      if (response.success) {
        store.addNotification({
          type: 'success',
          message: response.message || 'Card plan created successfully!'
        })
        // Refresh plans
        await getCardPlans()
        return response
      } else {
        store.setError(response)
        store.addNotification({
          type: 'error',
          message: response.error || 'Failed to create card plan'
        })
        return response
      }
    } catch (error) {
      store.setError(error)
      store.addNotification({
        type: 'error',
        message: 'Network error. Please try again.'
      })
      return { success: false, error: 'Network error. Please try again.' }
    } finally {
      store.setLoading(false)
      store.setLoadingCardPrice(false)
    }
  }

  // Update card plan (admin)
  const updateCardPlan = async (planId, payload) => {
    store.setLoading(true)
    store.clearError()
    
    try {
      const response = await updateCardPlanRequest(planId, payload)
      
      if (response.success) {
        store.addNotification({
          type: 'success',
          message: response.message || 'Card plan updated successfully!'
        })
        // Refresh plans
        await getCardPlans()
        return response
      } else {
        store.setError(response)
        store.addNotification({
          type: 'error',
          message: response.error || 'Failed to update card plan'
        })
        return response
      }
    } catch (error) {
      store.setError(error)
      store.addNotification({
        type: 'error',
        message: 'Network error. Please try again.'
      })
      return { success: false, error: 'Network error. Please try again.' }
    } finally {
      store.setLoading(false)
    }
  }

  // Delete card plan (admin)
  const deleteCardPlan = async (planId) => {
    store.setLoading(true)
    store.clearError()
    
    try {
      const response = await deleteCardPlanRequest(planId)
      
      if (response.success) {
        store.addNotification({
          type: 'success',
          message: response.message || 'Card plan deleted successfully!'
        })
        // Refresh plans
        await getCardPlans()
        return response
      } else {
        store.setError(response)
        store.addNotification({
          type: 'error',
          message: response.error || 'Failed to delete card plan'
        })
        return response
      }
    } catch (error) {
      store.setError(error)
      store.addNotification({
        type: 'error',
        message: 'Network error. Please try again.'
      })
      return { success: false, error: 'Network error. Please try again.' }
    } finally {
      store.setLoading(false)
    }
  }

  // Select a plan
  const selectPlan = (planId) => {
    store.selectPlan(planId)
  }

  // Get selected plan
  const getSelectedPlan = () => {
    return store.getSelectedPlan
  }

  return {
    getCardPlans,
    getCardPlan,
    createCardPlan,
    updateCardPlan,
    deleteCardPlan,
    selectPlan,
    getSelectedPlan
  }
}