"use client";
import { PhoneInput } from "react-international-phone";
import "react-international-phone/style.css";
import CountryList from "@/server/db/countryList.json";
import React, { FC } from "react";
import { Button } from "@/client/components/ui/button";
import { useForm } from "react-hook-form";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/client/components/ui/form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/client/components/ui/select";
import { useToast } from "@/client/components/ui/use-toast";

export const addressSchema = z.object({
  phone: z.string().min(1, "Phone Number is required"),
  street: z.string().min(1, "Street Address is required"),
  city: z.string().min(1, "City is required"),
  postalCode: z.string().min(1, "Postal Code is required"),
  country: z.string().min(1, "Country is required"),
});

interface ShippingAddressProps {
  defaultValues: any;
  updateAddress: any;
}

export const ChangeAddress: FC<ShippingAddressProps> = ({
  defaultValues,
  updateAddress,
}) => {
  const { toast } = useToast();
  const form = useForm({
    resolver: zodResolver(addressSchema),
    defaultValues: {
      ...defaultValues,
    },
  });

  const onSubmit = async (data: any) => {
    try {
      const formData = new FormData();
      formData.append("phone", data.phone);
      formData.append("street", data.street);
      formData.append("city", data.city);
      formData.append("postalCode", data.postalCode);
      formData.append("country", data.country);

      const response = await updateAddress(formData);

      if (response.success) {
        toast({
          title: "Address Updated",
          description: "Your address has been updated successfully",
          variant: "success",
        });
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6 w-full">
        <FormField
          control={form.control}
          name={"phone"}
          render={({ field }) => (
            <FormItem className="flex flex-col">
              <FormLabel>Phone</FormLabel>
              <FormControl>
                <PhoneInput
                  inputStyle={{
                    borderRadius: "0.375rem",
                    padding: "0.5rem",
                    backgroundColor: "#F5F5F5",
                    border: "1px solid #D9D9D9",
                    width: "95%",
                  }}
                  defaultCountry={"US"}
                  value={form.watch("phone")}
                  onChange={(phone) => form.setValue("phone", phone)}
                  required
                />
              </FormControl>
              <FormMessage className="text-xs" />
            </FormItem>
          )}
        />
        <InputFiled
          form={form}
          label="Street Address"
          id="street"
          name="street"
        />

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          <InputFiled form={form} label="City" id="city" name="city" />
          <InputFiled
            form={form}
            label="Postal Code"
            id="postalCode"
            name="postalCode"
          />
        </div>

        <FormField
          control={form.control}
          name="country"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Country</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Select a  Country" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {CountryList.map((country, index) => {
                    return (
                      <SelectItem key={index} value={country.name}>
                        {country.name}
                      </SelectItem>
                    );
                  })}
                </SelectContent>
              </Select>

              <FormMessage />
            </FormItem>
          )}
        />

        <Button
          type="submit"
          className="bg-brand hover:bg-brand hover:opacity-90 min-w-fit w-full rounded-sm md:w-1/3 border-l border-r-0 border-y-0"
        >
          Place Order
        </Button>
      </form>
    </Form>
  );
};

interface InputFiledProps {
  form: any;
  label: string;
  type?: string;
  id: string;
  name: string;
}

const InputFiled: FC<InputFiledProps> = ({ form, label, type, id, name }) => {
  return (
    <FormField
      control={form.control}
      name={name}
      render={({ field }) => (
        <FormItem className="flex flex-col">
          <FormLabel>{label}</FormLabel>
          <FormControl>
            <input
              type={type || "text"}
              id={id}
              className="border h-[50px] rounded-sm p-2 bg-[#F5F5F5]"
              {...field}
            />
          </FormControl>
          <FormMessage className="text-xs" />
        </FormItem>
      )}
    />
  );
};
