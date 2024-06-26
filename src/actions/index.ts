"use server";
import prisma from "@/lib/db";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import { type ProductCategory } from "@prisma/client";
import * as z from "zod";

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
      User: {
        connect: {
          id: user.id,
        },
      },
    },
  });

  const state: State = {
    status: "success",
    message: "Product created successfully",
  };

  return state;
};
////////////////////////////////////////////////////////////////////////////////
// Settings form actions
////////////////////////////////////////////////////////////////////////////////

const userSettingsSchema = z.object({
  firstName: z
    .string()
    .min(1, { message: "First name is required" })
    .or(z.literal(""))
    .optional(),
  lastName: z
    .string()
    .min(1, { message: "Last name is required" })
    .or(z.literal(""))
    .optional(),
});

export async function updateUserSettings(prevState: any, formData: FormData) {
  const { getUser } = getKindeServerSession();
  const user = await getUser();

  if (!user) {
    throw new Error("something went wrong");
  }

  const validateFields = userSettingsSchema.safeParse({
    firstName: formData.get("firstName"),
    lastName: formData.get("lastName"),
  });

  if (!validateFields.success) {
    const state: State = {
      status: "error",
      errors: validateFields.error.flatten().fieldErrors,
      message: "Oops, I think there is a mistake with your inputs.",
    };

    return state;
  }

  const data = await prisma.user.update({
    where: {
      id: user.id,
    },
    data: {
      firstName: validateFields.data.firstName,
      lastName: validateFields.data.lastName,
    },
  });

  const state: State = {
    status: "success",
    message: "Your Settings have been updated",
  };

  return state;
}

const editProductSchema = z.object({
  name: z.string().min(1, { message: "Name is required" }),
  price: z.number().min(8, { message: "Price should be greater than 8" }),
  smallDesc: z.string().min(10, { message: "Small description is required" }),
  id: z.string().min(1, { message: "Id is required" }),
});

export async function editProduct(prevState: any, formData: FormData) {
  const { getUser } = getKindeServerSession();
  const user = await getUser();

  if (!user) {
    throw new Error("something went wrong");
  }

  const validateFields = editProductSchema.safeParse({
    name: formData.get("name"),
    price: Number(formData.get("price")),
    smallDesc: formData.get("smallDesc"),
    id: formData.get("id"),
  });

  if (!validateFields.success) {
    const state: State = {
      status: "error",
      errors: validateFields.error.flatten().fieldErrors,
      message: "Oops, I think there is a mistake with your inputs.",
    };

    return state;
  }

  const data = await prisma.product.update({
    where: {
      id: validateFields.data.id,
    },
    data: {
      name: validateFields.data.name,
      price: validateFields.data.price,
      smallDesc: validateFields.data.smallDesc,
    },
  });

  const state: State = {
    status: "success",
    message: "Your Settings have been updated",
  };

  return state;
}
