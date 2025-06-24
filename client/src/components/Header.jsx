import {
  Button,
  Navbar,
  TextInput,
  NavbarCollapse,
  NavbarLink,
  NavbarToggle,
} from "flowbite-react";
import React from "react";
import { AiOutlineSearch } from "react-icons/ai";
import { FaMoon } from "react-icons/fa";
import { Link, useLocation } from "react-router-dom";

export default function Header() {
  const location = useLocation();
  const path = location.pathname;
  return (
    <Navbar className=" border-b-2 ">
      <Link
        to="/"
        className="self-center whitespace-nowrap text-sm sm:text-xl font-semibold dark:text-white"
      >
        <span className="px-2 py-1 bg-gradient-to-r from-indigo-800 via-purple-500 to-pink-500 rounded-lg text-white">
          Ashik's
        </span>
        Blog
      </Link>
      <form>
        <TextInput
          type="text"
          placeholder="Search..."
          rightIcon={AiOutlineSearch}
          className="hidden lg:inline"
        />
      </form>
      <Button className="w-12 h-10 lg:hidden" color='grey' pill>
        <AiOutlineSearch/>
      </Button>
      <div className="flex gap-2 md:order-2">
        <Button className="w-22 h-10 hidden sm:inline" color="gray" pill>
          <FaMoon className="fill-black" />
        </Button>
        <Link to="/sign-in">
          <Button
            color="purple"
            className="bg-gradient-to-r from-purple-500 via-indigo-500 to-blue-500 text-white"
          >
            Sign In
          </Button>
          <NavbarToggle />
        </Link>
      </div>
      <NavbarCollapse>
        <NavbarLink active={path === "/about"} as={"div"}>
          <Link to="/about">About</Link>
        </NavbarLink>
        <NavbarLink active={path === "/"} as={"div"}>
          <Link to="/">Home</Link>
        </NavbarLink>
        <NavbarLink active={path === "/sign-in"} as={"div"}>
          <Link to="/sign-in">Sign In</Link>
        </NavbarLink>
        <NavbarLink active={path === "/sign-up"} as={"div"}>
          <Link to="/sign-up">Sign Up</Link>
        </NavbarLink>
      </NavbarCollapse>
    </Navbar>
  );
}