import { useRouter } from 'expo-router';
import { AuthMmkvStorage } from '../../storage/mmkv';
import AuthFacade from '../../store/facades/auth-facade/authFacade';

const useSignOut = () => {

    const router = useRouter();

    const signOut = () => {
        // Clear user data from storage
        AuthMmkvStorage.clearAuth();
        AuthFacade.clearAuth();

        // Optionally, you can add navigation to the sign-in screen here
        router.replace('/');
    }

    return {
        signOut
    }
}

export default useSignOut