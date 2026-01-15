import { z } from "zod";

export const saveShippingAddressSchema = z.object({
  recipientName: z.string().min(1),
  street: z.string().min(1),
  number: z.string().min(1),
  complement: z.string().optional(),
  city: z.string().min(1),
  state: z.string().min(1),
  neighborhood: z.string().min(1),
  zipCode: z.string().min(8),
  country: z.string().min(1),
  phone: z.string().min(10),
  email: z.string().email(),
  cpfOrCnpj: z.string().min(11),
});

export type SaveShippingAddressSchema = z.infer<
  typeof saveShippingAddressSchema
>;
