import { getServerSession } from "next-auth";
import { ChangeAddress } from "./Form";
import User from "@/server/models/User";
import { z } from "zod";

const addressSchema = z.object({
  phone: z.string().optional(),
  street: z.string().min(1, "Street Address is required"),
  city: z.string().min(1, "City is required"),
  postalCode: z.string().min(1, "Postal Code is required"),
  country: z.string().min(1, "Country is required"),
});

const Address = async () => {
  const session = await getServerSession();
  const address = await User.findOne({ email: session?.user?.email });

  const updateAddress = async (data: FormData) => {
    "use server";

    const validate = addressSchema.safeParse({
      phone: data.get("phone"),
      street: data.get("street"),
      city: data.get("city"),
      postalCode: data.get("postalCode"),
      country: data.get("country"),
    });

    if (!validate.success) {
      return console.log(validate.error);
    }

    const { phone, street, city, postalCode, country } = validate.data;

    await User.findOneAndUpdate(
      { email: session?.user?.email },
      {
        phone: phone || "",
        street,
        city,
        postalCode,
        country,
      }
    );

    return {
      success: true,
      message: "Address updated successfully",
    };
  };
  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <h1 className="text-brand font-semibold">Edit Your Address</h1>
      </div>
      {/* Address Card */}
      <ChangeAddress
        updateAddress={updateAddress}
        defaultValues={{
          phone: address.phone || "",
          street: address.street || "",
          city: address.city || "",
          postalCode: address.postalCode || "",
          country: address.country || "",
        }}
      />
    </div>
  );
};

export default Address;
