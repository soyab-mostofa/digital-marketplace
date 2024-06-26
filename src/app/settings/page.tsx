import SettingsForm from "@/components/forms/SettingsForm";
import { Card } from "@/components/ui/card";
import prisma from "@/lib/db";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import React from "react";

const getData = async (userId: string) => {
  const data = await prisma.user.findFirst({
    where: {
      id: userId,
    },
    select: {
      firstName: true,
      lastName: true,
      email: true,
    },
  });
  return data;
};

const SettingsPage = async () => {
  const { getUser } = getKindeServerSession();

  const user = await getUser();

  if (!user) {
    return <div className="grid place-self-center">You are not logged in</div>;
  }

  const data = await getData(user.id);

  return (
    <section className="max-w-7xl mx-auto px-4 md:px-8">
      <Card>
        <SettingsForm
          firstName={data?.firstName as string}
          lastName={data?.lastName as string}
          email={data?.email as string}
        />
      </Card>
    </section>
  );
};

export default SettingsPage;
