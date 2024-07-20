import { ProductDetail } from "@/client/components/Product/ProductDetail";
import Layout from "@/client/components/layout";
import { SectionHeader } from "@/client/components/reuseable/SectionHeader";
import { notFound } from "next/navigation";
import React from "react";
import { SiteBreadcrumb } from "@/client/components/reuseable/SiteBreadcrumb";
import { getProductsReviews, getSingleProduct } from "@/server/context";
import { FlashProduct } from "@/client/components/Product/FlashProduct";
import { IProduct } from "@/server/models/Product";
import { ICategory } from "@/server/models/Category";
import { Reviews } from "./Reviews";
import { z } from "zod";
import { getServerSession } from "next-auth";
import Review from "@/server/models/Review";
import User from "@/server/models/User";
import dbConnect from "@/server/utils/db";
import { authOptions } from "@/client/lib/authOption";
import { calculateReviewStats } from "@/server/action/reviews/reviewStats";
import { getRelatedProducts } from "@/server/action/product/getRelatedProducts";

const schema = z.object({
  star: z
    .number()
    .int()
    .min(1, {
      message: "Please select a star rating",
    })
    .max(5, {
      message: "Please select a star rating",
    }),
  title: z
    .string()
    .min(15, {
      message: "Title must be at least 15 characters",
    })
    .max(60, {
      message: "Title must not exceed 60 characters",
    }),
  review: z
    .string()
    .min(50, {
      message: "Review must be at least 50 characters",
    })
    .max(500, {
      message: "Review must not exceed 500 characters",
    }),
});

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

  const productReviews = await getProductsReviews(product._id as string);
  const reviewStar = await calculateReviewStats(product._id as string);
  const productItems = await getRelatedProducts(product.category.slug);

  const onSubmitReview = async (data: FormData) => {
    "use server";
    try {
      const session = await getServerSession(authOptions);
      if (!session || !session.user.id) {
        console.error("User is not authenticated");
        throw new Error("User is not authenticated");
      }

      const reviewData = schema.safeParse({
        star: Number(data.get("star")),
        title: data.get("title"),
        review: data.get("review"),
      });

      if (!reviewData.success) {
        console.error("Error submitting review:", reviewData.error);
        return { error: reviewData.error, success: false };
      }

      const user = await User.findById(session.user.id);
      if (!user) {
        return { error: "User not found", success: false };
      }

      const { star, title, review } = reviewData.data;

      await dbConnect();

      await Review.create({
        user: user._id,
        product: product._id,
        star,
        title,
        review,
      });

      return { error: null, success: true };
    } catch (error) {
      console.error("Error submitting review:", error);
    }
  };
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
            {productItems?.slice(0, 4).map((product: any, index: any) => (
              <FlashProduct quickView={false} key={index} item={product} />
            ))}
          </div>
        </SectionHeader>

        <Reviews
          reviewStar={reviewStar}
          onSubmitReview={onSubmitReview}
          productReviews={productReviews ?? []}
        />
      </div>
    </Layout>
  );
};

export default SingleProduct;
