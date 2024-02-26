import {createSlice} from '@reduxjs/toolkit';

const productSlice = createSlice({
    name:'product',
    initialState:{
        allProducts:[]
    },
    reducers:{
        getAllProductsSlice: (state,action)=>{
            state.allProducts = action.payload;
        }
    }
});

export const {getAllProductsSlice} = productSlice.actions;
export default productSlice.reducer;