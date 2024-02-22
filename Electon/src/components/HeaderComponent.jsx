import React from 'react';
import { CiLocationOn } from "react-icons/ci";
import { LuTruck } from "react-icons/lu";

function HeaderComponent() {
  return (
    <div className='flex justify-between container mx-auto my-2 items-center h-[70px] flex-col sm:flex-row py-[20px]'>
      <p>Need help? Call us: (+98) 0234 456 789</p>
      <div className='flex justify-between gap-3'>
        <div className='flex gap-2 items-center'>
         <CiLocationOn size={24} color='red'/>
         <span>Out Store</span>
        </div>

        <div className='flex gap-2 items-center'>
            <LuTruck size={24} color='red'/>
            <span>Track your order</span>
        </div>
      </div>
    </div>
  );
}

export default HeaderComponent;