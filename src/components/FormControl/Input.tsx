import React from "react";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "../ui/input";
import { useFormContext } from "react-hook-form";
const InputFormControl = ({
  label,
  name,
  type = "text",
}: {
  label: string;
  name: string;
  type?: string;
}) => {
  const form = useFormContext();
  console.log(type);

  return (
    <FormField
      control={form.control}
      name={name}
      render={({ field }) => (
        <FormItem>
          <FormLabel className="text-md font-semibold">{label}</FormLabel>
          <FormControl>
            {type === "file" ? (
              <Input
                type="file"
                onChange={(e) => {
                  const file = e.target.files ? e.target.files[0] : null;
                  field.onChange(file); // Handle file input change
                }}
              />
            ) : (
              <Input
                placeholder={`Enter the ${label}`}
                {...field}
                type={type}
              />
            )}
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  );
};

export default InputFormControl;
