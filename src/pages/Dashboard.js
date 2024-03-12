import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
function Dashboard() {
    const apiUrl = process.env.REACT_APP_API_URL;
  
    let [ticket, setTicket] = useState(null)
    // let [usr, setUsr] = useState(null)
    // let [cat, setCat] = useState(null)
    let [user, setUser] = useState([])
    let [category, setCategory] = useState([])
    



    useEffect(() => {

        var requestOptions = {
            method: 'GET',
            redirect: 'follow'
        };

        fetch(apiUrl + "ticket/getAll", requestOptions)
            .then(response => response.json())
            .then(result => {
                console.log(result)
                setTicket(result)
            })
            .catch(error => console.log('error', error));

        axios.get(apiUrl + "user/getAll").then((res) => {
            //   console.log(res)
            setUser(res.data)
            // setCategory(res?.data)
        })
        axios.get(apiUrl + "category/getAll").then((res) => {
            // console.log(res)
            setCategory(res.data)

            // setCategory(res?.data)
        })
        // axios.get(apiUrl + "subCategory/getAll").then((res) => {
        //     //   console.log(res)
        //     setSubCat(res.data)
        //     // setCategory(res?.data)
        // })
    }, [])


    return (
        <div>
            <div className="container-fluid">

                {/*  <!-- Page Heading --> */}
                <div className="d-sm-flex align-items-center justify-content-between mb-4">
                    <h1 className="h3 mb-0 text-gray-800">Dashboard</h1>
                    {/* <Link to="#" className="d-none d-sm-inline-block btn btn-sm btn-primary shadow-sm"><i
                        className="fas fa-download fa-sm text-white-50"></i> Generate Report</Link> */}
                </div>

                {/*  <!-- Content Row --> */}
                <div className="row">

                    {/*  <!-- Earnings (Monthly) Card Example --> */}
                    <div className="col-xl-3 col-md-6 mb-4">
                        <div className="card border-left-primary shadow h-100 py-2">
                            <div className="card-body">
                                <div className="row no-gutters align-items-center">
                                    <div className="col mr-2">
                                        <div className="text-xs font-weight-bold text-primary text-uppercase mb-1">
                                            Total Users </div>
                                        <div className="h5 mb-0 font-weight-bold text-gray-800">{user?.length}</div>
                                    </div>
                                    <div className="col-auto">
                                        <i className="fas fa-users fa-2x text-gray-300"></i>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/*  <!-- Earnings (Monthly) Card Example --> */}
                    <div className="col-xl-3 col-md-6 mb-4">
                        <div className="card border-left-success shadow h-100 py-2">
                            <div className="card-body">
                                <div className="row no-gutters align-items-center">
                                    <div className="col mr-2">
                                        <div className="text-xs font-weight-bold text-success text-uppercase mb-1">
                                            Total Tickets</div>
                                        <div className="h5 mb-0 font-weight-bold text-gray-800">{ticket?.length}</div>
                                    </div>
                                    <div className="col-auto">
                                        <i className="fas fa-ticket-alt fa-2x text-gray-300"></i>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/*  <!-- Earnings (Monthly) Card Example --> */}
                    <div className="col-xl-3 col-md-6 mb-4">
                        <div className="card border-left-info shadow h-100 py-2">
                            <div className="card-body">
                                <div className="row no-gutters align-items-center">
                                    <div className="col mr-2">
                                        <div className="text-xs font-weight-bold text-info text-uppercase mb-1">Total Agreements
                                        </div>
                                        <div className="row no-gutters align-items-center">
                                            <div className="col-auto">
                                                <div className="h5 mb-0 mr-3 font-weight-bold text-gray-800">0</div>
                                            </div>

                                        </div>
                                    </div>
                                    <div className="col-auto">
                                        <i className="fas fa-clipboard-list fa-2x text-gray-300"></i>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/*  <!-- Pending Requests Card Example --> */}
                    <div className="col-xl-3 col-md-6 mb-4">
                        <div className="card border-left-warning shadow h-100 py-2">
                            <div className="card-body">
                                <div className="row no-gutters align-items-center">
                                    <div className="col mr-2">
                                        <div className="text-xs font-weight-bold text-warning text-uppercase mb-1">
                                            Total Categories</div>
                                        <div className="h5 mb-0 font-weight-bold text-gray-800">{category?.length}</div>
                                    </div>
                                    <div className="col-auto">
                                        <i className="fas fa-box fa-2x text-gray-300"></i>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/*  <!-- Content Row --> */}

                <div className="row">

                    {/*   <!-- Area Chart --> */}
                    <div className="col-xl-8 col-lg-7">
                        <div className="card shadow mb-4">
                            {/*  <!-- Card Header - Dropdown --> */}
                            {/* <div
                                className="card-header py-3 d-flex flex-row align-items-center justify-content-between">
                                <h6 className="m-0 font-weight-bold text-primary">Earnings Overview</h6>
                                <div className="dropdown no-arrow">
                                    <Link className="dropdown-toggle" to="#" role="button" id="dropdownMenuLink"
                                        data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                        <i className="fas fa-ellipsis-v fa-sm fa-fw text-gray-400"></i>
                                    </Link>
                                    <div className="dropdown-menu dropdown-menu-right shadow animated--fade-in"
                                        aria-labelledby="dropdownMenuLink">
                                        <div className="dropdown-header">Dropdown Header:</div>
                                        <Link className="dropdown-item" to="#">Action</Link>
                                        <Link className="dropdown-item" to="#">Another action</Link>
                                        <div className="dropdown-divider"></div>
                                        <Link className="dropdown-item" to="#">Something else here</Link>
                                    </div>
                                </div>
                            </div> */}
                            {/*  <!-- Card Body --> */}
                            {/* <div className="card-body">
                                <div className="chart-area">
                                    <div className="chartjs-size-monitor">
                                        <div className="chartjs-size-monitor-expand">
                                            <div className="" />
                                        </div>
                                        <div className="chartjs-size-monitor-shrink">
                                            <div className="" />
                                        </div>
                                    </div>
                                    <canvas
                                        id="myAreaChart"
                                        style={{ display: "block", width: 668, height: 320 }}
                                        width={668}
                                        height={320}
                                        className="chartjs-render-monitor"
                                    />
                                </div>
                            </div> */}

                        </div>
                    </div>

                    {/*  <!-- Pie Chart --> */}
                    <div className="col-xl-4 col-lg-5">
                        <div className="card shadow mb-4">
                            {/*  <!-- Card Header - Dropdown --> */}
                            {/* <div
                                className="card-header py-3 d-flex flex-row align-items-center justify-content-between">
                                <h6 className="m-0 font-weight-bold text-primary">Revenue Sources</h6>
                                <div className="dropdown no-arrow">
                                    <Link className="dropdown-toggle" to="#" role="button" id="dropdownMenuLink"
                                        data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                        <i className="fas fa-ellipsis-v fa-sm fa-fw text-gray-400"></i>
                                    </Link>
                                    <div className="dropdown-menu dropdown-menu-right shadow animated--fade-in"
                                        aria-labelledby="dropdownMenuLink">
                                        <div className="dropdown-header">Dropdown Header:</div>
                                        <Link className="dropdown-item" to="#">Action</Link>
                                        <Link className="dropdown-item" to="#">Another action</Link>
                                        <div className="dropdown-divider"></div>
                                        <Link className="dropdown-item" to="#">Something else here</Link>
                                    </div>
                                </div>
                            </div> */}
                            {/*  <!-- Card Body --> */}
                            {/* <div className="card-body">
                                <div className="chart-pie pt-4 pb-2">
                                    <canvas id="myPieChart"></canvas>
                                </div>
                                <div className="mt-4 text-center small">
                                    <span className="mr-2">
                                        <i className="fas fa-circle text-primary"></i> Direct
                                    </span>
                                    <span className="mr-2">
                                        <i className="fas fa-circle text-success"></i> Social
                                    </span>
                                    <span className="mr-2">
                                        <i className="fas fa-circle text-info"></i> Referral
                                    </span>
                                </div>
                            </div> */}
                        </div>
                    </div>
                </div>



            </div>
        </div>
    )
}

export default Dashboard;
