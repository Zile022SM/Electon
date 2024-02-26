import React, { useEffect, useState } from 'react';
import ProductsService from '../services/productsServices';
import { useDispatch } from 'react-redux';
import { getAllProductsSlice } from '../store/productSlice';

function HomePage() {

  const dispatch = useDispatch();


  useEffect(()=>{
    ProductsService.getAllProducts()
    .then((res) => dispatch(getAllProductsSlice(res.data.products)))
    .catch((err) => toast.warning('Nesto nije ok!'));
  },[]);

  return (
    <div>
       {
          products.map(
              
              (product,index)=>{
              return <p className="p-1  text-white bg-mainBlue my-1 mx-2 " key={index}>{product.title}</p>
            }
          )
       }
    </div>
  );
}

export default HomePage;