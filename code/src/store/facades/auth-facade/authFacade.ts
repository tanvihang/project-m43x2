import useAuthStore from "../../stores/auth-store/authStore";


class AuthFacade {
  static getState() {
    return useAuthStore.getState();
  }

  // User Token
  static getUserToken(){
    return useAuthStore.getState().userToken;
  }

  static setUserToken(token: string) {
    useAuthStore.getState().setUserToken(token);
  }

  
  static subscribe(listener: (state: any) => void) {
    return useAuthStore.subscribe(listener);
  }

  // Clear
  static clearAuth() {
    useAuthStore.getState().clearAuth();
  }
}

export default AuthFacade;
