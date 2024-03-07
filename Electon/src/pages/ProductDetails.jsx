import { Link, useParams} from "react-router-dom";
import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useState } from "react";
import ProductsService from "../services/productsServices";
import RatingComponent from "../components/RatingComponent";
import { FaCheck } from "react-icons/fa6";
import { ImCross } from "react-icons/im";
import ButtonComponent from "../components/ButtonComponent";
import { saveInCartHandler } from "../store/cartSlice";




function ProductDetails() {


    const {id} = useParams();
    const dispatch = useDispatch();
    const cart = useSelector(state => state.cartStore.cart);
    const [currentImage, setCurrentImage]=useState(0);
    const [foundedProduct,setFoundedProduct]= useState({});
    const [isLoading,setIsLoading] = useState(false);

   useEffect(()=>{

      const convertedId = parseInt(id);

      ProductsService.getSingleProduct(convertedId)
      .then((res)=>{
        setFoundedProduct(res.data)
        setIsLoading(true);
      })
      .catch(err=>console.log(err))

   },[]);

   function handleProduct(){
    dispatch(saveInCartHandler(foundedProduct));
   }
  return (

    <>
      {
        isLoading&& (  

            <>
                <div className="container mx-auto flex flex-col lg:w-[50%] lg:no-wrap lg:flex-row items-center justify-center">
                {/* left side images */}
                <div className="lg:w-[50%]  w-full">
                    <img src={foundedProduct.images[currentImage]} alt="" className="w-[400px] h-[400px] border border-yellow-500 p-2 rounded-[50px]  my-4 mx-auto"/>
                    <div className="flex flex-wrap justify-start items-center  my-10  gap-1">
                        {
                            foundedProduct.images.map((image,index)=>{
                                return(
                                    <div key={index} className="w-[100px] h-[100px] rounded-[10px]">
                                         <img src={image} className={`w-full h-full rounded-[10px] ${currentImage===index? 'opacity-70 my-2 cursor-pointer':''}`} onClick={()=>{
                                            setCurrentImage(index);
                                         }} onMouseEnter={()=>{
                                            setCurrentImage(index);
                                         }} onMouseLeave={()=>{
                                            setCurrentImage(0);
                                         }}/>
                                    </div>
                                )
                            })
                        }
                    </div>
                </div>
            
                {/* right side images */}
                <div className="lg:w-[50%] my-5 w-full ml-8 flex flex-col items-start">
                    <h2 className="text-[30px] text-mainBlue">{foundedProduct.title}</h2>
                    <span className="text-[25px]">${foundedProduct.price}</span>
                    <p>
                        <span>Reviews: </span> 
                        <RatingComponent rating={foundedProduct.rating} />
                       
                    </p>
                    <p className="flex gap-2 items-center"><span>Availabilty:</span> {foundedProduct.stock?(
                    <>
                     <FaCheck color="green" size='1.6rem' /> <span className=" font-bold">In Stock</span>
                    </>
                    )
                    :(
                        <>
                        <ImCross color="red" />
                        <span className="text-red">Out of Stock</span> 
                        </>
                     )
                    }
                    </p>
                    <div className="flex gap-3">
                       <Link to={'/cartProducts'} onClick={()=>handleProduct()}>
                         <ButtonComponent title={'Add to Cart'} color={'mainBlue'} text={'white'} />
                       </Link>
                        <ButtonComponent title={'Buy It now'} color={'mainBlue'} text={'white'}/>
                    </div>
                </div>
            
                </div>
            </>
        )}
    </>
    
  );
}

export default ProductDetails;