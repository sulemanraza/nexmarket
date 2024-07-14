"use client";
import { Button } from "@/client/components/ui/button";
import { useState } from "react";
import { useToast } from "@/client/components/ui/use-toast";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

interface Props {
  user: {
    name: string;
    email: string;
  } | null;
}

const ProfileForm = ({ user }: Props) => {
  const { status, update } = useSession();
  const [name, setName] = useState(user?.name || "");
  const { toast } = useToast();

  const router = useRouter();

  const updateSession = async () => {
    if (status === "loading" || status === "unauthenticated" || !name.length)
      return;

    await update({
      name: name,
    });

    toast({
      title: "Profile Updated",
      description: "Your profile has been updated successfully",
      variant: "success",
    });

    router.refresh();
  };

  return (
    <>
      <div className="flex flex-col space-y-2">
        <label htmlFor="name" className="text-sm text-gray-500">
          Name
        </label>
        <input
          type="text"
          id="name"
          name="name"
          value={name}
          autoComplete="off"
          onChange={(e) => setName(e.target.value)}
          className="border outline-none focus:outline-none focus:border-brand p-2 rounded-md"
        />

        {!name.length && (
          <p className="text-red-500 text-xs">Name is required</p>
        )}
      </div>

      {/* email */}
      <div className="flex flex-col space-y-2">
        <label htmlFor="email" className="text-sm text-gray-500">
          Email
        </label>
        <input
          type="email"
          id="email"
          name="email"
          value={
            user?.email || "You can't change your email address at the moment"
          }
          disabled
          className="border outline-none focus:outline-none focus:border-brand p-2 rounded-md"
        />
      </div>

      <Button
        onClick={updateSession}
        className="bg-brand rounded-sm hover:bg-brand hover:opacity-90 w-1/4 mt-3"
      >
        Save Changes
      </Button>
    </>
  );
};

export default ProfileForm;
