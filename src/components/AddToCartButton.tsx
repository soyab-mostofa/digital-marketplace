"use client";
import { useEffect, useState } from "react";
import { Button } from "./ui/button";
import { Product } from "@/payload-types";
import { useCart } from "@/hooks/use-cart";

const AddToCartButton = ({ product }: { product: Product }) => {
  const [isSuccess, setIsSuccess] = useState<boolean>(false);
  const { addToCart } = useCart();

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsSuccess(false);
    }, 1000);
    return () => clearTimeout(timer);
  }, [isSuccess]);

  return (
    <Button
      onClick={() => {
        addToCart(product);
        setIsSuccess(true);
      }}
      size="lg"
      className="w-full"
    >
      {isSuccess ? "Added to cart" : "Add to cart"}
    </Button>
  );
};

export default AddToCartButton;
