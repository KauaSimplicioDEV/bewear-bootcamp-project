import { productTable, productVariantTable } from "@/db/schema";
import { formatCentstoBRL } from "@/helpers/money";
import Image from "next/image";
import Link from "next/link";

interface ProductItemProps {
  product: typeof productTable.$inferSelect & {
    variants: (typeof productVariantTable.$inferSelect)[];
  };
}

const ProductItem = ({ product }: ProductItemProps) => {
  const firtsVarient = product.variants[0];
  return (
    <Link href="/" className="flex flex-col gap-4">
      <Image
        src={firtsVarient.imageUrl}
        alt={firtsVarient.name}
        width={150}
        height={150}
        className="rounded-3xl"
      />
      <div className="flex max-w-[150px] flex-col gap-1">
        <p className="truncate text-sm font-medium">{product.name}</p>
        <p className="truncate text-xs text-muted-foreground font-medium">
          {product.description}
        </p>
        <p className="truncate text-sm semi-bold">
          {formatCentstoBRL(firtsVarient.priceInCents)}
        </p>
      </div>
    </Link>
  );
};

export default ProductItem;
