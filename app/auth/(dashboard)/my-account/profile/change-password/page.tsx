import { Button } from "@/client/components/ui/button";
import React from "react";
import { z } from "zod";

const schema = z.object({
  "current-password": z.string(),
  "new-password": z
    .string({
      message:
        "Password must contain at least one uppercase letter, one lowercase letter, and one number",
    })
    .min(8)
    .regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/),
  "confirm-new-password": z
    .string({
      message:
        "Password must contain at least one uppercase letter, one lowercase letter, and one number",
    })
    .min(8)
    .regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/),
});

const ResetPassword = () => {
  async function changePassword(formData: FormData) {
    "use server";

    const rawFormData = {
      currentPassword: formData.get("current-password"),
      newPassword: formData.get("new-password"),
      confirmNewPassword: formData.get("confirm-new-password"),
    };

    const data = schema.parse(rawFormData);

    // validate data
    if (data["new-password"] !== data["confirm-new-password"]) {
      throw new Error("Passwords do not match");
    }

    // mutate data
    // revalidate cache
  }
  return (
    <div className=" space-y-8">
      <h1 className="text-brand font-semibold">Password Changes</h1>
      <form action={changePassword} className="space-y-4">
        {/* error */}

        {/* name */}
        <div className="flex flex-col space-y-2">
          <label htmlFor="current-password" className="text-sm text-gray-500">
            Current Password
          </label>
          <input
            type="text"
            id="current-password"
            required
            className="border outline-none focus:outline-none focus:border-brand p-2 rounded-md"
          />
        </div>
        <div className="flex flex-col space-y-2">
          <label htmlFor="new-password" className="text-sm text-gray-500">
            New Password
          </label>
          <input
            type="text"
            id="new-password"
            name="new-password"
            required
            className="border outline-none focus:outline-none focus:border-brand p-2 rounded-md"
          />
        </div>
        <div className="flex flex-col space-y-2">
          <label
            htmlFor="confirm-new-password"
            className="text-sm text-gray-500"
          >
            Confirm New Password
          </label>
          <input
            type="text"
            required
            id="confirm-new-password"
            name="confirm-new-password"
            className="border outline-none focus:outline-none focus:border-brand p-2 rounded-md"
          />
        </div>

        <Button
          type="submit"
          className="bg-brand rounded-sm hover:bg-brand hover:opacity-90"
        >
          Save Changes
        </Button>
      </form>
    </div>
  );
};

export default ResetPassword;
