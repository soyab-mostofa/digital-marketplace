"use client";

import { SelectCategory } from "@/components/SelectCategory";
import {
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useEffect, useState } from "react";
import { TaptapEditor } from "@/components/Editor";
import { UploadDropzone } from "@/lib/uploadthing";
import { JSONContent } from "@tiptap/react";
import { useFormState } from "react-dom";
import { State, createProduct } from "@/actions";
import { toast } from "sonner";
import SubmitButton from "@/components/SubmitButton";
import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";

const SellForm = () => {
  const initialState: State = { message: "", status: undefined };
  const [state, formAction] = useFormState(createProduct, initialState);
  const [json, setJson] = useState<null | JSONContent>(null);
  const [images, setImages] = useState<string[]>([]);
  const [file, setFile] = useState<null | string>(null);

  useEffect(() => {
    if (state?.status === "success") {
      toast.success(state?.message);
      revalidatePath("/");
      redirect("/");
    }
    if (state?.status === "error") {
      toast.error(state?.message);
    }
  }, [state]);
  return (
    <form action={formAction}>
      <CardHeader>
        <CardTitle>Sell your product</CardTitle>
        <CardDescription>Please describe your product</CardDescription>
      </CardHeader>
      <CardContent className="flex flex-col gap-y-10">
        <div className="flex flex-col gap-y-2">
          <Label>Product name</Label>
          <Input name="name" placeholder="Product name" type="text" />
          {state?.errors?.["name"]?.[0] && (
            <p className="text-destructive">{state?.errors?.["name"]?.[0]}</p>
          )}
        </div>
        <div className="flex flex-col gap-y-2">
          <Label>Select Category</Label>
          <SelectCategory />
          {state?.errors?.["category"]?.[0] && (
            <p className="text-destructive">
              {state?.errors?.["category"]?.[0]}
            </p>
          )}
        </div>
        <div className="flex flex-col gap-y-2">
          <Label>Product price</Label>
          <Input name="price" placeholder="+1$" type="number" />
          {state?.errors?.["price"]?.[0] && (
            <p className="text-destructive">{state?.errors?.["price"]?.[0]}</p>
          )}
        </div>
        <div className="flex flex-col gap-y-2">
          <Label>Product summery</Label>
          <Textarea
            name="smallDesc"
            placeholder="Please provide a description of your product"
          />
          {state?.errors?.["smallDesc"]?.[0] && (
            <p className="text-destructive">
              {state?.errors?.["smallDesc"]?.[0]}
            </p>
          )}
        </div>
        <div className="flex flex-col gap-y-2">
          <input type="hidden" name="desc" value={JSON.stringify(json)} />
          <Label>Product description</Label>
          <TaptapEditor json={json} setJson={setJson} />
          {state?.errors?.["desc"]?.[0] && (
            <p className="text-destructive">{state?.errors?.["desc"]?.[0]}</p>
          )}
        </div>

        <div className="flex flex-col gap-y-2">
          <input type="hidden" name="images" value={JSON.stringify(images)} />
          <Label>Product image</Label>
          <UploadDropzone
            endpoint="imageUploader"
            onClientUploadComplete={(res) => {
              setImages(res.map((i) => i.url));
              toast.success("Image uploaded successfully");
            }}
            onUploadError={(err: Error) => {
              toast.error("Image upload failed");
              throw new Error(`${err}`);
            }}
          />
          {state?.errors?.["images"]?.[0] && (
            <p className="text-destructive">{state?.errors?.["images"]?.[0]}</p>
          )}
        </div>

        <div className="flex flex-col gap-y-2">
          <input type="hidden" name="productFile" value={file ?? ""} />
          <Label>Product file</Label>
          <UploadDropzone
            endpoint="productFileUploader"
            onClientUploadComplete={(res) => {
              setFile(res[0].url);
              toast.success("File uploaded successfully");
            }}
            onUploadError={(err: Error) => {
              toast.error("File upload failed");
              throw new Error(`${err}`);
            }}
          />
          {state?.errors?.["productFile"]?.[0] && (
            <p className="text-destructive">
              {state?.errors?.["productFile"]?.[0]}
            </p>
          )}
        </div>
      </CardContent>

      <CardFooter className="mt-5">
        <SubmitButton title="Submit" />
      </CardFooter>
    </form>
  );
};

export default SellForm;
