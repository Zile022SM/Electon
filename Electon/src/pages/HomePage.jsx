import React, { useEffect, useState } from 'react';
import ProductsService from '../services/productsServices';
import { useDispatch, useSelector } from 'react-redux';
import { getAllProductsSlice } from '../store/productSlice';
import ProductCardComponent from '../components/ProductCardComponent';

function HomePage() {

  const dispatch = useDispatch();
  const {allProducts} = useSelector((state)=>state.productStore);

  useEffect(()=>{
    ProductsService.getAllProducts()
    .then((res) => dispatch(getAllProductsSlice(res.data.products)))
    .catch((err) => toast.warning('Nesto nije ok!'));
  },[]);

  return (
    <div className='container mx-auto'>
       <div className='mt-2'>List / Grid View</div>
       {/* Our products/ card */ }
       <div className='flex flex-wrap gap-8 items-center justify-center'>
       {allProducts.map((item,index)=>{
         return <ProductCardComponent key={index} item={item}/>
       })}
       </div>
    </div>
  );
}

export default HomePage;