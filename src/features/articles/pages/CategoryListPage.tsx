import { use, useMemo } from "react";
import { Container } from "@mui/material";
import { apiCategoriesGetList } from "../api";
import { CategoryList } from "../components/CategoryList";

// Fetch starts immediately when the module loads
const categoriesPromise = apiCategoriesGetList();

export const CategoryListPage = () => {
    const data = use(categoriesPromise);

    const filteredCategories = useMemo(() => {
        return (data ?? []).filter(cat => cat.categoryId !== -1);
    }, [data]);

    return (
        <Container id="category-list-page">
            <CategoryList categories={filteredCategories} />
        </Container>
    );
};