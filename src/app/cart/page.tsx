"use client";
import { Button } from "@/components/ui/button";
import { PRODUCT_CATEGORIES } from "@/config";
import { useCart } from "@/hooks/use-cart";
import { cn, formatCurrency } from "@/lib/utils";
import { trpc } from "@/trpc/client";
import { Check, Loader2, X } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
const Page = () => {
  const router = useRouter();
  const { items, removeFromCart } = useCart();

  const { mutate: createCheckoutSession, isLoading } =
    trpc.payment.createSession.useMutation({
      onSuccess: ({ url }) => {
        if (url) router.push(url);
      },
    });

  const productIds = items.map(({ product }) => product.id);
  const fee = 1;

  const cartTotal = items.reduce(
    (total, { product }) => total + product.price,
    0
  );

  const [isMounted, setIsMounted] = useState(false);
  useEffect(() => setIsMounted(true), []);

  return (
    <div className="mx-auto max-w-2xl px-4 pb-24 pt-16 sm:px-6 lg:max-w-7xl lg:px-8">
      <h1 className="font-bold tracking-tight text-3xl sm:text-4xl text-gray-900">
        Shopping Cart
      </h1>

      <div className="mt-12 lg:grid lg:grid-cols-12 lg:items-start lg:gap-x-12 xl:gap-x-16">
        <div
          className={cn("lg:col-span-7", {
            "rounded-lg border-dashed border-2 border-zinc-200 p-12":
              isMounted && items.length === 0,
          })}
        >
          <h2 className="sr-only">Items in your shopping cart</h2>
          {items.length === 0 ? (
            <div className="flex flex-col items-center justify-center space-y-1 h-full">
              <div
                aria-hidden
                className="h-40 w-40 relative text-muted-foreground"
              >
                <Image
                  src="/hippo-empty-cart.png"
                  alt="empty shopping cart"
                  fill
                  loading="eager"
                />
              </div>
              <h3 className="font-semibold text-2xl">
                Your shopping cart is empty
              </h3>
              <p className="text-muted-foreground text-center">
                Woops your cart is empty!
              </p>
            </div>
          ) : null}

          <ul
            className={cn({
              "divide divide-gray-200 border-t border-b border-gray-200":
                isMounted && items.length > 0,
            })}
          >
            {isMounted &&
              items.map(({ product }) => {
                const label = PRODUCT_CATEGORIES.find(
                  (c) => c.value === product.category
                )?.label;
                const { image } = product.images[0];

                return (
                  <li key={product.id} className="flex py-6 sm:py-10">
                    <div className="flex-shrink-0">
                      <div className="relative w-24 h-24">
                        {typeof image !== "string" && image.url ? (
                          <Image
                            src={image.url}
                            alt="product"
                            fill
                            className="object-cover h-full w-full rounded-md object-center sm:h-48 sm:w-48"
                          />
                        ) : null}
                      </div>
                    </div>
                    <div className="flex ml-4 flex-1 justify-between sm:ml-6">
                      <div className="relative pr-9 sm:grid sm:grid-cols-2 sm:gap-x-6 sm:pr-0">
                        <div>
                          <div className="flex justify-between">
                            <h3 className="text-sm">
                              <Link
                                href={`/product/${product.id}`}
                                className="font-medium text-gray-700 hover:text-gray-800"
                              >
                                {product.name}
                              </Link>
                            </h3>
                          </div>
                          <div className="flex mr-1 text-sm">
                            <p className="text-muted-foreground">
                              Category: {label}
                            </p>
                          </div>
                          <p className="text-gray-900 font-medium text-sm mt-1">
                            {formatCurrency(product.price)}
                          </p>
                        </div>
                        <div className="mt-4 sm:mt-0 sm:pr-9 w-10">
                          <Button
                            onClick={() => removeFromCart(product.id)}
                            variant="ghost"
                            aria-details="remove item"
                            className="absolute top-0 right-0"
                          >
                            <X aria-hidden className="size-5" />
                          </Button>
                        </div>
                        <p className="mt-4 text-sm flex space-x-2 text-gray-700">
                          <Check className="size-5 flex-shrink-0 text-gray-500" />
                          <span>Eligible for instant delivery</span>
                        </p>
                      </div>
                    </div>
                  </li>
                );
              })}
          </ul>
        </div>
        <section className="mt-16 py-6 px-4 sm:p-6 lg:col-span-5 lg:mt-0 lg:px-8">
          <h2 className="text-lg font-medium text-gray-900">Order Summery</h2>
          <div className="mt-6 space-y-4">
            <div className="flex items-center justify-between">
              <p className="text-sm text-gray-600">Subtotal</p>
              <p className="text-sm text-gray-900 font-medium">
                {isMounted ? (
                  formatCurrency(cartTotal)
                ) : (
                  <Loader2 className="animate-spin w-4 h-4 text-muted-foreground" />
                )}
              </p>
            </div>
            <div className="flex items-center justify-between border-t border-gray-200 pt-4">
              <div className="flex items-center text-sm text-muted-foreground">
                <span>Flat transacion fee</span>
              </div>
              <div className="font-medium text-sm text-gray-900">
                {isMounted ? (
                  formatCurrency(fee)
                ) : (
                  <Loader2 className="animate-spin w-4 h-4 text-muted-foreground" />
                )}
              </div>
            </div>
            <div className="flex items-center justify-between border-t pt-4">
              <div className="text-base font-medium text-gray-900">
                Order Total
              </div>
              <div className="text-base font-medium text-gray-900">
                {isMounted ? (
                  formatCurrency(cartTotal + fee)
                ) : (
                  <Loader2 className="animate-spin w-4 h-4 text-muted-foreground" />
                )}
              </div>
            </div>
          </div>
          <div className="mt-6">
            <Button
              onClick={() => createCheckoutSession({ productIds })}
              disabled={items.length === 0 || isLoading}
              className="w-full"
              size="lg"
            >
              {isLoading ? (
                <Loader2 className="w-4 h-4 animate-spin mr-1.5" />
              ) : null}
              Checkout
            </Button>
          </div>
        </section>
      </div>
    </div>
  );
};

export default Page;
