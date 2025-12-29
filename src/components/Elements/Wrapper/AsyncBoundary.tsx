import { ErrorPageLayout } from "@/layouts/ErrorPageLayout";
import { PageSpinner } from "../Spinner/PageSpinner";

type AsyncBoundaryProps<T> = {
    loading: boolean;
    error: Error | null;
    data: T | null;
    children: React.ReactNode;
}

export const AsyncBoundary = <T,>({ loading, error, data, children }: AsyncBoundaryProps<T>) => {
    if (loading || !data) return <PageSpinner />;
    if (error) return <ErrorPageLayout title="Error" message="Failed to load" />;
    return <>{children}</>;
};