import React from "react";
import { Car } from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-slate-900 text-gray-300">
      <div className="max-w-7xl mx-auto px-8 py-12">
        {/* Top Section */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10">
          {/* Logo */}
          <div>
            <div className="flex items-center gap-2 mb-4">
              <Car className="text-green-500 w-8 h-8" />
              <h2 className="text-2xl font-bold text-white">
                Ride<span className="text-green-500">Share</span>
              </h2>
            </div>

            <p className="text-sm leading-6">
              Travel smarter by sharing rides with trusted drivers and
              passengers. Save money, reduce traffic, and make every journey
              more sustainable.
            </p>
          </div>

          {/* Company */}
          <div>
            <h3 className="text-white font-semibold mb-4">Company</h3>

            <ul className="space-y-3">
              <li>
                <a href="#" className="hover:text-green-500">
                  About Us
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-green-500">
                  Careers
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-green-500">
                  Blog
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-green-500">
                  Press
                </a>
              </li>
            </ul>
          </div>

          {/* Support */}
          <div>
            <h3 className="text-white font-semibold mb-4">Support</h3>

            <ul className="space-y-3">
              <li>
                <a href="#" className="hover:text-green-500">
                  Help Center
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-green-500">
                  Safety
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-green-500">
                  Terms of Service
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-green-500">
                  Privacy Policy
                </a>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-white font-semibold mb-4">Connect</h3>

            <div className="flex gap-4 mb-5">
              {/* <Facebook className="cursor-pointer hover:text-green-500" />
              <Instagram className="cursor-pointer hover:text-green-500" />
              <Twitter className="cursor-pointer hover:text-green-500" />
              <Linkedin className="cursor-pointer hover:text-green-500" /> */}
            </div>

            <p>Email: support@rideshare.com</p>
            <p>Phone: +91 98765 43210</p>
          </div>
        </div>

        {/* Bottom */}
        <div className="border-t border-slate-700 mt-10 pt-6 flex flex-col md:flex-row justify-between items-center">
          <p className="text-sm">© 2026 RideShare. All rights reserved.</p>

          <div className="flex gap-6 mt-4 md:mt-0 text-sm">
            <a href="#" className="hover:text-green-500">
              Privacy
            </a>

            <a href="#" className="hover:text-green-500">
              Terms
            </a>

            <a href="#" className="hover:text-green-500">
              Cookies
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
