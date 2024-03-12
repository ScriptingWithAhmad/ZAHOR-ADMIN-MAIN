import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import Swal from 'sweetalert2'
import 'jquery/dist/jquery.min.js';
import toast, { Toaster } from 'react-hot-toast';
//Datatable Modules
import "datatables.net-dt/js/dataTables.dataTables"
import "datatables.net-dt/css/jquery.dataTables.min.css"
import "datatables.net-buttons/js/dataTables.buttons.js"
import "datatables.net-buttons/js/buttons.colVis.js"
import "datatables.net-buttons/js/buttons.flash.js"
import "datatables.net-buttons/js/buttons.html5.js"
import "datatables.net-buttons/js/buttons.print.js"
import "datatables.net-dt/css/jquery.dataTables.min.css"
import $ from 'jquery';
import { useDispatch, useSelector } from 'react-redux';
import { fetchBanner } from '../../store/bannerSlice';
import axios from 'axios';
const DeniedUsers = () => {
    const apiUrl = process.env.REACT_APP_API_URL;
    let [user, setUser] = useState(null)

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
    }, [])
   


    let [check, setCheck] = useState(false)
    const dispatch = useDispatch()
    const { data: banner, status } = useSelector((state) => state?.banner)


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
                axios.delete(apiUrl + "user/delteByID?id=" + id).then((resp) => {
                    console.log(resp)
                    axios.get(apiUrl + "user/getAll").then((resp) => {
                        let allUser = resp.data
                        allUser = allUser.filter((data) => {
                            return data.status == "pending"

                        })
                        setUser(allUser)

                    })
                })
                Swal.fire('Deleted Successfully!', '', 'success');

            } else
                Swal.fire(' Cancelled', '', 'error')

        })
    }



    useEffect(() => {
        let config = {
            method: 'get',
            maxBodyLength: Infinity,
            url: apiUrl + 'user/getAll',
            headers: {}
        };

        axios.request(config)
            .then((response) => {
                let allUser = response.data
                allUser = allUser.filter((data) => {
                    return data.status == "pending"

                })
                setUser(allUser)
            })
            .catch((error) => {
                console.log(error);
            });
    }, [])



    return (
        <div className="container-fluid">

            {/*  <!-- Page Heading --> */}
            <div className="d-sm-flex align-items-center justify-content-between mb-4">
                <h1 className="h3 mb-0 text-gray-800">Denied Users</h1>
                <Link to="/editUsers" className="d-none d-sm-inline-block btn btn-sm btn-primary shadow-sm"><i
                    className="fas fa-plus fa-sm text-white-50"></i> Add</Link>
            </div>
            {user ? <div className=' card border rounded-3  shadow table-responsive'>

                <table className="table" id='user'>
                    <thead class="bg-primary">
                        <tr className='fw-bold text-white' style={{ fontSize: '12px' }}>
                            <th scope="col">Sr. No#</th>
                            <th scope="col">Name</th>
                            <th scope="col">Email</th>
                            <th scope="col">Phone No</th>
                            <th scope="col">Company</th>
                            <th scope="col">License Number</th>
                            <th scope="col">Approved / Denied</th>
                            <th>Status</th>

                            <th scope="col">Action</th>
                        </tr>
                    </thead>
                    {user.map((data, index) => {
                        return (<tbody>
                            <tr>
                                <td className='py-3'>
                                    {index + 1}
                                </td >

                                <td className='py-3'>
                                    {data.name}
                                </td>
                                <td className='py-3'>
                                    {data.email}
                                </td>
                                <td className='py-3'>
                                        {data.phoneNo}
                                    </td>
                                <td className='py-3'>{data.company}</td>
                                <td className='py-3'>{data.tradeLicenseNo}</td>


                                <td>
                                    <label  className="tw-relative tw-inline-block tw-w-12 tw-h-6">
                                    <input className="tw-sr-only tw-peer" checked={false} type="checkbox" onChange={async (e) => {
                                            console.log(e.target.checked)
                                            let status = ""
                                            if (e.target.checked) {
                                                status = "approve"
                                            }
                                            axios.put(apiUrl + "user/updateById", { id: data._id, status: status }).then((resp) => {
                                                console.log(resp)
                                                toast.success("status changed successfully")

                                                axios.request(config)
                                                    .then((response) => {
                                                        let allUser = response.data
                                                        allUser = allUser.filter((data) => {
                                                            return data.status == "pending"

                                                        })
                                                        setUser(allUser)
                                                    })
                                                    .catch((error) => {
                                                        console.log(error);
                                                    });
                                            })
                                            setCheck(e.target.checked)
                                            let config = {
                                                method: 'get',
                                                maxBodyLength: Infinity,
                                                url: apiUrl + 'user/getAll',
                                                headers: {}
                                            };


                                        }} />
                                        <span class="slider1 round"></span>
                                    </label>
                                </td>
                                <td><span class="badge rounded-pill bg-primary">{data.status}</span></td>
                                <td className='py-3'>
                                    <small className='fw-bold border-end pe-2 text-primary' style={{ cursor: 'pointer' }} onClick={() => navigate('/editUsers/' + data._id)}>Edit</small>
                                    <small className='fw-bold text-danger ps-2' style={{ cursor: 'pointer' }} onClick={() =>
                                        fireAlert(data._id)
                                    }>Delete</small>
                                </td>
                            </tr>


                        </tbody>)
                    })}

                </table>

            </div> : null}
        </div>
    )
}

export default DeniedUsers