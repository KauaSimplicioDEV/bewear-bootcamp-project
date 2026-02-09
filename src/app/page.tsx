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
        <div className="py-8 space-y-8 md:space-y-12 lg:space-y-16 xl:space-y-20">
          {/* Banner Principal - Mobile mostra banner01, Desktop mostra home-desktop */}
          <div className="container px-5 mx-auto lg:px-8 xl:px-12 2xl:px-16">
            {/* Banner Mobile */}
            <Image
              src="/bewear-banner01.svg"
              alt="Leve uma vida com estilo"
              height={0}
              width={0}
              sizes="100vw"
              className="block md:hidden w-full h-auto rounded-lg"
            />
            {/* Banner Desktop */}
            <Image
              src="/bewear-home-desktop.svg"
              alt="Leve uma vida com estilo"
              height={0}
              width={0}
              sizes="100vw"
              className="hidden md:block w-full h-auto rounded-lg md:rounded-xl lg:rounded-2xl xl:rounded-3xl"
            />
          </div>

          <PartnerList title="Parceiros" />

          <ProductList products={products} title="Mais vendidos" />

          <CategorySelector categories={categories} />

          {/* Banner Secundário - Apenas Mobile */}
          <div className="container px-5 mx-auto md:hidden">
            <Image
              src="/bewear-banner02.svg"
              alt="Leve uma vida com estilo"
              height={0}
              width={0}
              sizes="100vw"
              className="w-full h-auto rounded-lg"
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
