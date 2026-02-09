"use client";

import { ScrollArea } from "../ui/scroll-area";
import { Separator } from "../ui/separator";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "../ui/sheet";
import CartItem from "./cart-item";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { formatCentsToBRL } from "@/helpers/money";
import { useCart } from "@/hooks/queries/use-cart";
import { ShoppingBasketIcon } from "lucide-react";
import Link from "next/link";
import { authClient } from "@/lib/auth-client";
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

export const Cart = () => {
  const { data: cart } = useCart();
  const totalItems = cart?.items.reduce((acc, item) => acc + item.quantity, 0) || 0;
  const { data: session } = authClient.useSession();
  const router = useRouter();
  const [showLoginDialog, setShowLoginDialog] = useState(false);

  const handleCheckout = (e: React.MouseEvent) => {
    if (!session?.user) {
      e.preventDefault();
      setShowLoginDialog(true);
    }
  };
  
  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="outline" size="icon" className="relative">
          <ShoppingBasketIcon />
          {totalItems > 0 && (
            <Badge 
              className="absolute -top-2 -right-2 h-5 w-5 flex items-center justify-center p-0 text-xs"
            >
              {totalItems}
            </Badge>
          )}
        </Button>
      </SheetTrigger>
      <SheetContent className="w-full sm:max-w-lg">
        <SheetHeader>
          <SheetTitle className="text-lg md:text-xl">Carrinho</SheetTitle>
        </SheetHeader>

        <div className="flex h-full flex-col px-4 md:px-5 pb-5">
          <div className="flex h-full max-h-full flex-col overflow-hidden">
            <ScrollArea className="h-full">
              <div className="flex h-full flex-col gap-6 md:gap-8">
                {cart?.items.map((item) => (
                  <CartItem
                    key={item.id}
                    id={item.id}
                    productName={item.productVariant.product.name}
                    productVariantId={item.productVariant.id}
                    productVariantName={item.productVariant.name}
                    productVariantImageUrl={item.productVariant.imageUrl}
                    productVariantPriceInCents={
                      item.productVariant.priceInCents
                    }
                    quantity={item.quantity}
                  />
                ))}
              </div>
            </ScrollArea>
          </div>

          {cart?.items && cart?.items.length > 0 && (
            <div className="flex flex-col gap-4 mt-4">
              <Separator />

              <div className="flex items-center justify-between text-sm md:text-base font-medium">
                <p>Subtotal</p>
                <p>{formatCentsToBRL(cart?.totalPriceInCents ?? 0)}</p>
              </div>

              <Separator />

              <div className="flex items-center justify-between text-sm md:text-base font-medium">
                <p>Entrega</p>
                <p>GRÁTIS</p>
              </div>

              <Separator />

              <div className="flex items-center justify-between text-base md:text-lg font-semibold">
                <p>Total</p>
                <p>{formatCentsToBRL(cart?.totalPriceInCents ?? 0)}</p>
              </div>

              <Button 
                className="mt-2 md:mt-4 rounded-full w-full"
                onClick={handleCheckout}
                asChild={session?.user ? true : false}
              >
                {session?.user ? (
                  <Link href={"/cart/identification"}>Finalizar compra</Link>
                ) : (
                  <span>Finalizar compra</span>
                )}
              </Button>
            </div>
          )}
        </div>
      </SheetContent>

      <Dialog open={showLoginDialog} onOpenChange={setShowLoginDialog}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle className="text-xl">Login necessário</DialogTitle>
            <DialogDescription className="text-base pt-2">
              Para finalizar sua compra, você precisa estar logado. 
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
    </Sheet>
  );
};
