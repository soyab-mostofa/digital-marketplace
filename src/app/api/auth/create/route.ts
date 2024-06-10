import prisma from "@/lib/db";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import { NextRequest, NextResponse } from "next/server";

export async function GET() {
  const { getUser } = getKindeServerSession();

  const user = await getUser();

  if (!user) throw new Error("User not found");

  let dbUser = await prisma.user.findUnique({
    where: {
      id: user.id,
    },
  });
  console.log(dbUser);

  if (!dbUser) {
    dbUser = await prisma.user.create({
      data: {
        id: user.id,
        firstName: user.family_name ?? "",
        email: user.email ?? "",
        lastName: user.given_name ?? "",
        profileImage: user.picture ?? "",
      },
    });
  }

  return NextResponse.redirect("http://localhost:3000/");
}
