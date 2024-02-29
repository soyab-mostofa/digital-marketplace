import { PRODUCT_CATEGORIES } from "@/config";
import { useCart } from "@/hooks/use-cart";
import { formatCurrency } from "@/lib/utils";
import { Product } from "@/payload-types";
import { ImageIcon, X } from "lucide-react";
import Image from "next/image";

const CartItem = ({ product }: { product: Product }) => {
  const { removeFromCart } = useCart();
  const label = PRODUCT_CATEGORIES.find(
    ({ value }) => value === product.category
  )?.label;
  const { image } = product.images[0];
  return (
    <div className="space-y-3 py-2">
      <div className="flex items-start justify-between gap-4">
        <div className="flex space-x-4 items-center">
          <div className="relative aspect-square h-16 w-16 overflow-hidden max-w-fit rounded">
            {typeof image !== "string" && image.url ? (
              <Image
                src={image.url}
                alt={product.name}
                className="object-cover absolute"
                fill
              />
            ) : (
              <div className="h-full flex items-center justify-center bg-secondary">
                <ImageIcon
                  aria-hidden
                  className="h-4 w-4 text-muted-foreground"
                />
              </div>
            )}
          </div>
          <div className="flex items-start flex-col">
            <span className="line-clamp-1 font-medium text-sm mb-1">
              {product.name}
            </span>

            <span className="line-clamp-1 text-muted-foreground capitalize text-xs">
              {label}
            </span>

            <div
              onClick={() => removeFromCart(product.id)}
              className="mt-4 flex items-center gap-2 cursor-pointer text-muted-foreground text-xs"
            >
              <X className="w-3 h-3" /> Remove
            </div>
          </div>
        </div>
        <div className="flex flex-col space-y-1 font-medium">
          <span className="ml-auto line-clamp-1 text-sm">
            {formatCurrency(product.price)}
          </span>
        </div>
      </div>
    </div>
  );
};

export default CartItem;
