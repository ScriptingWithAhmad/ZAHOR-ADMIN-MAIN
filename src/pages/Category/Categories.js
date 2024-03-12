import React, { useEffect, useState } from "react";
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
import { Link, useNavigate } from 'react-router-dom'
import Swal from 'sweetalert2'
import axios from "axios";


const Categoires = () => {
  const apiUrl = process.env.REACT_APP_API_URL;
  let [category, setCategory] = useState(null)
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



    console.log(apiUrl)
    var requestOptions = {
      method: 'GET',
      redirect: 'follow'
    };

    fetch(apiUrl + "category/getAll", requestOptions)
      .then(response => response.json())
      .then((result) => {
        console.log(result)
        setCategory(result)
        // result.forEach((item)=>{

        // })
      })
      .catch(error => console.log('error', error));
  }, [])

  const fireAlert = (id) => {
    Swal.fire({
      title: 'Do you really want to delete?',
      showConfirmButton: true,
      showCancelButton: true,
      confirmButtonText: "OK",
      cancelButtonText: "Cancel",
      icon: 'warning'
    }
    ).then(async (result) => {
      /* Read more about isConfirmed, isDenied below */
      if (result.isConfirmed) {
        setCategory([])
        await axios.delete(apiUrl + "category/delteByID?id=" + id).then((resp) => {
          console.log(resp)
          const updatedTicket = category.filter((ticket) => ticket._id !== id);
          setCategory(updatedTicket)
          console.log(category)
        })

        Swal.fire('Deleted Successfully!', '', 'success');
        // axios.get(apiUrl + "category/getAll").then((resp) => {
        //   console.log(result)
        //   setCategory(result)
        // })

      } else
        Swal.fire(' Cancelled', '', 'error')

    })
  }






  return (
    <div className="container-fluid">
      {/*  <!-- Page Heading --> */}
      <div className="d-sm-flex align-items-center justify-content-between mb-4">
        <h1 className="h3 mb-0 text-gray-800">Add Category</h1>
        <Link to="/Add_Category" className="d-none d-sm-inline-block btn btn-sm btn-primary shadow-sm"><i
          className="fas fa-plus fa-sm text-white-50"></i> Add</Link>
      </div>
      <div className=" card border rounded-3   table-responsive tw-shadow-md ">
        <table className="table" id="user">
        
          <thead class="bg-primary">
            <tr className="fw-bold text-white" style={{ fontSize: "12px" }}>
              <th scope="col">Sr. No#</th>
              <th scope="col">Category Name</th>
              <th scope="col">Category Image</th>

              <th scope="col">Created At</th>
              <th scope="col">Action</th>
            </tr>
          </thead>

          {category ? <tbody>
            {category.map((data, index) => {
              return <tr>
                <td className="py-3">{index + 1}</td>

                <td className="py-3">{data.categoryName}</td>
                <td className="py-3">
                  <img className="tw-w-16 tw-h-9 tw-object-cover" src={apiUrl + "images/" + data.categoryImage} alt="" />
                </td>
                <td className="py-3">{data.createdAt}</td>
                <td className="py-3">
                  <small
                    className="fw-bold border-end pe-2 text-primary"
                    style={{ cursor: "pointer" }}
                    onClick={()=>{navigate("/Add_Category/"+data._id)}}
                  >
                    Edit
                  </small>
                  <small
                    className="fw-bold text-danger ps-2"
                    style={{ cursor: "pointer" }}
                    onClick={() => {
                      fireAlert(data._id)
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

export default Categoires;
