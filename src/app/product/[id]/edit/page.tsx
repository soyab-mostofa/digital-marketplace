import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import EditProductFrom from "./EditForm";
import prisma from "@/lib/db";

export default async function EditProductPage({
  params,
}: {
  params: { id: string };
}) {
  const { getUser } = getKindeServerSession();

  const user = await getUser();

  if (!user) {
    return (
      <>
        <h1>You are not logged in</h1>
      </>
    );
  }

  const product = await prisma.product.findUnique({
    where: {
      id: params.id,
    },
    select: {
      name: true,
      smallDesc: true,
      price: true,
    },
  });

  return (
    <EditProductFrom
      id={params.id}
      name={product?.name}
      smallDesc={product?.smallDesc}
      price={product?.price}
    />
  );
}
