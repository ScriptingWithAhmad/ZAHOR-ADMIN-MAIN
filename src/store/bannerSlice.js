import axios from 'axios'
import { message } from "antd";
import api_url from '../pages/ApiUrl';
const {createSlice} = require("@reduxjs/toolkit")

const STATUS=Object.freeze({
    IDLE: "idle",
    ERROR: "error",
    LOADING: "loading",
})


const bannerSlice=createSlice({
    name: "banner",
    initialState:{
        data:[],
        status:STATUS.IDLE,
    },
    reducers:{
        setBanner(state,action){
            state.data=action.payload
        },
        setStatus(state,action){
            state.status=action.payload
        }
    }
})



export const {setBanner,setStatus}=bannerSlice.actions
export default bannerSlice.reducer




// thunk

export function fetchBanner(){
    return async function fetchBannerThunk(dispatch, getState){
        dispatch(setStatus(STATUS.LOADING))
        try{
            await axios.get(`${api_url}/banner`).then(
                (resp) => {
                    dispatch(setBanner(resp.data))
                })
                dispatch(setStatus(STATUS.IDLE))
        }catch(err){
            console.log(err);
            dispatch(setStatus(STATUS.ERROR))
        }
    }
}




export function createBanner(param){
    return async function createBannerThunk(dispatch, getState){
        dispatch(setStatus(STATUS.LOADING))
        try{
            await axios.post(`${api_url}/banner/`,param).then(res=>{
                console.log(res.data)
                if (res.data?.status == "success") {
                    message.success("Banner Created")
                }
            })
                dispatch(setStatus(STATUS.IDLE))
        }catch(err){
            console.log(err);
            dispatch(setStatus(STATUS.ERROR))
        }
    }
}



export function updateBanner(id){
    return async function updateBannerThunk(dispatch, getState){
        dispatch(setStatus(STATUS.LOADING))
        try{
            await axios.put(`${api_url}/banner/${id}`).then(res=>{
                console.log(res.data)
                if (res.data?.status == "success") {
                    message.success("Banner Updated")
                }
            })
                dispatch(setStatus(STATUS.IDLE))
        }catch(err){
            console.log(err);
            dispatch(setStatus(STATUS.ERROR))
        }
    }
}




export function deleteBanner(id){
    return async function deleteBannerThunk(dispatch, getState){
        dispatch(setStatus(STATUS.LOADING))
        try{
            await axios.post(`${api_url}/banner/${id}`).then(res=>{
                if(res.data.status == "success"){
                  window.location.reload(true)
                }
              })
                dispatch(setStatus(STATUS.IDLE))
        }catch(err){
            console.log(err);
            dispatch(setStatus(STATUS.ERROR))
        }
    }
}




export function getByIdBanner(id){
    return async function getByIdBannerThunk(dispatch, getState){
        dispatch(setStatus(STATUS.LOADING))
        try{
            await axios.post(`${api_url}/banner/${id}`).then(
                (resp) => {
                    dispatch(setBanner(resp.data.data))
                })
                dispatch(setStatus(STATUS.IDLE))
        }catch(err){
            console.log(err);
            dispatch(setStatus(STATUS.ERROR))
        }
    }
}
