"use client";

import AddToCartButton from "./add-to-cart-button";
import { Button } from "@/components/ui/button";
import { MinusIcon, PlusIcon } from "lucide-react";
import { useState } from "react";

interface ProductActionsProps {
  productVariantId: string;
}

const ProductActions = ({ productVariantId }: ProductActionsProps) => {
  const [quantity, setQuantity] = useState(1);

  const handleDecrement = () => {
    setQuantity((prev) => (prev > 1 ? prev - 1 : prev));
  };

  const handleIncrement = () => {
    setQuantity((prev) => prev + 1);
  };

  return (
    <div className="space-y-6">
      <div className="space-y-4">
        <h3 className="text-base md:text-lg font-medium">Quantidade</h3>
        <div className="flex w-[120px] md:w-[140px] items-center justify-between rounded-lg border p-2">
          <Button size="icon" variant="ghost" onClick={handleDecrement} className="h-8 w-8">
            <MinusIcon className="h-4 w-4" />
          </Button>
          <p className="text-base md:text-lg font-medium">{quantity}</p>
          <Button size="icon" variant="ghost" onClick={handleIncrement} className="h-8 w-8">
            <PlusIcon className="h-4 w-4" />
          </Button>
        </div>
      </div>
      <div className="flex flex-col md:flex-row gap-4">
        <AddToCartButton
          productVariantId={productVariantId}
          quantity={quantity}
        />
        <Button className="rounded-full w-full md:w-auto" size="lg">
          Comprar agora
        </Button>
      </div>
    </div>
  );
};

export default ProductActions;
