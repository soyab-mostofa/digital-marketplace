import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import prisma from "./db";

const getUser = async () => {
  const users = await prisma.user.findMany();
  return users;
};

const getProducts = async () => {
  const products = await prisma.product.findMany();
  return products;
};

export const script = async () => {
  const products = await getProducts();
  const users = await getUser();

  for (const product of products) {
    if (!product.userId) {
      await prisma.product.update({
        where: {
          id: product.id,
        },
        data: {
          User: {
            connect: {
              id: users[0].id,
            },
          },
        },
        include: {
          User: true,
        },
      });
    }
  }
  console.log("done");
};
