import { create } from "zustand"

type AuthState = {
    userToken: string;
}

type AuthAction = {
    setUserToken: (token: string) => void;
    clearAuth: () => void;
}

const useAuthStore = create<AuthState & AuthAction>((set) => ({
    userToken: "",
    setUserToken: (token: string) => set({userToken: token}),
    clearAuth: () => set({userToken: ""}),
}));

export default useAuthStore;