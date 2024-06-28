import Link from "next/link";
import { headers } from "next/headers";

import {
  Breadcrumb,
  BreadcrumbList,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbSeparator,
  BreadcrumbPage,
} from "@/client/components/ui/breadcrumb";
import Layout from "@/client/components/layout";
import { Button } from "@/client/components/ui/button";

export default async function NotFound() {
  const headersList = headers();
  const domain = headersList.get("host");

  return (
    <Layout>
      <Breadcrumb className=" container py-10">
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink className="text-xs md:text-sm" href="/">
              Home
            </BreadcrumbLink>
          </BreadcrumbItem>

          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbPage className="text-xs md:text-sm">
              404 Error
            </BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>
      <div className="container space-y-10 grid place-items-center h-full min-h-[calc(100vh_-_20rem)]">
        <div className=" grid place-items-center space-y-8 py-10">
          <h1 className="text-2xl sm:text-3xl md:text-5xl  lg:text-8xl font-semibold text-center">
            404 Not Found
          </h1>
          <p className="text-center">
            Your visited page not found. You may go home page.
          </p>
          <Button className="text-center bg-brand">
            <Link href="/" className="text-white">
              Back to home page
            </Link>
          </Button>
        </div>
      </div>
    </Layout>
  );
}
