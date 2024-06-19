import { buttonVariants } from "@/components/ui/button";
import { Carousel, CarouselContent } from "@/components/ui/carousel";
import prisma from "@/lib/db";
import Link from "next/link";
import React from "react";

const getData = async (id: string) => {
  return await prisma.product.findUnique({
    where: {
      id,
    },
    select: {
      id: true,
      name: true,
      smallDesc: true,
      desc: true,
      price: true,
      images: true,
      category: true,
      User: {
        select: {
          profileImage: true,
          firstName: true,
        },
      },
    },
  });
};

const ProductPage = async ({ params }: { params: { id: string } }) => {
  const { id } = params;
  const data = await getData(id);

  if (!data) {
    return <div>Not found</div>;
  }
  return (
    <section className="max-w-7xl mx-auto px-4 Ig:px-8 lg:grid Ig:grid-rows-1 lg:grid-cols-7 lg:gap-x-8 lg:gap-y-10 xl:gap-x-16">
      <Link
        className={buttonVariants({ variant: "secondary" })}
        href={`/product/${id}/edit`}
      >
        Edit this product
      </Link>
      <Carousel className="lg:row-end-1 lg:col-span-4">
        <CarouselContent></CarouselContent>
      </Carousel>
    </section>
  );
};

export default ProductPage;
