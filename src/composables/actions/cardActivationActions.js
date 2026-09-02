// composables/actions/cardActivationActions.js
import { useStore } from '@/stores'
import {
  initiateActivation as initiateActivationRequest,
  confirmPayment as confirmPaymentRequest,
  verifyActivationOTP as verifyActivationOTPRequest,
  resendActivationOTP as resendActivationOTPRequest,
  getMyActivations as getMyActivationsRequest,
  getActivationDetails as getActivationDetailsRequest,
  completeActivation as completeActivationRequest,
  approveActivation as approveActivationRequest,
  rejectActivation as rejectActivationRequest
} from '@/composables/requests/cardActivation'

export const useCardActivationActions = () => {
  const store = useStore()
  const router = useRouter()

  // Initiate activation
  const initiateActivation = async (payload) => {
    store.setLoading(true)
    store.clearError()
    
    try {
      const response = await initiateActivationRequest(payload)
      
      if (response.success) {
        store.setCurrentActivation(response.data.activation)
        store.addActivation(response.data.activation)
        // store.addNotification({
        //   type: 'success',
        //   message: response.message || 'Card activation initiated! Check your email for OTP.'
        // })
        // Move to payment step
        // store.setCurrentStep(2)
        return response
      } else {
        store.setError(response)
        // store.addNotification({
        //   type: 'error',
        //   message: response.error || 'Failed to initiate activation'
        // })
        return response
      }
    } catch (error) {
      store.setError(error)
      // store.addNotification({
      //   type: 'error',
      //   message: 'Network error. Please try again.'
      // })
      return { success: false, error: 'Network error. Please try again.' }
    } finally {
      store.setLoading(false)
    }
  }

  // Confirm payment
  const confirmPayment = async (activationId) => {
    store.setLoading(true)
    store.clearError()
    
    try {
      const response = await confirmPaymentRequest(activationId)
      
      if (response.success) {
        store.updateActivation(activationId, { status: 'payment_confirmed' })
       
        // Move to OTP step
        return response
      } else {
        store.setError(response)
        
        return response
      }
    } catch (error) {
      store.setError(error)
      // store.addNotification({
      //   type: 'error',
      //   message: 'Network error. Please try again.'
      // })
      return { success: false, error: 'Network error. Please try again.' }
    } finally {
      store.setLoading(false)
    }
  }

  // Verify OTP for activation
  const verifyOTP = async (payload) => {
    store.setLoading(true)
    store.clearError()
    
    try {
      const response = await verifyActivationOTPRequest(payload)
      
      if (response.success) {
        store.updateActivation(payload.activationId, { status: 'otp_verified' })
        // store.addNotification({
        //   type: 'success',
        //   message: response.message || 'OTP verified successfully!'
        // })
        // Move to approval step
        return response
      } else {
        store.setError(response)
        // store.addNotification({
        //   type: 'error',
        //   message: response.error || 'OTP verification failed'
        // })
        return response
      }
    } catch (error) {
      store.setError(error)
      // store.addNotification({
      //   type: 'error',
      //   message: 'Network error. Please try again.'
      // })
      return { success: false, error: 'Network error. Please try again.' }
    } finally {
      store.setLoading(false)
    }
  }

  // Resend OTP for activation
  const resendOTP = async (payload) => {
    store.setLoading(true)
    store.clearError()
    
    try {
      const response = await resendActivationOTPRequest(payload)
      
      if (response.success) {
        store.addNotification({
          type: 'success',
          message: response.message || 'OTP resent successfully!'
        })
        return response
      } else {
        store.setError(response)
        store.addNotification({
          type: 'error',
          message: response.error || 'Failed to resend OTP'
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

  // Get user's activations
  const getMyActivations = async () => {
    store.setLoading(true)
    store.clearError()
    
    try {
      const response = await getMyActivationsRequest()
      
      if (response.success) {
        store.setActivations(response.data.activations)
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

  // Get activation details
  const getActivationDetails = async (activationId) => {
    store.setLoading(true)
    store.clearError()
    
    try {
      const response = await getActivationDetailsRequest(activationId)
      
      if (response.success) {
        store.setCurrentActivation(response.data.activation)
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

  // Complete activation
  const completeActivation = async (activationId) => {
    store.setLoading(true)
    store.clearError()
    
    try {
      const response = await completeActivationRequest(activationId)
      
      if (response.success) {
        store.updateActivation(activationId, { status: 'completed' })
        store.addNotification({
          type: 'success',
          message: response.message || 'Card activated successfully! 🎉'
        })
        router.push('/dashboard')
        return response
      } else {
        store.setError(response)
        store.addNotification({
          type: 'error',
          message: response.error || 'Failed to complete activation'
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

  // Admin: Approve activation
  const approveActivation = async (activationId) => {
    store.setLoading(true)
    store.clearError()
    
    try {
      const response = await approveActivationRequest(activationId)
      
      if (response.success) {
        store.updateActivation(activationId, { status: 'approved' })
        store.addNotification({
          type: 'success',
          message: response.message || 'Activation approved!'
        })
        return response
      } else {
        store.setError(response)
        store.addNotification({
          type: 'error',
          message: response.error || 'Failed to approve activation'
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

  // Admin: Reject activation
  const rejectActivation = async (activationId, payload) => {
    store.setLoading(true)
    store.clearError()
    
    try {
      const response = await rejectActivationRequest(activationId, payload)
      
      if (response.success) {
        store.updateActivation(activationId, { status: 'rejected' })
        store.addNotification({
          type: 'warning',
          message: response.message || 'Activation rejected'
        })
        return response
      } else {
        store.setError(response)
        store.addNotification({
          type: 'error',
          message: response.error || 'Failed to reject activation'
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

  return {
    initiateActivation,
    confirmPayment,
    verifyOTP,
    resendOTP,
    getMyActivations,
    getActivationDetails,
    completeActivation,
    approveActivation,
    rejectActivation
  }
}