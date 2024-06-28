import { ProductDetail } from "@/client/components/Product/ProductDetail";
import Layout from "@/client/components/layout";
import { SectionHeader } from "@/client/components/reuseable/SectionHeader";
import { notFound } from "next/navigation";
import React from "react";
import { SiteBreadcrumb } from "@/client/components/reuseable/SiteBreadcrumb";
import { getRelatedProducts, getSingleProduct } from "@/server/context";
import { FlashProduct } from "@/client/components/Product/FlashProduct";
import { IProduct } from "@/server/models/Product";
import { ICategory } from "@/server/models/Category";

interface SingleProductProps {
  params: {
    product: string;
  };
}

interface PopulatedProduct extends Omit<IProduct, "category"> {
  category: ICategory;
}

const SingleProduct = async ({ params }: SingleProductProps) => {
  const product = (await getSingleProduct(
    params.product
  )) as PopulatedProduct | null;

  if (!product) return notFound();

  const productItems = await getRelatedProducts(product.category.slug);

  return (
    <Layout>
      <div className="container py-8 space-y-12">
        <SiteBreadcrumb
          links={[
            {
              title: `${product?.category.name}`,
              slug: `/${product?.category.slug}`,
            },
            { title: product.name },
          ]}
        />

        <ProductDetail product={product} />

        <SectionHeader title="Related Item" heading="">
          <div className="relative grid grid-cols-1 gap-4  md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {productItems.map((product, index) => (
              <FlashProduct quickView={false} key={index} item={product} />
            ))}
          </div>
        </SectionHeader>
      </div>
    </Layout>
  );
};

export default SingleProduct;
