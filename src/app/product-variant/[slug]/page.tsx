import ProductActions from "./components/product-actions";
import VariantSelector from "./components/variant-selector";
import Footer from "@/components/common/footer";
import { Header } from "@/components/common/header";
import ProductList from "@/components/common/product-list";
import { db } from "@/db";
import { productTable, productVariantTable } from "@/db/schema";
import { formatCentsToBRL } from "@/helpers/money";
import { eq } from "drizzle-orm";
import Image from "next/image";
import { notFound } from "next/navigation";

export const dynamic = 'force-dynamic';

interface ProductVariantPageProps {
  params: Promise<{ slug: string }>;
}

const ProductVariantPage = async ({ params }: ProductVariantPageProps) => {
  const { slug } = await params;
  const productVariant = await db.query.productVariantTable.findFirst({
    where: eq(productVariantTable.slug, slug),
    with: {
      product: {
        with: {
          variants: true,
        },
      },
    },
  });
  if (!productVariant) {
    return notFound();
  }
  const likelyProducts = await db.query.productTable.findMany({
    where: eq(productTable.categoryId, productVariant.product.categoryId),
    with: {
      variants: true,
    },
  });
  return (
    <>
      <Header />
      <main className="flex-1">
        <div className="container mx-auto px-5 py-6 md:py-8 lg:py-12">
          <div className="flex flex-col lg:flex-row lg:gap-12 space-y-6 lg:space-y-0">
            {/* Imagem */}
            <div className="w-full lg:w-1/2">
              <Image
                src={productVariant.imageUrl}
                alt={productVariant.name}
                sizes="(max-width: 1024px) 100vw, 50vw"
                width={0}
                height={0}
                className="h-auto w-full object-cover rounded-lg md:rounded-xl"
              />
            </div>

            <div className="w-full lg:w-1/2 space-y-6">
              <div>
                <h2 className="text-xl md:text-2xl lg:text-3xl font-semibold mb-2">
                  {productVariant.product.name}
                </h2>
                <h3 className="text-muted-foreground text-sm md:text-base mb-4">
                  {productVariant.name}
                </h3>
                <h3 className="text-2xl md:text-3xl font-semibold">
                  {formatCentsToBRL(productVariant.priceInCents)}
                </h3>
              </div>

              <VariantSelector
                selectedVariantSlug=""
                variants={productVariant.product.variants}
              />

              <ProductActions productVariantId={productVariant.id} />

              <div>
                <h4 className="text-base md:text-lg font-semibold mb-2">Descrição</h4>
                <p className="text-sm md:text-base text-muted-foreground leading-relaxed">
                  {productVariant.product.description}
                </p>
              </div>
            </div>
          </div>

          <div className="mt-12 lg:mt-16">
            <ProductList title="Talvez você goste" products={likelyProducts} />
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
};

export default ProductVariantPage;
