import { Link, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import ProductsService from "../services/productsServices";
import RatingComponent from "../components/RatingComponent";
import { FaCheck } from "react-icons/fa6";
import { ImCross } from "react-icons/im";
import ButtonComponent from "../components/ButtonComponent";
import { FaRegHeart } from "react-icons/fa6";
import { IoIosHeart } from "react-icons/io";
import {
  saveInCartHandler,
  setPriceDecrementHendler,
  setPriceIncrementHendler,
} from "../store/cartSlice";
import { setFavoriteProductsHendler } from "../store/favoriteSlice";
import { motion } from "framer-motion";

function ProductDetails() {

  const { id } = useParams();
  const dispatch = useDispatch();

  //cart handler
  const { cart } = useSelector((state) => state.cartStore);
  //const { currentProduct } = useSelector((state) => state.cartStore);

  //favorite hendler
  const { favoriteProducts } = useSelector((state) => state.favoriteStore);
  const {currentIndex} = useSelector((state) => state.cartStore);
  const [currentImage, setCurrentImage] = useState(0);

  const [currentFavoriteProduct, setCurrentFavoriteProduct] = useState({});
  const [currentProduct, setCurrentProduct] = useState({});
  const [foundedProduct, setFoundedProduct] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const currentId = parseInt(id);
  //console.log(currentId);

  useEffect(() => {
    ProductsService.getSingleProduct(currentId)
      .then((res) => {
        setFoundedProduct(res.data);
        setIsLoading(true);
      })
      .catch((err) => console.log(err));
  }, []);

  useEffect(() => {
   
    const foundProduct = favoriteProducts.find(item => item.id === currentId);

    if (foundProduct !== undefined) {
        setCurrentFavoriteProduct(foundProduct);
  
    } else {
        setCurrentFavoriteProduct(null);
    }

  },[favoriteProducts,currentId]);

  useEffect(() => {
    const currentProductInCart = cart.find((item) => item.id === currentId);
   // console.log("Korpa "+currentProductInCart.title);

    if (currentProductInCart !== undefined) {
        setCurrentProduct(currentProductInCart);
    }else {
        setCurrentProduct({});
    }
  }, [cart,currentId]);

  const fadeFromLeftSide = {
    initial:{
      opacity:0,
      x:-100,
    },
    animate:{
      opacity:1,
      x:0,
      transition:{
        delay:0.1,
        duration:1
        
      },
    },
  }

  const fadeFromRightSide = {
    initial:{
      opacity:0,
      x:100,
    },
    animate:{
      opacity:1,
      x:0,
      transition:{
        delay:0.1,
        duration:1
        
      },
    },
  }

  function handleProduct() {
    dispatch(saveInCartHandler(foundedProduct));
  }

  function handleFavoriteClick(){
    dispatch(setFavoriteProductsHendler(foundedProduct));
  }

  return (
    <>
      {isLoading && (
        <>
          <div className="container mx-auto flex flex-col lg:no-wrap flex-wrap grid grid-cols-1 lg:flex-row justify-start lg:grid lg:grid-cols-2 py-[80px]">
            {/* left side images */}
            <motion.div className="w-full"
              variants={fadeFromLeftSide}
              initial="initial"
              whileInView={"animate"}
              viewport={{ once: true }}
            >
              <img
                src={foundedProduct.images[currentImage]}
                alt=""
                className="w-full h-[80vh] border border-okvir border-2 border-slate-300 p-2 rounded-[30px]"
              />
              <div className="flex flex-wrap justify-center items-center  my-10  gap-5">
                {foundedProduct.images.map((image, index) => {
                  return (
                    <div
                      key={index}
                      className="w-[100px] h-[100px] rounded-[10px]"
                    >
                      <img
                        src={image}
                        className={`w-full h-full rounded-[10px] ${
                          currentImage === index
                            ? "opacity-70 my-2"
                            : ""
                        } border-2 border-slate-300 hover:cursor-pointer`}
                        onClick={() => {
                          setCurrentImage(index);
                        }}
                        // onMouseEnter={() => {
                        //   setCurrentImage(index);
                        // }}
                        // onMouseLeave={() => {
                        //   setCurrentImage(0);
                        // }}
                      />
                    </div>
                  );
                })}
              </div>
            </motion.div>

            {/* right side images */}
            <motion.div className="w-full  flex flex-col justify-start mx-12"
                 variants={fadeFromRightSide}
                 initial="initial"
                 whileInView={"animate"}
                 viewport={{ once: true }}
            >
              <h2 className="text-[30px] text-mainBlue pb-3">
                {foundedProduct.title}
              </h2>
              <span className="text-[25px]">${foundedProduct.price}</span>
              <p className="pb-3 flex gap-2 items-center">
                <span>Reviews: </span>
                <RatingComponent
                  rating={foundedProduct.rating}
                  className="pb-3"
                />
              </p>
              <p className="flex gap-2 items-center pb-3 text-xl">
                <span>Availabilty:</span>{" "}
                {foundedProduct.stock ? (
                  <>
                    <FaCheck color="green" size="1.6rem" />{" "}
                    <span className=" font-bold">In Stock</span>
                  </>
                ) : (
                  <>
                    <ImCross color="red" />
                    <span className="text-red">Out of Stock</span>
                  </>
                )}
              </p>
              <p className="text-textColor text-xl pb-12 border-b border-slate-400">
                Hurry up! only {foundedProduct.stock} product left in stock!
              </p>

              <div className="flex gap-3 py-[70px] flex-col">
                <p className="text-xl ">Price: ${foundedProduct.price}</p>
                <p className="text-xl ">Total Price: {currentProduct?.subTotal}</p>
                <div className="flex items-center pb-5">
                  <p className="text-xl mr-4">Cart quantity:</p>
                  {currentProduct?.id === foundedProduct.id ? (
                    <div className="flex items-center gap-1">
                      <button
                        className="px-[8px] py-[4px] bg-slate-300 w-[30px]"
                        onClick={() =>
                          dispatch(setPriceDecrementHendler(currentIndex))
                        }
                      >
                        -
                      </button>
                      <span className="px-[8px] py-[4px] bg-gray-300 w-[40px] text-center">
                            {currentProduct?.count}
                      </span>
                      <button
                        className="px-[8px] py-[4px] bg-slate-300 w-[30px]"
                        onClick={() =>
                          dispatch(setPriceIncrementHendler(currentIndex))
                        }
                      >
                        +
                      </button>
                    </div>
                  ):(
                    <p className="text-xl"></p>
                  )}
                
                </div>
                <div className="flex gap-8 items-center border-b border-slate-400 pb-12">
                  <Link to={"/cartProducts"} onClick={() => handleProduct()}>
                    <ButtonComponent
                      title={"Add to Cart"}
                      color={"mainOrange"}
                      text={"white"}
                    />
                  </Link>

                  {
                   currentFavoriteProduct?.statusLike === true ? <IoIosHeart  size={'45px'} style={{color: 'red',cursor: 'pointer',background:'lightgray',padding:'5px',borderRadius:'50%'}} onClick={handleFavoriteClick }/> : <FaRegHeart  size={'45px'} style={{color: 'dark',cursor: 'pointer',background:'lightgray',padding:'6px',borderRadius:'50%'}} onClick={handleFavoriteClick}/>
                  }
        
            
                </div>
              </div>
            </motion.div>
          </div>
        </>
      )}
    </>
  );
}

export default ProductDetails;
