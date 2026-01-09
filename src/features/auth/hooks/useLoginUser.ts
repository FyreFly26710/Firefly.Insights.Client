import { useState, useCallback } from 'react';
import type { UserDto, UserLoginRequest } from '../types';
import { authApi } from '../api/authApi';
import type { AxiosError } from 'axios';
import { useUserStore } from '@/stores/useUserStore';

type UseLoginUserProps = {
    defaultValues?: UserLoginRequest;
    onSuccess?: (user: UserDto) => void;
};

export const useLoginUser = ({ defaultValues, onSuccess }: UseLoginUserProps = {}) => {
    const [values, setValues] = useState<UserLoginRequest>(
        defaultValues || { userAccount: '', userPassword: '' }
    );
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const setAuth = useUserStore((state) => state.setAuth);
    const handleChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setValues((prev) => ({
            ...prev,
            [name]: value,
        }));
        if (error) setError(null);
    }, [error]);

    const onSubmit = useCallback(
        async (e: React.FormEvent) => {
            e.preventDefault(); // Stop page reload
            setIsSubmitting(true);
            setError(null);

            try {
                const data = await authApi.login(values);
                
                setAuth(data.user, data.token);
                onSuccess?.(data.user);
            } catch (err: unknown) {
                const axiosError = err as AxiosError<{ Message: string; Code: number }>;
                const errorMessage = axiosError.response?.data?.Message
                    || axiosError.message
                    || 'An unexpected error occurred';

                setError(errorMessage);
            } finally {
                setIsSubmitting(false);
            }
        },
        [values, onSuccess, setAuth]
    );

    return {
        values,
        handleChange,
        onSubmit,
        error,
        isSubmitting,
    };
};