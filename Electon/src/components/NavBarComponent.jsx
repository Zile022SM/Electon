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
import { motion } from "framer-motion";
import { useEffect,useState } from "react";

function NavBarComponent() {

  const {totalProducts} = useSelector(state=>state.cartStore);
  const {favoritesTotalProducts} = useSelector(state=>state.favoriteStore);
  const [rotateFavNumber,setRotateNumber] = useState(0);
  const [rotateCartNumber,setRotateCartNumber] = useState(0);

  useEffect(()=>{
    setRotateNumber((prev)=>prev+1);

  },[favoritesTotalProducts]);

  useEffect(()=>{
    setRotateCartNumber((prev)=>prev+1);

  },[totalProducts]);
 

  
  return (
    <>
    
    <div className="bg-mainBlue lg:h-[100px] sm:py-[20px] flex items-center justify-between lg:justify-between lg:flex-row py-2">
      <div className="container mx-auto flex flex-col justify-between items-center md:flex-row gap-[15px] md:flex-row md:justify-evenly lg:flex-row lg:justify-between">
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
        <div className="flex gap-2 items-center text-white lg:mr-[50px] lg:justify-end">
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
            <Link to={"/favorites"}>Favorite</Link>
            <motion.div className="h-[20px] w-[20px] bg-[orange] flex justify-center items-center rounded-full text-black"
                 key={rotateFavNumber} 
                 initial={{ opacity: 0 }}
                 animate={{ opacity: 1,rotate: 360 }}
                 transition={{ duration: 1, loop: Infinity }}
                 exit={{ opacity: 0 }}
            >
              { 0 || favoritesTotalProducts}
            </motion.div>
          </div>

          <div className="flex gap-2 text-white items-center">
            <BsCart4 color="orange" />
            <Link to={"/cartProducts"}>Cart</Link>
            <motion.div className="h-[20px] w-[20px] bg-[orange] flex justify-center items-center rounded-full text-black"
               key={rotateCartNumber} 
               initial={{ opacity: 0 }}
               animate={{ opacity: 1,rotate: 360 }}
               transition={{ duration: 1, loop: Infinity }}
               exit={{ opacity: 0 }}
            >
              {totalProducts}
            </motion.div>
          </div>
        </div>
      
      </div>
    </div>
   
    </>
  );
}

export default NavBarComponent;
