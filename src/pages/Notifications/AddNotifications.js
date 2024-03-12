import React, { useEffect, useState, useRef } from "react";
import { useDispatch } from "react-redux";
import toast, { Toaster } from 'react-hot-toast';
import { createBanner } from "../../store/bannerSlice";
import { useForm } from 'react-hook-form';
import axios from "axios";
import { useNavigate } from 'react-router-dom';
import { useParams } from 'react-router-dom';
const AddNotifications = () => {
  let { handleSubmit, register, formState, reset } = useForm()
  const apiUrl = process.env.REACT_APP_API_URL;
  let [category, setCategory] = useState(null)
  let [categoryID, setCategoryID] = useState(null)
  let [image, setImage] = useState(true)
  let [subCategory, setSubCategory] = useState(null)
  const dispatch = useDispatch()
  const selectRef = useRef(null);
  const move = useNavigate()
  const { id } = useParams();


  useEffect(() => {
    var requestOptions = {
      method: 'GET',
      redirect: 'follow'
    };

    fetch(apiUrl + "adminNotification/getAll", requestOptions)
      .then(response => response.json())
      .then((result) => {
        console.log(result)
        setCategory(result)
      })
      .catch(error => console.log('error', error));




      if (id) {
        axios.get(apiUrl + "adminNotification/getById?id=" + id).then((resp) => {
          reset(resp.data)
          setSubCategory(resp.data)
          setCategoryID(resp.data.categoryID)
        });
      } else {
        console.log("add")
      }





  }, [])

  const formSubmit = async (values) => {
    values.categoryID = categoryID
    console.log(values)
    if (id) {
        let form = {
            "id":id,
            "title":values.title,
            "description":values.description
            }

      axios.put(apiUrl + "adminNotification/updateById", form).then((resp) => {
        console.log(resp)
      })
      toast.success("Notification Edited Successfully")
      move("/Notifications")
    } else {
      let form = {
      "title":values.title,
      "description":values.description
      }

      
        axios.post(apiUrl + "adminNotification/create", form).then((res) => {
          console.log(res)
          toast.success("Notification Add Successfully")
          move("/Notifications")
  
        })
      
      
    }

    // console.log(selectRef.current.value)
  }
  return (
    <div className="container-fluid">
      {/*  <!-- Page Heading --> */}
      <Toaster />
      <div className="d-sm-flex align-items-center justify-content-between mb-4">
        <h1 className="h3 mb-0 text-gray-800">{id ? "Edit Notifications" : "Notifications"}</h1>
        {/* <Link to="#" className="d-none d-sm-inline-block btn btn-sm btn-primary shadow-sm"><i
                    className="fas fa-plus fa-sm text-white-50"></i> Add</Link> */}
      </div>
      <div className=" card border p-3 rounded-3">
        <form onSubmit={handleSubmit(formSubmit)}>
          <div className="row">
            <div className="col-md-12 mb-4">
              <label htmlFor="exampleFormControlInput1" className="form-label">
                Title
              </label>
              <input
                {...register("title", { required: true })}
                type="text"
                className="form-control rounded-pill"
                id="exampleFormControlInput1"
                placeholder="Title"
                style={{ height: "40px" }}
              />
              {formState.errors.title && <div className="tw-text-center tw-text-[#ff0000] tw-text-[13px]">Please Enter a title</div>}
            </div>
            <div className="col-md-12 mb-4">
              <label htmlFor="exampleFormControlInput1" className="form-label">
                Description
              </label>
              <textarea
                   
                   rows={7}
                {...register("description", { required: true })}
                type="text"
                className="form-control "
                id="exampleFormControlInput1"
                placeholder="Description"
                // style={{ height: "80px" }}
              ></textarea>
              {formState.errors.description && <div className="tw-text-center tw-text-[#ff0000] tw-text-[13px]">Please Enter a description</div>}
            </div>
           
            <div className="col-md-12 mb-2 text-end">
              <button
                className="btn btn-primary rounded-pill border-0"
                style={{ height: "50px" }}
              >
                {id ? "Edit Notifications" : "Add Notifications"}
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddNotifications;
