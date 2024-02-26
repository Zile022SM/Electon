import React, { useEffect, useState } from 'react';
import ProductsService from '../services/productsServices';
import { toast } from 'react-toastify';

function NavBarCategoriesComponent() {
  
    const [categories,setCategories] = useState([]);
    const [isActive,setIsActive] = useState(false);

    
    
     //function handleIsActive(){
        //setIsActive(!isActive);  ILI OVAKO...
     //}
    

    useEffect(()=>{
        ProductsService.getAllCategory()
        .then((res) => setCategories(res.data))
        .catch((err) => toast.warning('Nesto nije ok!'));
    },[]);

  return (
    <div className="border-b border-blue-500" >
        <div className="container mx-auto flex items-center h-${isActive?230px:100px} justify-between" >
            <button className='bg-yellow-500  w-[180px] p-2
             text-white' onClick={()=>setIsActive(!isActive)}>
                Categories {isActive? '▲' : '▼'}
            </button>
            <ul className='grid grid-cols-5 text-center'>
                {
                    isActive? categories.map(
                        
                        (cat,index)=>{
                        return <li className="p-1  text-white bg-mainBlue my-1 mx-2 " key={index}>{cat}</li>
                     }
                   ):null
                }
            </ul>
            
            {/* 
                <ul className="flex gap-2">
                    <li>Home &#9662;</li>
                    <li>Catalog &#9662;</li>
                    <li>Blog &#9662;</li>
                    <li>Pages &#9662;</li>
                    <li>About us &#9662;</li>
                </ul>
            */}

            {/*
                <div>
                    <p>
                        30 Days Free Browse
                    </p>
                </div> 
            */}
        </div>
    </div>
  );
}

export default NavBarCategoriesComponent;