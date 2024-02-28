import { Link } from 'react-router-dom';
import Box from '@mui/material/Box';
import Rating from '@mui/material/Rating';
import Typography from '@mui/material/Typography';
import RatingComponent from './RatingComponent';

function ProductCardComponent({item}) {
  return (
    <div className='w-[350px] h-[350px] border border-blue-500 rounded-[20px] mt-10 text-center'>
       <div className='relative'>
          <img src={item.thumbnail} alt="" className='w-full h-[160px] object-cover rounded-t-[20px]'/>
          <div className='absolute top-0 left-0 right-0 bottom-0 bg-[#000000] rounded-[20px] opacity-60 hover:opacity-0 transition-all cursor-pointer'/>
        </div>
        <div className='flex flex-col items-center justfy-center my-4'>
          <h2 className='text-xl font-bold'>{item.title}</h2>
          <span className='text-mainBlue font-bold'>${item.price}</span>
          <RatingComponent rating={item.rating} />
          <Link to={`/productDetails/${item.id}`} className='bg-mainBlue text-white py-2 px-5 rounded-[10px] my-4'>View detail...</Link>
        </div>
          
       
    </div>
  );
}

export default ProductCardComponent;