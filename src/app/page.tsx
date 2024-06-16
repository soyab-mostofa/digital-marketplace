import Navbar from "@/components/Navbar";
import NewestProducts from "@/components/NewestProducts";
import Image from "next/image";

export default function Home() {
  return (
    <section className="max-w-7xl mx-auto px-4 md:px-8 mb-24">
      <div className="max-w-3xl mx-auto text-2xl sm:text-5xl lg:text-6xl font-semibold text-center ">
        <h1>Find the best</h1>
        <h1 className="text-blue-700">UI and UX for your next project</h1>
        <p className="md:text-lg mt-5 w-[90%] mx-auto text-muted-foreground ">
          Lorem, ipsum dolor sit amet consectetur adipisicing elit. Asperiores
          aliquam excepturi sequi praesentium recusandae, aspernatur repudiandae
          ab voluptatem nulla, magnam iure facere esse quo ea. Repellendus rerum
          eum iusto voluptatum asperiores? Impedit rem sint sit temporibus. Enim
          repellendus, voluptates molestiae incidunt quibusdam quos fuga dolor
          eveniet saepe amet perspiciatis officia.
        </p>
      </div>
      <NewestProducts />
    </section>
  );
}
