"use client";

import { productVariantTable } from "@/db/schema";
import Image from "next/image";
import Link from "next/link";

interface VariantSelectorProps {
  selectedVariantSlug: string;
  variants: (typeof productVariantTable.$inferSelect)[];
}

const VariantSelector = ({
  variants,
  selectedVariantSlug,
}: VariantSelectorProps) => {
  return (
    <div className="space-y-3">
      <h3 className="text-base md:text-lg font-medium">Variações</h3>
      <div className="flex items-center gap-3 md:gap-4 flex-wrap">
        {variants.map((variant) => (
          <Link
            href={`/product-variant/${variant.slug}`}
            key={variant.id}
            className={
              selectedVariantSlug === variant.slug
                ? "border-primary rounded-xl border-2 transition-all"
                : "border-2 border-transparent rounded-xl hover:border-primary/50 transition-all"
            }
          >
            <Image
              width={68}
              height={68}
              src={variant.imageUrl}
              alt={variant.name}
              className="rounded-xl w-16 h-16 md:w-20 md:h-20 object-cover"
            />
          </Link>
        ))}
      </div>
    </div>
  );
};

export default VariantSelector;
