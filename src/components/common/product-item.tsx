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
      className="flex flex-col gap-3 md:gap-4 group"
    >
      <div className="relative overflow-hidden rounded-3xl">
        <Image
          src={firtsVarient.imageUrl}
          alt={firtsVarient.name}
          sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, (max-width: 1280px) 33vw, (max-width: 1536px) 25vw, 20vw"
          width={0}
          height={0}
          className="h-auto w-full rounded-3xl transition-transform duration-300 group-hover:scale-105"
        />
      </div>
      <div
        className={cn(
          "flex flex-col gap-1 md:gap-2",
          textContainerClassname || "max-w-[200px] md:max-w-none",
        )}
      >
        <p className="truncate text-sm md:text-base font-medium">{product.name}</p>
        <p className="truncate text-xs md:text-sm text-muted-foreground font-medium">
          {product.description}
        </p>
        <p className="truncate text-sm md:text-base font-semibold">
          {formatCentsToBRL(firtsVarient.priceInCents)}
        </p>
      </div>
    </Link>
  );
};

export default ProductItem;
