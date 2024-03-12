import React, { useEffect, useState, useRef } from "react";
import toast, { Toaster } from "react-hot-toast";
import { useDispatch } from "react-redux";
import { createBanner } from "../../store/bannerSlice";
import { useForm } from 'react-hook-form';
import { useParams } from 'react-router-dom';
import axios from "axios";
import { Link, useNavigate } from 'react-router-dom'
const EditTicket = () => {
    let { handleSubmit, register, reset } = useForm()
    const dispatch = useDispatch()
    let [ticket, setTicket] = useState(null)
    let [user, setUser] = useState(null)
    let [usr, setUsr] = useState(null)
    let [cat, setCat] = useState(null)
    let [subCat, setSubCat] = useState(null)
    let [category, setCategory] = useState(null)
    let [subCategory, setSubCategory] = useState(null)
    let [weightType, setWeightType] = useState(null)
    let [weightUnit, setWeightUnit] = useState(null)
    let [status,setStatus]=useState(null)
    const navigate = useNavigate()
    const apiUrl = process.env.REACT_APP_API_URL;
    const { id } = useParams();



    const callMainApi = async () => {
        await axios.get(apiUrl + "ticket/getById?id=" + id).then((res) => {
            console.log(res.data)
            setTicket(res.data)
            reset(res.data)
        })
    }

    const callAllApis = async () => {

        await axios.get(apiUrl + "user/getAll").then((res) => {
            setUsr(res.data);
        });
        await axios.get(apiUrl + "category/getAll").then((res) => {
            setCat(res.data);
        });
        await axios.get(apiUrl + "subCategory/getAll").then((res) => {
            setSubCat(res.data);
        });

    }

    useEffect(() => {

        callMainApi();
    }, [])

    useEffect(() => {

        if (ticket) {
            callAllApis();
        }

    }, [ticket])

    const formSubmit = async (values) => {
        values.id = ticket._id
        if (category) {

            values.categoryID = category
        }
        if (subCategory) {

            values.subCategoryID = subCategory
        }
        if (user) {

            values.userID = user
        }
        if (weightType) {

            values.weightType = weightType
        }
        if (weightUnit) {

            values.weightUnit = weightUnit
        }
        if (status) {

            values.status = status
        }
        console.log(values)
        await axios.put(apiUrl + "ticket/updateById", values).then((resp) => {
            toast.success("ticket edited successfully")
            navigate("/tickets")

        })
    }

    return (
        <div className="container-fluid">
            {/*  <!-- Page Heading --> */}
            <Toaster />
            <div className="d-sm-flex align-items-center justify-content-between mb-4">
                <h1 className="h3 mb-0 text-gray-800">Edit Ticket</h1>
            </div>
            <div className=" card border p-3 rounded-3">
                <form onSubmit={handleSubmit(formSubmit)}>
                    <div className="row">
                        {/* <div className="col-md-6 mb-4">
                            <label htmlFor="exampleFormControlInput1" className="form-label">
                                Product Name
                            </label>
                            <input
                                {...register("title")}
                                type="text"
                                className="form-control rounded-pill"
                                id="exampleFormControlInput1"
                                placeholder="alpha"
                                style={{ height: "40px" }}
                            />
                        </div> */}
                        <div className="col-md-6 mb-4">
                            <label htmlFor="exampleFormControlInput1" className="form-label">
                                Category Name

                            </label>
                            {cat ? <div className="tw-relative tw-px-3 tw-py-[7px] tw-border-[1px] tw-border-gray-300 tw-rounded-full">
                                <select {...register("categoryID")} className="tw-w-full tw-outline-none rounded-pill tw-caret-black" aria-label="Dropdown menu" name="" id=""
                                    onChange={(e) => {
                                        setCategory(e.target.value)
                                    }}
                                >
                                    {cat.map((data) => {
                                        return <option value={data._id}  >{data.categoryName}</option>
                                    })}
                                </select>
                            </div> : null}


                        </div>
                        <div className="col-md-6 mb-4">
                            <label htmlFor="exampleFormControlInput1" className="form-label">
                                Subcategory Name
                            </label>
                            {subCat ? <div className="tw-relative tw-px-3 tw-py-[7px] tw-border-[1px] tw-border-gray-300 tw-rounded-full">
                                <select {...register("subCategoryID")} className="tw-w-full tw-outline-none rounded-pill tw-caret-black" aria-label="Dropdown menu" name="" id=""
                                    onChange={(e) => {
                                        setSubCategory(e.target.value)
                                    }}
                                >
                                    {subCat.map((data) => {
                                        return <option value={data._id}>{data.subCategoryName}</option>
                                    })}
                                </select>
                            </div> : null}

                        </div>
                        <div className="col-md-6 mb-4">
                            <label htmlFor="exampleFormControlInput1" className="form-label">
                                username
                            </label>
                            {usr ? <div className="tw-relative tw-px-3 tw-py-[7px] tw-border-[1px] tw-border-gray-300 tw-rounded-full">
                                <select {...register("userID")} className="tw-w-full tw-outline-none rounded-pill tw-caret-black" aria-label="Dropdown menu" name="" id=""
                                    onChange={(e) => {
                                        setUser(e.target.value)
                                    }}
                                >
                                    {usr.map((data) => {
                                        return <option value={data._id}>{data.name}</option>
                                    })}
                                </select>
                            </div> : null}

                        </div>

                        <div className="col-md-6 mb-4">
                            <label htmlFor="exampleFormControlInput1" className="form-label">
                                Discription
                            </label>
                            <input
                                {...register("discription")}
                                type="text"
                                className="form-control rounded-pill"
                                id="exampleFormControlInput1"
                                placeholder="alpha"
                                style={{ height: "40px" }}
                            />
                        </div>
                        {/* <div className="col-md-6 mb-4 tw-relative">
                            <label htmlFor="exampleFormControlInput1" className="form-label">
                                Product Weight
                            </label>
                            <input
                                {...register("weight")}
                                type="text"
                                className="form-control rounded-pill"
                                id="exampleFormControlInput1"
                                placeholder="50 gram"
                                style={{ height: "40px" }}
                            />
                            <select {...register("weightType")} className="tw-absolute tw-m-auto tw-top-8 tw-bottom-0 tw-right-6 tw-outline-none tw-h-6 rounded-pill tw-caret-black" aria-label="Dropdown menu" name="" id=""
                                    onChange={(e) => {
                                        setWeightType(e.target.value)
                                    }}
                                >
                                    
                                        <option value="Kg">kg</option>
                                        <option value="ton">ton</option>
                                
                                </select>
                        </div> */}
                        
                        <div className="col-md-6 mb-4 tw-relative">
                            <label htmlFor="exampleFormControlInput1" className="form-label">
                                Product Price
                            </label>
                            <input
                                {...register("price")}
                                type="text"
                                className="form-control rounded-pill"
                                id="exampleFormControlInput1"
                                placeholder="300/-"
                                style={{ height: "40px" }}
                            />
                            <select {...register("weightUnit")} className="tw-absolute tw-m-auto tw-top-8 tw-bottom-0 tw-right-6 tw-outline-none rounded-pill tw-h-6  tw-caret-black" aria-label="Dropdown menu" name="" id=""
                                    onChange={(e) => {
                                        setWeightUnit(e.target.value)
                                    }}
                                    >
                                        
                                            <option value="LumSum">LumSum</option>
                                            <option value="Per Kg">Per Kg</option>
                                            <option value="Per Piece">Per Piece</option>
                                    
                                    </select>
                        </div>
                        <div className="col-md-6 mb-4">
                            <label htmlFor="exampleFormControlInput1" className="form-label">
                                Contact No
                            </label>
                            <input
                                {...register("contactNo")}
                                type="text"
                                className="form-control rounded-pill"
                                id="exampleFormControlInput1"
                                placeholder="300/-"
                                style={{ height: "40px" }}
                            />
                        </div>
                        <div className="col-md-6 mb-4">
                            <label htmlFor="exampleFormControlInput1" className="form-label">
                                City Name
                            </label>
                            <input
                                {...register("cityName")}
                                type="text"
                                className="form-control rounded-pill"
                                id="exampleFormControlInput1"
                                placeholder="300/-"
                                style={{ height: "40px" }}
                            />
                        </div>
                        <div className="col-md-6 mb-4">
                            <label htmlFor="exampleFormControlInput1" className="form-label">
                                Address Detais
                            </label>
                            <input
                                {...register("addressDetails")}
                                type="text"
                                className="form-control rounded-pill"
                                id="exampleFormControlInput1"
                                placeholder="300/-"
                                style={{ height: "40px" }}
                            />
                        </div>


                        <div className="col-md-6 mb-4">
                            <label htmlFor="exampleFormControlInput1" className="form-label">
                                status
                            </label>
                            <div className="tw-relative tw-px-3 tw-py-[7px] tw-border-[1px] tw-border-gray-300 tw-rounded-full">
                                <select {...register("status")} className="tw-w-full tw-outline-none rounded-pill tw-caret-black" aria-label="Dropdown menu" name="" id=""
                                    onChange={(e) => {
                                        setStatus(e.target.value)
                                    }}
                                >
                                    <option value="In Progress">In Progress</option>
                                    <option value="Under Inspection">Under Inspection</option>
                                    <option value="Price Quoted">Price Quoted</option>
                                    <option value="Price Accepted">Price Accepted</option>
                                    <option value="Materials Acquired">Materials Acquired</option>
                                    <option value="Transaction Completed">Transaction Completed</option>
                                </select>
                            </div>

                        </div>

                        <div className="col-md-6 mb-4">
                            <label htmlFor="exampleFormControlInput1" className="form-label">
                                Scrap Images
                            </label>
                            <div className="tw-flex tw-gap-3">
                                {ticket?.scrapImages?.map((data)=>{
                                    return <img className="tw-w-24 tw-cursor-pointer" src={apiUrl+"images/"+data} alt="" onClick={()=>{
                                        // navigate()
                                        window.open(apiUrl+"images/"+data, '_blank');
                                    }}/>
                                })}
                            </div>
                        </div>

                        <div className="col-md-12 mb-2 text-end">
                            <button
                                className="btn btn-primary rounded-pill border-0"
                                style={{ height: "50px" }}
                            >
                                Edit Ticket
                            </button>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default EditTicket;
