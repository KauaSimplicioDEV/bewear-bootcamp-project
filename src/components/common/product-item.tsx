import { productTable, productVariantTable } from "@/db/schema";
import { formatCentsToBRL } from "@/helpers/money";
import { cn } from "@/lib/utils";
import Image from "next/image";
import Link from "next/link";

interface ProductItemProps {
  product: typeof productTable.$inferSelect & {
    variants: (typeof productVariantTable.$inferSelect)[];
  };
  textContainerClassname?: string;
}

const ProductItem = ({ product, textContainerClassname }: ProductItemProps) => {
  const firtsVarient = product.variants[0];
  return (
    <Link
      href={`/product-variant/${firtsVarient.slug}`}
      className="flex flex-col gap-3 md:gap-4 lg:gap-5 group"
    >
      <div className="overflow-hidden relative rounded-3xl shadow-md hover:shadow-xl transition-all duration-300">
        <Image
          src={firtsVarient.imageUrl}
          alt={firtsVarient.name}
          sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, (max-width: 1280px) 33vw, (max-width: 1536px) 25vw, 20vw"
          width={0}
          height={0}
          className="w-full h-auto rounded-3xl transition-transform duration-300 group-hover:scale-110"
        />
      </div>
      <div
        className={cn(
          "flex flex-col gap-1 md:gap-2 lg:gap-2.5",
          textContainerClassname || "max-w-[200px] md:max-w-none",
        )}
      >
        <p className="text-sm font-medium truncate md:text-base lg:text-lg">
          {product.name}
        </p>
        <p className="text-xs font-medium truncate md:text-sm lg:text-base text-muted-foreground">
          {product.description}
        </p>
        <p className="text-sm font-semibold truncate md:text-base lg:text-lg xl:text-xl">
          {formatCentsToBRL(firtsVarient.priceInCents)}
        </p>
      </div>
    </Link>
  );
};

export default ProductItem;
