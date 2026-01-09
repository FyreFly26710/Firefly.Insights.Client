import { use, useMemo } from "react";
import { Container } from "@mui/material";
import { categoriesApi } from "../api/categoriesApi";
import { CategoryList } from "../components/CategoryList";

// Fetch starts immediately when the module loads
const categoriesPromise = categoriesApi.getList();

export const CategoryListPage = () => {
  const data = use(categoriesPromise);

  const filteredCategories = useMemo(() => {
    return (data ?? []).filter((cat) => cat.categoryId !== -1);
  }, [data]);

  return (
    <Container id="category-list-page" sx={{ overflow: "auto" }}>
      <CategoryList categories={filteredCategories} />
    </Container>
  );
};
