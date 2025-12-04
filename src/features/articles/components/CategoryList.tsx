import CategoryCard from "./CategoryCard";
import type { CategoryDto } from "../types";
import Flex from "@/components/Elements/Flex/Flex";

type CategoryListProps = {
    categories: CategoryDto[];
}
export const CategoryList = ({ categories }: CategoryListProps) => {


    return (
        <Flex direction="column" gap={8}>
            {categories.map((category) => (
                <CategoryCard key={category.categoryId} category={category} />
            ))}
        </Flex>
    )
}