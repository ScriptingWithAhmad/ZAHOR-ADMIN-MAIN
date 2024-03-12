import React, { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'
import { createBanner } from '../../store/bannerSlice'
import toast, { Toaster } from 'react-hot-toast'
import { useParams } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import axios from 'axios';
const EditUsers = () => {
    const apiUrl = process.env.REACT_APP_API_URL;
    const navigate = useNavigate()
    const dispatch = useDispatch()
    let { handleSubmit, register, formState, watch, reset, setValue } = useForm()
    let [user, setUser] = useState()
    let [idFront,setIdFront]=useState(true)
    let [idBack,setIdBack]=useState(true)
    let [tradeLicense,setTradeLicense]=useState(true)
    let [taxNumber,setTaxNumber]=useState(true)
    let [loading,setLoading]=useState(false)
    const { id } = useParams();

    useEffect(() => {
        if (id) {
            axios.get(apiUrl + "user/getById?id=" + id).then((resp) => {
                setUser(resp.data)
                reset(resp.data)
    
                // setValue('emiratesIdExpiryDate', resp.data.emiratesIdExpiryDate);
    
            })
        }
        
    }, [])

    const formSubmit = async (values) => {
        setLoading(true)
        console.log(values)

        var formdata = new FormData();
        formdata.append("name", values.name);
        formdata.append("email", values.email);
        formdata.append("company", values.company);
        formdata.append("tradeLicenseNo", values.tradeLicenseNo);
        formdata.append("trnNumber", values.trnNumber);
        formdata.append("emiratesIdExpiryDate", values.emiratesIdExpiryDate);
        formdata.append("tradeLicenseExpiryDate", values.tradeLicenseExpiryDate);
        formdata.append("phoneNo", values.phoneNo);
        if (typeof values.emiratesIdFront === 'string') {

            formdata.append("emiratesIdFront", values.emiratesIdFront);
        } else {
            formdata.append("emiratesIdFront", values.emiratesIdFront[0]);
        }
        if (typeof values.emiratesIdBack === 'string') {

            formdata.append("emiratesIdBack", values.emiratesIdBack);
        } else {
            formdata.append("emiratesIdBack", values.emiratesIdBack[0]);
        }
        if (typeof values.tradeLicense === 'string') {

            formdata.append("tradeLicense", values.tradeLicense);
        } else {
            formdata.append("tradeLicense", values.tradeLicense[0]);
        }
        if (typeof values.taxNumber === 'string') {
            formdata.append("taxNumber", values.taxNumber);
        } else {
            formdata.append("taxNumber", values.taxNumber[0]);
        }

        if (id) {
            formdata.append("id", user._id);
            var requestOptions = {
                method: 'PUT',
                body: formdata,
                redirect: 'follow'
            };
    
            fetch(apiUrl + "user/updateById", requestOptions)
                .then(response => response.text())
                .then((result) => {
                    setLoading(false)
                    toast.success("user edited successfully")
                    if (values.status=="approve") {
                        navigate("/approvedUsers")
                    }else{
                        navigate("/Denied_users")
                    }
                    console.log(result)
                })
                .catch(error => console.log('error', error));
        }else{
            try {
                await axios.post(apiUrl+"user/create",formdata)
                setLoading(false)
                toast.success("user added successfully")
                    if (values.status=="approve") {
                        navigate("/approvedUsers")
                    }else{
                        navigate("/Denied_users")
                    }
            } catch (error) {
                setLoading(false)
                console.log(error)
            }
        }

       

    }

    return (
        <div className="container-fluid">

            {/*  <!-- Page Heading --> */}
            <Toaster />
            <div className="d-sm-flex align-items-center justify-content-between mb-4">
                <h1 className="h3 mb-0 text-gray-800">Edit Users</h1>
            </div>
            <div className=' card border p-3 rounded-3'>
                <form onSubmit={handleSubmit(formSubmit)}>
                    <div className='row'>
                        <div className='col-md-6 mb-4'>
                            <label htmlFor="exampleFormControlInput1" className="form-label">
                                Name
                            </label>
                            <input
                                {...register("name")}
                                type="text"
                                className="form-control rounded-pill"
                                id="exampleFormControlInput1"
                                placeholder="alpha"
                                style={{ height: '40px' }}
                            />
                        </div>
                        <div className='col-md-6 mb-4'>
                            <label htmlFor="exampleFormControlInput1" className="form-label">
                                Email
                            </label>
                            <input
                                {...register("email")}
                                type="email"
                                className="form-control rounded-pill"
                                id="exampleFormControlInput1"
                                placeholder="demo@gmail.com"
                                style={{ height: '40px' }}
                            />
                        </div>
                        <div className='col-md-6 mb-4'>
                            <label htmlFor="exampleFormControlInput1" className="form-label">
                                Phone No
                            </label>
                            <input
                                {...register("phoneNo")}
                                type="text"
                                className="form-control rounded-pill"
                                id="exampleFormControlInput1"
                                placeholder="demo@gmail.com"
                                style={{ height: '40px' }}
                            />
                        </div>
                        <div className='col-md-6 mb-4'>
                            <label htmlFor="exampleFormControlInput1" className="form-label">
                                Company
                            </label>
                            <input
                                {...register("company")}
                                type="text"
                                className="form-control rounded-pill"
                                id="exampleFormControlInput1"
                                placeholder="Company"
                                style={{ height: '40px' }}
                            />
                        </div>
                        <div className='col-md-6 mb-4'>
                            <label htmlFor="exampleFormControlInput1" className="form-label">
                                Trade License Number
                            </label>
                            <input
                                {...register("tradeLicenseNo")}
                                type="text"
                                className="form-control rounded-pill"
                                id="exampleFormControlInput1"
                                placeholder="Trade License Number"
                                style={{ height: '40px' }}
                            />
                        </div>
                        <div className='col-md-6 mb-4'>
                            <label htmlFor="exampleFormControlInput1" className="form-label">
                                TRN Number
                            </label>
                            <input
                                {...register("trnNumber")}
                                type="text"
                                className="form-control rounded-pill"
                                id="exampleFormControlInput1"
                                placeholder="Trade License Number"
                                style={{ height: '40px' }}
                            />
                        </div>
                        <div className='col-md-6 mb-4 tw-overflow-hidden tw-relative'>
                            <label htmlFor="exampleFormControlInput1" className="form-label">
                                Emirates Id Front
                            </label>
                            <input
                                {...register("emiratesIdFront")}
                                type="file"
                                className="form-control rounded-pill"
                                id="exampleFormControlInput1"
                                placeholder="Trade License Number"
                                style={{ height: '40px', color: idFront ? 'transparent' : null}}
                                onChange={()=>{
                                    setIdFront(false)
                                }}
                            />
                            {idFront? <div className='tw-absolute tw-bottom-1 tw-right-[3%] tw-w-[59%] tw-h-7 tw-overflow-hidden tw-cursor-pointer' onClick={()=>{
                                 window.open(apiUrl+"images/"+user?.emiratesIdFront, '_blank');
                            }}>{user?.emiratesIdFront}</div>:null}
                        </div>
                        <div className='col-md-6 mb-4'>
                            <label htmlFor="exampleFormControlInput1" className="form-label">
                                Emirates Id Back
                            </label>
                            <input
                                {...register("emiratesIdBack")}
                                type="file"
                                className="form-control rounded-pill"
                                id="exampleFormControlInput1"
                                placeholder="Trade License Number"
                                style={{ height: '40px', color:idBack ? 'transparent' : null}}
                                onChange={()=>{
                                    setIdBack(false)
                                }}
                            />
                            {idBack? <div className='tw-absolute tw-bottom-1 tw-right-[3%] tw-w-[59%] tw-h-7 tw-overflow-hidden tw-cursor-pointer' onClick={()=>{
                                 window.open(apiUrl+"images/"+user?.emiratesIdBack, '_blank');
                            }}>{user?.emiratesIdBack}</div>:null}
                        </div>
                        <div className='col-md-6 mb-4'>
                            <label htmlFor="exampleFormControlInput1" className="form-label">
                                Emirates Id Expiry Date
                            </label>
                            <input
                                {...register("emiratesIdExpiryDate")}
                                type="date"
                                className="form-control rounded-pill"
                                id="emiratesIdExpiryDate"
                                placeholder="Trade License Number"
                                style={{ height: '40px', }}

                            />

                        </div>
                        <div className='col-md-6 mb-4'>
                            <label htmlFor="exampleFormControlInput1" className="form-label">
                                Trade License
                            </label>
                            <input
                                {...register("tradeLicense")}
                                type="file"
                                className="form-control rounded-pill"
                                id="exampleFormControlInput1"
                                placeholder="Trade License Number"
                                style={{ height: '40px', color: tradeLicense ? 'transparent' : null}}
                                onChange={()=>{
                                    setTradeLicense(false)
                                }}
                            />
                            {tradeLicense? <div className='tw-absolute tw-bottom-1 tw-right-[3%] tw-w-[59%] tw-h-7 tw-overflow-hidden tw-cursor-pointer' onClick={()=>{
                                 window.open(apiUrl+"images/"+user?.tradeLicense, '_blank');
                            }}>{user?.tradeLicense}</div>:null}
                        </div>
                        <div className='col-md-6 mb-4'>
                            <label htmlFor="exampleFormControlInput1" className="form-label">
                                Trade License Expiry Date
                            </label>
                            <input
                                {...register("tradeLicenseExpiryDate")}
                                type="date"
                                className="form-control rounded-pill"
                                id="exampleFormControlInput1"
                                placeholder="Trade License Number"
                                style={{ height: '40px' }}


                            />
                        </div>
                        <div className='col-md-6 mb-4'>
                            <label htmlFor="exampleFormControlInput1" className="form-label">
                                TRN/TAX Number
                            </label>
                            <input
                                {...register("taxNumber")}
                                type="file"
                                className="form-control rounded-pill"
                                id="exampleFormControlInput1"
                                placeholder="Trade License Number"
                                style={{ height: '40px', color: taxNumber ? 'transparent' : null}}
                                onChange={()=>{
                                    setTaxNumber(false)
                                }}
                            />
                           {taxNumber? <div className='tw-absolute tw-bottom-1 tw-right-[3%] tw-w-[59%] tw-h-7 tw-overflow-hidden tw-cursor-pointer' onClick={()=>{
                                 window.open(apiUrl+"images/"+user?.taxNumber, '_blank');
                            }}>{user?.taxNumber}</div>:null}
                        </div>

                        {id?<div className='col-md-12 mb-2 text-end'>
                            <button className={`btn btn-primary rounded-pill border-0 ${loading ? "tw-bg-blue-300" : "btn-primary"}`} style={{ height: '50px' }}
                            disabled={loading}
                            >Update Profile</button>
                        </div>:<div className='col-md-12 mb-2 text-end'>
                            <button className={`btn rounded-pill border-0 ${loading ? "tw-bg-blue-300" : "btn-primary"}`}  style={{ height: '50px' }}
                            disabled={loading}
                            >Add User</button>
                        </div>}
                    </div>

                </form>
            </div>
        </div>
    )
}

export default EditUsers