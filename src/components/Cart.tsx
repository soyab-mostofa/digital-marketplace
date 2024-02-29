"use client";
import React, { useEffect, useState } from "react";
import {
  Sheet,
  SheetContent,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "./ui/sheet";
import { ShoppingCart } from "lucide-react";
import { Separator } from "./ui/separator";
import { formatCurrency } from "@/lib/utils";
import Link from "next/link";
import { buttonVariants } from "./ui/button";
import Image from "next/image";
import { useCart } from "@/hooks/use-cart";
import { ScrollArea } from "./ui/scroll-area";
import CartItem from "./CartItem";

const Cart = () => {
  const { items } = useCart();
  const [isMounted, setIsMounted] = useState<boolean>(false);
  const itemCount = items.length;

  useEffect(() => {
    setIsMounted(true);
  }, []);

  const fee = 1;

  const cartTotal = items.reduce((total, { product }) => {
    return total + product.price;
  }, 0);
  return (
    <Sheet>
      <SheetTrigger className="group -m-2 p-2 flex items-center">
        <ShoppingCart
          aria-hidden
          className="text-gray-400 group-hover:text-gray-500 h-6 w-6 flex-shrink-0"
        />
        <span className="ml-2 font-medium text-sm text-gray-700 group-hover:text-gray-800">
          {isMounted ? itemCount : 0}
        </span>
      </SheetTrigger>
      <SheetContent className="flex w-full flex-col pr-0 sm:max-w-lg">
        <SheetHeader className="space-y-2.5 pr-6">
          <SheetTitle>{`Cart (${itemCount})`}</SheetTitle>
        </SheetHeader>
        {itemCount > 0 ? (
          <>
            <div className="flex w-full flex-col pr-6">
              {/* TODO: cart logic */}
              <ScrollArea>
                {items.map(({ product }) => (
                  <CartItem key={product.id} product={product} />
                ))}
              </ScrollArea>
            </div>
            <div className="space-y-4 pr-6">
              <Separator />
              <div className="space-y-1.5 pr-6">
                <div className="flex">
                  <span className="flex-1">Shipping</span>
                  <span>free</span>
                </div>
                <div className="flex">
                  <span className="flex-1">Transaction fee</span>
                  <span>{formatCurrency(fee)}</span>
                </div>
                <div className="flex">
                  <span className="flex-1">Total</span>
                  <span>{formatCurrency(cartTotal + fee)}</span>
                </div>
              </div>

              <SheetFooter>
                <SheetTrigger asChild>
                  <Link
                    href="/cart"
                    className={buttonVariants({
                      className: "w-full",
                    })}
                  >
                    Continue to checkout
                  </Link>
                </SheetTrigger>
              </SheetFooter>
            </div>
          </>
        ) : (
          <div className="flex h-full flex-col justify-center items-center space-y-1">
            <div className="relative mb-4 h-60 w-60 text-muted-foreground">
              <Image
                src="/hippo-empty-cart.png"
                aria-hidden
                alt="Hippo empty cart"
                fill
              />
            </div>
            <div className="text-xl font-semibold">Your cart is empty</div>
            <SheetTrigger asChild>
              <Link
                href="/products"
                className={buttonVariants({
                  variant: "link",
                  className: "text-sm text-muted-foreground",
                  size: "sm",
                })}
              >
                Add items to your cart you checkout
              </Link>
            </SheetTrigger>
          </div>
        )}
      </SheetContent>
    </Sheet>
  );
};

export default Cart;
