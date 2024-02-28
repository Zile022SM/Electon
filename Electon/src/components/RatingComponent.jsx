import Box from '@mui/material/Box';
import Rating from '@mui/material/Rating';
import Typography from '@mui/material/Typography';

function RatingComponent({rating}) {
  return (
    <div>
      <Rating name="half-rating" defaultValue={rating} precision={0.5} className='my-2'/>
    </div>
  );
}

export default RatingComponent;