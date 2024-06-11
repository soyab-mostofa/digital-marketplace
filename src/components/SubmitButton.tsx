"use client";

import React from "react";
import { useFormStatus } from "react-dom";
import { Button } from "./ui/button";
import { Loader2 } from "lucide-react";

const SubmitButton = () => {
  const { pending } = useFormStatus();
  return (
    <div>
      {pending ? (
        <div>
          <Button disabled>
            <Loader2 className="mr-2 size-4 animate-spin" />
          </Button>
        </div>
      ) : (
        <Button type="submit">Submit your product</Button>
      )}
    </div>
  );
};

export default SubmitButton;
