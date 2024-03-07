import React, { useEffect, useState } from 'react';
import ProductsService from '../services/productsServices';
import { toast } from 'react-toastify';
import { IoIosArrowDown } from "react-icons/io";
import { IoIosArrowUp } from "react-icons/io";

function NavBarCategoriesComponent() {
  
    const [categories,setCategories] = useState([]);
    const [isActive,setIsActive] = useState(false);
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);

    
    
     //function handleIsActive(){
        //setIsActive(!isActive);  ILI OVAKO...
     //}
    

    useEffect(()=>{
        ProductsService.getAllCategory()
        .then((res) => setCategories(res.data))
        .catch((err) => toast.warning('Nesto nije ok!'));
    },[]);

    const toggleDropdown = () => {
        setIsDropdownOpen(!isDropdownOpen);
    };

  return (
    <div className="border-b border-gray-500 container mx-auto " >
      
        <button 
            id="dropdownDividerButton" 
            data-dropdown-toggle="dropdownDivider" 
            className="flex bg-yellow-500 text-white font-bold py-2 px-4 rounded items-center my-3" 
            type="button" 
            aria-expanded={isDropdownOpen ? 'true' : 'false'}
            aria-controls="dropdownDivider"
            onClick={toggleDropdown}
        >
            Categories &nbsp; {isDropdownOpen ? <IoIosArrowUp /> : <IoIosArrowDown />}
        </button>
            <div id="dropdownDivider" className={`z-10 ${isDropdownOpen ? '' : 'hidden'} bg-white divide-y divide-gray-100 rounded-lg shadow w-[100%] mx-auto dark:bg-gray-700 dark:divide-gray-600`}>
              
               
                <ul className="py-2 text-sm text-gray-700 dark:text-gray-200 grid grid-cols-2 text-center lg:grid lg:grid-cols-8 md:grid md:grid-cols-3" aria-labelledby="dropdownDividerButton">
                {
                    isDropdownOpen? categories.map(
                        
                        (cat,index)=>{
                           return <li>
                                 <a href="#" class="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white" key={index}>{cat}</a>
                               </li>
                        }
                   ):null
                }
            </ul>

            </div>
       </div>
  );
}

export default NavBarCategoriesComponent;