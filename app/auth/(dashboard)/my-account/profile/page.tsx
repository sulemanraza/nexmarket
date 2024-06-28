import Layout from "@/client/components/layout";
import ProtectRoute from "@/client/utils/ProtectRoute";
import React from "react";

const Profile = () => {
  return (
    <ProtectRoute>
      <div>Profile</div>
    </ProtectRoute>
  );
};

export default Profile;
