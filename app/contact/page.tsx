import Button from "@/client/components/Buttons";
import Layout from "@/client/components/layout";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/client/components/ui/breadcrumb";
import { Mail, PhoneCall } from "lucide-react";
import React from "react";

const ContactUs = () => {
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
              contact
            </BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>
      <div className="container flex flex-col lg:flex-row gap-10 mb-10">
        <div className=" space-y-10 w-full lg:w-1/3  ">
          <div className="space-y-4  pb-4 border-b">
            <div className="flex items-center gap-4">
              <div className="w-10 h-10 text-white rounded-full grid place-items-center bg-brand">
                <PhoneCall />
              </div>
              <h2 className=" font-semibold">Call To Us</h2>
            </div>
            <p>We are available 24/7, 7 days a week.</p>
            <div>
              <span>Phone: +8801611112222</span>
            </div>
          </div>
          <div className="space-y-4  pb-4 border-b">
            <div className="flex items-center gap-4">
              <div className="w-10 h-10 text-white rounded-full grid place-items-center bg-brand">
                <Mail />
              </div>
              <h2 className=" font-semibold">Write To US</h2>
            </div>
            <p>Fill out our form and we will contact you within 24 hours.</p>
            <div>
              <span>Emails: customer@exclusive.com</span>
            </div>
          </div>
        </div>
        <div className="flex w-full lg:w-2/3">
          <form action="" className="w-full space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <input
                type="text"
                placeholder="Your Name *"
                className="block h-[50px] w-full bg-placeholder border-0 outline-none px-4"
              />
              <input
                type="email"
                placeholder="Your Email *"
                className="block h-[50px] w-full bg-placeholder border-0 outline-none px-4"
              />
              <input
                type="tel"
                placeholder="Your Phone *"
                className="block h-[50px] w-full bg-placeholder border-0 outline-none px-4"
              />
            </div>

            <textarea
              name=""
              id=""
              cols={30}
              rows={10}
              placeholder="Your Message *"
              className="block w-full bg-placeholder border-0 outline-none p-4"
            />

            <div className="flex items-center justify-end">
              <Button className="max-w-[256px] w-full h-14">
                Send Massage
              </Button>
            </div>
          </form>
        </div>
      </div>
    </Layout>
  );
};

export default ContactUs;
