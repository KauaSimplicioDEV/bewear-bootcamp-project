"use server";

import { AddProductToCartSchema, addProductToCartSchema } from "./schema";
import { db } from "@/db";
import { cartItemTable, cartTable } from "@/db/schema";
import { auth } from "@/lib/auth";
import { eq } from "drizzle-orm";
import { headers } from "next/headers";

export const addProductToCart = async (data: AddProductToCartSchema) => {
  try {
    addProductToCartSchema.parse(data);
  } catch (error) {
    console.error("Validation error:", error);
    console.error("Data received:", data);
    throw new Error("Dados inválidos");
  }
  
  const session = await auth.api.getSession({
    headers: await headers(),
  });
  if (!session?.user) {
    throw new Error("Unauthorized");
  }
  
  console.log("Adding to cart - ProductVariantId:", data.productVariantId);
  
  const productVariant = await db.query.productVariantTable.findFirst({
    where: (productVariant, { eq }) =>
      eq(productVariant.id, data.productVariantId),
  });
  
  if (!productVariant) {
    console.error("Product variant not found:", data.productVariantId);
    throw new Error("Product variant not found");
  }
  const cart = await db.query.cartTable.findFirst({
    where: (cart, { eq }) => eq(cart.userId, session.user.id),
  });
  let cartId = cart?.id;
  if (!cartId) {
    const [newCart] = await db
      .insert(cartTable)
      .values({
        userId: session.user.id,
      })
      .returning();
    cartId = newCart.id;
  }
  const cartItem = await db.query.cartItemTable.findFirst({
    where: (cartItem, { eq }) =>
      eq(cartItem.cartId, cartId) &&
      eq(cartItem.productVariantId, data.productVariantId),
  });
  if (cartItem) {
    await db
      .update(cartItemTable)
      .set({
        quantity: cartItem.quantity + data.quantity,
      })
      .where(eq(cartItemTable.id, cartItem.id));
    return;
  }
  await db.insert(cartItemTable).values({
    cartId,
    productVariantId: data.productVariantId,
    quantity: data.quantity,
  });
};
