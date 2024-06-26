import ProductDescription from "@/components/ProductDescription";
import { Button, buttonVariants } from "@/components/ui/button";
import prisma from "@/lib/db";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import { JSONContent } from "@tiptap/react";
import Image from "next/image";
import Link from "next/link";
import Unauthorized from "@/components/Unauthorized";
import ProductImageSlider from "./ProductImageSlider";

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
      createdAt: true,
      User: {
        select: {
          id: true,
          profileImage: true,
          firstName: true,
        },
      },
    },
  });
};

const ProductPage = async ({ params }: { params: { id: string } }) => {
  const { getUser } = getKindeServerSession();
  const user = await getUser();

  if (!user) {
    return <Unauthorized />;
  }

  const { id } = params;
  const data = await getData(id);

  if (!data) {
    return <div>Not found</div>;
  }
  return (
    <section className="max-w-7xl mx-auto px-4 Ig:px-8 lg:grid pt-6 Ig:grid-rows-1 lg:grid-cols-7 lg:gap-x-8 lg:gap-y-10 xl:gap-x-16">
      <div className="lg:row-end-1 lg:col-span-4">
        <ProductImageSlider data={data.images} />
        {user?.id === data?.User?.id && (
          <Link
            className={buttonVariants({
              variant: "secondary",
              className: "mt-5",
            })}
            href={`/product/${id}/edit`}
          >
            Edit this product
          </Link>
        )}
      </div>

      <div className="Max-w-2xl mx-auto mt-5 lg:max-w-none lg:mt-0 lg:row-end-2 lg:row-span-2 lg:col-span-3">
        <h1 className="text-2xl font-extrabold tracking-tight text-gray-900 sm:text-3xl">
          {data?.name}
        </h1>

        <p className="mt-2 text-muted-foreground">{data?.smallDesc}</p>

        <div className="text-muted-foreground mt-6">
          <Button size="lg" className="w-full">
            Buy this product
          </Button>
        </div>

        <div className="border-t border-gray-200 mt-10 pt-10">
          <div className="grid grid-cols-2 w-full gap-y-3">
            <h3 className="text-sm font-medium text-muted-foreground col-span-1">
              Released:
            </h3>
            <h3 className="text-sm font-medium col-span-1">
              {new Intl.DateTimeFormat("en-US", {
                dateStyle: "long",
              }).format(data?.createdAt)}
            </h3>
            <h3 className="text-sm font-medium text-muted-foreground col-span-1">
              Creator
            </h3>
            <h3 className="text-sm font-medium col-span-1">
              {data?.User?.firstName}
            </h3>

            <h3 className="text-sm font-medium text-muted-foreground col-span-1">
              Category:
            </h3>

            <h3 className="text-sm font-medium col-span-1">{data?.category}</h3>
          </div>
        </div>

        <div className="border-t border-gray-200 mt-10"></div>
        <div className="w-full max-w-2xl mx-auto mt-16 lg:max-w-none lg:mt-0 lg:col-span-4 ">
          <ProductDescription content={data?.desc as JSONContent} />
        </div>
      </div>
    </section>
  );
};

export default ProductPage;
