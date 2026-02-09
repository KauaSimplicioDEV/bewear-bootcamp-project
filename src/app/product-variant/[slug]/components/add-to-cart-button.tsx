"use client";

import { addProductToCart } from "@/actions/add-cart-product";
import { Button } from "@/components/ui/button";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Loader2 } from "lucide-react";
import { getUseCartQueryKey } from "@/hooks/queries/use-cart";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

interface AddToCartButtonProps {
  productVariantId: string;
  quantity: number;
}

const AddToCartButton = ({
  productVariantId,
  quantity,
}: AddToCartButtonProps) => {
  const queryClient = useQueryClient();
  const router = useRouter();
  
  const { mutate, isPending } = useMutation({
    mutationKey: ["addProductToCart", productVariantId, quantity],
    mutationFn: () =>
      addProductToCart({
        productVariantId,
        quantity,
      }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: getUseCartQueryKey() });
      toast.success("Produto adicionado ao carrinho!");
    },
    onError: (error: Error) => {
      console.error("Erro ao adicionar ao carrinho:", error);
      if (error.message === "Unauthorized") {
        toast.error("Você precisa estar logado para adicionar ao carrinho");
        router.push("/authentication");
      } else {
        toast.error("Erro ao adicionar produto ao carrinho");
      }
    },
  });
  
  return (
    <Button
      className="rounded-full w-full md:w-auto"
      size="lg"
      variant="outline"
      disabled={isPending}
      onClick={() => mutate()}
    >
      {isPending && <Loader2 className="animate-spin mr-2 h-4 w-4" />}
      Adicionar à sacola
    </Button>
  );
};

export default AddToCartButton;
