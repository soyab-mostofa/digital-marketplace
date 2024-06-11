"use server";
import prisma from "@/lib/db";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import { type ProductCategory } from "@prisma/client";
import { z } from "zod";

const productSchema = z.object({
  name: z.string().min(1, { message: "Name is required" }),
  price: z.number().min(1, { message: "Price must be positive" }),
  category: z.string().min(1, { message: "Category is required" }),
  smallDesc: z.string().min(10, { message: "Small description is required" }),
  desc: z.string().min(10, { message: "Description is required" }),
  images: z.array(z.string(), { message: "Images is required" }),
  productFile: z.string().min(1, { message: "Product file is required" }),
});

export type State = {
  status: undefined | "success" | "error";
  errors?: {
    [key: string]: string[];
  };
  message?: string | null;
};

export const createProduct = async (prevState: any, formData: FormData) => {
  const { getUser } = getKindeServerSession();
  const user = await getUser();

  if (!user) throw new Error("Please login first");

  const validateSchema = productSchema.safeParse({
    name: formData.get("name"),
    price: Number(formData.get("price")),
    category: formData.get("category"),
    smallDesc: formData.get("smallDesc"),
    desc: formData.get("desc"),
    images: JSON.parse(formData.get("images") as string),
    productFile: formData.get("productFile"),
  });

  if (!validateSchema.success) {
    const state: State = {
      status: "error",
      errors: validateSchema.error.flatten().fieldErrors,
      message: "there was an error with your inputs",
    };
    return state;
  }

  const product = await prisma.product.create({
    data: {
      name: validateSchema.data.name,
      price: validateSchema.data.price,
      smallDesc: validateSchema.data.smallDesc,
      desc: JSON.parse(validateSchema.data.desc),
      images: validateSchema.data.images,
      productFile: validateSchema.data.productFile,
      category: validateSchema.data.category as ProductCategory,
    },
  });

  const state: State = {
    status: "success",
    message: "Product created successfully",
  };

  return state;
};
