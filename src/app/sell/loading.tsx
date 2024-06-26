import { LoaderCircle } from "lucide-react";
import React from "react";

const SellLoading = () => {
  return (
    <div className="flex justify-center items-center">
      <LoaderCircle className=" animate-spin h-32 w-32" />
    </div>
  );
};

export default SellLoading;
