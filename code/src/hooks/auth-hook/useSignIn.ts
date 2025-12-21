import { useForm } from 'react-hook-form'
import { useRouter } from 'expo-router';
import { useLoginApiMutation } from '../api-hook/graphql/useAuthApi';
import { NormalizedError } from '../../utils/error';
import { AuthMmkvStorage } from '../../storage/mmkv';
import AuthFacade from '../../store/facades/auth-facade/authFacade';

type SignInInputs = {
    email: string;
    password: string;
}

const useSignIn = () => {
    const router = useRouter();

    const {
        control,
        handleSubmit,
        formState: { errors, isSubmitting },
        reset,
    } = useForm<SignInInputs>({
        defaultValues: {
            email: '',
            password: '',
        },
        mode: 'onBlur',
    });

    const loginApiMutation = useLoginApiMutation();

    const onSubmit = async (data: SignInInputs) => {
        try {
            const response = await loginApiMutation.mutateAsync({
                email: data.email,
                password: data.password,
            })
            
            console.log('Login response:', response);

            AuthMmkvStorage.setUserEmail(data.email);
            AuthMmkvStorage.setAccessToken(response.AccessToken);
            AuthFacade.setUserToken(response.AccessToken);

            // Redirect to home after successful sign-in
            router.replace('/(protected)/(tabs)/home');

        } catch (error) {
            const normalizedError = error as NormalizedError;
            console.error('Sign in error:', normalizedError);
            alert(normalizedError.message || 'Sign in failed');
        }
    };

    return {
        control,
        handleSubmit: handleSubmit(onSubmit),
        errors,
        isSubmitting,
        reset,
    }
}

export default useSignIn