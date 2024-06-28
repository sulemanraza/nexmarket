import {
  AppleIcon,
  FacebookIcon,
  GoogleIcon,
  GooglePlay,
  QRCode,
  SenderIcon,
} from "@/client/icon";
import { AppleStore } from "@/client/icon/AppleStore";
import { Facebook, Instagram, Linkedin, Twitter } from "lucide-react";
import Link from "next/link";
import React from "react";

const Footer = () => {
  return (
    <footer className="w-full pt-20 bg-black space-y-10">
      <div className="container grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8">
        <div className="text-white space-y-4">
          <Link href="/" className="text-2xl font-bold">
            <span>Nex</span>
            <span className="text-brand">Market</span>
          </Link>

          <strong className="block">Subscribe</strong>
          <p>Get 10% off your first order</p>
          <div className="flex items-center gap-2 border h-12 w-full rounded-md">
            <input
              type="text"
              placeholder="Enter your email"
              className="bg-transparent w-[80%] h-full outline-none bottom-0 px-2 text-white"
            />
            <button className="w-[20%] grid place-items-center">
              <SenderIcon className="w-6 h-6 " />
            </button>
          </div>
        </div>

        <div className=" space-y-6  text-left">
          <strong className="text-white text-left block">Support</strong>
          <div className="flex flex-col justify-center text-white space-y-2">
            <address>
              Santa Coloma de Gramanet, Barcelona, 08914, SPAIN.
            </address>
            {/* mail */}
            <a href="mailto:nexmarket@gmail.com">nexmarket@gmail.com</a>
            <a href="tel:+34632879645">+34632879645</a>
          </div>
        </div>
        <div className=" space-y-6">
          <strong className="text-white">Account</strong>
          <div className="flex flex-col text-white space-y-2">
            <Link href="#">My Account</Link>
            <Link href="#">Login / Register</Link>
            <Link href="#">Cart</Link>
            <Link href="#">Wishlist</Link>
            <Link href="#">Shop</Link>
          </div>
        </div>
        <div className=" space-y-6">
          <strong className="text-white">Quick Link</strong>
          <div className="flex flex-col text-white space-y-2">
            <Link href="#">Privacy Policy</Link>
            <Link href="#">Terms Of Use</Link>
            <Link href="#">Terms & Conditions</Link>
            <Link href="#">FAQ</Link>
            <Link href="#">Contact</Link>
          </div>
        </div>
        <div className=" space-y-6">
          <strong className="text-white">Download App</strong>
          <div className="flex flex-col text-white space-y-2">
            <p>Save $3 with App New User Only</p>
            <div className="flex items-center gap-2">
              <QRCode />
              <div>
                <AppleStore />
                <GooglePlay />
              </div>
            </div>

            <div className="flex items-center gap-2">
              <Link href="#">
                <Facebook />
              </Link>
              <Link href="#">
                <Twitter />
              </Link>
              <Link href="#">
                <Instagram />
              </Link>
              <Link href="#">
                <Linkedin />
              </Link>
            </div>
          </div>
        </div>
      </div>

      <div className="w-full text-center py-8">
        <p className="text-white">© 2024 NexMarket. All Rights Reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;
