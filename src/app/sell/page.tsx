import Unauthorized from "@/components/Unauthorized";
import SellForm from "@/components/forms/SellForm";
import { Card } from "@/components/ui/card";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";

const page = async () => {
  const { getUser } = getKindeServerSession();
  const user = await getUser();

  if (!user) {
    return <Unauthorized />;
  }

  return (
    <section className="max-w-7xl w-full mx-auto px-4 md:px-8">
      <Card>
        <SellForm />
      </Card>
    </section>
  );
};

export default page;
