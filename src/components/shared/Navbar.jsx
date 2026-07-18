"use client";
import { useState } from "react";
import { Link, Button } from "@heroui/react";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const navItems = [
    { href: "/", label: "Home" },
    { href: "/about", label: "About" },
    { href: "/services", label: "Services" },
    { href: "/track-order", label: "Track Order" },
    { href: "/Emergency", label: "Emergency" },
    { href: "/Contact", label: "Contact" },
  ];

  const navLinks = (
    <>
      {navItems.map((item, index) => (
        <li key={index}>
          <Link href={item.href} className="block py-2 text-sm font-medium">
            {item.label}
          </Link>
        </li>
      ))}
    </>
  );

  return (
    <nav className="sticky top-0 z-40 w-full border-b border-separator bg-background/70 backdrop-blur-lg">
      <header className="container flex h-16 items-center justify-between">
        <div className="flex items-center gap-4">
          <button
            className="md:hidden"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-label="Toggle menu"
          >
            <span className="sr-only">Menu</span>
            <svg
              className="h-6 w-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              {isMenuOpen ? (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              ) : (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 12h16M4 18h16"
                />
              )}
            </svg>
          </button>
          <div>Logo</div>
        </div>
        <ul className="hidden items-center gap-4 md:flex">{navLinks}</ul>

        <div className="space-x-3">
          <Button variant="secondary">Uplaod RX</Button>
          <Button>Log In</Button>
        </div>
      </header>
      {isMenuOpen && (
        <div className="border-t border-separator md:hidden">
          <ul className="flex flex-col gap-2 p-4">{navLinks}</ul>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
