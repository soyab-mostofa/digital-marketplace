import prisma from "@/lib/db";
import React from "react";
import ProductCard from "./ProductCard";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

const NewestProducts = async () => {
  const products = await prisma.product.findMany({
    orderBy: { createdAt: "desc" },
  });

  return (
    <section className="max-w-7xl mx-auto px-4 md:px-8 mb-10 flex flex-col gap-5 mt-10">
      <div className="flex items-center">
        <Link
          href="/"
          className="text-2xl flex items-center gap-2 text-blue-800 hover:text-blue-800/80 hover:underline"
        >
          <h2 className="font-semibold">Newest Products</h2>
          <span>
            <ArrowRight className="w-4 h-4" />
          </span>
        </Link>
      </div>
      <div className="grid gap-5 grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {products.map((product) => (
          <ProductCard key={product.id} {...product} />
        ))}
      </div>
    </section>
  );
};

export default NewestProducts;
