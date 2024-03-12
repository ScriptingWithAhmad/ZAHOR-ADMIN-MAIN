import {configureStore} from '@reduxjs/toolkit';
import bannerReducer from './bannerSlice'


const Store=configureStore({
    reducer:{
        banner:bannerReducer,
    }
})



export default Store