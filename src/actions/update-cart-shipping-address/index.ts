"use server";

import { db } from "@/db";
import { cartTable } from "@/db/schema";
import { auth } from "@/lib/auth";
import { eq } from "drizzle-orm";
import { headers } from "next/headers";

export const updateCartShippingAddress = async (
  shippingAddressId: string | null,
) => {
  const session = await auth.api.getSession({
    headers: await headers(),
  });
  if (!session?.user) {
    throw new Error("Unauthorized");
  }

  const cart = await db.query.cartTable.findFirst({
    where: (cart, { eq }) => eq(cart.userId, session.user.id),
  });

  if (!cart) {
    throw new Error("Cart not found");
  }

  await db
    .update(cartTable)
    .set({ shippingAddressId })
    .where(eq(cartTable.id, cart.id));
};
