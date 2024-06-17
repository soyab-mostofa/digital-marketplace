import Image from "next/image";
import {
  Carousel,
  CarouselItem,
  CarouselContent,
  CarouselPrevious,
  CarouselNext,
} from "./ui/carousel";

interface ProductCardProps {
  images: string[];
  name: string;
  price: number;
  category: string;
  smallDesc: string;
}

const ProductCard = ({
  images,
  name,
  price,
  category,
  smallDesc,
}: ProductCardProps) => {
  return (
    <div className="rounded-lg">
      <Carousel className="w-full mx-auto">
        <CarouselContent>
          {images.map((item, index) => (
            <CarouselItem key={index}>
              <div className="relative h-[230px]">
                <Image
                  alt="Product image"
                  src={item}
                  fill
                  className="object-cover w-full h-full rounded-lg"
                />
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious className="ml-16" />
        <CarouselNext className="mr-16" />
      </Carousel>

      <div className="flex justify-between items-center mt-2">
        <h2 className="text-xl font-semibold">{name}</h2>
        <p
          className="inline-flex text-base text-primary px-2 py-1 rounded-md font-medium items-center bg-primary/10 ring-1 
        ring-inset ring-primary/20"
        >
          ${price}
        </p>
      </div>

      <p className="mt-2 text-sm text-gray-500 line-clamp-2">{smallDesc}</p>
    </div>
  );
};

export default ProductCard;
