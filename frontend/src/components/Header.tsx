import { IoCartOutline } from "react-icons/io5";
import { IoIosSearch } from "react-icons/io";
import { FaRegHeart } from "react-icons/fa";
import { BiMobileVibration as Logo } from "react-icons/bi";
import { NavLink, useLocation } from "react-router-dom";

import { useState } from "react";
import { useMobileCartContext } from "@/context/ExportContext";
import { FaCircleChevronRight as Arrow } from "react-icons/fa6";
import Search from "./Search";

const Header = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { cartQuantity } = useMobileCartContext();
  const quantity = cartQuantity();
  const loc=useLocation()

  return (
    <div className="sticky top-0 z-30 text-white bg-neutral-900 h-[65px] flex justify-between px-4 md:px-8 py-3">
      <div className={`flex gap-3 ${isOpen ? "hidden md:flex" : ""}`}>
        <NavLink to="/" className="flex items-center text-xl md:text-2xl">
          <Logo />
          <h1 className="md:ml-1 heading">GadgetGrid</h1>
        </NavLink>
      </div>

      <div
        className={`flex items-center justify-between text-lg md:text-2xl gap-4 md:gap-7 ${
          isOpen ? "mx-auto md:m-0" : ""
        }`}
      >
        {isOpen ? (
          <div className="flex justify-center items-center gap-2">
            <Arrow
              className="text-white cursor-pointer"
              onClick={() => setIsOpen(false)}
            />
            <Search />
          </div>
        ) : (
          <IoIosSearch
            className={`ml-1 text-2xl md:text-3xl text-white cursor-pointer ${
              loc.pathname === "/" ? "" : " hidden"
            }`}
            onClick={() => setIsOpen(true)}
          />
        )}

        <NavLink
          to="/favorites"
          className={`${isOpen ? "hidden md:block" : ""}`}
        >
          <FaRegHeart className="text-lg md:text-xl" />
        </NavLink>

        <div className={`relative ${isOpen ? "hidden md:block" : ""}`}>
          <NavLink to="/cart">
            <IoCartOutline className="text-2xl md:text-3xl" />
          </NavLink>
          <button className="absolute font-bold scale-[0.5] md:scale-[0.55] top-[4px] md:top-[8px] left-[5px] md:left-[10px] rounded-full bg-red-500/[0.8] text-[25px] px-[12px] py-[1px]">
            {quantity}
          </button>
        </div>
      </div>
    </div>
  );
};

export default Header;
