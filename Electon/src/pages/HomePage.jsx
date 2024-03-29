import React, { useEffect, useState } from "react";
import ProductsService from "../services/productsServices";
import { useDispatch, useSelector } from "react-redux";
import { getAllProductsSlice } from "../store/productSlice";
import ProductCardComponent from "../components/ProductCardComponent";
import { FaList } from "react-icons/fa";
import { FiGrid } from "react-icons/fi";
import { Hidden } from "@mui/material";

function HomePage() {

  const [activeView, setActiveView] = useState("gridView");

  const dispatch = useDispatch();
  const { allProducts } = useSelector((state) => state.productStore);

  useEffect(() => {
    ProductsService.getAllProducts()
      .then((res) => dispatch(getAllProductsSlice(res.data.products)))
      .catch((err) => toast.warning("Nesto nije ok!"));
  }, []);

  return (
    <div className="container mx-auto">
      <div className="mt-2 flex gap-2 mr-5 mt-4 items-center justify-end">
        <button className="hidden md:block lg:block">
          <FaList
            size="24px"
            color="#003F62"
            onClick={() => setActiveView("listView")}
            style={{
              transform: activeView === "listView" ? "scale(1.5)" : "scale(1)",
              color: activeView === "listView" ? "orange" : "#003F62",
            }}
          />
        </button>
      
      <button className="hidden md:block lg:block">
      <FiGrid
          size="24px"
          color="#003F62"
          onClick={() => setActiveView("gridView")}
          style={{
            transform: activeView === "gridView" ? "scale(1.5)" : "scale(1)",
            color: activeView === "gridView" ? "orange" : "#003F62",
          }}
        />
      </button>
        
      </div>
      {/* Our products/ card */}
      <div className={activeView==='gridView'?"flex flex-col items-center justify-center lg:grid lg:grid-cols-3 lg:gap-1 my-8  md:grid md:grid-cols-2 ":" flex flex-col flex-wrap w-full items-center justify-center"}>
        {allProducts.map((item, index) => {
          return <ProductCardComponent key={index} item={item} index={index} activeView={activeView}/>;
        })}
      </div>
    </div>
  );
}

export default HomePage;
