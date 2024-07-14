import { getServerSession } from "next-auth";
import Link from "next/link";
import React from "react";
import ProfileForm from "./ProfileForm";

const Profile = async () => {
  const session = await getServerSession();
  console.log({ session });
  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <h1 className="text-brand font-semibold">Edit Your Profile</h1>

        <Link
          href="/auth/my-account/profile/reset-password"
          className="text-xs text-brand"
        >
          Change Password
        </Link>
      </div>

      <ProfileForm
        user={{
          name: session?.user?.name || "",
          email: session?.user?.email || "",
        }}
      />
    </div>
  );
};

export default Profile;
