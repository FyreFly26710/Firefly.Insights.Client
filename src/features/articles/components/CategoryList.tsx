import CategoryCard from "./CategoryCard";
import type { CategoryDto } from "../api-types";
import Flex from "@/components/Elements/Flex/Flex";

type CategoryListProps = {
    categories: CategoryDto[];
}
export const CategoryList = ({ categories }: CategoryListProps) => {


    return (
        <Flex id="category-list" direction="column" gap={8}>
            {categories.map((category) => (
                <CategoryCard key={category.categoryId} category={category} />
            ))}
        </Flex>
    )
}