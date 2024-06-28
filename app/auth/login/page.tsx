import Layout from "@/client/components/layout";
import { SiteBreadcrumb } from "@/client/components/reuseable/SiteBreadcrumb";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import React from "react";
import LoginForm from "./LoginForm";

const Login = async () => {
  const session = await getServerSession();
  console.log({ session });

  if (session) {
    return redirect("/");
  }

  return (
    <Layout>
      <div className="container py-10 space-y-10">
        <SiteBreadcrumb links={[{ title: "Login" }]} />

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div className="bg-[url(/images/loginbg.png)] bg-cover bg-center h-[500px] hidden lg:block" />
          <div className="flex items-center justify-end">
            <LoginForm />
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Login;
