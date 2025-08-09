import { productTable, productVariantTable } from "@/db/schema";
import { formatCentstoBRL } from "@/helpers/money";
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
    <Link href="/" className="flex flex-col gap-4">
      <Image
        src={firtsVarient.imageUrl}
        alt={firtsVarient.name}
        sizes="100vw"
        width={0}
        height={0}
        className="h-auto w-full rounded-3xl"
      />
      <div
        className={cn(
          "flex max-w-[200px] flex-col gap-1",
          textContainerClassname,
        )}
      >
        <p className="truncate text-sm font-medium">{product.name}</p>
        <p className="truncate text-xs text-muted-foreground font-medium">
          {product.description}
        </p>
        <p className="truncate text-sm font-semibold">
          {formatCentstoBRL(firtsVarient.priceInCents)}
        </p>
      </div>
    </Link>
  );
};

export default ProductItem;
