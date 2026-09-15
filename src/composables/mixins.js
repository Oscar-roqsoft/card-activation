

export const checkisLoggedIn = () => {
    const store = useStore()
   if(store.state.isAuthenticated){
    navigateTo('/activate')
   }else{
    navigateTo('/account')
   }
}


export const asyncRequest = async (url, options, json = true) => {
    const pinia = useStore();
   return fetch(url, options)
   .then(response => {
     const statusCode = response.status;
     if(statusCode == 401){
       pinia.state.isAuthenticated = false
      navigateTo("/account");
       return;
     }
     return json ? response.json() : response.text();
   })
   .then((data) => {
     return data;
   })
   .catch((error) => {
     return error;
   });
};