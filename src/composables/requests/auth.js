
export const signUp = async(payload)=>{
    const data = await fetch(`${baseURL}/register`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
    }).then(res => res.json());
    return data
}

export const signIn = async(payload)=>{
    const data = await fetch(`${baseURL}/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
    }).then(res => res.json());
    return data
}

export const sendCode = async(payload)=>{
    const data = await fetch(`${baseURL}/resend-otp`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
    }).then(res => res.json());
    return data
}

export const resendOTP = async(payload)=>{
    const data = await fetch(`${baseURL}/resend-otp`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
    }).then(res => res.json());
    return data
}

export const verifyOTP = async(payload)=>{
    const data = await fetch(`${baseURL}/verify-otp`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
    }).then(res => res.json());
    return data
}

export const updatePassword = async(payload)=>{
    const data = await fetch(`${baseURL}/resetPassword`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
    }).then(res => res.json());
    return data
}

export const forgotPassword = async(payload)=>{
    const pinia = useStore();
    const data = await fetch(`${baseURL}/forgot-password`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${pinia.user?.token}` },
        body: JSON.stringify(payload),
    }).then(res => res.json());
    return data
}
export const resetPassword = async(payload)=>{
    const pinia = useStore();
    const data = await fetch(`${baseURL}/reset-password`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${pinia.user?.token}` },
        body: JSON.stringify(payload),
    }).then(res => res.json());
    return data
}

export const changePassword = async(payload)=>{
    const pinia = useStore();
    const data = await fetch(`${baseURL}/changePassword`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${pinia.user?.token}` },
        body: JSON.stringify(payload),
    }).then(res => res.json());
    return data
}



export const checkToken = async () => {
    const pinia = useStore();
  
    const url = `${baseURL}/check-token`;
  
    const options = {
      method: "GET",
      headers: {
        Authorization: `Bearer ${pinia.state.token}`
      }
    };
  
    return await asyncRequest(url, options);
  };