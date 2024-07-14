"use client";
import { PhoneInput } from "react-international-phone";
import "react-international-phone/style.css";
import CountryList from "@/server/db/countryList.json";
import React, { FC } from "react";
import { Button } from "@/client/components/ui/button";
import { useForm } from "react-hook-form";
import { RadioGroup, RadioGroupItem } from "@/client/components/ui/radio-group";
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
import { Checkbox } from "@/client/components/ui/checkbox";
import { Label } from "@/client/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/client/components/ui/select";

export const schema = z.object({
  fullName: z.string().min(1, "Full Name is required"),
  phone: z.string().min(7, "Phone Number is required"),
  email: z.string().email("Invalid email address"),
  street: z.string().min(1, "Street Address is required"),
  city: z.string().min(1, "City is required"),
  postalCode: z.string().min(1, "Postal Code is required"),
  country: z.string().min(1, "Country is required"),
  saveAddress: z.boolean().default(false),
  paymentMethod: z.enum(["Paypal", "stripe"]).default("stripe"),
});

interface ShippingAddressProps {
  onSubmit: (data: any) => void;
}

export const ShippingAddress: FC<ShippingAddressProps> = ({ onSubmit }) => {
  const form = useForm({
    resolver: zodResolver(schema),
    defaultValues: {
      fullName: "",
      phone: "",
      email: "",
      street: "",
      city: "",
      postalCode: "",
      country: "",
      saveAddress: false,
      paymentMethod: "stripe",
    },
  });

  console.log("form.watch('phone')", form.watch("phone"));

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="space-y-6 w-full lg:w-5/12"
      >
        <InputFiled
          form={form}
          label="Full Name"
          id="fullName"
          name="fullName"
        />
        <InputFiled
          form={form}
          label="Street Address"
          id="street"
          name="street"
        />
        <InputFiled form={form} label="City" id="city" name="city" />
        <InputFiled
          form={form}
          label="Postal Code"
          id="postalCode"
          name="postalCode"
        />

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

        <InputFiled form={form} label="Email" id="email" name="email" />

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

        <FormField
          control={form.control}
          name="paymentMethod"
          render={({ field }) => (
            <FormItem className="space-y-3 border p-2 relative  ">
              <FormLabel className="absolute -top-2 left-2 bg-white px-1 text-xs font-medium">
                Payment Method <Label className="text-red-500">*</Label>
              </FormLabel>
              <FormControl className=" p-2">
                <RadioGroup
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                  className="flex flex-col space-y-1"
                >
                  <FormItem className="flex items-center space-x-3 space-y-0">
                    <FormControl>
                      <RadioGroupItem value="stripe" />
                    </FormControl>
                    <FormLabel className="font-normal">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width={70}
                        height={48}
                        fill="none"
                      >
                        <rect
                          width={69}
                          height={47}
                          x={0.5}
                          y={0.5}
                          fill="#fff"
                          stroke="#D9D9D9"
                          rx={5.5}
                        />
                        <path
                          fill="#6461FC"
                          fillRule="evenodd"
                          d="m37.61 16.284-3.555.763v-2.883l3.556-.749v2.869Zm-14.45-1.23-3.456.735-.014 11.32c0 2.092 1.572 3.632 3.669 3.632 1.162 0 2.012-.212 2.48-.466v-2.87c-.454.184-2.692.835-2.692-1.257v-5.017h2.691v-3.01h-2.692l.015-3.067Zm37.84 9.3c0-3.619-1.757-6.473-5.114-6.473-3.372 0-5.412 2.854-5.412 6.444 0 4.254 2.409 6.402 5.865 6.402 1.686 0 2.961-.382 3.924-.919v-2.826c-.963.48-2.068.777-3.47.777-1.375 0-2.593-.48-2.749-2.148h6.928c0-.078.005-.255.01-.459.009-.277.018-.603.018-.799Zm-6.998-1.343c0-1.597.977-2.261 1.87-2.261.864 0 1.785.664 1.785 2.26h-3.655Zm-39.214-2.063c-.75 0-1.204.212-1.204.763 0 .601.78.866 1.748 1.195 1.578.535 3.655 1.24 3.664 3.85 0 2.53-2.026 3.985-4.973 3.985-1.218 0-2.55-.24-3.867-.805v-3.364c1.19.65 2.691 1.13 3.867 1.13.794 0 1.36-.211 1.36-.861 0-.667-.845-.972-1.866-1.34-1.555-.56-3.517-1.266-3.517-3.62 0-2.502 1.912-4 4.788-4 1.176 0 2.338.183 3.514.65v3.32c-1.077-.578-2.437-.903-3.514-.903Zm15.456-1.781-.226-1.046h-3.06v12.366h3.541v-8.38c.836-1.089 2.253-.891 2.692-.736v-3.25c-.453-.17-2.11-.48-2.947 1.046Zm3.81-1.046h3.557v12.366h-3.556V18.12Zm8.175.862c.496-.452 1.388-1.102 2.777-1.102 2.479 0 4.816 2.233 4.83 6.331 0 4.48-2.309 6.515-4.844 6.515-1.247 0-1.998-.523-2.508-.89l-.014 3.999-3.542.749V18.107h3.117l.184.876Zm.255 7.97c.34.368.836.665 1.672.665 1.303 0 2.181-1.413 2.181-3.307 0-1.851-.892-3.293-2.181-3.293-.808 0-1.318.283-1.686.693l.014 5.243Z"
                          clipRule="evenodd"
                        />
                      </svg>
                    </FormLabel>
                  </FormItem>
                  <FormItem className="flex items-center space-x-3 space-y-0">
                    <FormControl>
                      <RadioGroupItem value="Paypal" />
                    </FormControl>
                    <FormLabel className="font-normal">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width={70}
                        height={48}
                        fill="none"
                      >
                        <rect
                          width={69}
                          height={47}
                          x={0.5}
                          y={0.5}
                          fill="#fff"
                          stroke="#D9D9D9"
                          rx={5.5}
                        />
                        <path
                          fill="#253B80"
                          fillRule="evenodd"
                          d="M19.8 30.482h-3.111a.432.432 0 0 0-.427.365l-1.259 7.978c-.025.157.097.3.257.3h1.485a.432.432 0 0 0 .427-.366l.34-2.152a.432.432 0 0 1 .427-.365h.984c2.05 0 3.233-.992 3.542-2.957.139-.86.006-1.535-.397-2.009-.442-.52-1.227-.794-2.268-.794Zm.359 2.914c-.17 1.116-1.023 1.116-1.848 1.116h-.47l.33-2.085a.26.26 0 0 1 .256-.219h.215c.562 0 1.092 0 1.366.32.163.192.213.476.151.868Zm8.941-.036h-1.49a.26.26 0 0 0-.256.219l-.066.417-.104-.151c-.323-.469-1.042-.625-1.76-.625-1.646 0-3.052 1.247-3.326 2.996-.142.873.06 1.707.555 2.289.454.535 1.104.758 1.877.758 1.326 0 2.062-.853 2.062-.853l-.067.414c-.025.158.097.3.256.3h1.342a.432.432 0 0 0 .427-.365l.805-5.1a.258.258 0 0 0-.255-.299Zm-2.077 2.9c-.143.85-.819 1.422-1.68 1.422-.433 0-.779-.138-1-.401-.221-.261-.305-.633-.235-1.047a1.668 1.668 0 0 1 1.67-1.434c.423 0 .767.14.993.406.227.268.317.642.252 1.054Zm8.515-2.9h1.497a.26.26 0 0 1 .213.407l-4.98 7.188a.432.432 0 0 1-.355.185h-1.495a.26.26 0 0 1-.212-.41l1.55-2.188-1.648-4.84a.26.26 0 0 1 .246-.342h1.47c.192 0 .36.125.416.308l.875 2.923 2.065-3.041a.433.433 0 0 1 .358-.19Z"
                          clipRule="evenodd"
                        />
                        <path
                          fill="#179BD7"
                          fillRule="evenodd"
                          d="m51.77 38.825 1.278-8.124a.26.26 0 0 1 .255-.22h1.438a.26.26 0 0 1 .256.3l-1.26 7.978a.432.432 0 0 1-.427.365h-1.284a.259.259 0 0 1-.255-.3Zm-9.778-8.343H38.88a.432.432 0 0 0-.426.365l-1.259 7.978c-.025.157.097.3.256.3h1.597a.302.302 0 0 0 .298-.256l.357-2.262a.432.432 0 0 1 .427-.365h.984c2.05 0 3.233-.992 3.542-2.957.14-.86.006-1.536-.397-2.009-.442-.52-1.226-.794-2.267-.794Zm.36 2.914c-.17 1.116-1.024 1.116-1.849 1.116h-.469l.33-2.085a.258.258 0 0 1 .256-.219h.215c.561 0 1.092 0 1.365.32.164.192.213.476.151.868Zm8.94-.036h-1.49a.258.258 0 0 0-.255.219l-.066.416-.105-.15c-.322-.469-1.04-.625-1.759-.625-1.646 0-3.052 1.247-3.326 2.996-.142.873.06 1.707.555 2.289.455.535 1.103.758 1.876.758 1.327 0 2.062-.853 2.062-.853l-.066.414a.26.26 0 0 0 .257.3h1.341a.432.432 0 0 0 .427-.365l.806-5.1a.26.26 0 0 0-.258-.3Zm-2.077 2.9c-.143.85-.82 1.422-1.681 1.422-.432 0-.779-.139-1-.401-.22-.261-.303-.633-.234-1.047a1.668 1.668 0 0 1 1.67-1.434c.422 0 .766.14.993.406.228.268.318.641.252 1.054Z"
                          clipRule="evenodd"
                        />
                        <path
                          fill="#253B80"
                          d="m31.314 27.628.383-2.43-.852-.02h-4.069l2.828-17.927a.231.231 0 0 1 .23-.196h6.86c2.277 0 3.848.474 4.669 1.41.385.438.63.896.748 1.401.124.53.127 1.162.005 1.934l-.009.056v.495l.385.217c.324.172.581.37.779.594.33.375.542.852.632 1.418.093.581.062 1.273-.09 2.056-.176.901-.46 1.686-.843 2.328a4.794 4.794 0 0 1-1.334 1.463 5.418 5.418 0 0 1-1.798.811c-.663.172-1.418.26-2.247.26h-.534c-.381 0-.752.137-1.043.384a1.616 1.616 0 0 0-.544.97l-.04.22-.676 4.281-.031.158c-.008.05-.022.074-.042.091a.115.115 0 0 1-.07.026h-3.297Z"
                        />
                        <path
                          fill="#179BD7"
                          d="M42.856 11.913c-.02.131-.043.265-.07.403-.905 4.644-4 6.25-7.953 6.25h-2.012a.977.977 0 0 0-.966.827l-1.03 6.535-.293 1.853a.515.515 0 0 0 .509.595h3.57a.859.859 0 0 0 .848-.724l.035-.181.672-4.266.043-.233a.858.858 0 0 1 .848-.726h.534c3.459 0 6.166-1.404 6.958-5.468.33-1.697.16-3.114-.716-4.111a3.41 3.41 0 0 0-.977-.754Z"
                        />
                        <path
                          fill="#222D65"
                          d="M41.91 11.536a7.115 7.115 0 0 0-.88-.195 11.173 11.173 0 0 0-1.775-.13H33.88a.854.854 0 0 0-.848.726l-1.144 7.245-.033.211a.978.978 0 0 1 .966-.828h2.013c3.953 0 7.048-1.605 7.953-6.249.027-.138.05-.271.07-.402a4.825 4.825 0 0 0-.946-.378Z"
                        />
                        <path
                          fill="#253B80"
                          d="M33.031 11.937a.855.855 0 0 1 .848-.725h5.377c.637 0 1.231.042 1.774.13a7.158 7.158 0 0 1 1.083.258c.267.088.515.193.744.314.27-1.717-.002-2.886-.93-3.944-1.023-1.165-2.87-1.664-5.233-1.664h-6.86a.98.98 0 0 0-.97.829l-2.857 18.112a.59.59 0 0 0 .582.681h4.235l1.063-6.746 1.144-7.245Z"
                        />
                      </svg>
                    </FormLabel>
                  </FormItem>
                </RadioGroup>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="flex items-center space-x-2">
          <Checkbox
            id="saveAddress"
            checked={form.watch("saveAddress")}
            onCheckedChange={(checked: boolean) =>
              form.setValue("saveAddress", checked)
            }
          />
          <label
            htmlFor="saveAddress"
            className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
          >
            Save this information for faster check-out next time
          </label>
        </div>

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
