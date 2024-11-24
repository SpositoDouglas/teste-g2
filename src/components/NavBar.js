"use client";

import { Navbar } from "flowbite-react";

export default function NavbarGlobal() {

  return (
    <Navbar
      fluid
      rounded
      className="h-[3.5rem] mx-auto drop-shadow-2xl bg-none px-2 py-2.5 sm:px-4"
    >
      <Navbar.Brand  href="/">
        <img
          src="https://img.freepik.com/premium-vector/pixel-art-metallic-pan-cooking-vector-icon-8bit-game-white-background_360488-670.jpg"
          className="mr-3 h-6 sm:h-9"
          alt="Flowbite React Logo"
        />
        <span className="self-center whitespace-nowrap text-xl font-semibold text-white">
          Galeria
        </span>
      </Navbar.Brand>
    </Navbar>
  );
}
