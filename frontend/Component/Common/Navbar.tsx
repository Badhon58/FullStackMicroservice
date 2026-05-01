"use client";
import React, { useEffect, useRef, useState } from "react";

const Navbar = () => {
  const navLinks = [
    { name: "Home", path: "/" },
    { name: "Products", path: "/product" },
    { name: "User", path: "/user" },
  ];

  const ref = useRef<any>(null);

  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav
      className={`px-6 py-6 bg-blue-500  text-white flex items-center justify-between  sticky top-0 z-50 ${isScrolled ? "shadow-lg" : ""}`}>
      <a href="/" className="text-2xl font-semibold text-white">
        Microservices
      </a>
      <div className="flex items-center gap-8">
        {navLinks.map((link, i) => (
          <a
            key={i}
            href={link.path}
            className={`group flex flex-col gap-0.5 text-white`}>
            {link.name}
            <div
              className={` h-0.5 w-0 group-hover:w-full transition-all duration-300 text-white`}
            />
          </a>
        ))}
        <button
          className={`border px-4 py-1 text-sm font-light rounded-full cursor-pointer text-white transition-all`}>
          Login
        </button>
      </div>
    </nav>
  );
};

export default Navbar;
