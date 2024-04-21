"use client";

import * as React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

import { Button } from "@/components/ui/button";
import { UserButton } from "@/components/auth/user-button";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import { IoMenuOutline } from "react-icons/io5";
import { DropdownMenuCheckboxItemProps } from "@radix-ui/react-dropdown-menu";

type Checked = DropdownMenuCheckboxItemProps["checked"];

export const Navbar = () => {
  const pathname = usePathname();
  const [showStatusBar, setShowStatusBar] = React.useState<Checked>(true);

  return (
    <nav className="bg-secondary flex justify-between items-center p-2 sm:p-4 rounded-xl w-[calc(100%-20px)] sm:w-[600px] shadow-sm">
      {/* Burger Menu for Small Screens */}
      <div className="sm:hidden">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline">
              <IoMenuOutline className="w-6 h-6" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="w-56 fixed">
            <DropdownMenuCheckboxItem
            >
              <Link href="/server">Server</Link>
            </DropdownMenuCheckboxItem>
            <DropdownMenuCheckboxItem
            >
              <Link href="/client">Client</Link>
            </DropdownMenuCheckboxItem>
            <DropdownMenuCheckboxItem
            >
              <Link href="/admin">Admin</Link>
            </DropdownMenuCheckboxItem>
            <DropdownMenuCheckboxItem
            >
              <Link href="/dashboard">Dashboard</Link>
            </DropdownMenuCheckboxItem>
            <DropdownMenuCheckboxItem
            >
              <Link href="/settings">Settings</Link>
            </DropdownMenuCheckboxItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>

      {/* Regular Navigation Links for Larger Screens */}
      <div className="flex gap-2 hidden sm:flex">
        <Button
          asChild
          variant={pathname === "/server" ? "default" : "outline"}
        >
          <Link href="/server">Server</Link>
        </Button>
        <Button
          asChild
          variant={pathname === "/client" ? "default" : "outline"}
        >
          <Link href="/client">Client</Link>
        </Button>
        <Button
          asChild
          variant={pathname === "/admin" ? "default" : "outline"}
        >
          <Link href="/admin">Admin</Link>
        </Button>
        <Button
          asChild
          variant={pathname === "/dashboard" ? "default" : "outline"}
        >
          <Link href="/dashboard">Dashboard</Link>
        </Button>
        <Button
          asChild
          variant={pathname === "/settings" ? "default" : "outline"}
        >
          <Link href="/settings">Settings</Link>
        </Button>
      </div>
      <UserButton />
    </nav>
  );
};

export default Navbar;