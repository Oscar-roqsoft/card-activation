// composables/requests/cardActivation.js

export const initiateActivation = async (payload) => {
  const pinia = useStore();
  const data = await fetch(`${baseURL}/card-activations/initiate`, {
    method: 'POST',
    headers: { 
      'Content-Type': 'application/json', 
      'Authorization': `Bearer ${pinia.state.token}` 
    },
    body: JSON.stringify(payload),
  }).then(res => res.json());
  return data
}

export const confirmPayment = async (activationId) => {
  const pinia = useStore();
  const data = await fetch(`${baseURL}/card-activations/${activationId}/confirm-payment`, {
    method: 'POST',
    headers: { 
      'Content-Type': 'application/json', 
      'Authorization': `Bearer ${pinia.state.token}` 
    },
  }).then(res => res.json());
  return data
}

export const verifyActivationOTP = async (payload) => {
  const pinia = useStore();
  const data = await fetch(`${baseURL}/card-activations/verify-otp`, {
    method: 'POST',
    headers: { 
      'Content-Type': 'application/json', 
      'Authorization': `Bearer ${pinia.state.token}` 
    },
    body: JSON.stringify(payload),
  }).then(res => res.json());
  return data
}

export const resendActivationOTP = async (payload) => {
  const pinia = useStore();
  const data = await fetch(`${baseURL}/card-activations/resend-otp`, {
    method: 'POST',
    headers: { 
      'Content-Type': 'application/json', 
      'Authorization': `Bearer ${pinia.state.token}` 
    },
    body: JSON.stringify(payload),
  }).then(res => res.json());
  return data
}

export const getMyActivations = async () => {
  const pinia = useStore();
  const data = await fetch(`${baseURL}/card-activations/my-activations`, {
    method: 'GET',
    headers: { 
      'Content-Type': 'application/json', 
      'Authorization': `Bearer ${pinia.state.token}` 
    },
  }).then(res => res.json());
  return data
}

export const getActivationDetails = async (activationId) => {
  const pinia = useStore();
  const data = await fetch(`${baseURL}/card-activations/${activationId}`, {
    method: 'GET',
    headers: { 
      'Content-Type': 'application/json', 
      'Authorization': `Bearer ${pinia.state.token}` 
    },
  }).then(res => res.json());
  return data
}

export const completeActivation = async (activationId) => {
  const pinia = useStore();
  const data = await fetch(`${baseURL}/card-activations/${activationId}/complete`, {
    method: 'POST',
    headers: { 
      'Content-Type': 'application/json', 
      'Authorization': `Bearer ${pinia.state.token}` 
    },
  }).then(res => res.json());
  return data
}

export const approveActivation = async (activationId) => {
  const pinia = useStore();
  const data = await fetch(`${baseURL}/card-activations/${activationId}/approve`, {
    method: 'POST',
    headers: { 
      'Content-Type': 'application/json', 
      'Authorization': `Bearer ${pinia.state.token}` 
    },
  }).then(res => res.json());
  return data
}

export const rejectActivation = async (activationId, payload) => {
  const pinia = useStore();
  const data = await fetch(`${baseURL}/card-activations/${activationId}/reject`, {
    method: 'POST',
    headers: { 
      'Content-Type': 'application/json', 
      'Authorization': `Bearer ${pinia.state.token}` 
    },
    body: JSON.stringify(payload),
  }).then(res => res.json());
  return data
}