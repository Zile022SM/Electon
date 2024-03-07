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

  const {totalProducts} = useSelector(state=>state.cartStore);

  
  return (
    <>
    
    <div className="bg-mainBlue lg:h-[100px] sm:py-[20px] flex items-center justify-between lg:justify-between lg:flex-row">
      <div className="container mx-auto flex flex-col justify-between items-center md:flex-row gap-[15px] mt-[10px] md:flex-row md:justify-evenly lg:flex-row lg:justify-between">
        <Link to={'/'}><img src={logoTip} alt="" /></Link>

        {/* TODO: search component */}
        <div className="flex gap-2 items-center">
          <input
            type="text"
            placeholder="Search product   🔎"
            className="rounded-[20px] pl-[10px] focus:outline-none focus:border-none h-[35px] lg:w-[350px]"
          />
          <button className="rounded-[20px] bg-[orange] px-5 mx-[-40px] h-[35px]">
            Search
          </button>
        </div>

        {/* General info */}
        <div className="flex gap-2 items-center text-white mb-[10px] lg:mr-[50px] lg:justify-end">
          <div className="flex gap-2 items-center">
            <FaRegUser color="orange" />
            <SignedOut>
              <SignInButton />
            </SignedOut>
            <SignedIn>
              <UserButton afterSignOutUrl="/" />
            </SignedIn>
          </div>

          <div className="flex gap-2 text-white items-center">
            <FaRegHeart color="orange" />
            <Link to={"/"}>Favorite</Link>
            <span className="h-[20px] w-[20px] bg-[orange] flex justify-center items-center rounded-full text-black">
              0
            </span>
          </div>

          <div className="flex gap-2 text-white items-center">
            <BsCart4 color="orange" />
            <Link to={"/cartProducts"}>Cart</Link>
            <span className="h-[20px] w-[20px] bg-[orange] flex justify-center items-center rounded-full text-black">
              {totalProducts}
            </span>
          </div>
        </div>
      
      </div>
    </div>
   
    </>
  );
}

export default NavBarComponent;
