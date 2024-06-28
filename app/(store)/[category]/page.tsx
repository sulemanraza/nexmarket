import { FlashProduct } from "@/client/components/Product/FlashProduct";
import Layout from "@/client/components/layout";
import { SiteBreadcrumb } from "@/client/components/reuseable/SiteBreadcrumb";
import { getSingleCategory } from "@/server/context";
import { notFound } from "next/navigation";
import React from "react";

const CategoryPage = async ({ params }: any) => {
  const data = await getSingleCategory(params?.category);

  if (!data) {
    return notFound();
  }

  const { productItems, category } = data;

  return (
    <Layout>
      <div className="container py-10 space-y-10">
        <SiteBreadcrumb
          links={[
            {
              title: "Category",
            },
            {
              title: category.name?.toUpperCase() || "",
            },
          ]}
        />
        <div className="relative grid grid-cols-1 gap-4  md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {productItems.map((product, index) => (
            <FlashProduct quickView={false} key={index} item={product} />
          ))}
        </div>
      </div>
    </Layout>
  );
};

export default CategoryPage;
