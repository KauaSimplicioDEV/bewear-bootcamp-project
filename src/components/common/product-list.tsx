"use client";

import ProductItem from "./product-item";
import { productTable, productVariantTable } from "@/db/schema";

interface ProductListProps {
  title: string;
  products: (typeof productTable.$inferSelect & {
    variants: (typeof productVariantTable.$inferSelect)[];
  })[];
}

const ProductList = ({ title, products }: ProductListProps) => {
  return (
    <div className="space-y-6">
      <div className="container px-5 mx-auto">
        <h3 className="text-xl font-semibold md:text-2xl">{title}</h3>
      </div>
      <div className="container px-5 mx-auto">
        <div className="flex w-full gap-4 overflow-x-auto md:overflow-x-visible md:grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 md:gap-6 [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
          {products.map((product) => (
            <ProductItem key={product.id} product={product} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default ProductList;
