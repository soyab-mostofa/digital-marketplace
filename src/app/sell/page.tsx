import { SelectCategory } from "@/components/SelectCategory";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import React from "react";
import { TaptapEditor } from "@/components/Editor";
import { UploadDropzone } from "@/lib/uploadthing";
import { Button } from "@/components/ui/button";

const page = () => {
  return (
    <section className="max-w-7xl w-full mx-auto px-4 md:px-8">
      <Card>
        <form>
          <CardHeader>
            <CardTitle>Sell your product</CardTitle>
            <CardDescription>Please describe your product</CardDescription>
          </CardHeader>
          <CardContent className="flex flex-col gap-y-10">
            <div className="flex flex-col gap-y-2">
              <Label>Product name</Label>
              <Input placeholder="Product name" type="text" />
            </div>
            <div className="flex flex-col gap-y-2">
              <Label>Select Category</Label>
              <SelectCategory />
            </div>
            <div className="flex flex-col gap-y-2">
              <Label>Product price</Label>
              <Input placeholder="+1$" type="number" />
            </div>
            <div className="flex flex-col gap-y-2">
              <Label>Product summery</Label>
              <Textarea placeholder="Please provide a description of your product" />
            </div>
            <div className="flex flex-col gap-y-2">
              <Label>Product description</Label>
              <TaptapEditor />
            </div>

            <div className="flex flex-col gap-y-2">
              <Label>Product image</Label>
              <UploadDropzone endpoint="imageUploader" />
            </div>

            <div className="flex flex-col gap-y-2">
              <Label>Product file</Label>
              <UploadDropzone endpoint="productFileUploader" />
            </div>
          </CardContent>

          <CardFooter className="mt-5">
            <Button>Submit product</Button>
          </CardFooter>
        </form>
      </Card>
    </section>
  );
};

export default page;
