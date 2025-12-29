import { useState, useCallback } from 'react';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const useAsync = <T, Args extends any[]>(
    asyncFunction: (...args: Args) => Promise<T>
) => {
    const [isLoading, setIsLoading] = useState(false);
    const [data, setData] = useState<T | null>(null);
    const [error, setError] = useState<Error | null>(null);

    const execute = useCallback(async (...args: Args) => {
        setIsLoading(true);
        try {
            const result = await asyncFunction(...args);
            setData(result);
            return result;
        } catch (err) {
            setError(err as Error);
            console.error(err);
        } finally {
            setIsLoading(false);
        }
    }, [asyncFunction]);

    return { data, isLoading, error, execute };
};
