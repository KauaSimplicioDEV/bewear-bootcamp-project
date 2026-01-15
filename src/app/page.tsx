import CategorySelector from "@/components/common/category-selector";
import Footer from "@/components/common/footer";
import { Header } from "@/components/common/header";
import PartnerList from "@/components/common/partner-list";
import ProductList from "@/components/common/product-list";
import { db } from "@/db";
import { productTable } from "@/db/schema";
import { desc } from "drizzle-orm";
import Image from "next/image";

const Home = async () => {
  const products = await db.query.productTable.findMany({
    with: {
      variants: true,
    },
  });
  const newlyCreatedProducts = await db.query.productTable.findMany({
    orderBy: [desc(productTable.createdAt)],
    with: {
      variants: true,
    },
  });
  const categories = await db.query.categoryTable.findMany({});

  return (
    <>
      <Header />
      <main className="flex-1">
        <div className="py-8 space-y-8 md:space-y-12">
          <div className="container px-5 mx-auto">
            <Image
              src="/bewear-banner01.svg"
              alt="Leve uma vida com estilo"
              height={0}
              width={0}
              sizes="100vw"
              className="w-full h-auto rounded-lg md:rounded-xl"
            />
          </div>

          <PartnerList title="Parceiros" />

          <ProductList products={products} title="Mais vendidos" />

          <CategorySelector categories={categories} />

          <div className="container px-5 mx-auto">
            <Image
              src="/bewear-banner02.svg"
              alt="Leve uma vida com estilo"
              height={0}
              width={0}
              sizes="100vw"
              className="w-full h-auto rounded-lg md:rounded-xl md:hidden"
            />
          </div>

          <ProductList products={newlyCreatedProducts} title="Novos produtos" />
        </div>
      </main>
      <Footer />
    </>
  );
};

export default Home;
