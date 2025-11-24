"use client";

import Link from "next/link";
import { useState } from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Menu, X } from "lucide-react";
import { Button } from "./ui/button";
import { useProfile, useLogout } from "@/hooks/useAuth";

const Navbar = () => {
  const { data: user , isPending } = useProfile();
  const logoutMutate = useLogout();
  const [open, setOpen] = useState(false);

  const items = [
    { id: 1, name: "Home", path: "/" },
    { id: 2, name: "Roadmaps", path: "/roadmaps" },
    { id: 3, name: "About", path: "/about" },
  ];


  return (
    <nav className="border-b border-neutral-800/50 bg-neutral-900/60 backdrop-blur-lg sticky top-0 z-50">
      <div className="container mx-auto flex items-center justify-between py-4 px-4">
        {/* Logo */}
        <Link
          href="/"
          className="text-2xl font-bold text-white tracking-wide hover:text-blue-400 transition"
        >
          Edu<span className="text-blue-500">AI</span>
        </Link>

        {/* Desktop Menu */}
        <div className="hidden md:flex items-center gap-6">
          {items.map((item) => (
            <Link
              key={item.id}
              href={item.path}
              className="text-gray-300 hover:text-white transition text-sm font-medium"
            >
              {item.name}
            </Link>
          ))}
        </div>

        {/* Profile / Auth */}
        
        {user ? (
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant="ghost"
                className="text-gray-300 hover:text-white hover:bg-neutral-800 rounded-full px-4 py-2 transition flex items-center gap-2"
              >
                {/* Avatar Circle */}
                <span className="w-7 h-7 bg-blue-600/30 text-blue-400 flex items-center justify-center rounded-full font-bold">
                  {user.name?.charAt(0).toUpperCase()}
                </span>

                {/* Name */}
                <span>{user.name}</span>
              </Button>
            </DropdownMenuTrigger>

            <DropdownMenuContent
              className="w-64 bg-neutral-900 text-gray-300 border-neutral-700 shadow-xl"
              align="end"
            >
              {/* Header */}
              <DropdownMenuLabel className="pb-3">
                <div className="flex items-center gap-3">
                  {/* Avatar larger */}
                  <span className="w-10 h-10 bg-blue-600/30 text-blue-400 flex items-center justify-center rounded-full font-semibold text-lg">
                    {user.name?.charAt(0).toUpperCase()}
                  </span>

                  <div>
                    <p className="font-semibold text-white">{user.name}</p>
                    <p className="text-xs text-gray-400">{user.email}</p>
                  </div>
                </div>

                {/* Badge */}
                <div className="mt-3 inline-flex items-center px-2 py-1 text-xs font-semibold bg-blue-600/20 border border-blue-600/40 text-blue-400 rounded-full">
                  Verified Member
                </div>
              </DropdownMenuLabel>

              <DropdownMenuSeparator className="bg-neutral-700" />

              {/* Profile Button */}
              <DropdownMenuItem className="cursor-pointer hover:bg-neutral-800">
                <Link href="/profile" className="w-full">
                  Profile
                </Link>
              </DropdownMenuItem>

              {/* Logout */}
              <DropdownMenuItem
                className="cursor-pointer hover:bg-red-600/20 text-red-500 font-medium"
                onClick={() => logoutMutate.mutate()}
              >
                Logout
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        ) : (
          <Link href="/login">
            <Button className="hidden md:block bg-zinc-600 text-white hover:bg-zinc-500 cursor-pointer px-4 py-2">
              Login
            </Button>
          </Link>
        )}

        {/* Mobile Hamburger */}
        <button className="md:hidden text-white" onClick={() => setOpen(!open)}>
          {open ? <X size={26} /> : <Menu size={26} />}
        </button>
      </div>

      {/* Mobile Menu Panel */}
      {open && (
        <div className="md:hidden bg-neutral-900/95 border-t border-neutral-800 px-6 py-4 space-y-4">
          {items.map((item) => (
            <Link
              key={item.id}
              href={item.path}
              onClick={() => setOpen(false)}
              className="block text-gray-300 text-lg hover:text-white transition"
            >
              {item.name}
            </Link>
          ))}

          {user ? (
            <div className="pt-4 border-t border-neutral-800">
              <p className="text-gray-400 mb-2">{user.name}</p>
              <Button
                className="w-full bg-red-600 hover:bg-red-700 text-white"
                onClick={() => logoutMutate.mutate()}
              >
                Logout
              </Button>
            </div>
          ) : (
            <Link href="/login">
              <Button className="w-full bg-blue-600 hover:bg-blue-700 text-white">
                Login
              </Button>
            </Link>
          )}
        </div>
      )}
    </nav>
  );
};

export default Navbar;
