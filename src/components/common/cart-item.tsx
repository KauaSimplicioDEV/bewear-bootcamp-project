import { Button } from "../ui/button";
import { formatCentsToBRL } from "@/helpers/money";
import { useDecreaseCartProduct } from "@/hooks/mutations/use-decrease-cart-product";
import { useIncreaseCartProduct } from "@/hooks/mutations/use-increase-cart-product";
import { useRemoveProductFromCart } from "@/hooks/mutations/use-remove-product-from-cart";
import { MinusIcon, PlusIcon, TrashIcon } from "lucide-react";
import Image from "next/image";
import { toast } from "sonner";

interface CartItemProps {
  id: string;
  productName: string;
  productVariantId: string;
  productVariantName: string;
  productVariantImageUrl: string;
  productVariantPriceInCents: number;
  quantity: number;
  readOnly?: boolean;
}

const CartItem = ({
  id,
  productName,
  productVariantName,
  productVariantId,
  productVariantImageUrl,
  productVariantPriceInCents,
  quantity,
  readOnly = false,
}: CartItemProps) => {
  const removeProductFromCartMutation = useRemoveProductFromCart(id);
  const decreaseCartProductQuantityMutation = useDecreaseCartProduct(id);
  const increaseCartProductQuantityMutation =
    useIncreaseCartProduct(productVariantId);
  const handleDeleteClick = () => {
    removeProductFromCartMutation.mutate(undefined, {
      onSuccess: () => {
        toast.success("Produto removido do carrinho.");
      },
      onError: () => {
        toast.error("Erro ao remover o produto do carrinho.");
      },
    });
  };
  const handleDecreaseQuantityClick = () => {
    decreaseCartProductQuantityMutation.mutate(undefined, {
      onSuccess: () => {
        toast.success("Quantidade do produto diminuída.");
      },
    });
  };
  const handleIncreaseQuantityClick = () => {
    increaseCartProductQuantityMutation.mutate(undefined, {
      onSuccess: () => {
        toast.success("Quantidade do produto aumentada.");
      },
    });
  };
  return (
    <div className="flex items-center justify-between gap-4">
      <div className="flex items-center gap-3 md:gap-4 flex-1 min-w-0">
        <Image
          src={productVariantImageUrl}
          alt={productVariantName}
          width={78}
          height={78}
          className="rounded-lg w-16 h-16 md:w-20 md:h-20 object-cover flex-shrink-0"
        />
        <div className="flex flex-col gap-1 min-w-0 flex-1">
          <p className="text-sm md:text-base font-semibold truncate">{productName}</p>
          <p className="text-muted-foreground text-xs md:text-sm font-medium truncate">
            {productVariantName}
          </p>
          {readOnly ? (
            <p className="text-xs md:text-sm font-medium text-muted-foreground">
              Quantidade: {quantity}
            </p>
          ) : (
            <div className="flex w-[100px] md:w-[120px] items-center justify-between rounded-lg border p-1.5 md:p-2">
              <Button
                className="h-5 w-5 md:h-6 md:w-6 p-0"
                variant="ghost"
                onClick={handleDecreaseQuantityClick}
              >
                <MinusIcon className="h-3 w-3 md:h-4 md:w-4" />
              </Button>
              <p className="text-xs md:text-sm font-medium">{quantity}</p>
              <Button
                className="h-5 w-5 md:h-6 md:w-6 p-0"
                variant="ghost"
                onClick={handleIncreaseQuantityClick}
              >
                <PlusIcon className="h-3 w-3 md:h-4 md:w-4" />
              </Button>
            </div>
          )}
        </div>
      </div>
      <div className="flex flex-col items-end justify-center gap-2 flex-shrink-0">
        {!readOnly && (
          <Button variant="outline" size="icon" onClick={handleDeleteClick} className="h-8 w-8 md:h-9 md:w-9">
            <TrashIcon className="h-4 w-4" />
          </Button>
        )}
        <p className="text-sm md:text-base font-bold">
          {formatCentsToBRL(productVariantPriceInCents * quantity)}
        </p>
      </div>
    </div>
  );
};

export default CartItem;
