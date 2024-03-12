import React, { useEffect, useState, useRef } from "react";
import { useDispatch } from "react-redux";
import toast, { Toaster } from 'react-hot-toast';
import { createBanner } from "../../store/bannerSlice";
import { useForm } from 'react-hook-form';
import axios from "axios";
import { useNavigate } from 'react-router-dom';
import { useParams } from 'react-router-dom';
const AddSubCategory = () => {
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

    fetch(apiUrl + "category/getAll", requestOptions)
      .then(response => response.json())
      .then((result) => {
        console.log(result)
        setCategory(result)
      })
      .catch(error => console.log('error', error));


    if (id) {
      axios.get(apiUrl + "subCategory/getById?id=" + id).then((resp) => {
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
      let form = new FormData;
      form.append("subCategoryName", values.subCategoryName)
      if (typeof values.subCategoryImage === 'string') {

        form.append("subCategoryImage", values.subCategoryImage);
      } else {
        form.append("subCategoryImage", values.subCategoryImage[0]);
      }
      form.append("categoryID", values.categoryID)
      form.append("id", id);
      axios.put(apiUrl + "subCategory/updateById", form).then((resp) => {
        console.log(resp)
      })
      toast.success("Subcategory Edited Successfully")
      move("/sub_category")
    } else {
      let form = new FormData;
      form.append("subCategoryName", values.subCategoryName)
      form.append("subCategoryImage", values.subCategoryImage[0])
      form.append("categoryID", values.categoryID)
      if (values.categoryID==null) {
        return toast.error("Please Select Parent Category")
      }else{
        axios.post(apiUrl + "subCategory/create", form).then((res) => {
          console.log(res)
          toast.success("Subcategory Add Successfully")
          move("/sub_category")
  
        })
      }
      
    }

    // console.log(selectRef.current.value)
  }
  return (
    <div className="container-fluid">
      {/*  <!-- Page Heading --> */}
      <Toaster />
      <div className="d-sm-flex align-items-center justify-content-between mb-4">
        <h1 className="h3 mb-0 text-gray-800">{id ? "Edit SubCategory" : "Add SubCategory"}</h1>
        {/* <Link to="#" className="d-none d-sm-inline-block btn btn-sm btn-primary shadow-sm"><i
                    className="fas fa-plus fa-sm text-white-50"></i> Add</Link> */}
      </div>
      <div className=" card border p-3 rounded-3">
        <form onSubmit={handleSubmit(formSubmit)}>
          <div className="row">
            <div className="col-md-6 mb-4">
              <label htmlFor="exampleFormControlInput1" className="form-label">
                SubCategory Name
              </label>
              <input
                {...register("subCategoryName", { required: true })}
                type="text"
                className="form-control rounded-pill"
                id="exampleFormControlInput1"
                placeholder="alpha"
                style={{ height: "40px" }}
              />
              {formState.errors.subCategoryName && <div className="tw-text-center tw-text-[#ff0000] tw-text-[13px]">Please Enter a subcategory name</div>}
            </div>
            {id ? <div className="col-md-6 mb-4">
              <label htmlFor="exampleFormControlInput1" className="form-label">
                SubCategory Image
              </label>
              <input
                {...register("subCategoryImage")}
                type="file"
                className="form-control rounded-pill"
                id="exampleFormControlInput1"
                placeholder="Trade License Number"
                style={{ height: '40px', color: image ? 'transparent' : null }}
                onChange={() => {
                  setImage(false)
                }}
              />
              {image ? <div className='tw-absolute tw-bottom-1 tw-right-[3%] tw-w-[59%] tw-h-7 tw-overflow-hidden'>{subCategory?.subCategoryImage}</div> : null}
            </div> :
              <div className="col-md-6 mb-4">
                <label htmlFor="exampleFormControlInput1" className="form-label">
                  SubCategory Image
                </label>
                <input
                  {...register("subCategoryImage", { required: true })}
                  type="file"
                  className="form-control rounded-pill"
                  id="exampleFormControlInput1"
                  placeholder="demo@gmail.com"
                  style={{ height: "40px" }}
                />
                {formState.errors.subCategoryImage && <div className="tw-text-center tw-text-[#ff0000] tw-text-[13px]">Please select subcategory image</div>}
              </div>
            }
            <div className="col-md-6 mb-4">
              <label htmlFor="exampleFormControlInput1" className="form-label">
                Category
              </label>
              {category ? <div className="tw-relative tw-px-3 tw-py-[7px] tw-border-[1px] tw-border-gray-300 tw-rounded-full">
                <select {...register("categoryID")} className="tw-w-full tw-outline-none rounded-pill tw-caret-black" aria-label="Dropdown menu" onChange={(e) => {
                  setCategoryID(e.target.value)
                }}>
                  <option value="">select an option</option>
                  {category.map((data) => {
                    return <option value={data._id}>{data.categoryName}</option>
                  })}
                </select>

                {formState.errors.categoryID && <div className="tw-text-center tw-text-[#ff0000] tw-text-[13px]">Please Select Parent Category</div>}
              </div> : null}

            </div>
            <div className="col-md-12 mb-2 text-end">
              <button
                className="btn btn-primary rounded-pill border-0"
                style={{ height: "50px" }}
              >
                {id ? "Edit SubCategory" : "Add SubCategory"}
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddSubCategory;
