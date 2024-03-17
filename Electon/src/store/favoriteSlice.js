import { createSlice } from "@reduxjs/toolkit";


const favoriteSlice = createSlice({
    name:'favorite',
    initialState:{
        favoriteProducts:[],
        favoritesTotalProducts:0,
    },
    reducers:{
        setFavoriteProductsHendler:(state,action)=>{
            let copyArray = [...state.favoriteProducts];

            let findIndex = null;

            copyArray.find((item,index)=>{
                if(item.id === action.payload.id){
                    findIndex = index;
                    return;
                }
            });

            if(findIndex === null){
                copyArray.push({...action.payload,statusLike:true});
                state.favoritesTotalProducts++;
            }else{
                copyArray[findIndex].statusLike = false;
                copyArray.splice(findIndex,1);
               
                state.favoritesTotalProducts--;
            }

            state.favoriteProducts = copyArray;
        },
 
    }
});

export const {setFavoriteProductsHendler} = favoriteSlice.actions;
export default favoriteSlice.reducer;