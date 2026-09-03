// composables/requests/cardActivation.js


// ============================================
// USER REQUESTS (Authenticated)
// ============================================

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

// ============================================
// ADMIN REQUESTS (Requires Admin Role)
// ============================================

// Approve activation (Admin)
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

// Reject activation (Admin)
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

// Get all activations (Admin)
export const getAllActivations = async (params = {}) => {
  const pinia = useStore();
  const { status, page = 1, limit = 20 } = params;
  
  let url = `${baseURL}/card-activations/admin/all?page=${page}&limit=${limit}`;
  if (status) {
    url += `&status=${status}`;
  }

  const data = await fetch(url, {
    method: 'GET',
    headers: { 
      'Content-Type': 'application/json', 
      'Authorization': `Bearer ${pinia.state.token}` 
    },
  }).then(res => res.json());
  return data
}

// Get payment confirmations (Admin)
export const getPaymentConfirmations = async (params = {}) => {
  const pinia = useStore();
  const { confirmed, page = 1, limit = 20 } = params;
  
  let url = `${baseURL}/card-activations/admin/payments?page=${page}&limit=${limit}`;
  if (confirmed !== undefined) {
    url += `&confirmed=${confirmed}`;
  }

  const data = await fetch(url, {
    method: 'GET',
    headers: { 
      'Content-Type': 'application/json', 
      'Authorization': `Bearer ${pinia.state.token}` 
    },
  }).then(res => res.json());
  return data
}

// Get pending approvals (Admin)
export const getPendingApprovals = async (params = {}) => {
  const pinia = useStore();
  const { page = 1, limit = 20 } = params;
  
  const data = await fetch(`${baseURL}/card-activations/admin/pending?page=${page}&limit=${limit}`, {
    method: 'GET',
    headers: { 
      'Content-Type': 'application/json', 
      'Authorization': `Bearer ${pinia.state.token}` 
    },
  }).then(res => res.json());
  return data
}

// Get activation statistics (Admin)
export const getActivationStats = async () => {
  const pinia = useStore();
  const data = await fetch(`${baseURL}/card-activations/admin/stats`, {
    method: 'GET',
    headers: { 
      'Content-Type': 'application/json', 
      'Authorization': `Bearer ${pinia.state.token}` 
    },
  }).then(res => res.json());
  return data
}