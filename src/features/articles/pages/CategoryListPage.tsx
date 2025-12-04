import { useAsync } from "@/features/shared/hooks/useAsync ";
import { apiCategoriesGetList } from "../api";
import { useEffect } from "react";
import { PageSpinner } from "@/components/Elements/Spinner/PageSpinner";
import { CategoryList } from "../components/CategoryList";
import { Container } from "@mui/material";
import { Spinner } from "@/components/Elements/Spinner/Spinner";

export const CategoryListPage = () => {
    const { data, isLoading, execute } = useAsync(apiCategoriesGetList);

    useEffect(() => {
        execute();
    }, []);

    if (isLoading) {
        return <PageSpinner />;
    }

    return (
        <div id="category-list-page">
            <Container>
                <CategoryList categories={data ?? []} />
            </Container>
        </div>
    );
}