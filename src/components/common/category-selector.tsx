import { Button } from "../ui/button";
import { categoryTable } from "@/db/schema";
import Link from "next/link";

interface CategorySelectorProps {
  categories: (typeof categoryTable.$inferInsert)[];
}

const CategorySelector = ({ categories }: CategorySelectorProps) => {
  return (
    <div className="container mx-auto px-5 lg:px-8 xl:px-12 2xl:px-16">
      <div className="rounded-3xl p-6 md:p-8 lg:p-10 xl:p-12 bg-[#F4EFFF]">
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-3 md:gap-4 lg:gap-5 xl:gap-6">
          {categories.map((category) => (
            <Button
              key={category.id}
              variant="ghost"
              className="bg-white rounded-full text-xs md:text-sm lg:text-base font-semibold h-auto py-2 md:py-3 lg:py-4 px-4 md:px-6 lg:px-8 hover:bg-white/90 transition-colors"
            >
              <Link href={`/category/${category.slug}`}>{category.name}</Link>
            </Button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default CategorySelector;
