import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { createBanner } from "../../store/bannerSlice";
import toast, { Toaster } from "react-hot-toast";
import { useForm } from 'react-hook-form';
import axios from "axios";
import { useParams } from 'react-router-dom';
import { useNavigate } from 'react-router-dom'
const AddCategory = () => {
  let { handleSubmit, register, formState, reset } = useForm()
  const dispatch = useDispatch()
  const move = useNavigate()
  const { id } = useParams();
  const apiUrl = process.env.REACT_APP_API_URL;
  let [category, setCategory] = useState(null)
  let [image, setImage] = useState(true)
  useEffect(() => {
    if (id) {
      axios.get(apiUrl + "category/getById?id=" + id).then((resp) => {
        reset(resp.data)
        setCategory(resp.data)
        // console.log(resp)
      });
    } else {
      console.log("add")
    }
  }, [])
  const formSubmit = async (values) => {
    delete values.username
    // console.log(values)
    if (id) {
      var formdata = new FormData();
      formdata.append("categoryName", values.categoryName);
      formdata.append("id", id);
      if (typeof values.categoryImage === 'string') {

        formdata.append("categoryImage", values.categoryImage);
      } else {
        formdata.append("categoryImage", values.categoryImage[0]);
      }
      axios.put(apiUrl + "category/updateById", formdata).then((resp) => {
        console.log(resp)
      })
      toast.success("Category Edited Successfully")
      move("/categories")
    } else {
      var formdata = new FormData();
      formdata.append("categoryName", values.categoryName);
      formdata.append("categoryImage", values.categoryImage[0]);

      var requestOptions = {
        method: 'POST',
        body: formdata,
        redirect: 'follow'
      };

      fetch(apiUrl + "category/create", requestOptions)
        .then(response => response.text())
        .then((result) => {
          console.log(result)
          toast.success("Category Add Successfully")
          move("/categories")
        })
        .catch(error => console.log('error', error));
    }

  }

  return (
    <div className="container-fluid">
      <Toaster />
      {/*  <!-- Page Heading --> */}
      <div className="d-sm-flex align-items-center justify-content-between mb-4">
        <h1 className="h3 mb-0 text-gray-800">{id ? "Edit Category" : "Add Category"}</h1>
        {/* <Link to="#" className="d-none d-sm-inline-block btn btn-sm btn-primary shadow-sm"><i
                    className="fas fa-plus fa-sm text-white-50"></i> Add</Link> */}
      </div>
      <div className=" card border p-3 rounded-3">
        <form onSubmit={handleSubmit(formSubmit)}>
          <div className="row">
            <div className="col-md-6 mb-4">
              <label htmlFor="exampleFormControlInput1" className="form-label">
                Category Name
              </label>
              <input
                {...register("categoryName", { required: true })}
                type="text"
                className="form-control rounded-pill"
                id="exampleFormControlInput1"
                placeholder="alpha"
                style={{ height: "40px" }}
              />
              {formState.errors.categoryName && <div className="tw-text-center tw-text-[#ff0000] tw-text-[13px]">Please Enter a name</div>}
            </div>
            {id ? <div className="col-md-6 mb-4">
              <label htmlFor="exampleFormControlInput1" className="form-label">
                Category Image
              </label>
              <input
                {...register("categoryImage")}
                type="file"
                className="form-control rounded-pill"
                id="exampleFormControlInput1"
                placeholder="Trade License Number"
                style={{ height: '40px', color: image ? 'transparent' : null }}
                onChange={() => {
                  setImage(false)
                }}
              />
              {image ? <div className='tw-absolute tw-bottom-1 tw-right-[3%] tw-w-[59%] tw-h-7 tw-overflow-hidden'>{category?.categoryImage}</div> : null}
            </div> :

              <div className="col-md-6 mb-4">
                <label htmlFor="exampleFormControlInput1" className="form-label">
                  Category Image
                </label>
                <input
                  {...register("categoryImage", { required: true })}
                  type="file"
                  className="form-control rounded-pill"
                  style={{ height: "40px" }}
                />
                {formState.errors.categoryImage && <div className="tw-text-center tw-text-[#ff0000] tw-text-[13px]">Please select a image</div>}
              </div>
            }

            <div className="col-md-12 mb-2 text-end">
              <button
                className="btn btn-primary rounded-pill border-0"
                style={{ height: "50px" }}
              >
                {id ? "Edit Category" : "Add Category"}
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddCategory;
