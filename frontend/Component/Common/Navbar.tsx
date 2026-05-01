"use client";
import React, { useEffect, useRef, useState } from "react";
const Navbar = () => {
  const navLinks = [
    { name: "Home", path: "/" },
    { name: "Products", path: "/product" },
    { name: "User", path: "/user" },
  ];
  const [isScrolled, setIsScrolled] = useState(false);
  const [login, setLogin] = useState(false);
  const [userName, setUserName] = useState<string>();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const init = async () => {
    try {
      const fullname = localStorage.getItem("name");
      if (fullname) {
        setLogin(true);
        setUserName(fullname);
      } else {
        setLogin(false);
        setUserName(undefined);
      }
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    init();
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
        {login ? (
          <p className="UserName border px-4 py-1 text-sm rounded-full cursor-pointer text-white">
            {userName}
          </p>
        ) : (
          <a
            href="/login"
            className={`border px-4 py-1 text-sm font-light rounded-full cursor-pointer text-white transition-all`}>
            Login
          </a>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
