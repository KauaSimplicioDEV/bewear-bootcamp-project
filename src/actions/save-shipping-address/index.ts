"use server";

import { saveShippingAddressSchema } from "./schema";
import { db } from "@/db";
import { shippingAddressTable } from "@/db/schema";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { z } from "zod";

export const saveShippingAddress = async (
  data: z.infer<typeof saveShippingAddressSchema>,
) => {
  saveShippingAddressSchema.parse(data);
  const session = await auth.api.getSession({
    headers: await headers(),
  });
  if (!session?.user) {
    throw new Error("Unauthorized");
  }

  const [newAddress] = await db
    .insert(shippingAddressTable)
    .values({
      userId: session.user.id,
      recipientName: data.recipientName,
      street: data.street,
      number: data.number,
      complement: data.complement || null,
      city: data.city,
      state: data.state,
      neighborhood: data.neighborhood,
      zipCode: data.zipCode,
      country: data.country,
      phone: data.phone,
      email: data.email,
      cpfOrCnpj: data.cpfOrCnpj,
    })
    .returning();

  return newAddress;
};
