"use client";
import React, { useEffect } from "react";
import {
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "./ui/card";
import { Input } from "./ui/input";
import SubmitButton from "./SubmitButton";
import { useForm } from "react-hook-form";
import { useFormState } from "react-dom";
import { State, updateUserSettings } from "@/actions";
import { toast } from "sonner";
import { Label } from "./ui/label";

type SettingsFormProps = {
  firstName: string;
  lastName: string;
  email: string;
};

const SettingsForm = ({ firstName, lastName, email }: SettingsFormProps) => {
  const initialState: State = {
    status: undefined,
    errors: undefined,
    message: "",
  };
  const [state, formAction] = useFormState(updateUserSettings, initialState);

  useEffect(() => {
    console.log(state);
    if (state.status === "success") {
      toast.success(state.message);
    } else if (state.status === "error") {
      toast.error(state.message);
    }
  }, [state]);

  return (
    <form action={formAction}>
      <CardHeader>
        <CardTitle>Settings</CardTitle>
        <CardDescription>Your settings</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="flex flex-col gap-4">
          <div className="flex flex-col space-y-2">
            <Label htmlFor="firstName">First name</Label>
            <Input name="firstName" type="text" defaultValue={firstName} />
          </div>

          <div className="flex flex-col space-y-2">
            <Label htmlFor="firstName">Last name</Label>
            <Input name="lastName" type="text" defaultValue={lastName} />
          </div>

          <div className="flex flex-col space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input
              type="email"
              name="email"
              placeholder="Email"
              defaultValue={"test@test.com"}
              disabled
            />
          </div>
        </div>
      </CardContent>
      <CardFooter>
        <SubmitButton title="Save" />
      </CardFooter>
    </form>
  );
};

export default SettingsForm;
