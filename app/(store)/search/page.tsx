import { FlashProduct } from "@/client/components/Product/FlashProduct";
import Layout from "@/client/components/layout";
import { SiteBreadcrumb } from "@/client/components/reuseable/SiteBreadcrumb";
import { getAllProducts } from "@/server/context";
import React from "react";

const Search = async () => {
  const products = await getAllProducts();

  return (
    <Layout>
      <div className="container py-10 space-y-10">
        <SiteBreadcrumb links={[{ title: "Search" }]} />
        <h1 className="flex items-center gap-2">
          <strong>Search Page</strong>
          <span>({products.length} results found)</span>
        </h1>

        <div className="grid gap-4 grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 ">
          {/* search results */}
          {products.slice(0, 16).map((product, index) => (
            <FlashProduct key={index} item={product} showDelete={false} />
          ))}
        </div>
      </div>
    </Layout>
  );
};

export default Search;
