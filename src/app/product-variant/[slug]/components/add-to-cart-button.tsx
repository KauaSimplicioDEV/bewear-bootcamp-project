"use client";

import { addProductToCart } from "@/actions/add-cart-product";
import { Button } from "@/components/ui/button";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Loader2 } from "lucide-react";
import { getUseCartQueryKey } from "@/hooks/queries/use-cart";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { useState } from "react";

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
  const [showLoginDialog, setShowLoginDialog] = useState(false);
  
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
        setShowLoginDialog(true);
      } else {
        toast.error("Erro ao adicionar produto ao carrinho");
      }
    },
  });
  
  return (
    <>
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

      <Dialog open={showLoginDialog} onOpenChange={setShowLoginDialog}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle className="text-xl">Login necessário</DialogTitle>
            <DialogDescription className="text-base pt-2">
              Para adicionar produtos ao carrinho, você precisa estar logado. 
              Por favor, faça login ou crie uma conta para continuar.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter className="flex-col sm:flex-row gap-2">
            <Button
              variant="outline"
              onClick={() => setShowLoginDialog(false)}
              className="w-full sm:w-auto"
            >
              Cancelar
            </Button>
            <Button
              onClick={() => {
                setShowLoginDialog(false);
                router.push("/authentication");
              }}
              className="w-full sm:w-auto rounded-full"
            >
              Ir para Login/Cadastro
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default AddToCartButton;
