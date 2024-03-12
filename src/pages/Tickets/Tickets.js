import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
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
import Swal from "sweetalert2";
import { useDispatch, useSelector } from "react-redux";
import { fetchBanner } from "../../store/bannerSlice";
import axios from "axios";
const Tickets = () => {
  let [ticket, setTicket] = useState([]);
  let [usr, setUsr] = useState(null);
  let [cat, setCat] = useState(null);
  let [user, setUser] = useState([]);
  let [category, setCategory] = useState([]);
  let [subCat, setSubCat] = useState(null);
  let [subCategory, setSubCategory] = useState([]);

  const [searchTickets, setSearchTickets] = useState("");
  const apiUrl = process.env.REACT_APP_API_URL;

  const navigate = useNavigate();

  useEffect(() => {
    if (!$.fn.DataTable.isDataTable(".table")) {
      $(document).ready(function () {
        setTimeout(function () {
          $("#ticket").DataTable({
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
  }, []);

  useEffect(() => {
    axios.get(apiUrl + "ticket/getAll").then((resp) => {
      setTicket(resp.data);
    });
    axios.get(apiUrl + "user/getAll").then((res) => {
      setUsr(res.data);
    });
    axios.get(apiUrl + "category/getAll").then((res) => {
      setCat(res.data);
    });
    axios.get(apiUrl + "subCategory/getAll").then((res) => {
      setSubCat(res.data);
    });
  }, []);

  useEffect(() => {
    if (ticket.length > 0) {
      const updatedUser = ticket.map((subData) => {
        const data =
          usr && usr.find((userData) => userData._id === subData.userID);
        return data || null;
      });

      setUser(updatedUser);
    }
  }, [ticket, usr]);

  useEffect(() => {
    if (ticket.length > 0) {
      const updatedCategory = ticket.map((subData) => {
        const data =
          cat &&
          cat.find((categoryData) => categoryData._id === subData.categoryID);
        return data || null;
      });
      setCategory(updatedCategory);
      ticket.forEach((subData) => {
        if (subCat) {
          let data = subCat.filter((data) => {
            return data._id == subData.subCategoryID;
          });
          subCategory.push(data[0]);
        }
      });
      setSubCategory(subCategory);

      console.log(subCategory);
    }
  }, [ticket, cat, subCat]);

  const fireAlert = (id, index) => {
    Swal.fire({
      title: "Do you really want to delete?",
      showConfirmButton: true,
      showCancelButton: true,
      confirmButtonText: "OK",
      cancelButtonText: "Cancel",
      icon: "warning",
    }).then(async (result) => {
      if (result.isConfirmed) {
        setTicket([]);
        await axios
          .delete(apiUrl + "ticket/delteByID?id=" + id)
          .then((resp) => {
            const updatedTicket = ticket.filter((ticket) => ticket._id !== id);
            setTicket(updatedTicket);
            console.log(ticket);
          });
        Swal.fire("Deleted Successfully!", "", "success");
      } else {
        Swal.fire(" Cancelled", "", "error");
      }
    });
  };

  const dispatch = useDispatch();
  const { data: banner, status } = useSelector((state) => state?.banner);

  // useEffect(() => {
  //     if (ticket.length > 0) {
  //         ticket.forEach((subData) => {
  //             if (usr) {
  //                 let data = usr.filter((data) => {
  //                     return data._id == subData.userID
  //                 })
  //                 user.push(data[0])
  //             }
  //         })
  //         setUser(user)
  //     }
  //     console.log(user)
  // }, [])

  // useEffect(() => {
  //     if (ticket.length > 0) {
  //         ticket.forEach((subData) => {
  //             if (cat) {
  //                 let data = cat.filter((data) => {
  //                     return data._id == subData.categoryID
  //                 })
  //                 category.push(data[0])
  //             }
  //         })
  //         setCategory(category)
  //     }
  //     console.log(category)
  // }, [])

  // useEffect(() => {
  //     if (ticket) {

  // }, [ticket, subCat])

  return (
    <div className="container-fluid">
      {/*  <!-- Page Heading --> */}
      <div className="d-sm-flex align-items-center justify-content-between mb-4">
        <h1 className="h3 mb-0 text-gray-800">Ticket</h1>
        {/* <Link to="/addUsers" className="d-none d-sm-inline-block btn btn-sm btn-primary shadow-sm"><i
                    className="fas fa-plus fa-sm text-white-50"></i> Add</Link> */}
      </div>
      <div>
        <div className="row pb-4 align-items-center">
          <div className="col-md-4">
            <select
              className="tw-outline-none tw-py-3 w-100 tw-rounded-md tw-shadow-md bg-white   tw-caret-black"
              aria-label="Dropdown menu"
              name=""
              id=""
              onChange={(e) => {
                setSearchTickets(e.target.value);
              }}
            >
                  <option selected>Search</option>
              <option value="In Progress">In Progress</option>
              <option value="Under Inspection">Under Inspection</option>
              <option value="Price Quoted">Price Quoted</option>
              <option value="Price Accepted">Price Accepted</option>
              <option value="Materials Acquired">Materials Acquired</option>
              <option value="Transaction Completed">
                Transaction Completed
              </option>
            </select>
          </div>
          {/* <div className="col-md-4">
          <button className="d-none d-sm-inline-block btn btn-sm btn-primary shadow-sm"><i
                    className="fas fa-plus fa-sm text-white-50"></i> Search</button>
          </div> */}
        </div>
      </div>
      <div className=" card border rounded-3     tw-shadow-md  table-responsive">
        <table className="table" id="ticket">
          <thead class=" bg-primary">
            <tr className="fw-bold text-white" style={{ fontSize: "12px" }}>
              <th scope="col">Sr. No#</th>
              <th scope="col">Category Name</th>
              <th scope="col">SubCategory Name</th>
              <th scope="col">User Name</th>
              {/* <th scope="col">Product Weight</th> */}
              <th scope="col">Product Price</th>
              <th scope="col">status</th>
              <th scope="col">Action</th>
            </tr>
          </thead>
          {ticket.length > 0 ? (
            <tbody>
              {ticket?.filter((i) => {
                          if (searchTickets === "") {
                            return i;
                          } else if (
                            i.status
                              .toLowerCase()
                              .includes(searchTickets.toLocaleLowerCase())
                          ) {
                            return i;
                          }
                        })

                        .map((data, index) => {
                return (
                  <tr>
                    <td className="py-3">{index + 1}</td>

                    <td className="py-3">{category[index]?.categoryName}</td>
                    <td className="py-3">
                      {subCategory[index]?.subCategoryName}
                    </td>
                    <td className="py-3">{user[index]?.name}</td>
                    {/* <td className='py-3'>{data.weight + " " + data.weightType}</td> */}
                    <td className="py-3">
                      {data.price + " " + data.weightUnit}
                    </td>
                    <td className="py-3">{data.status}</td>
                    <td className="py-3 tw-cursor-pointer">
                      <small
                        className="fw-bold border-end pe-2 text-primary"
                        style={{ cursor: "pointer" }}
                        onClick={() => navigate("/editTicket/" + data._id)}
                      >
                        Info/Edit
                      </small>
                      <small
                        className="fw-bold text-danger ps-2"
                        style={{ cursor: "pointer" }}
                        onClick={() => {
                          fireAlert(data._id, index);
                        }}
                      >
                        Delete
                      </small>
                      <small
                        className="fw-bold text-primary ps-2"
                        style={{ cursor: "pointer" }}
                        onClick={async () => {
                          if (data.status == "In Progress") {
                            await axios
                              .put(apiUrl + "ticket/updateById", {
                                id: data._id,
                                status: "Under Inspection",
                              })
                              .then((resp) => {
                                console.log(resp);
                              });
                          }
                          navigate("/chat/" + data.userID + "/" + data._id);
                        }}
                      >
                        Chat
                      </small>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          ) : null}
        </table>
      </div>
    </div>
  );
};

export default Tickets;
