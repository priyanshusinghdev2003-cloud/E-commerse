import React, { useRef, useEffect, useState } from "react";
import gsap from "gsap";
import { useAuthStore } from "../context/auth";

function NavBar() {
  const navBarRef = useRef(null);
  const [lastScroll, setLastScroll] = useState(0);
  const user = useAuthStore((state) => state.user);

  useEffect(() => {
    const nav = navBarRef.current;

    const handleScroll = () => {
      const currentScroll = window.scrollY;
      console.log(currentScroll, lastScroll);

      if (currentScroll > lastScroll && currentScroll > 80) {
        gsap.to(nav, {
          y: -100,
          duration: 0.4,
          ease: "power3.out",
        });
      } else {
        gsap.to(nav, {
          y: 0,
          duration: 0.4,
          ease: "power3.out",
        });
      }

      setLastScroll(currentScroll);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [lastScroll]);

  return (
    <div ref={navBarRef} className="fixed top-0 left-0 w-full z-50 ">
      <div className="flex justify-between items-center px-8 py-4 text-gray-800 font-medium">
        {/* Logo */}
        <div className="text-xl font-bold text-indigo-600">Orryzo</div>

        {/* Links */}
        <div className="flex gap-6">
          <span className="cursor-pointer hover:text-indigo-500">Home</span>
          <span className="cursor-pointer hover:text-indigo-500">Products</span>
          <span className="cursor-pointer hover:text-indigo-500">
            {user?.role == "admin"
              ? "Admin"
              : user?.role == "seller"
              ? "Seller"
              : ""}
          </span>
          <span className="cursor-pointer hover:text-indigo-500">About</span>
          <span className="cursor-pointer hover:text-indigo-500">Profile</span>
        </div>

        {/* Auth */}
        <div>
          <button className="bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-500 transition">
            {user ? "Logout" : "Login"}
          </button>
        </div>
      </div>
    </div>
  );
}

export default NavBar;
