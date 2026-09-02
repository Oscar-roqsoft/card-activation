// composables/requests/cardPlans.js

export const getCardPlans = async () => {
  const data = await fetch(`${baseURL}/card-plans`, {
    method: 'GET',
    headers: { 'Content-Type': 'application/json' },
  }).then(res => res.json());
  return data
}


export const getCardPlan = async (planId) => {
  const data = await fetch(`${baseURL}/card-plans/${planId}`, {
    method: 'GET',
    headers: { 'Content-Type': 'application/json' },
  }).then(res => res.json());
  return data
}


export const createCardPlan = async (payload) => {

  const pinia = useStore();

  const data = await fetch(`${baseURL}/card-plans`, {
    method: 'POST',
    headers: { 
      'Content-Type': 'application/json', 
      'Authorization': `Bearer ${pinia.state.token}` 
    },
    body: JSON.stringify(payload),
  }).then(res => res.json());

  return data

}

export const updateCardPlan = async (planId, payload) => {
  const pinia = useStore();
  const data = await fetch(`${baseURL}/card-plans/${planId}`, {
    method: 'PUT',
    headers: { 
      'Content-Type': 'application/json', 
      'Authorization': `Bearer ${pinia.state.token}` 
    },
    body: JSON.stringify(payload),
  }).then(res => res.json());
  return data
}

export const deleteCardPlan = async (planId) => {
  const pinia = useStore();
  const data = await fetch(`${baseURL}/card-plans/${planId}`, {
    method: 'DELETE',
    headers: { 
      'Content-Type': 'application/json', 
      'Authorization': `Bearer ${pinia.state.token}` 
    },
  }).then(res => res.json());
  return data
}