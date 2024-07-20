"use server";
import mongoose from "mongoose";
import Category, { ICategory } from "../models/Category";
import Product, { IProduct } from "../models/Product";
import dbConnect from "../utils/db";
import axios from "axios";
import Review, { IReview } from "../models/Review";

const BASE_URL = process.env.NEXT_APP_URL;

// =============== Helper function to connect to the database =============== //
const connectToDB = async () => {
  try {
    await dbConnect();
  } catch (error) {
    console.error("Database connection error:", error);
  }
};

// ================== Get all categories =========================== //
export const getAllCategories = async (): Promise<ICategory[]> => {
  await connectToDB();
  const categories = await Category.find({}).lean();
  return categories as ICategory[];
};

// ================== Get a single category and its products =========================== //
export const getSingleCategory = async (
  slug: string
): Promise<{ category: ICategory; productItems: IProduct[] } | null> => {
  await connectToDB();

  const category = (await Category.findOne({ slug }).lean()) as ICategory;
  if (!category || !category._id) {
    return null;
  }

  const productItems = await Product.find({ category: category._id })
    .lean()
    .populate<{ category: ICategory }>("category");

  return {
    category,
    productItems: productItems as unknown as IProduct[],
  };
};

// ===================== Get all products =========================== //
export const getAllProducts = async () => {
  try {
    const request = await axios.get(BASE_URL + "/api/product");
    const productItems = await request.data;

    return productItems || [];
  } catch (error) {
    console.error("Error fetching products:", error);
    return [];
  }
};

// ==================== Get a single product by slug =========================== //
export const getSingleProduct = async (
  slug: string
): Promise<(IProduct & { category: ICategory }) | null> => {
  await dbConnect();
  const product: any = await Product.findOne({ slug })
    .lean()
    .populate("category");

  if (!product) return null;

  const reviewStats = await Review.aggregate([
    { $match: { product: product._id } },
    {
      $group: {
        _id: "$product",
        averageRating: { $avg: "$star" },
        numReviews: { $sum: 1 },
      },
    },
  ]);

  const stats = reviewStats[0] || { averageRating: 0, numReviews: 0 };
  product.rating = stats.averageRating;
  product.numReviews = stats.numReviews;

  return (product as IProduct & { category: ICategory }) || null;
};

// ==================== Get related products by category slug =========================== //
export const getRelatedProducts = async (slug: string): Promise<IProduct[]> => {
  await connectToDB();

  const category = (await Category.findOne({ slug }).lean()) as ICategory;
  if (!category || !category._id) {
    return [];
  }

  const productItems = await Product.find({ category: category._id })
    .lean()
    .populate<{ category: ICategory }>("category");

  return productItems as unknown as IProduct[];
};

// ==================== Get products by category ID =========================== //
export const getProductsByCategory = async (
  categoryId: string
): Promise<IProduct[]> => {
  if (!mongoose.Types.ObjectId.isValid(categoryId)) return [];

  await connectToDB();
  const productItems = await Product.find({
    category: new mongoose.Types.ObjectId(categoryId),
  })
    .lean()
    .populate("category");

  return productItems as IProduct[];
};

// ==================== Get products by Reviews =========================== //
export const getProductsReviews = async (
  productId: string
): Promise<IReview[]> => {
  await connectToDB();
  const productItems = await Review.find({
    product: new mongoose.Types.ObjectId(productId),
  })
    .lean()
    .populate({
      path: "user",
      select: "name",
    });

  return productItems as IReview[];
};
