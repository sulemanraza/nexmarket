import "server-only";
import mongoose from "mongoose";
import Category, { ICategory } from "../models/Category";
import Product, { IProduct } from "../models/Product";
import dbConnect from "../utils/db";

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
export const getAllProducts = async (): Promise<IProduct[]> => {
  await connectToDB();
  const productItems = await Product.find({}).lean().populate("category");
  return productItems as IProduct[];
};

// ==================== Get a single product by slug =========================== //
export const getSingleProduct = async (
  slug: string
): Promise<(IProduct & { category: ICategory }) | null> => {
  await connectToDB();
  const product = await Product.findOne({ slug }).lean().populate("category");
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
