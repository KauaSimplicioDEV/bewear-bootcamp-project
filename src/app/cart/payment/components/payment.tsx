"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { formatCentsToBRL } from "@/helpers/money";
import CartItem from "@/components/common/cart-item";
import { Button } from "@/components/ui/button";
import { getCart } from "@/actions/get-cart";
import { MapPinIcon, CheckCircle2 } from "lucide-react";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog";
import { useState } from "react";
import { useRouter } from "next/navigation";

type Cart = NonNullable<Awaited<ReturnType<typeof getCart>>>;

interface PaymentProps {
    cart: Cart;
}

const Payment = ({ cart }: PaymentProps) => {
    const address = cart.shippingAddress;
    const [isDialogOpen, setIsDialogOpen] = useState(false);
    const router = useRouter();

    if (!address) {
        return null;
    }

    const handleFinalizePurchase = () => {
        setIsDialogOpen(true);
    };

    const handleCloseDialog = () => {
        setIsDialogOpen(false);
        router.push("/");
    };

    return (
        <>
            <div className="space-y-6">
            <div>
                <h1 className="mb-2 text-2xl font-bold md:text-3xl">Revisar pedido</h1>
                <p className="text-muted-foreground">
                    Revise seus itens e informações antes de finalizar a compra
                </p>
            </div>

            <Card>
                <CardHeader>
                    <CardTitle className="flex gap-2 items-center">
                        <MapPinIcon className="w-5 h-5" />
                        Endereço de entrega
                    </CardTitle>
                </CardHeader>
                <CardContent>
                    <div className="space-y-1">
                        <p className="text-base font-semibold md:text-lg">
                            {address.recipientName}
                        </p>
                        <p className="text-sm md:text-base text-muted-foreground">
                            {address.street}, {address.number}
                            {address.complement && ` - ${address.complement}`}
                        </p>
                        <p className="text-sm md:text-base text-muted-foreground">
                            {address.neighborhood}, {address.city} - {address.state}
                        </p>
                        <p className="text-sm md:text-base text-muted-foreground">
                            CEP: {address.zipCode}
                        </p>
                        <p className="text-sm md:text-base text-muted-foreground">
                            Telefone: {address.phone}
                        </p>
                        <p className="text-sm md:text-base text-muted-foreground">
                            Email: {address.email}
                        </p>
                    </div>
                </CardContent>
            </Card>

            <Card>
                <CardHeader>
                    <CardTitle>Itens do pedido</CardTitle>
                </CardHeader>
                <CardContent>
                    <div className="space-y-4">
                        {cart.items.map((item) => (
                            <CartItem
                                key={item.id}
                                id={item.id}
                                productName={item.productVariant.product.name}
                                productVariantId={item.productVariant.id}
                                productVariantName={item.productVariant.name}
                                productVariantImageUrl={item.productVariant.imageUrl}
                                productVariantPriceInCents={item.productVariant.priceInCents}
                                quantity={item.quantity}
                                readOnly={true}
                            />
                        ))}
                    </div>
                </CardContent>
            </Card>

            <Card>
                <CardHeader>
                    <CardTitle>Resumo do pedido</CardTitle>
                </CardHeader>
                <CardContent>
                    <div className="space-y-3">
                        <div className="flex justify-between items-center text-base md:text-lg">
                            <p className="text-muted-foreground">Subtotal</p>
                            <p className="font-medium">
                                {formatCentsToBRL(cart.totalPriceInCents)}
                            </p>
                        </div>

                        <div className="flex justify-between items-center text-base md:text-lg">
                            <p className="text-muted-foreground">Transporte e manuseio</p>
                            <p className="font-medium text-green-600">GRÁTIS</p>
                        </div>

                        <div className="flex justify-between items-center text-base md:text-lg">
                            <p className="text-muted-foreground">Taxa estimada</p>
                            <p className="font-medium">{formatCentsToBRL(0)}</p>
                        </div>

                        <Separator />

                        <div className="flex justify-between items-center text-lg font-bold md:text-xl">
                            <p>Total</p>
                            <p>{formatCentsToBRL(cart.totalPriceInCents)}</p>
                        </div>
                    </div>
                </CardContent>
            </Card>

            <div className="flex gap-4">
                <Button
                    variant="outline"
                    className="flex-1"
                    onClick={() => window.history.back()}
                >
                    Voltar
                </Button>
                <Button 
                    className="flex-1 rounded-full"
                    onClick={handleFinalizePurchase}
                >
                    Finalizar compra
                </Button>
            </div>
        </div>

        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
            <DialogContent className="sm:max-w-md">
                <DialogHeader>
                    <div className="flex justify-center mb-4">
                        <CheckCircle2 className="w-16 h-16 text-green-500" />
                    </div>
                    <DialogTitle className="text-center text-2xl">
                        Compra Finalizada!
                    </DialogTitle>
                    <DialogDescription className="text-center text-base mt-2">
                        Seu pedido foi realizado com sucesso! 
                        <br />
                        Em breve você receberá um e-mail com os detalhes da compra.
                    </DialogDescription>
                </DialogHeader>
                <div className="flex justify-center mt-4">
                    <Button 
                        onClick={handleCloseDialog}
                        className="w-full rounded-full"
                    >
                        Voltar para a Home
                    </Button>
                </div>
            </DialogContent>
        </Dialog>
        </>
    );
};

export default Payment;
