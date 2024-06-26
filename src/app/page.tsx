import { ProductRow } from "@/components/ProductRow";

export default function Home() {
  return (
    <section className="max-w-7xl mx-auto px-4 md:px-8 mb-24">
      <div className="max-w-3xl mx-auto text-2xl sm:text-5xl lg:text-6xl font-semibold text-center py-32 bg-cyan-100 border border-cyan-400 min-w-full rounded-2xl ">
        <h1>Find the best</h1>
        <h1 className="text-blue-700">Design Faster, Build Better</h1>
        <p className="md:text-lg mt-5 w-[90%] mx-auto text-gray-600 ">
          Streamline your workflow with our premium UX resources and
          customizable templates. From wire-frames to fully-coded components,
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
