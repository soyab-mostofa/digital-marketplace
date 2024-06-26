import ProductCard from "@/components/ProductCard";
import prisma from "@/lib/db";
import { type ProductCategory } from "@prisma/client";
import React from "react";

const getData = async (category: string) => {
  let c: ProductCategory | undefined;
  if (category === "template") {
    c = "template";
  } else if (category === "uikit") {
    c = "uikit";
  } else if (category === "icon") {
    c = "icon";
  } else {
    c = undefined;
  }

  const products = prisma.product.findMany({
    where: {
      category: c as ProductCategory,
    },
    select: {
      id: true,
      name: true,
      price: true,
      images: true,
      smallDesc: true,
      category: true,
    },
  });

  return products;
};

const CategoryPage = async ({ params }: { params: { category: string } }) => {
  const { category } = params;

  const products = await getData(category);

  return (
    <div className="max-w-7xl mx-auto px-4 md:px-8">
      <div className="grid grid-cols-1 gap-10 sm:grid-cols-2 lg:grid-cols-3 mt-4">
        {products.map((product) => (
          <ProductCard key={product.id} {...product} />
        ))}
      </div>
    </div>
  );
};

export default CategoryPage;
