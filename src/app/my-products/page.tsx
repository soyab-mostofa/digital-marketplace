import prisma from "@/lib/db";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import React from "react";
import Unauthorized from "@/components/Unauthorized";
import ProductCard from "@/components/ProductCard";
import { type Product } from "@prisma/client";

const getData = (userId: string) => {
  return prisma.product.findMany({
    where: {
      userId,
    },
    select: {
      id: true,
      name: true,
      price: true,
      images: true,
      smallDesc: true,
    },
  });
};

const page = async () => {
  const { getUser } = getKindeServerSession();

  const user = await getUser();

  if (!user) {
    return <Unauthorized />;
  }

  const products = await getData(user.id);
  console.log(products);

  return (
    <div>
      <div className="max-w-7xl mx-auto px-4 md:px-8">
        <h2 className="text-2xl font-bold py-5">My Products</h2>
        <div className="grid grid-cols-1 gap-10 sm:grid-cols-2 lg:grid-cols-3 mt-4">
          {products.map((product) => (
            <ProductCard key={product.id} {...product} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default page;
