import { Link, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import ProductsService from "../services/productsServices";
import RatingComponent from "../components/RatingComponent";
import { FaCheck } from "react-icons/fa6";
import { ImCross } from "react-icons/im";
import ButtonComponent from "../components/ButtonComponent";
import { CgHeart } from "react-icons/cg";
import {
  saveInCartHandler,
  setPriceDecrementHendler,
  setPriceIncrementHendler,
} from "../store/cartSlice";

function ProductDetails() {

  const { id } = useParams();
  const dispatch = useDispatch();
  const { cart } = useSelector((state) => state.cartStore);
  const { currentIndex } = useSelector((state) => state.cartStore);
  const [currentImage, setCurrentImage] = useState(0);
  const [foundedProduct, setFoundedProduct] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const currentId = parseInt(id);


  useEffect(() => {
    ProductsService.getSingleProduct(currentId)
      .then((res) => {
        setFoundedProduct(res.data);
        setIsLoading(true);
      })
      .catch((err) => console.log(err));
  }, []);

  function handleProduct() {
    dispatch(saveInCartHandler(foundedProduct));
  }
  return (
    <>
      {isLoading && (
        <>
          <div className="container mx-auto flex flex-col lg:no-wrap flex-wrap grid grid-cols-1 lg:flex-row justify-start lg:grid lg:grid-cols-2 py-[80px]">
            {/* left side images */}
            <div className="w-full">
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
            </div>

            {/* right side images */}
            <div className="w-full  flex flex-col justify-start mx-12">
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
                <p className="text-xl ">Total Price: {cart.length > 0 && Object.keys(cart[currentIndex]).length > 0 && cart[currentIndex].id === foundedProduct.id ?  cart[currentIndex].subTotal : ''}</p>
                <div className="flex items-center pb-5">
                  <p className="text-xl mr-4">Cart quantity:</p>
                  {cart.length > 0 && cart[currentIndex].id === foundedProduct.id ?  
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
                            {cart.length > 0 && Object.keys(cart[currentIndex]).length > 0 &&  cart[currentIndex].id === foundedProduct.id ? cart[currentIndex].count : ''}
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
                   : 
                    ""
                  }
                </div>
                <div className="flex gap-8 items-center border-b border-slate-400 pb-12">
                  <Link to={"/cartProducts"} onClick={() => handleProduct()}>
                    <ButtonComponent
                      title={"Add to Cart"}
                      color={"mainOrange"}
                      text={"white"}
                    />
                  </Link>
                  <CgHeart
                    size={"40px"}
                    style={{
                      background: "lightgray",
                      borderRadius: "50%",
                      padding: "8px",
                    }}
                  />
                </div>
              </div>
            </div>
          </div>
        </>
      )}
    </>
  );
}

export default ProductDetails;
