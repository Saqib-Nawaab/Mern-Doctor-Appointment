import React from "react";
import { assets } from "../assets/assets";

function Footer() {
  return (
    <div>
      <footer className="px-6 md:px-16 lg:px-24 xl:px-32 pt-8 w-full text-gray-500">
        <div className="flex flex-col md:flex-row justify-between w-full gap-10 border-b border-gray-500/30 pb-6">
          <div className="md:max-w-96">
            <img className="h-9" src={assets.logo} />
            <p className="mt-6 text-[16px] font-medium">
              Lorem Ipsum is simply dummy text of the printing and typesetting
              industry. Lorem Ipsum has been the industry's standard dummy text
              ever since the 1500s, when an unknown printer took a galley of
              type and scrambled it to make a type specimen book.
            </p>
          </div>
          <div className="flex-1 flex items-start md:justify-end gap-20">
            <div>
              <h2 className="font-semibold mb-5 text-gray-800 text-[17px]">Company</h2>
              <ul className="text-sm space-y-2 text-[16px] font-medium cursor-pointer">
                <li className="hover:text-blue-500">
                  <a href="#">Home</a>
                </li>
                <li className="hover:text-blue-500">
                  <a href="#">About us</a>
                </li>
                <li className="hover:text-blue-500">
                  <a href="#">Contact us</a>
                </li>
                <li className="hover:text-blue-500">
                  <a href="#">Privacy policy</a>
                </li>
              </ul>
            </div>
            <div>
              <h2 className="font-semibold mb-5 text-gray-800 text-[17px] ">Get in touch</h2>
              <div className="text-sm space-y-2 text-[16px] font-medium cursor-pointer ">
                <p className="hover:text-blue-500">+1-212-456-7890</p>
                <p className="hover:text-blue-500">contact@example.com</p>
              </div>
            </div>
          </div>
        </div>
        <p className="pt-4 text-center text-xs md:text-sm pb-5">
          Copyright 2025 © Doctors App All Right Reserved.
        </p>
      </footer>
    </div>
  );
}

export default Footer;
