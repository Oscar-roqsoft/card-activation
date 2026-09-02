

export const checkisLoggedIn = () => {
    const store = useStore()
   if(store.state.isAuthenticated){
    navigateTo('/activate')
   }else{
    navigateTo('/account')
   }
}