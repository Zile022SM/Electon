import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useState } from "react";
import ProductsService from "../services/productsServices";
import RatingComponent from "../components/RatingComponent";
import { FaCheck } from "react-icons/fa6";
import { ImCross } from "react-icons/im";

function ProductDetails() {


    const {id} = useParams();

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

  return (

    <>
      {
        isLoading&& (  

            <>
                <div className="container mx-auto flex">
                {/* left side images */}
                <div>
                    <img src={foundedProduct.images[currentImage]} alt="" className="w-[400px] h-[400px] border border-yellow-500 p-4 rounded-[50px] mx-9 my-4"/>
                    <div className="flex flex-wrap justify-start items-center  my-10 mx-12 gap-3">
                        {
                            foundedProduct.images.map((image,index)=>{
                                return(
                                    <div className="w-[100px] h-[100px] rounded-[10px]">
                                         <img src={image} className={`w-full h-full rounded-[10px] ${currentImage===index? 'opacity-70 my-2':''}`} onClick={()=>{
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
                <div className="lg:w-[50%]">
                    <h2>{foundedProduct.title}</h2>
                    <span>${foundedProduct.price}</span>
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
                </div>
            
                </div>
            </>
        )}
    </>
    
  );
}

export default ProductDetails;