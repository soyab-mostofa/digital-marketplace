"use client";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { State, editProduct } from "@/actions";
import { useEffect } from "react";
import { toast } from "sonner";
import { useFormState } from "react-dom";

type EditFormProps = {
  name?: string;
  smallDesc?: string;
  price?: number;
  id?: string;
};

export default function EditProductFrom({
  name,
  smallDesc,
  price,
  id,
}: EditFormProps) {
  const initialState: State = {
    status: undefined,
    errors: undefined,
    message: "",
  };

  const [state, formAction] = useFormState(editProduct, initialState);

  useEffect(() => {
    if (state.status === "success") {
      toast.success(state.message);
    } else if (state.status === "error") {
      toast.error(state.message);
      console.log(state.errors);
    }
  }, [state]);

  return (
    <div className="w-full px-4 py-12 sm:px-6 md:max-w-2xl md:mx-auto">
      <form action={formAction} className="grid gap-8">
        <div className="grid gap-4">
          <div className="flex items-center justify-between">
            <Label htmlFor="name" className="text-lg font-medium">
              Name
            </Label>
          </div>
          <Input
            name="name"
            defaultValue={name}
            className="rounded-md border border-input bg-background px-4 py-2 text-sm shadow-sm transition-colors focus:outline-none focus:ring-1 focus:ring-primary"
          />
        </div>
        <div className="grid gap-4">
          <div className="flex items-center justify-between">
            <Label htmlFor="small-description" className="text-lg font-medium">
              Small Description
            </Label>
          </div>
          <Textarea
            name="smallDesc"
            defaultValue={smallDesc}
            className="rounded-md border border-input bg-background px-4 py-2 text-sm shadow-sm transition-colors focus:outline-none focus:ring-1 focus:ring-primary"
          />
        </div>
        <div className="grid gap-4">
          <div className="flex items-center justify-between">
            <Label htmlFor="full-description" className="text-lg font-medium">
              Full Description
            </Label>
          </div>
          <Textarea
            id="full-description"
            placeholder="Enter a detailed description"
            rows={4}
            className="rounded-md border border-input bg-background px-4 py-2 text-sm shadow-sm transition-colors focus:outline-none focus:ring-1 focus:ring-primary"
          />
        </div>
        <div className="grid gap-4">
          <div className="flex items-center justify-between">
            <Label htmlFor="price" className="text-lg font-medium">
              Price
            </Label>
          </div>
          <Input
            name="price"
            defaultValue={price}
            type="number"
            placeholder="Enter the price"
            className="rounded-md border border-input bg-background px-4 py-2 text-sm shadow-sm transition-colors focus:outline-none focus:ring-1 focus:ring-primary"
          />
        </div>
        <div className="grid gap-4">
          <div className="flex items-center justify-between">
            <Label htmlFor="images" className="text-lg font-medium">
              Images
            </Label>
          </div>
          <div className="rounded-md border border-input bg-background px-4 py-2 text-sm shadow-sm transition-colors focus:outline-none focus:ring-1 focus:ring-primary" />
        </div>
        <div className="grid gap-4">
          <div className="flex items-center justify-between">
            <Label htmlFor="category" className="text-lg font-medium">
              Category
            </Label>
          </div>
          <Select>
            <SelectTrigger className="rounded-md border border-input bg-background px-4 py-2 text-sm shadow-sm transition-colors focus:outline-none focus:ring-1 focus:ring-primary">
              <SelectValue placeholder="Select a category" />
            </SelectTrigger>
            <SelectContent className="rounded-md border border-input bg-background px-4 py-2 text-sm shadow-sm transition-colors focus:outline-none focus:ring-1 focus:ring-primary">
              <SelectItem value="default">Select a category</SelectItem>
              <SelectItem value="electronics">Electronics</SelectItem>
              <SelectItem value="clothing">Clothing</SelectItem>
              <SelectItem value="home">Home</SelectItem>
              <SelectItem value="sports">Sports</SelectItem>
            </SelectContent>
          </Select>
          <input type="hidden" name="id" value={id} />
        </div>
        <Button
          type="submit"
          className="rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground shadow-sm transition-colors hover:bg-primary/90 focus:outline-none focus:ring-1 focus:ring-primary"
        >
          Save
        </Button>
      </form>
    </div>
  );
}
