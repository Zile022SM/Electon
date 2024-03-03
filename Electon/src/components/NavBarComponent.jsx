import logoTip from "../assets/logo.png";
import { SignOutButton, SignInButton, SignedIn, SignedOut, UserButton } from "@clerk/clerk-react";

//icons
import { FaRegUser } from "react-icons/fa";
import { FaRegHeart } from "react-icons/fa";
import { BsCart4 } from "react-icons/bs";
import { Link } from "react-router-dom";
import NavBarCategoriesComponent from "./NavBarCategoriesComponent";
import { useDispatch, useSelector } from 'react-redux';
import { saveInCartHandler } from "../store/cartSlice";

function NavBarComponent() {

  const {cart} = useSelector((state)=>state.cartStore);
  
  return (
    <>
    
    <div className="bg-mainBlue lg:h-[100px] sm:py-[20px] flex items-center">
      <div className="container mx-auto flex justify-between flex-col items-center md:flex-row gap-[15px] mt-[10px]">
        <img src={logoTip} alt="" />

        {/* TODO: search component */}
        <div className="flex">
          <input
            type="text"
            placeholder="Search product"
            className="rounded-[20px] pl-[10px] border-none h-[40px]"
          />
          <button className="rounded-[20px] bg-[orange] px-5 mx-[-40px]">
            Search
          </button>
        </div>

        {/* General info */}
        <div className="flex gap-2 items-center text-white mb-[10px]">
          <div className="flex gap-2">
            <FaRegUser color="orange" />
            <SignedOut>
              <SignInButton />
            </SignedOut>
            <SignedIn>
              <UserButton afterSignOutUrl="/" />
            </SignedIn>
          </div>

          <div className="flex gap-2 text-white">
            <FaRegHeart color="orange" />
            <Link to={"/"}>Favorite</Link>
            <span className="h-[20px] w-[20px] bg-[orange] flex justify-center items-center rounded-full text-black">
              0
            </span>
          </div>

          <div className="flex gap-2 text-white">
            <BsCart4 color="orange" />
            <Link to={"/"}>Cart</Link>
            <span className="h-[20px] w-[20px] bg-[orange] flex justify-center items-center rounded-full text-black">
            </span>
          </div>
        </div>
        <div className="navCategories h-[]">

        </div>
      </div>
    </div>
   
    </>
  );
}

export default NavBarComponent;
