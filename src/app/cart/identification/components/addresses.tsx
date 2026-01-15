"use client";

import { Separator } from "../../../../components/ui/separator";
import { saveShippingAddress } from "@/actions/save-shipping-address";
import { updateCartShippingAddress } from "@/actions/update-cart-shipping-address";
import CartItem from "@/components/common/cart-item";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { shippingAddressTable } from "@/db/schema";
import { formatCentsToBRL } from "@/helpers/money";
import { useCart } from "@/hooks/queries/use-cart";
import { zodResolver } from "@hookform/resolvers/zod";
import { Loader2 } from "lucide-react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";

const formatZipCode = (value: string) => {
  const numbers = value.replace(/\D/g, "");
  const limited = numbers.slice(0, 8);

  if (limited.length <= 5) {
    return limited;
  }
  return `${limited.slice(0, 5)}-${limited.slice(5)}`;
};

const formatCpf = (value: string) => {
  const numbers = value.replace(/\D/g, "");
  const limited = numbers.slice(0, 11);

  if (limited.length <= 3) {
    return limited;
  }
  if (limited.length <= 6) {
    return `${limited.slice(0, 3)}.${limited.slice(3)}`;
  }
  if (limited.length <= 9) {
    return `${limited.slice(0, 3)}.${limited.slice(3, 6)}.${limited.slice(6)}`;
  }
  return `${limited.slice(0, 3)}.${limited.slice(3, 6)}.${limited.slice(6, 9)}-${limited.slice(9)}`;
};

const addressFormSchema = z.object({
  recipientName: z.string().min(1, "Nome do destinatário é obrigatório"),
  street: z.string().min(1, "Rua é obrigatória"),
  number: z.string().min(1, "Número é obrigatório"),
  complement: z.string().optional(),
  city: z.string().min(1, "Cidade é obrigatória"),
  state: z.string().min(1, "Estado é obrigatório"),
  neighborhood: z.string().min(1, "Bairro é obrigatório"),
  zipCode: z
    .string()
    .min(8, "CEP deve ter 8 dígitos")
    .regex(/^\d{5}-\d{3}$/, "CEP deve conter 8 dígitos no formato 00000-000"),
  country: z.string().min(1, "País é obrigatório"),
  phone: z.string().min(10, "Telefone inválido"),
  email: z.email("Email inválido"),
  cpfOrCnpj: z
    .string()
    .min(11, "CPF deve ter 11 dígitos")
    .regex(
      /^\d{3}\.\d{3}\.\d{3}-\d{2}$/,
      "CPF deve conter 11 dígitos no formato 000.000.000-00",
    ),
});

type AddressFormValues = z.infer<typeof addressFormSchema>;

interface AddressesProps {
  savedAddresses: (typeof shippingAddressTable.$inferSelect)[];
  selectedAddressId: string | null;
}

const Addresses = ({ savedAddresses, selectedAddressId }: AddressesProps) => {
  const router = useRouter();
  const [selectedAddresses, setSelectedAddresses] = useState<string | null>(
    selectedAddressId || null,
  );
  const [isSaving, setIsSaving] = useState(false);

  useEffect(() => {
    if (selectedAddressId) {
      setSelectedAddresses(selectedAddressId);
    }
  }, [selectedAddressId]);

  const form = useForm<AddressFormValues>({
    resolver: zodResolver(addressFormSchema),
    defaultValues: {
      recipientName: "",
      street: "",
      number: "",
      complement: "",
      city: "",
      state: "",
      neighborhood: "",
      zipCode: "",
      country: "Brasil",
      phone: "",
      email: "",
      cpfOrCnpj: "",
    },
  });

  const handleSubmit = async (data: AddressFormValues) => {
    setIsSaving(true);
    try {
      const newAddress = await saveShippingAddress(data);
      await updateCartShippingAddress(newAddress.id);
      toast.success("Endereço salvo com sucesso!");
      router.refresh();
      setSelectedAddresses(newAddress.id);
      form.reset();
    } catch {
      toast.error("Erro ao salvar endereço");
    } finally {
      setIsSaving(false);
    }
  };

  const handleAddressSelect = async (addressId: string) => {
    if (addressId === "add_new") {
      setSelectedAddresses("add_new");
      return;
    }
    try {
      await updateCartShippingAddress(addressId);
      setSelectedAddresses(addressId);
      toast.success("Endereço selecionado!");
      router.refresh();
    } catch {
      toast.error("Erro ao selecionar endereço");
    }
  };

  const showForm = selectedAddresses === "add_new";
  const hasSelectedAddress =
    selectedAddresses && selectedAddresses !== "add_new";

  const { data: cart } = useCart();
  const hasItems = cart && cart.items && cart.items.length > 0;

  return (
    <>
      <Card>
        <CardHeader>
          <CardTitle>Identificação</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <RadioGroup
            value={selectedAddresses || undefined}
            onValueChange={handleAddressSelect}
          >
            {savedAddresses.map((address) => (
              <Card key={address.id}>
                <CardContent>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value={address.id} id={address.id} />
                    <Label
                      htmlFor={address.id}
                      className="flex-1 cursor-pointer"
                    >
                      <div>
                        <p className="font-semibold">{address.recipientName}</p>
                        <p className="text-sm text-muted-foreground">
                          {address.street}, {address.number}
                          {address.complement && ` - ${address.complement}`}
                        </p>
                        <p className="text-sm text-muted-foreground">
                          {address.neighborhood}, {address.city} -{" "}
                          {address.state}
                        </p>
                        <p className="text-sm text-muted-foreground">
                          CEP: {address.zipCode}
                        </p>
                      </div>
                    </Label>
                  </div>
                </CardContent>
              </Card>
            ))}
            <Card>
              <CardContent>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="add_new" id="add_new" />
                  <Label htmlFor="add_new">Adicionar novo endereço</Label>
                </div>
              </CardContent>
            </Card>
          </RadioGroup>

          {hasSelectedAddress && (
            <Button
              className="w-full"
              onClick={() => router.push("/cart/payment")}
              disabled={!hasItems}
            >
              Continuar com o pagamento
            </Button>
          )}
          {hasSelectedAddress && !hasItems && (
            <p className="text-sm text-center text-destructive">
              Seu carrinho está vazio. Adicione produtos para continuar.
            </p>
          )}

          {showForm && (
            <Card>
              <CardHeader>
                <CardTitle>Dados do endereço</CardTitle>
              </CardHeader>
              <CardContent>
                <Form {...form}>
                  <form className="space-y-4">
                    <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                      <FormField
                        control={form.control}
                        name="recipientName"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Nome do Destinatário</FormLabel>
                            <FormControl>
                              <Input placeholder="Nome completo" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={form.control}
                        name="cpfOrCnpj"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>CPF</FormLabel>
                            <FormControl>
                              <Input
                                placeholder="000.000.000-00"
                                maxLength={14}
                                {...field}
                                onChange={(e) => {
                                  const formatted = formatCpf(e.target.value);
                                  field.onChange(formatted);
                                }}
                                onBlur={field.onBlur}
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>

                    <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                      <FormField
                        control={form.control}
                        name="email"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Email</FormLabel>
                            <FormControl>
                              <Input
                                type="email"
                                placeholder="email@exemplo.com"
                                {...field}
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={form.control}
                        name="phone"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Telefone</FormLabel>
                            <FormControl>
                              <Input placeholder="(00) 00000-0000" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>

                    <FormField
                      control={form.control}
                      name="street"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Rua</FormLabel>
                          <FormControl>
                            <Input placeholder="Nome da rua" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
                      <FormField
                        control={form.control}
                        name="number"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Número</FormLabel>
                            <FormControl>
                              <Input placeholder="123" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={form.control}
                        name="complement"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Complemento</FormLabel>
                            <FormControl>
                              <Input
                                placeholder="Apto, Bloco, etc."
                                {...field}
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={form.control}
                        name="zipCode"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>CEP</FormLabel>
                            <FormControl>
                              <Input
                                placeholder="00000-000"
                                maxLength={9}
                                {...field}
                                onChange={(e) => {
                                  const formatted = formatZipCode(
                                    e.target.value,
                                  );
                                  field.onChange(formatted);
                                }}
                                onBlur={field.onBlur}
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>

                    <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
                      <FormField
                        control={form.control}
                        name="neighborhood"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Bairro</FormLabel>
                            <FormControl>
                              <Input placeholder="Nome do bairro" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={form.control}
                        name="city"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Cidade</FormLabel>
                            <FormControl>
                              <Input placeholder="Nome da cidade" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={form.control}
                        name="state"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Estado</FormLabel>
                            <FormControl>
                              <Input placeholder="UF" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>

                    <FormField
                      control={form.control}
                      name="country"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>País</FormLabel>
                          <FormControl>
                            <Input {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <Button
                      type="submit"
                      className="w-full cursor-pointer"
                      disabled={isSaving || form.formState.isSubmitting}
                      onClick={form.handleSubmit(handleSubmit)}
                    >
                      {(isSaving || form.formState.isSubmitting) && (
                        <Loader2 className="mr-2 w-4 h-4 animate-spin" />
                      )}
                      Salvar endereço
                    </Button>
                  </form>
                </Form>
              </CardContent>
            </Card>
          )}
        </CardContent>
      </Card>

      <Card className="mt-6">
        <CardHeader>
          <CardTitle>Seu pedido</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-2">
            <div className="flex justify-between items-center text-base font-semibold md:text-lg">
              <p>Subtotal</p>
              <p className="text-muted-foreground">
                {formatCentsToBRL(cart?.totalPriceInCents ?? 0)}
              </p>
            </div>

            <div className="flex justify-between items-center text-base font-semibold md:text-lg">
              <p>Transporte e manuseio</p>
              <p className="text-muted-foreground">GRÁTIS</p>
            </div>

            <div className="flex justify-between items-center text-base font-semibold md:text-lg">
              <p>Taxa estimada</p>
              <p className="text-muted-foreground">R$ 0,00</p>
            </div>

            <div className="flex justify-between items-center text-base font-semibold md:text-lg">
              <p>Total</p>
              <p>{formatCentsToBRL(cart?.totalPriceInCents ?? 0)}</p>
            </div>
          </div>

          <Separator className="my-4" />

          <div className="my-4">
            {cart?.items.map((item) => (
              <CartItem
                key={item.id}
                id={item.id ?? ""}
                productName={cart?.items[0].productVariant.product.name ?? ""}
                productVariantId={item.productVariant.id ?? ""}
                productVariantName={item.productVariant.name ?? ""}
                productVariantImageUrl={item.productVariant.imageUrl ?? ""}
                productVariantPriceInCents={
                  item.productVariant.priceInCents ?? 0
                }
                quantity={item.quantity ?? 0}
              />
            ))}
          </div>
        </CardContent>
      </Card>
    </>
  );
};
export default Addresses;
