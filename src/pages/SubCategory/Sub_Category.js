import React, { useEffect, useState } from "react";
import { Link, useNavigate } from 'react-router-dom'
import "jquery/dist/jquery.min.js";
//Datatable Modules
import "datatables.net-dt/js/dataTables.dataTables";
import "datatables.net-dt/css/jquery.dataTables.min.css";
import "datatables.net-buttons/js/dataTables.buttons.js";
import "datatables.net-buttons/js/buttons.colVis.js";
import "datatables.net-buttons/js/buttons.flash.js";
import "datatables.net-buttons/js/buttons.html5.js";
import "datatables.net-buttons/js/buttons.print.js";
import "datatables.net-dt/css/jquery.dataTables.min.css";
import $ from "jquery";
import Swal from 'sweetalert2'
import { useDispatch, useSelector } from "react-redux";
import { fetchBanner } from "../../store/bannerSlice";
import axios from "axios";

const Sub_Category = () => {
  let [subCategory, setSubCategory] = useState(null)
  let [cat, setCat] = useState(null)
  let [category, setCategory] = useState([])
  const apiUrl = process.env.REACT_APP_API_URL;
  const navigate = useNavigate()
  useEffect(() => {


       
    if (!$.fn.DataTable.isDataTable(".table")) {
      $(document).ready(function () {
        setTimeout(function () {
          $("#user").DataTable({
            pagingType: "full_numbers",
            bDestroy: true,
            pageLength: 8,
            processing: true,
            dom: "Bfrtip",
            select: {
              style: "single",
            },

            buttons: [
              // {
              //     extend: "csv",
              //     className: "btn btn-success bg-success",
              // },
            ],

            fnRowCallback: function (
              nRow,
              aData,
              iDisplayIndex,
              iDisplayIndexFull
            ) {
              var index = iDisplayIndexFull + 1;
              $("td:first", nRow).html(index);
              return nRow;
            },

            lengthMenu: [
              [10, 20, 30, 50, -1],
              [10, 20, 30, 50, "All"],
            ],
            columnDefs: [
              {
                targets: 0,
                render: function (data, type, row, meta) {
                  return type === "export" ? meta.row + 1 : data;
                },
              },
            ],
          });
        }, 1000);
      });
    }


    
    // axios.get(apiUrl + "subCategory/getAll").then((res) => {
    //   console.log(res)
    //   subCategory=res.data
    //   setSubCategory(subCategory)
    // })
    var requestOptions = {
      method: 'GET',
      redirect: 'follow'
    };

    fetch(apiUrl + "subCategory/getAll", requestOptions)
      .then(response => response.json())
      .then(result => {
        console.log(result)
        setSubCategory(result)
      })
      .catch(error => console.log('error', error));

    axios.get(apiUrl + "category/getAll").then((res) => {
      console.log(res)
      setCat(res.data)
      // setCategory(res?.data)
    })
  }, [])
  useEffect(() => {
    if (subCategory) {
      subCategory.forEach((subData) => {
        if (cat) {
          let data = cat.filter((data) => {
            return data._id == subData.categoryID
          })
          category.push(data[0])
        }
      })
      setCategory(category)
    }

  }, [subCategory, cat])

  const fireAlert = (id) => {
    Swal.fire({
      title: 'Do you really want to delete?',
      showConfirmButton: true,
      showCancelButton: true,
      confirmButtonText: "OK",
      cancelButtonText: "Cancel",
      icon: 'warning'
    }
    ).then((result) => {
      /* Read more about isConfirmed, isDenied below */
      if (result.isConfirmed) {

        axios.delete(apiUrl + "subCategory/delteByID?id=" + id).then((resp) => {
          const updatedsubCategory = subCategory.filter((subCategory) => subCategory._id !== id);
          setSubCategory(updatedsubCategory);
          console.log(subCategory)
          setSubCategory(updatedsubCategory);
          console.log(subCategory)
        });

        Swal.fire('Deleted Successfully!', '', 'success');

      } else
        Swal.fire(' Cancelled', '', 'error')

    })
  }

  // $(document).ready(function () {
  //   setTimeout(function () {
  //     $("#user").DataTable({
  //       pagingType: "full_numbers",
  //       pageLength: 25,
  //       processing: true,
  //       bDestroy: true,
  //     });
  //   }, 1000);
  // });

  return (
    <div className="container-fluid">
      {/*  <!-- Page Heading --> */}
      <div className="d-sm-flex align-items-center justify-content-between mb-4">
        <h1 className="h3 mb-0 text-gray-800">Category</h1>
        <Link to="/Add_Sub_category" className="d-none d-sm-inline-block btn btn-sm btn-primary shadow-sm"><i
          className="fas fa-plus fa-sm text-white-50"></i> Add</Link>
      </div>
      <div className=" card border rounded-3  shadow table-responsive">
        <table className="table" id="user">
          <thead class="bg-primary">
            <tr className="fw-bold text-white" style={{ fontSize: "12px" }}>
              <th scope="col">Sr. No#</th>
              <th scope="col">Parent Category</th>
              <th scope="col">Category Name</th>
              <th scope="col">Category Image</th>

              <th scope="col">Created At</th>
              <th scope="col">Action</th>
            </tr>
          </thead>
          {subCategory ? <tbody>
            {subCategory.map((data, index) => {
              return <tr>
                <td className="py-3">{index + 1}</td>

                {category ? <td className="py-3">{category[index]?.categoryName}</td> : null}
                <td className="py-3">{data.subCategoryName}</td>
                <td className="py-3">
                  <img className="tw-w-16 tw-h-9 tw-object-cover" src={apiUrl + "images/" + data.subCategoryImage} alt="" />
                </td>
                <td className="py-3">{data.createdAt}</td>
                <td className="py-3">
                  <small
                    className="fw-bold border-end pe-2 text-primary"
                    style={{ cursor: "pointer" }}
                    onClick={()=>{navigate("/Add_Sub_Category/"+data._id)}}
                  >
                    Edit
                  </small>
                  <small
                    className="fw-bold text-danger ps-2"
                    style={{ cursor: "pointer" }}
                    onClick={() => {
                      fireAlert(data._id, index)
                  }}
                  >
                    Delete
                  </small>
                </td>
              </tr>
            })}

          </tbody> : null}
        </table>
      </div>
    </div>
  );
};

export default Sub_Category;
