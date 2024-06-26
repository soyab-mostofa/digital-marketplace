import Navbar from "@/components/Navbar";
import NewestProducts from "@/components/NewestProducts";
import { ProductRow } from "@/components/ProductRow";
import Image from "next/image";

export default function Home() {
  return (
    <section className="max-w-7xl mx-auto px-4 md:px-8 mb-24">
      <div className="max-w-3xl mx-auto text-2xl sm:text-5xl lg:text-6xl font-semibold text-center py-32 bg-red-300-200 shadow-sm min-w-full rounded-2xl ">
        <h1>Find the best</h1>
        <h1 className="text-blue-700">Design Faster, Build Better</h1>
        <p className="md:text-lg mt-5 w-[90%] mx-auto text-muted-foreground ">
          Streamline your workflow with our premium UX resources and
          customizable templates. From wireframes to fully-coded components,
          we've got everything you need to bring your digital products to life.
        </p>
      </div>
      <ProductRow category="newest" />
      <ProductRow category="ui-kits" />
      <ProductRow category="icons" />
      <ProductRow category="templates" />
    </section>
  );
}
